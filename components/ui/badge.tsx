import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[hsl(var(--color-primary))] text-white',
        secondary: 'bg-[hsl(var(--color-secondary))] text-[hsl(var(--color-secondary-foreground))] border border-[hsl(var(--color-border))]',
        destructive: 'bg-[hsl(var(--color-destructive)/0.12)] text-[hsl(var(--color-destructive))]',
        success: 'bg-[hsl(var(--color-success)/0.12)] text-[hsl(var(--color-success))]',
        outline: 'border border-[hsl(var(--color-border))] text-[hsl(var(--color-foreground))]',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
