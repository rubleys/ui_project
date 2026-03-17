import { describe, expect, it } from 'vitest';
import { formatDate } from './dateHelper';

describe('formatDate', () => {
  it('formats date as Month Day, Year', () => {
    const result = formatDate('2017-11-10T12:42:04.162Z');
    expect(result).toBe('November 10, 2017');
  });
});
