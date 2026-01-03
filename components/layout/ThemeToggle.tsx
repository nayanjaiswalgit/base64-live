'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
    const { theme, toggle, mounted } = useTheme();

    if (!mounted) return <div className="w-9 h-9" />;

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="w-9 h-9 rounded-xl"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
        </Button>
    );
}
