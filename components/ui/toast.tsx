'use client';

import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
    onClose: () => void;
}

export function Toast({ message, type = 'success', duration = 2000, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger entrance animation
        const showTimer = setTimeout(() => setIsVisible(true), 10);

        // Auto-close after duration
        const closeTimer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for exit animation
        }, duration);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(closeTimer);
        };
    }, [duration, onClose]);

    const styles = {
        success: 'bg-[hsl(var(--color-success))] text-white',
        error: 'bg-[hsl(var(--color-destructive))] text-white',
        info: 'bg-[hsl(var(--color-primary))] text-white',
    };

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-lg shadow-2xl transition-all duration-300 ease-out ${styles[type]
                } ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
                }`}
            role="status"
            aria-live="polite"
        >
            <div className="flex items-center gap-2.5">
                {type === 'success' && <Check className="w-5 h-5" aria-hidden="true" />}
                {type === 'error' && <X className="w-5 h-5" aria-hidden="true" />}
                <span className="font-medium text-sm">{message}</span>
            </div>
        </div>
    );
}
