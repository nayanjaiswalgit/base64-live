import { FileQuestion } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="rounded-full bg-[hsl(var(--color-muted))] p-3 mb-3">
        {icon || <FileQuestion className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]" />}
      </div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-xs text-[hsl(var(--color-muted-foreground))] max-w-[200px]">{description}</p>
    </div>
  );
}
