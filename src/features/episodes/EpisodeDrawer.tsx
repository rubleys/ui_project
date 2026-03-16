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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { closeDrawer } from '../ui/uiSlice';
import { clearSelection } from './episodesSlice';
import { useQuery } from '@apollo/client/react';
import type { GetEpisodeDetailQuery, GetEpisodeDetailVariables } from '../../types/graphql';
import { GET_EPISODE_DETAIL } from '../../graphql/queries';
import type { Character, Episode } from '../../types/episode';

export default function EpisodeDrawer() {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.ui.drawerOpen);
  const selectedId = useSelector((state: RootState) => state.episodes.selectedEpisodeId);

  const { data, loading, error } = useQuery<GetEpisodeDetailQuery, GetEpisodeDetailVariables>(GET_EPISODE_DETAIL, {
    variables: { id: selectedId! },
    skip: !selectedId,
  });

  const handleClose = () => {
    dispatch(closeDrawer());
    dispatch(clearSelection());
  };

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

        {loading && <Typography>Loading details...</Typography>}
        {error && <Typography>Error loading details</Typography>}

        {episode && (
          <>
            <Typography variant="h5" gutterBottom sx={{ fontSize: '1.2rem' }}>
              {episode.id} {episode.name}
            </Typography>
            <Typography variant="body1">Episode: {episode.episode}</Typography>
            <Typography variant="body1">Air date: {episode.air_date}</Typography>
            <Typography variant="body1">
              Created: {new Date(episode.created).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Typography>
             <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ mt: 2, fontSize: '1.2rem' }}>
              Characters
            </Typography>

            <List>
              {episode.characters?.map((ch: Character) => (
                <ListItem key={ch.id} sx={{ display: 'flex', gap: 2 }}>
                  <ListItemAvatar>
                    <Avatar src={ch.image} alt={ch.name} sx={{ width: 56, height: 56 }} />  {/* Avatar más grande */}
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