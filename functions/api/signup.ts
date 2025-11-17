import { generateSalt, hashPassword, verifyPassword } from '../_utils/crypto';
import { createUser, getUserByEmailOrPhone } from '../_utils/db';
import { createSession, type Env } from '../_utils/session';
import { ensureSchema } from '../_utils/schema';

export const onRequest: any = async ({ request, env }: { request: Request; env: Env }) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const email = (body.email || '').trim().toLowerCase();
  const phone = (body.phone || '').trim() || null;
  const name = (body.name || '').trim() || null;
  const password = (body.password || '').trim();

  if (!email && !phone) {
    return new Response(JSON.stringify({ error: 'email or phone is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  if (!password || password.length < 8) {
    return new Response(JSON.stringify({ error: 'password must be at least 8 characters' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  // Ensure DB schema exists (safe no-op if already applied)
  try {
    await ensureSchema(env);
  } catch (e: any) {
    return new Response(JSON.stringify({ error: 'schema_error', detail: e?.message || String(e) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Smart uniqueness check in a protective try/catch so DB errors don't bubble as HTML
  try {
    // If account exists and the provided password matches, treat this as a login (create session and continue).
    if (email) {
      const existing = await getUserByEmailOrPhone(env, email);
      if (existing) {
        const ok = await verifyPassword(password, existing.salt, existing.password_hash);
        if (ok) {
          const session = await createSession(env, existing.id, request);
          const headers = new Headers({ 'Content-Type': 'application/json' });
          headers.append('Set-Cookie', session.cookie);
          return new Response(JSON.stringify({
            user: { id: existing.id, email: existing.email, phone: existing.phone, name: existing.name },
            message: 'Logged in (existing account)'
          }), { status: 200, headers });
        }
        return new Response(JSON.stringify({ error: 'Account already exists for that email/phone' }), { status: 409, headers: { 'Content-Type': 'application/json' } });
      }
    }
    if (phone) {
      const existing = await getUserByEmailOrPhone(env, phone);
      if (existing) {
        const ok = await verifyPassword(password, existing.salt, existing.password_hash);
        if (ok) {
          const session = await createSession(env, existing.id, request);
          const headers = new Headers({ 'Content-Type': 'application/json' });
          headers.append('Set-Cookie', session.cookie);
          return new Response(JSON.stringify({
            user: { id: existing.id, email: existing.email, phone: existing.phone, name: existing.name },
            message: 'Logged in (existing account)'
          }), { status: 200, headers });
        }
        return new Response(JSON.stringify({ error: 'Account already exists for that email/phone' }), { status: 409, headers: { 'Content-Type': 'application/json' } });
      }
    }
  } catch (e: any) {
    return new Response(JSON.stringify({ error: 'Database error while checking account', detail: e?.message || String(e) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const salt = generateSalt(16);
    const password_hash = await hashPassword(password, salt);

    const user = await createUser(env, {
      email: email || `phone:${phone}`,
      phone,
      name,
      password_hash,
      salt
    });

    // Create session cookie (pass request for correct cookie domain on preview/dev)
    const session = await createSession(env, user.id, request);

    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Set-Cookie', session.cookie);

    return new Response(
      JSON.stringify({
        user: { id: user.id, email: user.email, phone: user.phone, name: user.name },
        message: 'Signup successful'
      }),
      { status: 201, headers }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Failed to create account', detail: err?.message || String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};