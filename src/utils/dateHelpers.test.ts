import { describe, expect, it } from 'vitest';
import { addDays, buildDateRange, formatDateTime, toISODate } from './dateHelpers';

describe('dateHelpers', () => {
  it('formats ISO date for today', () => {
    const today = new Date('2025-05-10T10:00:00Z');
    const iso = toISODate(today);
    expect(iso).toBe('2025-05-10');
  });

  it('computes range size', () => {
    const range = buildDateRange(3);
    const start = new Date(range.start);
    const end = new Date(range.end);
    expect(Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))).toBe(3);
  });

  it('adds days correctly', () => {
    const base = new Date('2025-01-01T00:00:00Z');
    const future = addDays(base, 10);
    expect(future.getTime() - base.getTime()).toBe(10 * 24 * 60 * 60 * 1000);
  });

  it('formats date time readable', () => {
    const formatted = formatDateTime('2025-05-10T15:30:00Z');
    expect(formatted).toContain('2025');
  });
});
