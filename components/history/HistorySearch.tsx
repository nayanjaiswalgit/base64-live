'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HistorySearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function HistorySearch({ value, onChange }: HistorySearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
      <Input
        placeholder="Search history..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8 h-9"
      />
    </div>
  );
}
