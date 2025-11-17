import type { Env } from './session';

export type UserRecord = {
  id: string;
  email: string;
  phone: string | null;
  password_hash: string;
  salt: string;
  name: string | null;
  dodo_customer_id?: string | null;
  created_at: string;
  updated_at: string;
};

export type SubscriptionRecord = {
  id: string;
  user_id: string;
  dodo_subscription_id: string | null;
  status: string; // pending | active | on_hold | cancelled | failed | expired
  latest_payment_id: string | null;
  created_at: string;
  updated_at: string;
};

// Helper to safely fetch first row using D1 .all() for maximum compatibility
async function firstRow<T>(stmt: D1PreparedStatement): Promise<T | null> {
  const res = await stmt.all<T>();
  const rows = (res as any)?.results || [];
  if (Array.isArray(rows) && rows.length > 0) return rows[0] as T;
  return null;
}

export async function createUser(env: Env, input: {
  email: string;
  phone?: string | null;
  name?: string | null;
  password_hash: string;
  salt: string;
}): Promise<UserRecord> {
  const id = `u_${crypto.randomUUID()}`;
  const stmt = env.DB.prepare(
    `INSERT INTO users (id, email, phone, password_hash, salt, name)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(id, input.email.toLowerCase(), input.phone || null, input.password_hash, input.salt, input.name || null);

  const res = await stmt.run();
  if (!res.success) {
    throw new Error('Failed to create user');
  }
  const user = await getUserById(env, id);
  if (!user) throw new Error('User not found after insert');
  return user;
}

export async function getUserById(env: Env, id: string): Promise<UserRecord | null> {
  const stmt = env.DB.prepare(
    `SELECT id, email, phone, password_hash, salt, name, created_at, updated_at
     FROM users WHERE id = ?`
  ).bind(id);
  return await firstRow<UserRecord>(stmt);
}

export async function getUserByEmailOrPhone(env: Env, identifier: string): Promise<UserRecord | null> {
  const ident = identifier.trim().toLowerCase();
  // Try email match first, else phone exact
  const stmt = env.DB.prepare(
    `SELECT id, email, phone, password_hash, salt, name, created_at, updated_at
     FROM users
     WHERE lower(email) = ? OR phone = ?`
  ).bind(ident, identifier.trim());
  const row = await firstRow<UserRecord>(stmt);
  return row || null;
}

export async function upsertSubscriptionForUser(env: Env, user_id: string, fields: {
  status: string;
  dodo_subscription_id?: string | null;
  latest_payment_id?: string | null;
}): Promise<SubscriptionRecord> {
  const existing = await firstRow<SubscriptionRecord>(
    env.DB.prepare(
      `SELECT id, user_id, dodo_subscription_id, status, latest_payment_id, created_at, updated_at
       FROM subscriptions WHERE user_id = ?`
    ).bind(user_id)
  );

  if (!existing) {
    const id = `s_${crypto.randomUUID()}`;
    const res = await env.DB.prepare(
      `INSERT INTO subscriptions (id, user_id, dodo_subscription_id, status, latest_payment_id)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(id, user_id, fields.dodo_subscription_id || null, fields.status, fields.latest_payment_id || null).run();
    if (!res.success) throw new Error('Failed to insert subscription');
    const created = await firstRow<SubscriptionRecord>(
      env.DB.prepare(
        `SELECT id, user_id, dodo_subscription_id, status, latest_payment_id, created_at, updated_at
         FROM subscriptions WHERE id = ?`
      ).bind(id)
    );
    if (!created) throw new Error('Failed to read inserted subscription');
    return created;
  } else {
    const res = await env.DB.prepare(
      `UPDATE subscriptions
         SET status = ?, 
             dodo_subscription_id = COALESCE(?, dodo_subscription_id),
             latest_payment_id = COALESCE(?, latest_payment_id),
             updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now')
       WHERE id = ?`
    ).bind(fields.status, fields.dodo_subscription_id || null, fields.latest_payment_id || null, existing.id).run();
    if (!res.success) throw new Error('Failed to update subscription');
    const updated = await firstRow<SubscriptionRecord>(
      env.DB.prepare(
        `SELECT id, user_id, dodo_subscription_id, status, latest_payment_id, created_at, updated_at
         FROM subscriptions WHERE id = ?`
      ).bind(existing.id)
    );
    if (!updated) throw new Error('Failed to read updated subscription');
    return updated;
  }
}

export async function getSubscriptionForUser(env: Env, user_id: string): Promise<SubscriptionRecord | null> {
  const stmt = env.DB.prepare(
    `SELECT id, user_id, dodo_subscription_id, status, latest_payment_id, created_at, updated_at
     FROM subscriptions WHERE user_id = ?`
  ).bind(user_id);
  return await firstRow<SubscriptionRecord>(stmt);
}