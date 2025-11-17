/**
 * Alias endpoint for Dodo webhooks.
 * This makes POST https://free.imaginea.store/api/webhooks route to the same handler as /api/webhooks/dodo
 * so either path works with your Dodo configuration.
 */
export { onRequest } from './dodo';