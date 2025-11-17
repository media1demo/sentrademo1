import type { Env } from './session';

/**
 * Best-effort schema bootstrap to avoid runtime 500s if migrations
 * weren't applied on the bound D1 database. Uses IF NOT EXISTS.
 * Safe to call on every request; no-op when schema already exists.
 */
export async function ensureSchema(env: Env) {
  if (!env.DB) {
    throw new Error('db_not_bound');
  }

  // users
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      phone TEXT UNIQUE,
      password_hash TEXT NOT NULL,
      salt TEXT NOT NULL,
      name TEXT,
      dodo_customer_id TEXT,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
      updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
    )`
  ).run();

  // subscriptions
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS subscriptions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      dodo_subscription_id TEXT UNIQUE,
      status TEXT NOT NULL,
      latest_payment_id TEXT,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
      updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    )`
  ).run();

  await env.DB.prepare(
    `CREATE INDEX IF NOT EXISTS subscriptions_user_idx ON subscriptions(user_id)`
  ).run();

  // webhook_events (debug/observability of incoming webhooks)
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS webhook_events (
       id TEXT PRIMARY KEY,
       event_id TEXT,
       type TEXT,
       payload_type TEXT,
       customer_email TEXT,
       subscription_id TEXT,
       payment_id TEXT,
       created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
     )`
  ).run();

  await env.DB.prepare(
    `CREATE INDEX IF NOT EXISTS webhook_events_created_idx ON webhook_events(created_at DESC)`
  ).run();
}