import { MAX_INPUT_SIZE_BYTES, MAX_INPUT_SIZE_MB } from './constants';

/**
 * Encode text to base64 with proper Unicode support
 */
export function encodeToBase64(text: string): string {
  if (!text) return '';

  // Add size check to prevent memory issues
  if (text.length > MAX_INPUT_SIZE_BYTES) {
    throw new Error(`Input too large. Maximum ${MAX_INPUT_SIZE_MB}MB allowed`);
  }

  try {
    // Handle Unicode properly using TextEncoder
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    // Convert to binary string - more efficient approach
    const binary = Array.from(data, byte => String.fromCharCode(byte)).join('');
    return btoa(binary);
  } catch (_error) {
    const message = _error instanceof Error ? _error.message : 'Unknown error';
    throw new Error(`Failed to encode: ${message}`);
  }
}

/**
 * Decode base64 to text with proper Unicode support
 */
export function decodeFromBase64(base64: string): string {
  if (!base64) return '';

  try {
    // Remove whitespace and validate
    const cleaned = base64.replace(/\s/g, '');

    // Add size check
    if (cleaned.length > MAX_INPUT_SIZE_BYTES) {
      throw new Error(`Input too large. Maximum ${MAX_INPUT_SIZE_MB}MB allowed`);
    }

    if (!isValidBase64(cleaned)) {
      throw new Error('Invalid base64 string');
    }

    const binary = atob(cleaned);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
  } catch (_error) {
    if (_error instanceof Error && _error.message === 'Invalid base64 string') throw _error;
    const message = _error instanceof Error ? _error.message : 'Unknown error';
    throw new Error(`Failed to decode: ${message}`);
  }
}

/**
 * Validate if a string is valid base64
 */
export function isValidBase64(str: string): boolean {
  if (!str || typeof str !== 'string') return false;

  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;

  if (!base64Regex.test(str)) return false;
  if (str.length % 4 !== 0) return false;

  try {
    atob(str);
    return true;
  } catch {
    return false;
  }
}
