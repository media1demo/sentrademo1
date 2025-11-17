/**
 * Alias endpoint for Dodo webhooks.
 * Some configurations may point to /api/webhook instead of /api/webhooks/dodo.
 * This file re-exports the same handler so both URLs work.
 */
export { onRequest } from './webhooks/dodo';