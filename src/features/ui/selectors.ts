import type { RootState } from '../../app/store';

export const selectDrawerOpen = (state: RootState) => state.ui.drawerOpen;
export const selectShowIdColumn = (state: RootState) => state.ui.showIdColumn;
export const selectCurrentPage = (state: RootState) => state.ui.currentPage;
export const selectThemeMode = (state: RootState) => state.theme.mode;