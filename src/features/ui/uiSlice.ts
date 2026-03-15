import { createSlice } from '@reduxjs/toolkit';

//this slice manages UI state that is not directly related to episodes, such as the drawer state and column visibility. This keeps our episode slice focused on episode data and logic, while the UI slice handles presentation concerns.
interface UiState {
  drawerOpen: boolean;
  showIdColumn: boolean;
  currentPage: number;
}

const initialState: UiState = {
  drawerOpen: false,
  showIdColumn: true,
  currentPage: 1,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openDrawer(state) {
      state.drawerOpen = true;
    },
    closeDrawer(state) {
      state.drawerOpen = false;
    },
    toggleIdColumn(state) {
      state.showIdColumn = !state.showIdColumn;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    }
  }
});

export const { openDrawer, closeDrawer, toggleIdColumn, setCurrentPage } = uiSlice.actions;
export default uiSlice.reducer;