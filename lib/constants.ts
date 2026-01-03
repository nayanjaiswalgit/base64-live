/**
 * Application-wide constants
 * Values can be overridden via environment variables
 */

// File size limits
export const MAX_FILE_SIZE_BYTES = parseInt(
    process.env.NEXT_PUBLIC_MAX_FILE_SIZE_BYTES || '1048576',
    10
); // Default: 1MB
export const MAX_FILE_SIZE_MB = MAX_FILE_SIZE_BYTES / (1024 * 1024);

// Input size limits for text processing
export const MAX_INPUT_SIZE_BYTES = parseInt(
    process.env.NEXT_PUBLIC_MAX_INPUT_SIZE_BYTES || '104857600',
    10
); // Default: 100MB
export const MAX_INPUT_SIZE_MB = MAX_INPUT_SIZE_BYTES / (1024 * 1024);

// History configuration
export const MAX_HISTORY_ENTRIES = parseInt(
    process.env.NEXT_PUBLIC_MAX_HISTORY_ENTRIES || '100',
    10
);

// UI timing
export const INSTALL_PROMPT_DELAY_MS = parseInt(
    process.env.NEXT_PUBLIC_INSTALL_PROMPT_DELAY_MS || '5000',
    10
);
export const ONLINE_INDICATOR_DISMISS_DELAY_MS = parseInt(
    process.env.NEXT_PUBLIC_ONLINE_INDICATOR_DELAY_MS || '3000',
    10
);
export const COPY_SUCCESS_MESSAGE_DURATION_MS = parseInt(
    process.env.NEXT_PUBLIC_COPY_SUCCESS_DURATION_MS || '2000',
    10
);

// Site configuration
export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://base64tool.com';
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Base64 Tool';
export const SITE_TITLE =
    process.env.NEXT_PUBLIC_SITE_TITLE || 'Base64 Encoder & Decoder';
export const SITE_DESCRIPTION =
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Free online Base64 encoder and decoder with live sync. Instantly convert text to Base64 and vice versa. No data sent to servers - 100% client-side processing.';

// PWA Theme
export const THEME_COLOR = process.env.NEXT_PUBLIC_THEME_COLOR || '#7c3aed';
export const BACKGROUND_COLOR =
    process.env.NEXT_PUBLIC_BACKGROUND_COLOR || '#f5f5f7';
