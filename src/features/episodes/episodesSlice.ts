import { createSlice } from '@reduxjs/toolkit';

interface EpisodesState {
  list: any[];        // luego lo tipamos bien
  selected: any | null;
  drawerOpen: boolean;
  showIdColumn: boolean;
}

const initialState: EpisodesState = {
  list: [],
  selected: null,
  drawerOpen: false,
  showIdColumn: true,
};

const episodesSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {
    setEpisodes(state, action) {
      state.list = action.payload;
    },
    selectEpisode(state, action) {
      state.selected = action.payload;
    },
    openDrawer(state) {
      state.drawerOpen = true;
    },
    closeDrawer(state) {
      state.drawerOpen = false;
    },
    toggleIdColumn(state) {
      state.showIdColumn = !state.showIdColumn;
    }
  }
});

export const {
  setEpisodes,
  selectEpisode,
  openDrawer,
  closeDrawer,
  toggleIdColumn
} = episodesSlice.actions;

export default episodesSlice.reducer;