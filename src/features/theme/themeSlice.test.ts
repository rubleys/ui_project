import { describe, expect, it } from 'vitest';
import themeReducer, { setTheme, toggleTheme } from './themeSlice';

describe('themeSlice', () => {
  it('should return initial state', () => {
    const state = themeReducer(undefined, { type: 'unknown' });
    expect(state).toEqual({ mode: 'light' });
  });

  it('should toggle theme', () => {
    const state = themeReducer(undefined, toggleTheme());
    expect(state.mode).toBe('dark');
  });

  it('should set theme explicitly', () => {
    const state = themeReducer(undefined, setTheme('dark'));
    expect(state.mode).toBe('dark');
  });
});
