// Minimal type stub for 'standardwebhooks' to satisfy TypeScript in Workers.
// The runtime library will be provided by the dependency in package.json.
declare module 'standardwebhooks' {
  export class Webhook {
    constructor(secret: string);
    verify(rawBody: string, headers: Record<string, string>): Promise<any>;
  }
}