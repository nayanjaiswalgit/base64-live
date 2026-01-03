export type OperationType = 'encode' | 'decode';

export interface HistoryEntry {
  id: string;
  type: OperationType;
  input: string;
  output: string;
  timestamp: number;
  fileName?: string;
  label?: string;
}

export interface HistoryStore {
  entries: HistoryEntry[];
  addEntry: (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => void;
  deleteEntry: (id: string) => void;
  clearHistory: () => void;
  updateEntry: (id: string, data: Partial<HistoryEntry>) => void;
}
