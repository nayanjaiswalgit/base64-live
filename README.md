# Base64 Encoder & Decoder

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-green)](https://www.w3.org/WAI/WCAG21/quickref/)

A fast, secure Base64 encoder and decoder that runs entirely in your browser. Your data never touches our servers.

## Features

- **Instant conversion** between plain text and Base64
- **Privacy first** - everything happens client-side in your browser
- **File support** - upload text files up to 1MB
- **Conversion history** - keep track of your recent conversions
- **Dark mode** - easy on the eyes
- **Works offline** - install as a PWA for offline access
- **Fully accessible** - keyboard navigation and screen reader support (WCAG 2.1 AA compliant)

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test
```

Visit `http://localhost:3000` to use the app.

## Environment Configuration

Before deploying to production, configure your environment variables:

1. Copy the example environment file:
```bash
cp .env.example .env.local
# OR use the blank template
cp .env.template .env.local
```

2. Update `.env.local` with your production domain:
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```



**Environment Variables:**
- `NEXT_PUBLIC_SITE_URL` - Your production domain (used for SEO metadata, Open Graph tags, and canonical URLs)
- `NEXT_PUBLIC_SITE_NAME` - Site name (e.g., "Base64 Tool")
- `NEXT_PUBLIC_SITE_TITLE` - Full site title (e.g., "Base64 Encoder & Decoder")
- `NEXT_PUBLIC_SITE_DESCRIPTION` - Site description for SEO
- `NEXT_PUBLIC_MAX_FILE_SIZE_BYTES` - Maximum file upload size in bytes (default: 1MB)
- `NEXT_PUBLIC_MAX_INPUT_SIZE_BYTES` - Maximum text input size (default: 100MB)
- `NEXT_PUBLIC_MAX_HISTORY_ENTRIES` - Number of history items to store (default: 100)
- `NEXT_PUBLIC_INSTALL_PROMPT_DELAY_MS` - PWA install prompt delay (default: 5000ms)
- `NEXT_PUBLIC_ONLINE_INDICATOR_DELAY_MS` - "Back online" indicator duration (default: 3000ms)
- `NEXT_PUBLIC_COPY_SUCCESS_DURATION_MS` - Copy success message duration (default: 2000ms)
- `NEXT_PUBLIC_THEME_COLOR` - PWA theme color (default: #7c3aed)
- `NEXT_PUBLIC_BACKGROUND_COLOR` - PWA background color (default: #f5f5f7)

See `.env.example` for default values or `.env.template` for a blank template.


## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - type safety
- **Tailwind CSS 4** - styling
- **Radix UI** - accessible component primitives
- **Zustand** - state management
- **Vitest** - testing

## What is Base64?

Base64 encoding converts binary data into text format using 64 printable characters. It's commonly used for:

- Embedding images in HTML/CSS
- Email attachments (MIME encoding)
- Storing complex data in JSON
- URL-safe data transmission
- API authentication tokens

## Privacy & Security

Your privacy matters:

- Everything runs in JavaScript in your browser
- No data is sent to any server
- No analytics or tracking
- Open source - you can verify the code yourself

## Accessibility

This app works for everyone:

- Full keyboard navigation
- Screen reader compatible (tested with NVDA, JAWS, and VoiceOver)
- Skip navigation link
- Enhanced focus indicators
- Reduced motion support
- High contrast mode support
- Touch targets optimized for mobile (44x44px minimum)


## PWA Features

Install this as a Progressive Web App to get:
- Offline access - works without internet
- Native app feel
- Home screen icon on mobile
- Faster load times

## License

MIT License - use it however you'd like, personal or commercial.

---

**Keywords**: base64 encoder, base64 decoder, base64 converter, encode base64, decode base64, online base64 tool, text to base64, base64 to text
