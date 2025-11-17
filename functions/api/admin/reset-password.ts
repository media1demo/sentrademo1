import { generateSalt, hashPassword } from '../../_utils/crypto';
import { ensureSchema } from '../../_utils/schema';
import type { Env } from '../../_utils/session';

/**
 * Dev-only admin endpoint to reset a user's password by email.
 * - Protect with an admin token in env.ADMIN_TOKEN
 * - POST /api/admin/reset-password
 *   { "email": "user@example.com", "new_password": "newStrongPass123" }
 *
 * SECURITY: Do NOT enable in production without strong access controls.
 */
export const onRequest: any = async ({ request, env }: { request: Request; env: Env & { ADMIN_TOKEN?: string } }) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const adminHeader = request.headers.get('x-admin-token') || '';
  const expected = (env as any).ADMIN_TOKEN || '';
  if (!expected || adminHeader !== expected) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const email = String(body?.email || '').trim().toLowerCase();
  const newPassword = String(body?.new_password || '').trim();

  if (!email || !newPassword || newPassword.length < 8) {
    return new Response(JSON.stringify({ error: 'email and new_password (min 8 chars) are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    await ensureSchema(env);

    // Find user by email (case-insensitive)
    const userStmt = env.DB.prepare(
      `SELECT id, email FROM users WHERE lower(email) = ?`
    ).bind(email);
    const userRes: any = await userStmt.all();
    const rows = (userRes?.results || []) as any[];
    if (!rows.length) {
      return new Response(JSON.stringify({ error: 'user_not_found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const user = rows[0];

    const salt = generateSalt(16);
    const password_hash = await hashPassword(newPassword, salt);

    const upd = await env.DB.prepare(
      `UPDATE users
         SET password_hash = ?, salt = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now')
       WHERE id = ?`
    ).bind(password_hash, salt, user.id).run();

    if (!upd.success) {
      return new Response(JSON.stringify({ error: 'update_failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ ok: true, user_id: user.id, email: user.email }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: 'internal_error', detail: e?.message || String(e) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};