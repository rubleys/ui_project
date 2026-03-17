import type { RootState } from '../../app/store';

export const selectSelectedEpisodeId = (state: RootState) =>
  state.episodes.selectedEpisodeId;