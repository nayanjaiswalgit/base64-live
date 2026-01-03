import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { HistoryStore } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { MAX_HISTORY_ENTRIES } from '@/lib/constants';

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      entries: [],

      addEntry: (entry) =>
        set((state) => ({
          entries: [
            {
              ...entry,
              id: uuidv4(),
              timestamp: Date.now(),
            },
            ...state.entries,
          ].slice(0, MAX_HISTORY_ENTRIES), // Keep max 100 entries
        })),

      deleteEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
        })),

      clearHistory: () => set({ entries: [] }),

      updateEntry: (id, data) =>
        set((state) => ({
          entries: state.entries.map((e) =>
            e.id === id ? { ...e, ...data } : e
          ),
        })),
    }),
    {
      name: 'base64-history-storage',
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
