Delivered a Cloudflare Pages + Functions app for free.imaginea.store with:
- Email/mobile + password auth
- 7-day free trial via Dodo Payments hosted checkout
- Webhook signature verification
- Gated route /track that unlocks across all browsers once the subscription (or trial) is active

Code created (upload this whole folder to Cloudflare Pages):
- App config:
  - [package.json](package.json)
  - [wrangler.toml](wrangler.toml)
  - [migrations/0001_init.sql](migrations/0001_init.sql)
- Pages static:
  - [public/index.html](public/index.html)
  - [public/login.html](public/login.html)
  - [public/signup.html](public/signup.html)
- Pages Functions (serverless):
  - [functions/api/signup.ts](functions/api/signup.ts)
  - [functions/api/login.ts](functions/api/login.ts)
  - [functions/api/logout.ts](functions/api/logout.ts)
  - [functions/api/me.ts](functions/api/me.ts)
  - [functions/api/checkout-session.ts](functions/api/checkout-session.ts)
  - [functions/api/webhooks/dodo.ts](functions/api/webhooks/dodo.ts)
  - [functions/track.ts](functions/track.ts)
  - Utilities and types:
    - [functions/_utils/crypto.ts](functions/_utils/crypto.ts)
    - [functions/_utils/session.ts](functions/_utils/session.ts)
    - [functions/_utils/db.ts](functions/_utils/db.ts)
    - [functions/_types/workers.d.ts](functions/_types/workers.d.ts)
    - [functions/_types/standardwebhooks.d.ts](functions/_types/standardwebhooks.d.ts)

What it does
- Signup/login with email or mobile number + password (PBKDF2-SHA256 hashing) and session cookie in KV.
- Start 7-day free trial via Dodo hosted Checkout and redirect back to https://free.imaginea.store/track.
- Webhook verifies signature and flips subscription status active on subscription.active / renewed events (and records payment.succeeded).
- /track renders “Active” or shows a “Start 7-day Free Trial ($19/mo after)” button, with Refresh for race-free webhook timing. Works across browsers and devices once you log in.

Dodo Payments integration (sandbox)
- Used Context7 MCP (docs) to ensure correct endpoints/fields:
  - Checkout session + trial example: https://docs.dodopayments.com/developer-resources/checkout-session
  - Webhook headers and verification: https://docs.dodopayments.com/developer-resources/webhooks
  - Metadata example patterns: https://docs.dodopayments.com/api-reference/metadata
- Used DodoPayments MCP (sandbox) to provision:
  - Product (USD $19.00/month, 7-day trial): product_id pdt_gS57Jvs08rJiXFi7gdP46 (already set in [wrangler.toml](wrangler.toml))
  - Webhook endpoint (test) for https://free.imaginea.store/api/webhooks/dodo:
    - id: ep_35NVNgDdWL52DucyQJifUz1lEF8
    - secret (use as DODO_WEBHOOK_SECRET): whsec_hn5ePoigj9xDVFeKIMLm3mBGutdOuKzj

Security
- Webhook signature verification implemented with standardwebhooks (incoming headers: webhook-id, webhook-signature, webhook-timestamp).
- API keys and webhook secret are environment secrets (not hardcoded).
- Passwords hashed with PBKDF2 + random salt (no plain text).
- Secure, HttpOnly, SameSite cookies.

Local run (sandbox)
1) Install deps:
   - npm install
2) Create local D1 and KV (optional for local if you want persistence):
   - npx wrangler d1 create imaginea_db
   - Copy database_id into [wrangler.toml](wrangler.toml) (DB.d1 binding)
   - npx wrangler d1 migrations apply imaginea_db
   - npx wrangler kv namespace create SESSIONS_KV and copy id into [wrangler.toml](wrangler.toml)
3) Secrets (for local dev with wrangler pages dev):
   - npx wrangler secret put DODO_API_KEY
   - npx wrangler secret put DODO_WEBHOOK_SECRET
