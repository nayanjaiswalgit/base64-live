import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_TITLE} - Free Online Tool | Instant Convert Text`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "base64 converter",
    "encode base64",
    "decode base64",
    "base64 online",
    "free base64 tool",
    "text to base64",
    "base64 to text",
    "base64 encode online",
    "base64 decode online",
    "binary to text",
    "utf8 to base64",
    "base64 string converter",
    "online encoder decoder",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_TITLE,
    title: `${SITE_TITLE} - Free Online Tool`,
    description:
      "Instantly encode and decode Base64 strings online. Free, fast, and secure - all processing happens in your browser.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Base64 Encoder Decoder Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_TITLE} - Free Online Tool`,
    description:
      "Instantly encode and decode Base64 strings. 100% free and secure.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "Technology",
  classification: "Developer Tools",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

// Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_TITLE,
  description:
    "Free online tool to encode and decode Base64 strings instantly. Secure client-side processing.",
  url: SITE_URL,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Base64 encoding",
    "Base64 decoding",
    "Live sync conversion",
    "File upload support",
    "History tracking",
    "Copy to clipboard",
    "Dark mode support",
  ],
  browserRequirements: "Requires JavaScript",
  softwareVersion: "1.0.0",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Base64 encoding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Base64 is a binary-to-text encoding scheme that converts binary data into an ASCII string format. It's commonly used to encode data that needs to be stored or transferred via text-based protocols.",
      },
    },
    {
      "@type": "Question",
      name: "Is this Base64 tool secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all encoding and decoding happens entirely in your browser. No data is ever sent to any server, ensuring complete privacy and security.",
      },
    },
    {
      "@type": "Question",
      name: "Can I encode files to Base64?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can upload text files up to 1MB and encode them to Base64 instantly. The conversion happens in real-time in your browser.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
