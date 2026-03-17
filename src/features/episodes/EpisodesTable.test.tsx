import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import episodesReducer from './episodesSlice';
import EpisodesTable from './EpisodesTable';
import themeReducer from '../theme/themeSlice';
import uiReducer from '../ui/uiSlice';
import type { Episode } from '../../types/episode';

const episode: Episode = {
  id: '1',
  name: 'Pilot',
  air_date: 'December 2, 2013',
  episode: 'S01E01',
  created: '2017-11-10T12:56:33.798Z',
};

function renderWithStore(ui: React.ReactElement) {
  const store = configureStore({
    reducer: {
      episodes: episodesReducer,
      ui: uiReducer,
      theme: themeReducer,
    },
  });

  const view = render(<Provider store={store}>{ui}</Provider>);
  return { store, ...view };
}

describe('EpisodesTable', () => {
  it('renders empty state', () => {
    renderWithStore(<EpisodesTable episodes={[]} showId={true} loading={false} />);
    expect(screen.getByText('No episodes available.')).toBeInTheDocument();
  });

  it('renders skeleton rows when loading', () => {
    const { container } = renderWithStore(
      <EpisodesTable episodes={[]} showId={true} loading={true} />,
    );

    const skeletons = container.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('opens action menu and dispatches view flow', () => {
    const { store, container } = renderWithStore(
      <EpisodesTable episodes={[episode]} showId={true} loading={false} />,
    );

    const actionButton = container.querySelector('tbody button');
    expect(actionButton).toBeTruthy();

    fireEvent.click(actionButton!);
    fireEvent.click(screen.getByText('View'));

    const state = store.getState();
    expect(state.episodes.selectedEpisodeId).toBe('1');
    expect(state.ui.drawerOpen).toBe(true);
  });
});
