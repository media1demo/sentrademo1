import { destroySession, type Env } from '../_utils/session';

export const onRequest: any = async ({ request, env }: { request: Request; env: Env }) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }
  const expired = await destroySession(env, request);
  const headers = new Headers({ 'Content-Type': 'application/json' });
  headers.append('Set-Cookie', expired);
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
};