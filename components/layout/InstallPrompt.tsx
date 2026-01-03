'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
    // Track if component is mounted to avoid hydration mismatch
    const [mounted, setMounted] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Set mounted and check if already installed
        setMounted(true);
        const installed = window.matchMedia('(display-mode: standalone)').matches;
        setIsInstalled(installed);

        // Early return if already installed
        if (installed) return;

        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            // Show prompt after 5 seconds
            setTimeout(() => setShowPrompt(true), 5000);
        };

        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setIsInstalled(true);
        }
        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    // Don't render anything during SSR or before hydration
    if (!mounted || isInstalled || !showPrompt || !deferredPrompt) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 fade-in">
            <div className="p-4 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-lg">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] flex items-center justify-center text-white shrink-0">
                        <Download className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm">Install Base64 Tool</h3>
                        <p className="text-xs text-[hsl(var(--color-muted-foreground))] mt-0.5">
                            Use offline, anytime. No internet needed!
                        </p>
                        <div className="flex gap-2 mt-3">
                            <Button size="sm" onClick={handleInstall} className="h-8 text-xs">
                                Install App
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setShowPrompt(false)} className="h-8 text-xs">
                                Later
                            </Button>
                        </div>
                    </div>
                    <button onClick={() => setShowPrompt(false)} className="text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))]">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
