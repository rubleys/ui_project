import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import { useQuery } from '@apollo/client/react';
import EpisodeDrawer from './EpisodeDrawer';
import episodesReducer from './episodesSlice';
import themeReducer from '../theme/themeSlice';
import uiReducer from '../ui/uiSlice';

vi.mock('@apollo/client/react', () => ({
  useQuery: vi.fn(),
}));

function renderDrawer() {
  const store = configureStore({
    reducer: {
      episodes: episodesReducer,
      ui: uiReducer,
      theme: themeReducer,
    },
    preloadedState: {
      episodes: { selectedEpisodeId: '1' },
      ui: { drawerOpen: true, showIdColumn: true, currentPage: 1 },
      theme: { mode: 'light' as const },
    },
  });

  const view = render(
    <Provider store={store}>
      <EpisodeDrawer />
    </Provider>,
  );

  return { store, ...view };
}

describe('EpisodeDrawer', () => {
  it('renders loading skeletons', () => {
    vi.mocked(useQuery).mockReturnValue({ data: undefined, loading: true, error: undefined } as never);
    renderDrawer();

    const skeletons = document.body.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders error alert', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: undefined,
      loading: false,
      error: { message: 'boom' },
    } as never);

    renderDrawer();
    expect(screen.getByText('Error Loading Details')).toBeInTheDocument();
  });

  it('closes drawer and clears selection', () => {
    vi.mocked(useQuery).mockReturnValue({ data: undefined, loading: false, error: undefined } as never);
    const { store } = renderDrawer();

    const closeButton = screen.getAllByRole('button')[0];
    fireEvent.click(closeButton);

    const state = store.getState();
    expect(state.ui.drawerOpen).toBe(false);
    expect(state.episodes.selectedEpisodeId).toBeNull();
  });
});
