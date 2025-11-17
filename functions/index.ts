// Additional helper to determine if subscription should be treated as inactive
function isInactiveFromInfo(info: { status?: string; next_billing_date?: string | null; expires_at?: string | null }): boolean {
  const status = (info.status || '').toLowerCase();
  if (status && status !== 'active') return true;

  const now = Date.now();

  // Expiry check (hard stop)
  if (info.expires_at) {
    const exp = Date.parse(info.expires_at);
    if (!Number.isNaN(exp) && exp < now) return true;
  }

  // Next billing date past due (soft stop with small grace)
  if (info.next_billing_date) {
    const next = Date.parse(info.next_billing_date);
    // Allow 24h grace to account for timezones/processing windows
    if (!Number.isNaN(next) && (next + 24 * 60 * 60 * 1000) < now) return true;
  }

  return false;
}

import { getSession, type Env } from './_utils/session';
import { getUserById, getSubscriptionForUser, upsertSubscriptionForUser } from './_utils/db';

export const onRequest: any = async ({ request, env }: { request: Request; env: Env }) => {
  if (request.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // If no session, send to the static homepage with login/signup
  const sess = await getSession(env, request);
  if (!sess) {
    return redirectToStaticIndex(request, env);
  }

  const user = await getUserById(env, sess.user_id);
  if (!user) {
    return redirectToStaticIndex(request, env);
  }

  // Check subscription status from D1 (server truth)
  let sub = await getSubscriptionForUser(env, user.id);
  if (sub?.status === 'active') {
    // Forward any query params (e.g., subscription_id, status) to the embedded tracker
    const urlA = new URL(request.url);
    const qsA = urlA.search || '';
    const iframeSrcA = `https://demo.imaginea.store/track${qsA}`;

    // Compute next billing / expiry info from Dodo API (pure read; does not trigger webhooks)
    let billingInfo: string | undefined = undefined;
    const detailId = sub?.dodo_subscription_id || urlA.searchParams.get('subscription_id') || undefined;
    if (detailId) {
      const info = await getDodoSubscriptionInfo(env, detailId);
      if (info) {
        // Enforce expiry/past-due on page visit even if webhook is delayed/missed.
        if (isInactiveFromInfo(info)) {
          const newStatus = (info.status && info.status !== 'active') ? info.status : 'expired';
          await upsertSubscriptionForUser(env, user.id, { status: newStatus, dodo_subscription_id: detailId });
          return redirectToStaticIndex(request, env);
        }
        billingInfo = buildBillingLabel(info);
      }
    }

    // IMPORTANT: Render the premium tracker embed AT ROOT URL (do not change URL to /track)
    return htmlEmbed(iframeSrcA, user, sub?.dodo_subscription_id || undefined, billingInfo);
  }

  // Fallback: If Dodo returned to root with subscription_id and status=active,
  // verify with Dodo API immediately and flip DB to active (handles webhook delay).
  try {
    const urlB = new URL(request.url);
    const subIdParam = urlB.searchParams.get('subscription_id');
    const statusParam = (urlB.searchParams.get('status') || '').toLowerCase();
    if (subIdParam && statusParam === 'active') {
      const verifyUrl = new URL(`/subscriptions/${encodeURIComponent(subIdParam)}`, env.DODO_API_BASE).toString();
      const res = await fetch(verifyUrl, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${env.DODO_API_KEY}` }
      });
      if (res.ok) {
        const js = await res.json();
        const s = String(js?.status || js?.subscription_status || '').toLowerCase();
        if (s === 'active') {
          await upsertSubscriptionForUser(env, user.id, { status: 'active', dodo_subscription_id: subIdParam });
          sub = await getSubscriptionForUser(env, user.id);
          if (sub?.status === 'active') {
            const qsB = urlB.search || '';
            const iframeSrcB = `https://demo.imaginea.store/track${qsB}`;

            let billingInfoB: string | undefined = undefined;
            const infoB = await getDodoSubscriptionInfo(env, subIdParam);
            if (infoB) {
              if (isInactiveFromInfo(infoB)) {
                const newStatusB = (infoB.status && infoB.status !== 'active') ? infoB.status : 'expired';
                await upsertSubscriptionForUser(env, user.id, { status: newStatusB, dodo_subscription_id: subIdParam });
                return redirectToStaticIndex(request, env);
              }
              billingInfoB = buildBillingLabel(infoB);
            }

            // Render at root without changing URL
            return htmlEmbed(iframeSrcB, user, sub?.dodo_subscription_id || undefined, billingInfoB);
          }
        }
      }
    }
  } catch (_) {
    // Ignore verification errors; root will serve static below.
  }

  // Not active -> show marketing/login/signup (static homepage)
  return redirectToStaticIndex(request, env);
};

