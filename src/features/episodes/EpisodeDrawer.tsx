import {
  Drawer,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { closeDrawer } from './episodesSlice';
import { useQuery } from '@apollo/client/react';
import { GET_EPISODE_DETAIL } from '../../graphql/queries';

export default function EpisodeDrawer() {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.episodes.drawerOpen);
  const selected = useSelector((state: RootState) => state.episodes.selected);

  const id = selected?.id;

  const { data, loading, error } = useQuery(GET_EPISODE_DETAIL, {
    variables: { id },
    skip: !id,
  });

  const handleClose = () => {
    dispatch(closeDrawer());
  };

  const episode = data?.episode ?? selected;

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box sx={{ width: 400, p: 2 }}>
        {loading && <Typography>Cargando detalle...</Typography>}
        {error && <Typography>Error al cargar detalle</Typography>}

        {episode && (
          <>
            <Typography variant="h6" gutterBottom>
              {episode.id} {episode.name}
            </Typography>
            <Typography variant="body2">Episode: {episode.episode}</Typography>
            <Typography variant="body2">Air date: {episode.air_date}</Typography>
            <Typography variant="body2">
              Created: {new Date(episode.created).toLocaleDateString()}
            </Typography>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Characters
            </Typography>

            <List dense>
              {episode.characters?.map((ch: any) => (
                <ListItem key={ch.id}>
                  <ListItemAvatar>
                    <Avatar src={ch.image} alt={ch.name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={ch.name}
                    secondary={`${ch.species} • ${ch.status}`}
                  />
                </ListItem>
              )) || (
                <Typography variant="body2">
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