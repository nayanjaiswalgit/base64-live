'use client';

import Link from 'next/link';
import { Binary } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="shrink-0 border-b border-[hsl(var(--color-border)/0.5)] bg-[hsl(var(--color-card)/0.8)] backdrop-blur-md" role="banner">
      <nav className="container mx-auto px-4 h-14 flex items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Base64 Tool - Home">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[hsl(var(--gradient-start))] via-[hsl(var(--gradient-mid))] to-[hsl(var(--gradient-end))] flex items-center justify-center text-white shadow-md">
            <Binary className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold leading-tight">Base64 Tool</span>
            <span className="text-[10px] text-[hsl(var(--color-muted-foreground))] leading-tight">Encode & Decode</span>
          </div>
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