function redirectToStaticIndex(request: Request, env: Env) {
  // Serve the static homepage asset directly ("/index.html") via Pages ASSETS binding.
  // Important: request.path must be changed to "/index.html" to avoid re-entering the root function ("/").
  try {
    const assets = (env as any).ASSETS;
    if (assets && typeof assets.fetch === 'function') {
      const origin = new URL(request.url);
      const assetUrl = new URL('/index.html', origin);
      // Clone the request but target /index.html to bypass functions/index.ts
      const assetReq = new Request(assetUrl.toString(), {
        method: request.method,
        headers: request.headers,
        body: request.method === 'GET' || request.method === 'HEAD' ? undefined : (request as any).body,
        redirect: 'follow',
      });
      return assets.fetch(assetReq);
    }
  } catch {
    // ignore and fall through to fallback
  }
  // Fallback minimal HTML (no redirect).
  return new Response('<!doctype html><html><head><meta charset="utf-8"><title>One Second Report</title></head><body><a href="/index.html">Open Homepage</a></body></html>', {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

function htmlEmbed(iframeSrc: string, user: { email: string }, subscriptionId?: string, billingInfo?: string) {
  const body = `
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Track</title>
<style>
  :root{color-scheme:light dark}
  html, body { margin:0; padding:0; height:100%; background:#f9fafb; }
  .wrap { position:fixed; inset:0; display:flex; flex-direction:column; }
  .bar { padding:10px 14px; font: 600 14px system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif; background:#fff; border-bottom:1px solid #e5e7eb; display:flex; align-items:center; gap:10px; }
  .brand { font-weight:800; }
  .muted { margin-left:auto; color:#6b7280; font-weight:500; }
  .frame { border:0; width:100%; height:100%; background:#fff; }
  .badge{display:inline-block;border:1px solid #10b981;color:#065f46;padding:2px 8px;border-radius:999px;font-weight:700;font-size:12px;background:#ecfdf5}
</style>
</head>
<body>
  <div class="wrap">
    <div class="bar">
      <span class="brand">Imaginea</span>
      <span class="badge">Active</span>
      <span class="muted">${escapeHtml(user.email)}${subscriptionId ? ' • ' + escapeHtml(subscriptionId) : ''}${billingInfo ? ' • ' + escapeHtml(billingInfo) : ''}</span>
    </div>
    <iframe class="frame" src="${escapeAttr(iframeSrc)}"
      allow="clipboard-write; clipboard-read; fullscreen; autoplay; encrypted-media; picture-in-picture"
      referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
</body>
</html>`;
  return new Response(body, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

function escapeHtml(s: string) {
  const map: Record<string, string> = {
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '&#39;'
  };
  return s.replace(/[&<>"']/g, (ch) => map[ch] || ch);
}
function escapeAttr(s: string) {
  return escapeHtml(s);
}

// Helpers to fetch subscription info from Dodo and render a billing label
type DodoSubscriptionInfo = {
  status?: string;
  next_billing_date?: string | null;
  expires_at?: string | null;
};

async function getDodoSubscriptionInfo(env: any, subscriptionId: string): Promise<DodoSubscriptionInfo | null> {
  try {
    const url = new URL(`/subscriptions/${encodeURIComponent(subscriptionId)}`, env.DODO_API_BASE).toString();
    const res = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${env.DODO_API_KEY}` }
    });
    if (!res.ok) return null;
    const js = await res.json();
    return {
      status: String(js?.status || js?.subscription_status || '').toLowerCase(),
      next_billing_date: js?.next_billing_date || js?.nextBillingDate || null,
      expires_at: js?.expires_at || js?.expiresAt || null
    };
  } catch {
    return null;
  }
}

function buildBillingLabel(info: DodoSubscriptionInfo): string {
  const next = info.next_billing_date || null;
  const exp = info.expires_at || null;
  const targetStr = next || exp;
  if (!targetStr) return '';
  const t = Date.parse(targetStr);
  if (Number.isNaN(t)) return '';
  const now = Date.now();
  const diffMs = t - now;
  const days = Math.max(0, Math.ceil(diffMs / 86400000));
  const iso = new Date(t).toISOString().replace('.000Z', 'Z');
  if (next) {
    return `Renews in ${days} day${days === 1 ? '' : 's'} (Next billing: ${iso})`;
  }
  return `Expires in ${days} day${days === 1 ? '' : 's'} (Expiry: ${iso})`;
}