import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        'flex w-full rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-4 py-3 text-sm transition-all duration-150',
        'placeholder:text-[hsl(var(--color-muted-foreground))]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'hover:border-[hsl(var(--color-muted-foreground)/0.3)]',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';

export { Textarea };
