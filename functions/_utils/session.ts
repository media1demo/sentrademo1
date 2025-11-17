/// <reference path="../_types/workers.d.ts" />
/**
 * Session utilities using Cloudflare KV
 * - HTTP-only cookie for session id
 * - KV value stores user_id and expiry
 */

export interface Env {
  DB: D1Database;
  SESSIONS_KV: KVNamespace;

  DODO_API_BASE: string;
  DODO_API_KEY: string;
  DODO_WEBHOOK_SECRET: string;
  PRODUCT_ID: string;
  RETURN_URL: string;

  SESSION_COOKIE_NAME: string;
  SESSION_TTL_SECONDS: string;

  COOKIE_DOMAIN?: string;
  COOKIE_SECURE?: string; // "true" | "false"
  COOKIE_SAMESITE?: string; // "Lax" | "Strict" | "None"
}

type SessionKV = {
  user_id: string;
  exp: number; // epoch seconds
};

function parseCookies(cookieHeader: string | null): Record<string, string> {
  const out: Record<string, string> = {};
  if (!cookieHeader) return out;
  const parts = cookieHeader.split(';');
  for (const part of parts) {
    const [k, ...v] = part.trim().split('=');
    if (!k) continue;
    out[k] = decodeURIComponent(v.join('=') || '');
  }
  return out;
}

function buildCookie(name: string, value: string, opts: {
  domain?: string;
  maxAge?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'Lax' | 'Strict' | 'None';
  path?: string;
} = {}): string {
  const parts: string[] = [`${name}=${encodeURIComponent(value)}`];
  if (opts.domain) parts.push(`Domain=${opts.domain}`);
  parts.push(`Path=${opts.path || '/'}`);
  if (typeof opts.maxAge === 'number') parts.push(`Max-Age=${opts.maxAge}`);
  if (opts.httpOnly !== false) parts.push('HttpOnly');
  if (opts.secure) parts.push('Secure');
  parts.push(`SameSite=${opts.sameSite || 'Lax'}`);
  return parts.join('; ');
}

export async function getSession(env: Env, req: Request) {
  const name = env.SESSION_COOKIE_NAME || 'imaginea_session';
  const cookies = parseCookies(req.headers.get('Cookie'));
  const sid = cookies[name];
  if (!sid) return null;
  const val = await env.SESSIONS_KV.get(sid, { type: 'json' }) as SessionKV | null;
  if (!val) return null;
  if (val.exp < Math.floor(Date.now() / 1000)) {
    // expired - cleanup
    await env.SESSIONS_KV.delete(sid);
    return null;
  }
  return { id: sid, user_id: val.user_id, exp: val.exp };
}

export async function createSession(env: Env, user_id: string, req?: Request) {
  const ttl = Number(env.SESSION_TTL_SECONDS || '2592000');
  const exp = Math.floor(Date.now() / 1000) + ttl;
  const id = `s_${crypto.randomUUID()}`;
  const value: SessionKV = { user_id, exp };
  await env.SESSIONS_KV.put(id, JSON.stringify(value), { expirationTtl: ttl });

  // Compute cookie domain dynamically: only set Domain when host ends with configured domain.
  let domain: string | undefined = undefined;
  if (env.COOKIE_DOMAIN) {
    if (req) {
      try {
        const host = new URL(req.url).hostname;
        if (host.endsWith(env.COOKIE_DOMAIN)) {
          domain = env.COOKIE_DOMAIN;
        }
      } catch {
        // ignore parsing issues; default to no domain attribute
      }
    } else {
      // No request context provided; fallback to configured domain
      domain = env.COOKIE_DOMAIN;
    }
  }

  // Compute secure flag from request scheme when available to support local http dev.
  let secure = (env.COOKIE_SECURE || 'true').toLowerCase() === 'true';
  if (req) {
    try {
      secure = new URL(req.url).protocol === 'https:';
    } catch {
      // ignore
    }
  }

  const cookie = buildCookie(env.SESSION_COOKIE_NAME || 'imaginea_session', id, {
    domain,
    maxAge: ttl,
    httpOnly: true,
    secure,
    sameSite: (env.COOKIE_SAMESITE as 'Lax' | 'Strict' | 'None') || 'Lax',
    path: '/',
  });

  return { id, exp, cookie };
}

export async function destroySession(env: Env, req: Request) {
  const name = env.SESSION_COOKIE_NAME || 'imaginea_session';
  const cookies = parseCookies(req.headers.get('Cookie'));
  const sid = cookies[name];
  if (sid) {
    await env.SESSIONS_KV.delete(sid);
  }

  // Compute domain attribute conditionally based on current host
  let domainAttr = '';
  let secureAttr = '';
  try {
    const url = new URL(req.url);
    const host = url.hostname;
    if (env.COOKIE_DOMAIN && host.endsWith(env.COOKIE_DOMAIN)) {
      domainAttr = `; Domain=${env.COOKIE_DOMAIN}`;
    }
    const isHttps = url.protocol === 'https:';
    const secure = isHttps || (env.COOKIE_SECURE || 'true').toLowerCase() === 'true';
    if (secure) {
      secureAttr = 'Secure; ';
    }
  } catch {
    if ((env.COOKIE_SECURE || 'true').toLowerCase() === 'true') {
      secureAttr = 'Secure; ';
    }
  }

  const expiredCookie = `${name}=; Path=/; Max-Age=0; HttpOnly; ${secureAttr}SameSite=${env.COOKIE_SAMESITE || 'Lax'}${domainAttr}`;
  return expiredCookie;
}