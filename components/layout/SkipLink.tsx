'use client';

/**
 * Skip link for keyboard navigation accessibility
 * Allows users to skip directly to main content
 */
export function SkipLink() {
    return (
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[hsl(var(--color-primary))] focus:text-[hsl(var(--color-primary-foreground))] focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-ring))] focus:ring-offset-2"
        >
            Skip to main content
        </a>
    );
}
