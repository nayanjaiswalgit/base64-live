import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--color-border)/0.5)] py-3 shrink-0" role="contentinfo">
      <div className="container mx-auto px-4 flex items-center justify-center gap-4 text-[11px] text-[hsl(var(--color-muted-foreground))] font-medium">
        <span className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />100% Client-side
        </span>
        <span className="opacity-40">•</span>
        <span className="flex items-center gap-1.5">
          Created by Nayan with <span className="text-red-500">❤</span>
        </span>
        <span className="opacity-40">•</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
