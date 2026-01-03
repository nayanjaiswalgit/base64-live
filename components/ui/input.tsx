import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] px-4 py-2 text-sm shadow-sm transition-all duration-150 placeholder:text-[hsl(var(--color-muted-foreground))] focus-visible:outline-none focus-visible:border-[hsl(var(--color-primary)/0.4)] focus-visible:shadow-[0_0_0_3px_hsl(var(--color-primary)/0.08)] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export { Input };