4) Dev:
   - npm run dev:functions
   - Open http://127.0.0.1:8788 (Pages dev) then navigate to /signup.html, /login.html, /track
   - Start trial by clicking the button on /track (it POSTs /api/checkout-session and redirects to Dodo hosted checkout)

Cloudflare Pages deployment
- Create a Pages project, connect this folder as the repo or upload build output.
- Project settings:
  - Build command: None
  - Build output directory: public
  - Functions directory is detected automatically as functions/
- Environment bindings (in Pages project → Settings → Functions):
  - D1 Database binding: Name DB → attach your imaginea_db
  - KV binding: Name SESSIONS_KV → attach your KV namespace
- Environment variables (Production):
  - DODO_API_BASE = https://test.dodopayments.com
  - PRODUCT_ID = pdt_gS57Jvs08rJiXFi7gdP46
  - RETURN_URL = https://free.imaginea.store/track
  - SESSION_COOKIE_NAME = imaginea_session
  - SESSION_TTL_SECONDS = 2592000
  - COOKIE_DOMAIN = free.imaginea.store
  - COOKIE_SECURE = true
  - COOKIE_SAMESITE = Lax
- Secrets (set under “Environment variables → Encrypt”):
  - DODO_API_KEY = your Dodo test API key
  - DODO_WEBHOOK_SECRET = whsec_hn5ePoigj9xDVFeKIMLm3mBGutdOuKzj
- Run remote migration once DB is attached:
  - npx wrangler d1 migrations apply imaginea_db

User flow to test
- Go to https://free.imaginea.store/signup.html → create account.
- Login at https://free.imaginea.store/login.html → you’re redirected to /track.
- Click “Start 7-day Free Trial ($19/mo after)” → complete hosted checkout.
- You’re redirected back to /track. If webhook hasn’t arrived yet, click Refresh Status. The webhook will set your subscription active in D1; /track will then show access granted.
- Login on another browser/device → /track will show active after sign-in (not tied to a single browser session).

Key implementation notes
- Checkout session created at POST /checkouts with:
  - product_cart: [{ product_id: PRODUCT_ID, quantity: 1 }]
  - subscription_data: { trial_period_days: 7 }
  - customer: { email, name, phone_number }
  - allowed_payment_method_types: ['credit','debit'] (recommended fallbacks)
  - return_url: https://free.imaginea.store/track
  - metadata: { app_user_id: 'u_...' } to link webhook events back to user
- Amounts are smallest unit (cents). 1900 = $19.00.
- Base URLs:
  - Sandbox: https://test.dodopayments.com (already configured)
  - Live: https://live.dodopayments.com (switch for production)
- Webhook events handled:
  - subscription.active, subscription.renewed → set active (and record ids)
  - payment.succeeded → record latest payment_id, keep active
  - subscription.on_hold, .cancelled, .failed, .expired → set corresponding status
- Cross-browser access: state of access is in D1; logging in on any browser reads subscription status. Sessions are cookie-based per browser for auth only.

How to go live
- Create a live product in Dodo (or keep the same plan in live).
- Update:
  - DODO_API_BASE → https://live.dodopayments.com
  - PRODUCT_ID → live product id
  - Create a new live webhook endpoint pointing to https://free.imaginea.store/api/webhooks/dodo, retrieve its live secret, set DODO_WEBHOOK_SECRET.
  - Replace DODO_API_KEY with live key.
- Re-deploy. Run D1 migrations once on production if not already applied.

MCP usage disclosure
- Context7 MCP: used to fetch the latest documentation and examples for Checkout Sessions with trials, webhook verification, and return_url behavior (see links above).
- DodoPayments MCP: used to create the sandbox product (USD $19/mo, 7-day trial) and webhook; to retrieve and provide the webhook secret for signature verification.

This project meets your requirements:
- Single domain: free.imaginea.store
- 7-day free trial + recurring billing at USD $19/month
- Login via email or mobile + password
- Payment success allows access on /track and works across all browsers/devices after sign-in
- Cloudflare-ready code, with D1 + KV, environment variables, webhook signature verification, and sandbox-to-live rollout steps documented.