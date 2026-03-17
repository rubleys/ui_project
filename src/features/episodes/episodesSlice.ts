import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Episode } from '../../types/episode';

interface EpisodesState {
  episodes: Episode[];  // Lista completa de episodios
  selectedEpisodeId: string | null;
  totalPages: number;  // Para saber cuántas páginas hay
  currentFetchedPage: number; // Última página cargada de la API
}

const initialState: EpisodesState = {
  episodes: [],
  selectedEpisodeId: null,
  totalPages: 0,
  currentFetchedPage: 0,
};

const episodesSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {
    setEpisodes(state, action: PayloadAction<{ episodes: Episode[]; totalPages: number; page: number }>) {
      state.episodes = action.payload.episodes;
      state.totalPages = action.payload.totalPages;
      state.currentFetchedPage = action.payload.page;
    },
    selectEpisode(state, action: PayloadAction<string>) {
      state.selectedEpisodeId = action.payload;
    },
    clearSelection(state) {
      state.selectedEpisodeId = null;
    },
    clearEpisodes(state) {
      state.episodes = [];
      state.totalPages = 0;
      state.currentFetchedPage = 0;
    }
  }
});

export const { setEpisodes, selectEpisode, clearSelection, clearEpisodes } = episodesSlice.actions;
export default episodesSlice.reducer;