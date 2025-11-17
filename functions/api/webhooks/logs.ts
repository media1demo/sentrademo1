import type { Env } from '../../_utils/session';
import { ensureSchema } from '../../_utils/schema';

export const onRequest: any = async ({ request, env }: { request: Request; env: Env }) => {
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    await ensureSchema(env);
    const stmt = env.DB.prepare(
      `SELECT id, event_id, type, payload_type, customer_email, subscription_id, payment_id, created_at
         FROM webhook_events
         ORDER BY datetime(created_at) DESC
         LIMIT 50`
    );
    const res: any = await stmt.all();
    const items = (res?.results || []) as any[];
    return new Response(JSON.stringify({ items }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: 'db_error', detail: e?.message || String(e) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};