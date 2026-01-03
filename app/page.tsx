'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { LiveConverter } from '@/components/encoder/LiveConverter';
import { HistoryPanel } from '@/components/history/HistoryPanel';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { InstallPrompt } from '@/components/layout/InstallPrompt';
import { OfflineIndicator } from '@/components/layout/OfflineIndicator';
import { SkipLink } from '@/components/layout/SkipLink';
import { Button } from '@/components/ui/button';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { History, Shield, Zap, Lock, Eye } from 'lucide-react';

const features = [
  { icon: Zap, label: 'Instant Sync' },
  { icon: Lock, label: 'Private' },
  { icon: Eye, label: 'Live Preview' },
  { icon: Shield, label: 'Secure' },
];

export default function Home() {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <ErrorBoundary>
      <div className="h-screen flex flex-col overflow-hidden">
        <SkipLink />
        <div className="gradient-bg" aria-hidden="true" />
        <Header />
        <OfflineIndicator />

        <main id="main-content" className="flex-1 container mx-auto px-4 py-4 flex flex-col min-h-0" role="main">
          {/* Feature badges - inline compact bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-4 shrink-0" role="list" aria-label="Application features">
            {features.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-[hsl(var(--color-muted-foreground))] bg-[hsl(var(--color-muted)/0.5)] px-2.5 py-1 rounded-full" role="listitem">
                <Icon className="w-3.5 h-3.5 text-[hsl(var(--color-primary))]" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4 min-h-0">
            <Card className="p-5 glass-card flex flex-col min-h-0 overflow-hidden">
              <LiveConverter />
            </Card>

            <div className="hidden xl:flex flex-col min-h-0 overflow-hidden">
              <HistoryPanel />
            </div>
          </div>

          {/* Mobile History */}
          <div className="xl:hidden mt-3 shrink-0">
            <Button
              onClick={() => setShowHistory(!showHistory)}
              variant="outline"
              size="default"
              className="w-full gap-2.5 h-10 text-sm font-medium"
              aria-expanded={showHistory}
              aria-controls="mobile-history-panel"
            >
              <History className="w-4 h-4" aria-hidden="true" />{showHistory ? 'Hide History' : 'Show History'}
            </Button>
            {showHistory && (
              <div id="mobile-history-panel" className="mt-3 max-h-56 overflow-auto rounded-xl border border-[hsl(var(--color-border))] fade-in shadow-lg">
                <HistoryPanel onClose={() => setShowHistory(false)} />
              </div>
            )}
          </div>
        </main>

        <Footer />
        <InstallPrompt />
      </div>
    </ErrorBoundary>
  );
}
