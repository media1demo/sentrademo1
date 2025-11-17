// Minimal Cloudflare Workers type stubs to satisfy TypeScript in this repo.
// Cloudflare provides real types at runtime; for full typings, add @cloudflare/workers-types.

export {};

declare global {
  interface D1PreparedStatement {
    bind(...values: any[]): D1PreparedStatement;
    first<T = any>(): Promise<T | null>;
    all<T = any>(): Promise<{ results: T[] }>;
    run(): Promise<{ success: boolean; meta?: any }>;
  }

  interface D1Database {
    prepare(query: string): D1PreparedStatement;
    dump?(): Promise<ArrayBuffer>;
    batch?(statements: D1PreparedStatement[]): Promise<any[]>;
  }

  interface KVNamespace {
    get(key: string, options?: { type: "text" | "json" | "arrayBuffer" }): Promise<any>;
    put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
    delete(key: string): Promise<void>;
  }
}