import { verifyPassword } from '../_utils/crypto';
import { getUserByEmailOrPhone } from '../_utils/db';
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

  const identifier = (body.identifier || '').trim(); // email or phone
  const password = (body.password || '').trim();

  if (!identifier || !password) {
    return new Response(JSON.stringify({ error: 'identifier and password are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  // Ensure DB schema exists (safe no-op when already applied)
  try {
    await ensureSchema(env);
  } catch (e: any) {
    return new Response(JSON.stringify({ error: 'schema_error', detail: e?.message || String(e) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const user = await getUserByEmailOrPhone(env, identifier);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  const ok = await verifyPassword(password, user.salt, user.password_hash);
  if (!ok) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  const session = await createSession(env, user.id, request);
  const headers = new Headers({ 'Content-Type': 'application/json' });
  headers.append('Set-Cookie', session.cookie);

  return new Response(
    JSON.stringify({
      user: { id: user.id, email: user.email, phone: user.phone, name: user.name }
    }),
    { status: 200, headers }
  );
};