import { describe, it, expect } from 'vitest';
import { formatDistanceToNow } from './dateUtils';

describe('formatDistanceToNow', () => {
    it('should format just now for very recent timestamps', () => {
        const now = Date.now();
        expect(formatDistanceToNow(now)).toBe('just now');
        expect(formatDistanceToNow(now - 5000)).toBe('just now');
    });

    it('should format seconds ago', () => {
        const now = Date.now();
        expect(formatDistanceToNow(now - 15000)).toBe('15s ago');
        expect(formatDistanceToNow(now - 45000)).toBe('45s ago');
    });

    it('should format minutes ago', () => {
        const now = Date.now();
        expect(formatDistanceToNow(now - 60000)).toBe('1m ago');
        expect(formatDistanceToNow(now - 300000)).toBe('5m ago');
        expect(formatDistanceToNow(now - 1800000)).toBe('30m ago');
    });

    it('should format hours ago', () => {
        const now = Date.now();
        expect(formatDistanceToNow(now - 3600000)).toBe('1h ago');
        expect(formatDistanceToNow(now - 7200000)).toBe('2h ago');
        expect(formatDistanceToNow(now - 43200000)).toBe('12h ago');
    });

    it('should format days ago', () => {
        const now = Date.now();
        expect(formatDistanceToNow(now - 86400000)).toBe('1d ago');
        expect(formatDistanceToNow(now - 604800000)).toBe('7d ago');
        expect(formatDistanceToNow(now - 2505600000)).toBe('29d ago'); // 29 days
    });

    it('should format months ago', () => {
        const now = Date.now();
        expect(formatDistanceToNow(now - 2592000000)).toBe('1mo ago'); // 30 days = 1 month
        expect(formatDistanceToNow(now - 5184000000)).toBe('2mo ago'); // 60 days
        expect(formatDistanceToNow(now - 15552000000)).toBe('6mo ago'); // 180 days
    });

    it('should format years ago', () => {
        const now = Date.now();
        expect(formatDistanceToNow(now - 31536000000)).toBe('1y ago'); // 365 days
        expect(formatDistanceToNow(now - 63072000000)).toBe('2y ago'); // 730 days
    });

    it('should handle edge cases', () => {
        const now = Date.now();
        expect(formatDistanceToNow(now - 0)).toBe('just now');
        expect(formatDistanceToNow(now - 1000)).toBe('just now');
        expect(formatDistanceToNow(now - 59000)).toBe('59s ago');
        expect(formatDistanceToNow(now - 3599000)).toBe('59m ago');
    });
});
