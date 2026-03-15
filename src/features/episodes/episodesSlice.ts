import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface EpisodesState {
  selectedEpisodeId: string | null; // Solo ID para evitar duplicación de datos
}

const initialState: EpisodesState = {
  selectedEpisodeId: null,
};

const episodesSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {
    selectEpisode(state, action: PayloadAction<string>) {
      state.selectedEpisodeId = action.payload;
    },
    clearSelection(state) {
      state.selectedEpisodeId = null;
    }
  }
});

export const { selectEpisode, clearSelection } = episodesSlice.actions;
export default episodesSlice.reducer;