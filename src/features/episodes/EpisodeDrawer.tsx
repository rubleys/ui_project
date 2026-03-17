import {
  Drawer,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Divider,
  Skeleton,
  Alert,
  AlertTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { closeDrawer } from '../ui/uiSlice';
import { clearSelection } from './episodesSlice';
import { useQuery } from '@apollo/client/react';
import type { GetEpisodeDetailQuery, GetEpisodeDetailVariables } from '../../types/graphql';
import { GET_EPISODE_DETAIL } from '../../graphql/queries';
import type { Character, Episode } from '../../types/episode';
import { formatDate } from '../../utils/dateHelper';
import { selectSelectedEpisodeId } from './selectors';
import { selectDrawerOpen } from '../ui/selectors';
import { useCallback } from 'react';

export default function EpisodeDrawer() {
  const dispatch = useDispatch();
  const open = useSelector(selectDrawerOpen);
  const selectedId = useSelector(selectSelectedEpisodeId);

  const { data, loading, error } = useQuery<GetEpisodeDetailQuery, GetEpisodeDetailVariables>(GET_EPISODE_DETAIL, {
    variables: { id: selectedId! },
    skip: !selectedId,
  });

  const handleClose = useCallback(() => {
    dispatch(closeDrawer());
    dispatch(clearSelection());
  }, [dispatch]);

  const episode: Episode | undefined = data?.episode;

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box sx={{ width: 450, p: 3, position: 'relative' }}>
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {loading && (
          <Box>
            <Skeleton variant="text" width="60%" height={40} />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="text" width="45%" />
            <Divider sx={{ my: 2 }} />
            <Skeleton variant="text" width="30%" height={30} />
            <List>
              {Array.from({ length: 3 }, (_, i) => (
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Skeleton variant="circular" width={56} height={56} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Skeleton width="60%" />}
                    secondary={<Skeleton width="40%" />}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {error && (
          <Alert severity="error">
            <AlertTitle>Error Loading Details</AlertTitle>
            {error.message || 'Failed to load episode details.'}
          </Alert>
        )}

        {episode && (
          <>
            <Typography variant="h5" gutterBottom sx={{ fontSize: '1.2rem' }}>
              {episode.id} {episode.name}
            </Typography>
            <Typography variant="body1">Episode: {episode.episode}</Typography>
            <Typography variant="body1">Air date: {episode.air_date}</Typography>
            <Typography variant="body1">
              Created: {formatDate(episode.created)}
            </Typography>
             <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ mt: 2, fontSize: '1.2rem' }}>
              Characters
            </Typography>

            <List>
              {episode.characters?.map((ch: Character) => (
                <ListItem key={ch.id} sx={{ display: 'flex', gap: 2 }}>
                  <ListItemAvatar>
                    <Avatar src={ch.image} alt={ch.name} sx={{ width: 56, height: 56 }} /> 
                  </ListItemAvatar>
                  <ListItemText
                    primary={ch.name}
                    secondary={`${ch.species} • ${ch.status}`}
                  />
                </ListItem>
              )) || (
                <Typography variant="body1">
                  No character data available.
                </Typography>
              )}
            </List>
          </>
        )}
      </Box>
    </Drawer>
  );
}