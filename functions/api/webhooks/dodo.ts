/**
 * Dodo Payments Webhook endpoint
 * - Verifies signature using `standardwebhooks`
 * - Updates user subscription status in D1 based on events
 *
 * Expected headers:
 *  - webhook-id
 *  - webhook-signature
 *  - webhook-timestamp
 *
 * Docs references:
 * - Checkout session + trial: https://docs.dodopayments.com/developer-resources/checkout-session
 * - Webhooks + headers + verification: https://docs.dodopayments.com/developer-resources/webhooks
 * - Metadata in webhook events: https://docs.dodopayments.com/api-reference/metadata
 */

import { Webhook } from 'standardwebhooks';
import type { Env } from '../../_utils/session';
import { getUserByEmailOrPhone, upsertSubscriptionForUser } from '../../_utils/db';
import { ensureSchema } from '../../_utils/schema';

export const onRequest: any = async ({ request, env }: { request: Request; env: Env }) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // Accept multiple webhook signing secrets to support multiple Dodo endpoints.
  // Configure either DODO_WEBHOOK_SECRET or DODO_WEBHOOK_SECRETS (comma-separated).
  const secretsRaw = (env as any).DODO_WEBHOOK_SECRETS || env.DODO_WEBHOOK_SECRET || '';
  const secrets = String(secretsRaw)
    .split(',')
    .map((s) => s.trim())
    .filter((s) => !!s);

  if (secrets.length === 0) {
    return new Response(JSON.stringify({ error: 'Webhook secret not set' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Read raw body first for signature verification
  const rawBody = await request.text();

  // Required Standard Webhooks headers
  const headers = {
    'webhook-id': request.headers.get('webhook-id') || '',
    'webhook-signature': request.headers.get('webhook-signature') || '',
    'webhook-timestamp': request.headers.get('webhook-timestamp') || ''
  };

  if (!headers['webhook-id'] || !headers['webhook-signature'] || !headers['webhook-timestamp']) {
    return new Response(JSON.stringify({ error: 'Missing webhook signature headers' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Verify against all configured secrets (first match wins)
  let payload: any;
  let verified = false;
  for (const sec of secrets) {
    try {
      const wh = new Webhook(sec);
      payload = await wh.verify(rawBody, headers);
      verified = true;
      break;
    } catch (_) {
      // try next secret
    }
  }

  if (!verified) {
    return new Response(JSON.stringify({ error: 'Invalid webhook signature' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Ensure DB schema (including webhook_events table) exists; safe no-op if already applied
  try { await ensureSchema(env); } catch {}

  // Parse event fields with defensive fallbacks across doc formats
  const type: string = String(payload?.type || '');
  const data = payload?.data || {};
  const payloadType = (data?.payload_type || data?.object?.payload_type || '').toString();

  // Attempt to pick metadata and email from multiple possible structures
  const object = data?.object ?? data; // in some examples `data.object` exists
  const metadata = object?.metadata || data?.metadata || {};
  const appUserId = metadata?.app_user_id || metadata?.appUserId || null;

  const customerEmail = object?.customer?.email || object?.customer_email || object?.email || null;

  const subscriptionId =
    object?.subscription_id || object?.subscriptionId || data?.subscription_id || null;

  const paymentId =
    object?.payment_id || object?.id || data?.payment_id || null;

  // Persist a lightweight webhook receipt for observability (does not block processing)
  try {
    const weId = `we_${crypto.randomUUID()}`;
    await env.DB.prepare(
      `INSERT INTO webhook_events (id, event_id, type, payload_type, customer_email, subscription_id, payment_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      weId,
      (request.headers.get('webhook-id') || null),
      type,
      (payloadType || null),
      (customerEmail || null),
      (subscriptionId || null),
      (paymentId || null)
    ).run();
  } catch (_) {
    // ignore logging failures
  }

  // Resolve the user_id
  let userId: string | null = null;

  if (appUserId && typeof appUserId === 'string') {
    userId = appUserId;
  } else if (customerEmail && typeof customerEmail === 'string') {
    // Fallback to matching by email if provided
    const user = await getUserByEmailOrPhone(env, customerEmail);
    if (user) {
      userId = user.id;
    }
  }

  // If we can't resolve a user, we still acknowledge 200 to avoid retries storm,
  // but we no-op. You can add alerting here.
  if (!userId) {
    return new Response(JSON.stringify({ received: true, note: 'user not resolved' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Handle key events:
  // - subscription.active: mark active (this typically includes trial activation)
  // - subscription.renewed: keep active and save latest payment id if present
  // - payment.succeeded: optionally record latest payment_id
  try {
    switch (type) {
      case 'subscription.active': {
        await upsertSubscriptionForUser(env, userId, {
          status: 'active',
          dodo_subscription_id: subscriptionId || null,
          latest_payment_id: paymentId || null
        });
        break;
      }
      case 'subscription.renewed': {
        await upsertSubscriptionForUser(env, userId, {
          status: 'active',
          dodo_subscription_id: subscriptionId || null,
          latest_payment_id: paymentId || null
        });
        break;
      }
      case 'subscription.on_hold': {
        await upsertSubscriptionForUser(env, userId, {
          status: 'on_hold',
          dodo_subscription_id: subscriptionId || null
        });
        break;
      }
      case 'subscription.cancelled': {
        await upsertSubscriptionForUser(env, userId, {
          status: 'cancelled',
          dodo_subscription_id: subscriptionId || null
        });
        break;
      }
      case 'subscription.failed': {
        await upsertSubscriptionForUser(env, userId, {
          status: 'failed',
          dodo_subscription_id: subscriptionId || null
        });
        break;
      }
      case 'subscription.expired': {
        await upsertSubscriptionForUser(env, userId, {
          status: 'expired',
          dodo_subscription_id: subscriptionId || null
        });
        break;
      }
      case 'payment.succeeded': {
        // Keep current status; just record latest payment_id if available.
        await upsertSubscriptionForUser(env, userId, {
          status: 'active', // safe default; subscription will be active during trial/after payment
          dodo_subscription_id: subscriptionId || null,
          latest_payment_id: paymentId || null
        });
        break;
      }
      default:
        // Ignore unrelated webhook types
        break;
    }
  } catch (err: any) {
    // Return 500 so Dodo can retry later
    return new Response(`Error handling event: ${type}`, { status: 500 });
  }

  // Acknowledge
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};