import { getUserByEmailOrPhone, getSubscriptionForUser } from "../_utils/db";
import type { Env } from "../_utils/session";
import { ensureSchema } from "../_utils/schema";

export const onRequest: any = async ({ request, env }: { request: Request; env: Env }) => {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const email = (body.email || "").trim().toLowerCase();
  if (!email) {
    return new Response(JSON.stringify({ error: "email is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Ensure schema exists before any DB query (safe no-op if already applied)
    await ensureSchema(env);

    const user = await getUserByEmailOrPhone(env, email);
    if (!user) {
      // No user yet => unpaid
      return new Response(JSON.stringify({ status: "unpaid" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const sub = await getSubscriptionForUser(env, user.id);
    const isActive = sub?.status === "active";
    return new Response(JSON.stringify({ status: isActive ? "paid" : "unpaid" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("[verify-payment] DB error", e);
    return new Response(JSON.stringify({ error: "internal_error", detail: e?.message || String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};