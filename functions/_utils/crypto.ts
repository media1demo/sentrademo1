/**
 * PBKDF2 password hashing helpers for Cloudflare Workers/Pages Functions.
 * Uses SHA-256 with 100,000 iterations and a 16-byte random salt.
 */

const ITERATIONS = 100_000;
const KEY_LENGTH_BITS = 256;

function toHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) throw new Error('Invalid hex string');
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

// Create ArrayBuffer from hex string directly
function hexToArrayBuffer(hex: string): ArrayBuffer {
  const bytes = hexToBytes(hex);
  // Create a new ArrayBuffer to ensure it's not a SharedArrayBuffer
  const buffer = new ArrayBuffer(bytes.length);
  const view = new Uint8Array(buffer);
  view.set(bytes);
  return buffer;
}

export function generateSalt(bytes = 16): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  // Ensure we're working with a regular ArrayBuffer
  const buffer = new ArrayBuffer(arr.length);
  const view = new Uint8Array(buffer);
  view.set(arr);
  return toHex(buffer);
}

export async function hashPassword(password: string, saltHex: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: hexToArrayBuffer(saltHex), // Use the helper function
      iterations: ITERATIONS
    },
    key,
    KEY_LENGTH_BITS
  );
  return toHex(derivedBits);
}

export async function verifyPassword(password: string, saltHex: string, expectedHashHex: string): Promise<boolean> {
  const computed = await hashPassword(password, saltHex);
  // Constant-time compare
  if (computed.length !== expectedHashHex.length) return false;
  let out = 0;
  for (let i = 0; i < computed.length; i++) {
    out |= computed.charCodeAt(i) ^ expectedHashHex.charCodeAt(i);
  }
  return out === 0;
}