import { describe, expect, it } from 'vitest';
import episodesReducer, { clearSelection, selectEpisode } from './episodesSlice';

describe('episodesSlice', () => {
  it('should return initial state', () => {
    const state = episodesReducer(undefined, { type: 'unknown' });
    expect(state).toEqual({ selectedEpisodeId: null });
  });

  it('should set selected episode id', () => {
    const state = episodesReducer(undefined, selectEpisode('42'));
    expect(state.selectedEpisodeId).toBe('42');
  });

  it('should clear selected episode id', () => {
    const startState = { selectedEpisodeId: '42' };
    const state = episodesReducer(startState, clearSelection());
    expect(state.selectedEpisodeId).toBeNull();
  });
});
