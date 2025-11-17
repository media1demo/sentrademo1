import { getUserById } from './_utils/db';
import { getSession, type Env } from './_utils/session';

export const onRequest: any = async ({ request, env }: { request: Request; env: Env }) => {
  if (request.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // Must be logged in (session cookie)
  const session = await getSession(env, request);
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const user = await getUserById(env, session.user_id);
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Validate env
  if (!env.DODO_API_BASE || !env.DODO_API_KEY || !env.PRODUCT_ID) {
    return new Response('Server not configured', { status: 500 });
  }

  // Build Checkout Session payload (no trial)
  const payload: any = {
    product_cart: [
      {
        product_id: env.PRODUCT_ID,
        quantity: 1,
      },
    ],
    customer: {
      email: user.email,
      name: user.name || undefined,
      phone_number: user.phone || undefined,
    },
    allowed_payment_method_types: ['credit', 'debit'],
    return_url: env.RETURN_URL || 'https://free.imaginea.store/track',
    metadata: {
      app_user_id: user.id,
    },
  };

  const url = new URL('/checkouts', env.DODO_API_BASE).toString();

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.DODO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const text = await resp.text();
    if (!resp.ok) {
      return new Response(text || 'Failed to create checkout', { status: 502, headers: { 'Content-Type': 'application/json' } });
    }

    const sessionObj = safeJson(text);
    const checkout_url =
      sessionObj?.checkout_url ||
      sessionObj?.url ||
      sessionObj?.session?.checkout_url ||
      sessionObj?.data?.checkout_url ||
      null;

    if (!checkout_url || typeof checkout_url !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing checkout_url', raw: sessionObj }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Server-side redirect to the hosted checkout
    return Response.redirect(checkout_url, 302);
  } catch (e: any) {
    return new Response(JSON.stringify({ error: 'Checkout creation failed', detail: e?.message || String(e) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
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