'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/shared/CopyButton';
import { useHistoryStore } from '@/stores/historyStore';
import { HistoryEntry } from '@/types';
import { formatDistanceToNow } from '@/lib/dateUtils';
import { useEditorStore } from '@/stores/editorStore';
import { Input } from '@/components/ui/input';
import { Trash2, ChevronDown, ChevronUp, FileText, RotateCcw, Pencil } from 'lucide-react';

interface HistoryItemProps {
  entry: HistoryEntry;
}

export function HistoryItem({ entry }: HistoryItemProps) {
  const [expanded, setExpanded] = useState(false);
  const deleteEntry = useHistoryStore((state) => state.deleteEntry);
  const updateEntry = useHistoryStore((state) => state.updateEntry);
  const restoreState = useEditorStore((state) => state.restoreState);

  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [labelValue, setLabelValue] = useState(entry.label || '');

  const saveLabel = () => {
    updateEntry(entry.id, { label: labelValue });
    setIsEditingLabel(false);
  };

  const truncate = (str: string, len = 50) => str.length > len ? str.slice(0, len) + '...' : str;

  const onRestore = () => {
    if (entry.type === 'encode') {
      restoreState(entry.input, entry.output, 'plain', entry.fileName);
    } else {
      restoreState(entry.output, entry.input, 'base64', entry.fileName);
    }

    if (window.innerWidth < 1280) {
      document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isLong = entry.input.length > 50 || entry.output.length > 50;

  return (
    <div className="p-3 rounded-lg bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border)/0.5)] hover:border-[hsl(var(--color-border))] transition-colors duration-150 space-y-2.5 group/item">
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex-1 min-w-0 space-y-1.5">
          {/* Label Editing */}
          {isEditingLabel ? (
            <div className="flex items-center gap-1">
              <Input
                value={labelValue}
                onChange={(e) => setLabelValue(e.target.value)}
                className="h-7 text-xs px-2.5 py-1 min-w-0 flex-1 bg-[hsl(var(--color-background))] rounded-md"
                placeholder="Label..."
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') saveLabel();
                  if (e.key === 'Escape') {
                    setLabelValue(entry.label || '');
                    setIsEditingLabel(false);
                  }
                }}
                onBlur={saveLabel}
              />
            </div>
          ) : (
            <div
              className="flex items-center gap-1.5 group/label cursor-pointer w-fit max-w-full"
              onClick={() => setIsEditingLabel(true)}
              title="Click to add label"
            >
              <span className={`truncate ${entry.label ? 'font-medium text-sm' : 'text-xs text-[hsl(var(--color-muted-foreground))] italic opacity-50'}`}>
                {entry.label || 'Add label...'}
              </span>
              <Pencil className="w-3 h-3 text-[hsl(var(--color-muted-foreground))] opacity-0 group-hover/label:opacity-100 transition-opacity flex-shrink-0" />
            </div>
          )}

          {/* Metadata Badges */}
          <div className="flex items-center gap-1.5 flex-wrap text-[10px] text-[hsl(var(--color-muted-foreground))]">
            <Badge variant={entry.type === 'encode' ? 'default' : 'secondary'} className="text-[10px] h-4 px-1.5 font-normal">
              {entry.type}
            </Badge>
            {entry.fileName && (
              <span className="flex items-center gap-1 truncate max-w-[150px]" title={entry.fileName}>
                <FileText className="w-3 h-3 shrink-0" /> {entry.fileName}
              </span>
            )}
            {entry.fileName && <span className="opacity-50">•</span>}
            <span>{formatDistanceToNow(entry.timestamp)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-0.5 shrink-0 sm:opacity-0 sm:group-hover/item:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:text-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-primary)/0.1)] rounded-md"
            onClick={onRestore}
            title="Restore to editor"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:text-[hsl(var(--color-destructive))] hover:bg-[hsl(var(--color-destructive)/0.1)] rounded-md"
            onClick={() => deleteEntry(entry.id)}
            title="Delete entry"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <div className="space-y-1.5 text-xs">
        <div className="flex gap-2">
          <span className="font-medium text-[hsl(var(--color-foreground))] min-w-[1.75rem]">In:</span>
          <span className="text-[hsl(var(--color-muted-foreground))] font-mono break-all flex-1 leading-relaxed">{truncate(entry.input, expanded ? 500 : 40)}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-medium text-[hsl(var(--color-foreground))] min-w-[1.75rem]">Out:</span>
          <span className="text-[hsl(var(--color-muted-foreground))] font-mono break-all flex-1 leading-relaxed">{truncate(entry.output, expanded ? 500 : 40)}</span>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        {isLong ? (
          <Button variant="outline" size="sm" className="h-7 text-xs flex-1 rounded-md" onClick={() => setExpanded(!expanded)}>
            {expanded ? <><ChevronUp className="w-3 h-3 mr-1" /> Less</> : <><ChevronDown className="w-3 h-3 mr-1" /> More</>}
          </Button>
        ) : (
          <div className="flex-1"></div>
        )}
        <CopyButton text={entry.output} size="sm" />
      </div>
    </div>
  );
}
