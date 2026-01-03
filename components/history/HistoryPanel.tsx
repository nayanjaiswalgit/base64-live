'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HistoryItem } from './HistoryItem';
import { HistorySearch } from './HistorySearch';
import { ClearHistoryDialog } from './ClearHistoryDialog';
import { useHistoryStore } from '@/stores/historyStore';
import { EmptyState } from '@/components/shared/EmptyState';
import { Trash2, X, Clock } from 'lucide-react';

interface HistoryPanelProps {
  onClose?: () => void;
}

export function HistoryPanel({ onClose }: HistoryPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearDialog, setShowClearDialog] = useState(false);
  const entries = useHistoryStore((state) => state.entries);
  const clearHistory = useHistoryStore((state) => state.clearHistory);

  const filteredEntries = searchQuery
    ? entries.filter((e) =>
      e.input.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.output.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.fileName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.label?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : entries;

  return (
    <>
      <Card className="h-full glass-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2.5">
              <Clock className="w-4.5 h-4.5 text-[hsl(var(--color-primary))]" /> History
              {entries.length > 0 && <span className="text-xs font-medium text-[hsl(var(--color-muted-foreground))] bg-[hsl(var(--color-muted))] px-2 py-0.5 rounded-full">({entries.length})</span>}
            </CardTitle>
            <div className="flex gap-1.5">
              {entries.length > 0 && (
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-[hsl(var(--color-destructive)/0.1)] hover:text-[hsl(var(--color-destructive))]" onClick={() => setShowClearDialog(true)} title="Clear all history">
                  <Trash2 className="w-4.5 h-4.5" />
                </Button>
              )}
              {onClose && (
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg lg:hidden" onClick={onClose}>
                  <X className="w-4.5 h-4.5" />
                </Button>
              )}
            </div>
          </div>
          {entries.length > 0 && <div className="mt-4"><HistorySearch value={searchQuery} onChange={setSearchQuery} /></div>}
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-280px)]">
            {filteredEntries.length > 0 ? (
              <div className="space-y-2.5 p-5 pt-0">
                {filteredEntries.map((entry) => <HistoryItem key={entry.id} entry={entry} />)}
              </div>
            ) : searchQuery ? (
              <EmptyState title="No matches found" description="Try a different search term" />
            ) : (
              <EmptyState title="No history yet" description="Your conversions will appear here automatically" />
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <ClearHistoryDialog open={showClearDialog} onOpenChange={setShowClearDialog} onConfirm={clearHistory} />
    </>
  );
}
