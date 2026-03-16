import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { useEpisodes } from './useEpisodes';
import EpisodesTable from './EpisodesTable';
import EpisodeDrawer from './EpisodeDrawer';
import { Typography, Pagination, Box } from '@mui/material';
import { setCurrentPage } from '../ui/uiSlice';

export default function EpisodesPage() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.ui.currentPage);
  const showId = useSelector((state: RootState) => state.ui.showIdColumn);

  const { data, loading, error } = useEpisodes(currentPage, false);

  const episodes = data?.episodes?.results || [];
  const totalPages = data?.episodes?.info?.pages || 1;

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentPage(page));
  };

  // Show error only if there's no data to display
  if (error && episodes.length === 0) return <Typography>Error: failed to load episodes.</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Episodes</Typography>
      
      <EpisodesTable episodes={episodes} showId={showId} loading={loading}/>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          disabled={loading}  // Disable pagination while loading
        />
      </Box>
      <EpisodeDrawer />
    </Box>
  );
}