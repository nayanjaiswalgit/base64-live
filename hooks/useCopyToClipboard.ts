import { useState, useCallback } from 'react';

interface UseCopyToClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<boolean>;
  error: string | null;
}

export function useCopyToClipboard(onSuccess?: () => void, onError?: (error: string) => void): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (!navigator?.clipboard) {
      const errorMsg = 'Clipboard not supported';
      console.warn(errorMsg);
      setError(errorMsg);
      onError?.(errorMsg);
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setError(null);
      onSuccess?.();
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to copy';
      console.error('Failed to copy:', err);
      setError(errorMsg);
      setCopied(false);
      onError?.(errorMsg);
      return false;
    }
  }, [onSuccess, onError]);

  return { copied, copy, error };
}
