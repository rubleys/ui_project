import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { selectEpisode, openDrawer } from './episodesSlice';
import { IconButton, Tooltip, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toggleIdColumn } from './episodesSlice';


export default function EpisodesTable() {
  const episodes = useSelector((state: RootState) => state.episodes.list);
  const showId = useSelector((state: RootState) => state.episodes.showIdColumn);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const handleView = () => {
    if (selectedId) {
      const episode = episodes.find((e) => e.id === selectedId);
      dispatch(selectEpisode(episode));
      dispatch(openDrawer());
    }
    handleMenuClose();
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
  <TableRow>
    <TableCell>Actions</TableCell>
    <TableCell>Name</TableCell>
    <TableCell>Episode</TableCell>
    <TableCell>Air Date</TableCell>
    <TableCell>Created</TableCell>

    {/* Celda del botón dentro del header */}
    <TableCell align="right">
      <Tooltip title={showId ? "Ocultar ID" : "Mostrar ID"}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => dispatch(toggleIdColumn())}
          startIcon={showId ? <VisibilityOffIcon /> : <VisibilityIcon />}
        >
          {/* Sin texto, solo el ícono */}
        </Button>
      </Tooltip>
    </TableCell>

    {/* Header de la columna ID (solo si está activa) */}
    {showId && <TableCell>ID</TableCell>}
  </TableRow>
</TableHead>


        <TableBody>
          {episodes.map((ep) => (
            <TableRow key={ep.id}>
              <TableCell>
                <IconButton onClick={(e) => handleMenuOpen(e, ep.id)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>

              <TableCell>{ep.name}</TableCell>
              <TableCell>{ep.episode}</TableCell>
              <TableCell>{ep.air_date}</TableCell>
              <TableCell>{new Date(ep.created).toLocaleDateString()}</TableCell>
              {showId && <TableCell>{ep.id}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleView}>View</MenuItem>
      </Menu>
    </TableContainer>
  );
}