import { getUserById } from '../_utils/db';
import { getSession, type Env } from '../_utils/session';

export const onRequest: any = async ({ request, env }: { request: Request; env: Env }) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  // Require logged-in user
  const session = await getSession(env, request);
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
  const user = await getUserById(env, session.user_id);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  // Validate env
  if (!env.DODO_API_BASE || !env.DODO_API_KEY || !env.PRODUCT_ID) {
    return new Response(JSON.stringify({ error: 'Server not configured (DODO_API_BASE/DODO_API_KEY/PRODUCT_ID missing)' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  // Build Checkout Session payload (no trial)
  const payload: any = {
    product_cart: [
      {
        product_id: env.PRODUCT_ID,
        quantity: 1
      }
    ],
    customer: {
      email: user.email,
      name: user.name || undefined,
      phone_number: user.phone || undefined
    },
    allowed_payment_method_types: ['credit', 'debit'],
    return_url: env.RETURN_URL || 'https://free.imaginea.store/track',
    metadata: {
      app_user_id: user.id
    }
  };

  // Create Checkout Session per docs:
  // - Base URLs: https://test.dodopayments.com or https://live.dodopayments.com
  // - Endpoint: POST /checkouts
  // Reference: https://docs.dodopayments.com/developer-resources/checkout-session
  const url = new URL('/checkouts', env.DODO_API_BASE).toString();

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.DODO_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const text = await resp.text();
    if (!resp.ok) {
      return new Response(JSON.stringify({ error: 'Dodo API error', status: resp.status, body: safeJson(text) }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Expected fields include checkout_url and session_id (per docs example).
    const sessionObj = safeJson(text);
    const checkout_url = sessionObj?.checkout_url || sessionObj?.url || null;

    if (!checkout_url) {
      return new Response(JSON.stringify({ error: 'Missing checkout_url in response', raw: sessionObj }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ checkout_url, session: sessionObj }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Failed to create checkout session', detail: err?.message || String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

function safeJson(input: string) {
  try {
    return JSON.parse(input);
  } catch {
    return { raw: input };
  }
}