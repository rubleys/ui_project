import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { useEpisodes } from './useEpisodes';
import EpisodesTable from './EpisodesTable';
import EpisodeDrawer from './EpisodeDrawer';
import { Typography, Pagination, Box } from '@mui/material';
import { setCurrentPage } from '../ui/uiSlice';
import { Alert, AlertTitle } from '@mui/material';
import { useEffect } from 'react';

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

  // Reset to first page on unmount
  useEffect(() => {
    return () => {
      dispatch(setCurrentPage(1)); 
    };
  }, [dispatch]);

  // empty state
  if (!loading && !error && episodes.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6">No episodes found.</Typography>
        <Typography variant="body2" color="text.secondary">
          Try refreshing or check your connection.
        </Typography>
      </Box>
    );
  }

  // improve error state with MUI Alert
  if (error && episodes.length === 0) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        <AlertTitle>Error Loading Episodes</AlertTitle>
        {error.message || 'An unexpected error occurred.'}
      </Alert>
    );
  }

  return (
    <Box>
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