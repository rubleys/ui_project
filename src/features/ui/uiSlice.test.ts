import { describe, expect, it } from 'vitest';
import uiReducer, {
  closeDrawer,
  openDrawer,
  setCurrentPage,
  toggleIdColumn,
} from './uiSlice';

describe('uiSlice', () => {
  it('should return initial state', () => {
    const state = uiReducer(undefined, { type: 'unknown' });
    expect(state).toEqual({ drawerOpen: false, showIdColumn: true, currentPage: 1 });
  });

  it('should open and close drawer', () => {
    const opened = uiReducer(undefined, openDrawer());
    expect(opened.drawerOpen).toBe(true);

    const closed = uiReducer(opened, closeDrawer());
    expect(closed.drawerOpen).toBe(false);
  });

  it('should toggle id column visibility', () => {
    const state = uiReducer(undefined, toggleIdColumn());
    expect(state.showIdColumn).toBe(false);
  });

  it('should set current page', () => {
    const state = uiReducer(undefined, setCurrentPage(3));
    expect(state.currentPage).toBe(3);
  });
});
