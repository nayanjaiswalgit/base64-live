import { create } from 'zustand';
import { encodeToBase64, decodeFromBase64, isValidBase64 } from '@/lib/base64';

interface EditorState {
    plain: string;
    base64: string;
    error: string | null;
    lastEdited: 'plain' | 'base64';
    fileName: string | null;

    setPlain: (val: string) => void;
    setBase64: (val: string) => void;
    setFile: (content: string, name: string) => void;
    clear: () => void;
    setError: (error: string | null) => void;
    restoreState: (plain: string, base64: string, lastEdited: 'plain' | 'base64', fileName?: string | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
    plain: '',
    base64: '',
    error: null,
    lastEdited: 'plain',
    fileName: null,

    setPlain: (val: string) => {
        set({ plain: val, lastEdited: 'plain', error: null });
        try {
            const encoded = val ? encodeToBase64(val) : '';
            set({ base64: encoded });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Encoding failed';
            set({ error: message });
        }
    },

    setBase64: (val: string) => {
        set({ base64: val, lastEdited: 'base64', error: null });
        const clean = val.replace(/\s/g, '');
        if (!clean) {
            set({ plain: '' });
            return;
        }
        if (!isValidBase64(clean)) {
            set({ error: 'Invalid Base64' });
            return;
        }
        try {
            const decoded = decodeFromBase64(val);
            set({ plain: decoded });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Decoding failed';
            set({ error: message });
        }
    },

    setFile: (content: string, name: string) => {
        set({ plain: content, lastEdited: 'plain', error: null, fileName: name });
        try {
            const encoded = content ? encodeToBase64(content) : '';
            set({ base64: encoded });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Encoding failed';
            set({ error: message });
        }
    },

    clear: () => set({ plain: '', base64: '', error: null, fileName: null }),

    setError: (error) => set({ error }),

    restoreState: (plain, base64, lastEdited, fileName = null) => {
        set({ plain, base64, lastEdited, fileName: fileName || null, error: null });
    }
}));
