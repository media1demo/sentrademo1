import { getSession, type Env } from '../_utils/session';
import { getUserById, getSubscriptionForUser, upsertSubscriptionForUser } from '../_utils/db';
import { ensureSchema } from '../_utils/schema';

export const onRequest: any = async ({ request, env }: { request: Request; env: Env }) => {
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  // Ensure DB tables exist (safe no-op if already applied)
  try { await ensureSchema(env); } catch {}

  const session = await getSession(env, request);
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  const user = await getUserById(env, session.user_id);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  // Read local subscription
  let sub = await getSubscriptionForUser(env, user.id);

  // Cross-browser sync: if local says "no subscription", refresh from Dodo by email and upsert if active.
  if (!sub || sub.status !== 'active') {
    try {
      // 1) Find Dodo customer by email
      const custUrl = new URL(`/customers?email=${encodeURIComponent(user.email)}`, env.DODO_API_BASE).toString();
      const cRes = await fetch(custUrl, { method: 'GET', headers: { Authorization: `Bearer ${env.DODO_API_KEY}` } });
      if (cRes.ok) {
        const cText = await cRes.text();
        let cObj: any;
        try { cObj = JSON.parse(cText); } catch { cObj = cText; }
        const customers = Array.isArray(cObj?.items) ? cObj.items
                        : Array.isArray(cObj?.data) ? cObj.data
                        : (Array.isArray(cObj) ? cObj : []);
        const customer = customers && customers[0] ? customers[0] : null;
        const customerId = customer?.customer_id || customer?.id || null;

        // 2) If we have a customer, get their active subscription
        if (customerId) {
          const subUrl = new URL(`/subscriptions?customer_id=${encodeURIComponent(customerId)}&status=active&page_size=1`, env.DODO_API_BASE).toString();
          const sRes = await fetch(subUrl, { method: 'GET', headers: { Authorization: `Bearer ${env.DODO_API_KEY}` } });
          if (sRes.ok) {
            const sText = await sRes.text();
            let sObj: any;
            try { sObj = JSON.parse(sText); } catch { sObj = sText; }
            const subs = Array.isArray(sObj?.items) ? sObj.items
                        : Array.isArray(sObj?.data) ? sObj.data
                        : (Array.isArray(sObj) ? sObj : []);
            const first = subs && subs[0] ? subs[0] : sObj;
            const status = String(first?.status || first?.subscription_status || '').toLowerCase();
            const subId = first?.subscription_id || first?.id || null;

            if (status === 'active' && subId) {
              await upsertSubscriptionForUser(env, user.id, { status: 'active', dodo_subscription_id: subId });
              sub = await getSubscriptionForUser(env, user.id);
            }
          }
        }
      }
    } catch {
      // Ignore Dodo refresh errors; we'll return current local state
    }
  }

  return new Response(JSON.stringify({
    user: {
      id: user.id,
      email: user.email,
      phone: user.phone,
      name: user.name
    },
    subscription: sub ? {
      status: sub.status,
      dodo_subscription_id: sub.dodo_subscription_id,
      latest_payment_id: sub.latest_payment_id,
      updated_at: sub.updated_at
    } : null
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });
};