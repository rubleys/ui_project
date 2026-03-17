import type { RootState } from '../../app/store';

export const selectSelectedEpisodeId = (state: RootState) =>
  state.episodes.selectedEpisodeId;

export const selectEpisodesList = (state: RootState) =>
  state.episodes.episodes;

export const selectTotalPages = (state: RootState) =>
  state.episodes.totalPages;