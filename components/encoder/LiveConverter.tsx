'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/shared/CopyButton';
import { isValidBase64 } from '@/lib/base64';
import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from '@/lib/constants';
import { useHistoryStore } from '@/stores/historyStore';
import { useEditorStore } from '@/stores/editorStore';
import { Trash2, Save, Upload, FileText } from 'lucide-react';

export function LiveConverter() {
    // Local UI state
    const [showUpload, setShowUpload] = useState(false);

    // Global editor state
    const { plain, base64, error, lastEdited, fileName, setPlain, setBase64, setFile, clear } = useEditorStore();
    const addEntry = useHistoryStore((s) => s.addEntry);

    // Handlers (using store actions)
    const onFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > MAX_FILE_SIZE_BYTES) {
            // We can set error in store or handle locally. Store has setError but it's not exposed yet?
            // Let's assume setError is available or just let the user know. 
            // Wait, I exposed setError in the store. I should destructure it.
            useEditorStore.getState().setError(`File too large. Maximum ${MAX_FILE_SIZE_MB}MB allowed`);
            return;
        }
        try {
            setFile(await file.text(), file.name);
            setShowUpload(false);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to read file';
            useEditorStore.getState().setError(message);
        }
    };

    const onSave = () => {
        if (!plain && !base64) return;
        addEntry({
            type: lastEdited === 'plain' ? 'encode' : 'decode',
            input: lastEdited === 'plain' ? plain : base64,
            output: lastEdited === 'plain' ? base64 : plain,
            fileName: fileName || undefined, // Ensure compatibility with store type if needed
        });
    };

    const isValid = !base64 || isValidBase64(base64.replace(/\s/g, ''));

    return (
        <div className="flex flex-col h-full min-h-0" role="region" aria-label="Base64 converter">
            {/* Action buttons - positioned at top right */}
            <div className="flex items-center justify-end gap-1.5 mb-3 shrink-0" role="toolbar" aria-label="Conversion actions">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowUpload(!showUpload)}
                    className="h-8 w-8 p-0 rounded-lg hover:bg-[hsl(var(--color-primary)/0.1)]"
                    title="Upload file"
                    aria-label="Upload text file"
                    aria-expanded={showUpload}
                >
                    <Upload className="w-4 h-4" aria-hidden="true" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onSave}
                    disabled={!plain && !base64}
                    className="h-8 w-8 p-0 rounded-lg hover:bg-[hsl(var(--color-primary)/0.1)]"
                    title="Save to history"
                    aria-label="Save current conversion to history"
                >
                    <Save className="w-4 h-4" aria-hidden="true" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={clear}
                    className="h-8 w-8 p-0 rounded-lg hover:bg-[hsl(var(--color-destructive)/0.1)] hover:text-[hsl(var(--color-destructive))]"
                    title="Clear all"
                    aria-label="Clear all text fields"
                >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                </Button>
            </div>

            {/* File upload */}
            {showUpload && (
                <label
                    className="flex items-center justify-center gap-2.5 p-4 mb-3 border-2 border-dashed rounded-xl cursor-pointer border-[hsl(var(--color-border))] hover:border-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-primary)/0.05)] shrink-0 fade-in text-sm transition-all duration-150"
                    htmlFor="file-upload"
                >
                    <Upload className="w-5 h-5 text-[hsl(var(--color-primary))]" aria-hidden="true" />
                    <span className="font-medium">Drop or click to upload <span className="text-[hsl(var(--color-muted-foreground))] font-normal">(max 1MB)</span></span>
                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".txt,text/plain"
                        onChange={onFileSelect}
                        aria-label="Upload text file for encoding, maximum size 1MB"
                    />
                </label>
            )}

            {/* Error - Live region for screen readers */}
            {error && (
                <div
                    className="text-sm font-medium text-[hsl(var(--color-destructive))] bg-[hsl(var(--color-destructive)/0.1)] px-4 py-2 rounded-lg mb-3 shrink-0 fade-in flex items-center gap-2"
                    role="alert"
                    aria-live="assertive"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--color-destructive))]" aria-hidden="true" />
                    {error}
                </div>
            )}

            {/* Panels */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
                {/* Plain Text */}
                <div className="flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-2 shrink-0">
                        <div className="flex items-center gap-2.5">
                            <div
                                className={`w-2 h-2 rounded-full transition-all duration-200 ${lastEdited === 'plain' ? 'bg-[hsl(var(--color-primary))] shadow-[0_0_8px_hsl(var(--color-primary)/0.5)]' : 'bg-[hsl(var(--color-border))]'}`}
                                role="status"
                                aria-label={lastEdited === 'plain' ? 'Currently editing plain text' : 'Plain text not being edited'}
                            />
                            <label htmlFor="plain-text-input" className="text-sm font-medium">Plain Text</label>
                            {fileName && <Badge variant="secondary" className="text-[10px] py-0.5 px-2 gap-1"><FileText className="w-3 h-3" aria-hidden="true" />{fileName}</Badge>}
                        </div>
                        <CopyButton text={plain} />
                    </div>
                    <Textarea
                        id="plain-text-input"
                        value={plain}
                        onChange={(e) => setPlain(e.target.value)}
                        placeholder="Type or paste text here..."
                        className={`flex-1 min-h-[120px] font-mono text-sm resize-none transition-all duration-200 ${lastEdited === 'plain' ? 'ring-2 ring-[hsl(var(--color-primary)/0.3)] border-[hsl(var(--color-primary)/0.5)]' : ''}`}
                        spellCheck={false}
                        aria-label="Plain text input for Base64 encoding"
                        aria-describedby="plain-text-stats"
                    />
                    <div
                        id="plain-text-stats"
                        className="flex justify-between text-[11px] text-[hsl(var(--color-muted-foreground))] mt-1.5 px-1 shrink-0 font-medium"
                        aria-live="polite"
                    >
                        <span>{plain.length.toLocaleString()} chars</span>
                        <span>{new Blob([plain]).size.toLocaleString()} bytes</span>
                    </div>
                </div>

                {/* Base64 */}
                <div className="flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-2 shrink-0">
                        <div className="flex items-center gap-2.5">
                            <div
                                className={`w-2 h-2 rounded-full transition-all duration-200 ${lastEdited === 'base64' ? 'bg-[hsl(var(--color-primary))] shadow-[0_0_8px_hsl(var(--color-primary)/0.5)]' : 'bg-[hsl(var(--color-border))]'}`}
                                role="status"
                                aria-label={lastEdited === 'base64' ? 'Currently editing Base64' : 'Base64 not being edited'}
                            />
                            <label htmlFor="base64-input" className="text-sm font-medium">Base64</label>
                            {base64 && (
                                <Badge
                                    variant={isValid ? 'success' : 'destructive'}
                                    className="text-[10px] py-0.5 px-2"
                                    role="status"
                                    aria-label={isValid ? 'Valid Base64 string' : 'Invalid Base64 string'}
                                >
                                    {isValid ? '✓ Valid' : '✕ Invalid'}
                                </Badge>
                            )}
                        </div>
                        <CopyButton text={base64} />
                    </div>
                    <Textarea
                        id="base64-input"
                        value={base64}
                        onChange={(e) => setBase64(e.target.value)}
                        placeholder="Or paste Base64 here..."
                        className={`flex-1 min-h-[120px] font-mono text-sm resize-none transition-all duration-200 ${lastEdited === 'base64' ? 'ring-2 ring-[hsl(var(--color-primary)/0.3)] border-[hsl(var(--color-primary)/0.5)]' : ''}`}
                        spellCheck={false}
                        aria-label="Base64 encoded text input for decoding"
                        aria-describedby="base64-stats"
                        aria-invalid={base64 ? !isValid : undefined}
                    />
                    <div
                        id="base64-stats"
                        className="flex justify-between text-[11px] text-[hsl(var(--color-muted-foreground))] mt-1.5 px-1 shrink-0 font-medium"
                        aria-live="polite"
                    >
                        <span>{base64.length.toLocaleString()} chars</span>
                        {plain && base64 && <span className="text-[hsl(var(--color-primary))] font-semibold">+{Math.round((base64.length / Math.max(plain.length, 1) - 1) * 100)}% size</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}
