'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toast } from '@/components/ui/toast';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

interface CopyButtonProps {
  text: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  label?: string;
  showToast?: boolean;
}

export function CopyButton({ text, size = 'icon', label, showToast = true }: CopyButtonProps) {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { copied, copy } = useCopyToClipboard(
    () => {
      if (showToast) setShowSuccessToast(true);
    },
    (error) => {
      if (showToast) {
        setErrorMessage(error);
        setShowErrorToast(true);
      }
    }
  );

  const handleCopy = () => {
    if (!text || text.trim() === '') {
      if (showToast) {
        setErrorMessage('Nothing to copy');
        setShowErrorToast(true);
      }
      return;
    }
    copy(text);
  };

  return (
    <>
      <div className="relative inline-flex">
        <Button
          variant="outline"
          size={size}
          onClick={handleCopy}
          className={`gap-1.5 transition-all duration-200 ${copied
            ? '!bg-[hsl(var(--color-success)/0.1)] !border-[hsl(var(--color-success))] !text-[hsl(var(--color-success))] scale-105'
            : 'hover:border-[hsl(var(--color-primary)/0.5)] scale-100'
            }`}
          aria-label={label || (copied ? 'Copied to clipboard' : 'Copy to clipboard')}
          title={copied ? 'Copied!' : 'Copy to clipboard'}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 animate-in fade-in duration-200" aria-hidden="true" />
              {size !== 'icon' && <span className="font-semibold">Copied!</span>}
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              {size !== 'icon' && 'Copy'}
            </>
          )}
        </Button>




        {/* Screen reader announcement */}
        {copied && (
          <span className="sr-only" role="status" aria-live="polite">
            Text copied to clipboard
          </span>
        )}
      </div>

      {/* Toast notifications */}
      {showSuccessToast && (
        <Toast
          message="Copied to clipboard!"
          type="success"
          onClose={() => setShowSuccessToast(false)}
        />
      )}
      {showErrorToast && (
        <Toast
          message={errorMessage}
          type="error"
          onClose={() => setShowErrorToast(false)}
        />
      )}
    </>
  );
}

