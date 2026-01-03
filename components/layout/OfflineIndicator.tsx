'use client';

import { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export function OfflineIndicator() {
    // Track if component is mounted to avoid hydration mismatch
    const [mounted, setMounted] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const [showIndicator, setShowIndicator] = useState(false);

    useEffect(() => {
        // Set mounted and initial online status
        setMounted(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (typeof navigator !== 'undefined') {
            setIsOnline(navigator.onLine);
        }

        const handleOnline = () => {
            setIsOnline(true);
            setShowIndicator(true);
            setTimeout(() => setShowIndicator(false), 3000);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setShowIndicator(true);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Don't render anything during SSR or before hydration
    if (!mounted || (!showIndicator && isOnline)) return null;

    return (
        <div className={`fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 fade-in ${isOnline
            ? 'bg-[hsl(var(--color-success)/0.1)] text-[hsl(var(--color-success))] border border-[hsl(var(--color-success)/0.2)]'
            : 'bg-[hsl(var(--color-warning)/0.1)] text-[hsl(var(--color-warning))] border border-[hsl(var(--color-warning)/0.2)]'
            }`}>
            {isOnline ? (
                <><Wifi className="w-3.5 h-3.5" /> Back online</>
            ) : (
                <><WifiOff className="w-3.5 h-3.5" /> Offline - App still works!</>
            )}
        </div>
    );
}
