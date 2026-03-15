import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { useEpisodes } from './useEpisodes';
import EpisodesTable from './EpisodesTable';
import EpisodeDrawer from './EpisodeDrawer';
import { CircularProgress, Typography } from '@mui/material';

export default function EpisodesPage() {
  const currentPage = useSelector((state: RootState) => state.ui.currentPage);
  const showId = useSelector((state: RootState) => state.ui.showIdColumn);

  // Usar Apollo directamente, sin skip para simplificar (cache maneja)
  const { data, loading, error } = useEpisodes(currentPage, false);

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error al cargar episodios</Typography>;

  const episodes = data?.episodes?.results || [];

  return (
    <div>
      <Typography variant="h4" gutterBottom>Episodios</Typography>
      <EpisodesTable episodes={episodes} showId={showId} />
      <EpisodeDrawer />
    </div>
  );
}