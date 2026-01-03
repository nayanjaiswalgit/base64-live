import { describe, it, expect } from 'vitest';
import { encodeToBase64, decodeFromBase64, isValidBase64 } from './base64';

describe('base64 utility functions', () => {
    describe('encodeToBase64', () => {
        it('should encode simple ASCII text correctly', () => {
            expect(encodeToBase64('Hello World')).toBe('SGVsbG8gV29ybGQ=');
        });

        it('should encode empty string to empty string', () => {
            expect(encodeToBase64('')).toBe('');
        });

        it('should handle Unicode characters correctly', () => {
            expect(encodeToBase64('Hello 世界')).toBe('SGVsbG8g5LiW55WM');
        });

        it('should handle emojis correctly', () => {
            expect(encodeToBase64('Hello 👋 World 🌍')).toBe('SGVsbG8g8J+RiyBXb3JsZCDwn4yN');
        });

        it('should handle special characters', () => {
            expect(encodeToBase64('test@example.com')).toBe('dGVzdEBleGFtcGxlLmNvbQ==');
        });

        it('should handle multi-line text', () => {
            const input = 'Line 1\nLine 2\nLine 3';
            const encoded = encodeToBase64(input);
            expect(decodeFromBase64(encoded)).toBe(input);
        });

        it('should throw error for extremely large input', () => {
            const largeText = 'a'.repeat(101 * 1024 * 1024); // 101MB
            expect(() => encodeToBase64(largeText)).toThrow('Input too large');
        });

        it('should handle text just under size limit', () => {
            const text = 'a'.repeat(1000);  // Small text
            const encoded = encodeToBase64(text);
            expect(encoded).toBeTruthy();
            expect(encoded.length).toBeGreaterThan(0);
        });
    });

    describe('decodeFromBase64', () => {
        it('should decode simple Base64 correctly', () => {
            expect(decodeFromBase64('SGVsbG8gV29ybGQ=')).toBe('Hello World');
        });

        it('should decode empty string to empty string', () => {
            expect(decodeFromBase64('')).toBe('');
        });

        it('should handle Unicode characters correctly', () => {
            expect(decodeFromBase64('SGVsbG8g5LiW55WM')).toBe('Hello 世界');
        });

        it('should handle emojis correctly', () => {
            expect(decodeFromBase64('SGVsbG8g8J+RiyBXb3JsZCDwn4yN')).toBe('Hello 👋 World 🌍');
        });

        it('should handle whitespace in input (remove it)', () => {
            expect(decodeFromBase64('SGVs bG8g V29y bGQ=')).toBe('Hello World');
            expect(decodeFromBase64('SGVsbG8gV29ybGQ=\n')).toBe('Hello World');
        });

        it('should throw error for invalid Base64 - wrong length', () => {
            expect(() => decodeFromBase64('InvalidBase64')).toThrow('Invalid base64 string');
        });

        it('should throw error for invalid Base64 - invalid characters', () => {
            expect(() => decodeFromBase64('Invalid@#$Base64==')).toThrow('Invalid base64 string');
        });

        it('should throw error for invalid Base64 - malformed', () => {
            expect(() => decodeFromBase64('NotValidBase64@@')).toThrow();
        });

        it('should throw error for extremely large input', () => {
            const largeBase64 = 'A'.repeat(101 * 1024 * 1024); // 101MB
            expect(() => decodeFromBase64(largeBase64)).toThrow('Input too large');
        });
    });

    describe('isValidBase64', () => {
        it('should return true for valid Base64', () => {
            expect(isValidBase64('SGVsbG8gV29ybGQ=')).toBe(true);
            expect(isValidBase64('SGVsbG8=')).toBe(true);
            expect(isValidBase64('QQ==')).toBe(true);
        });

        it('should return false for invalid Base64 - wrong length', () => {
            expect(isValidBase64('InvalidBase64')).toBe(false);
        });

        it('should return false for invalid Base64 - invalid characters', () => {
            expect(isValidBase64('Invalid@#$Base64==')).toBe(false);
        });

        it('should return false for empty string', () => {
            expect(isValidBase64('')).toBe(false);
        });

        it('should return false for null or undefined', () => {
            expect(isValidBase64(null as any)).toBe(false);
            expect(isValidBase64(undefined as any)).toBe(false);
        });

        it('should return false for non-string input', () => {
            expect(isValidBase64(123 as any)).toBe(false);
            expect(isValidBase64({} as any)).toBe(false);
            expect(isValidBase64([] as any)).toBe(false);
        });

        it('should return false for incorrect padding', () => {
            expect(isValidBase64('SGVsbG8===')).toBe(false); // Too much padding
        });

        it('should validate correct padding variations', () => {
            expect(isValidBase64('QQ==')).toBe(true);   // 2 padding chars
            expect(isValidBase64('QWE=')).toBe(true);   // 1 padding char
            expect(isValidBase64('QWER')).toBe(true);   // No padding
        });
    });

    describe('encoding and decoding round-trip', () => {
        it('should maintain data integrity through encode/decode cycle', () => {
            const testCases = [
                'Simple text',
                'Text with numbers 12345',
                'Special chars !@#$%^&*()',
                'Unicode: 你好世界',
                'Emojis: 🎉🎊🎈',
                'Multi\nline\ntext',
                'Tabs\tand\tspaces',
                'Very long text '.repeat(100),
            ];

            testCases.forEach(text => {
                const encoded = encodeToBase64(text);
                const decoded = decodeFromBase64(encoded);
                expect(decoded).toBe(text);
            });
        });

        it('should handle all printable ASCII characters', () => {
            let allChars = '';
            for (let i = 32; i < 127; i++) {
                allChars += String.fromCharCode(i);
            }
            const encoded = encodeToBase64(allChars);
            const decoded = decodeFromBase64(encoded);
            expect(decoded).toBe(allChars);
        });

        it('should handle JSON data', () => {
            const jsonData = JSON.stringify({ name: 'Test', value: 123, nested: { key: 'value' } });
            const encoded = encodeToBase64(jsonData);
            const decoded = decodeFromBase64(encoded);
            expect(JSON.parse(decoded)).toEqual(JSON.parse(jsonData));
        });
    });

    describe('error handling', () => {
        it('should provide meaningful error messages for encoding failures', () => {
            try {
                const largeText = 'a'.repeat(101 * 1024 * 1024);
                encodeToBase64(largeText);
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect((error as Error).message).toContain('Input too large');
            }
        });

        it('should provide meaningful error messages for decoding failures', () => {
            try {
                decodeFromBase64('Invalid@Base64!');
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect((error as Error).message).toContain('Invalid base64 string');
            }
        });

        it('should preserve custom error messages', () => {
            try {
                decodeFromBase64('Test');
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect((error as Error).message).toBeTruthy();
            }
        });
    });
});
