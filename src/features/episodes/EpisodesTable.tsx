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
  Button,
  IconButton,
  Tooltip,
  Box, 
  Toolbar,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { selectEpisode } from './episodesSlice';
import { openDrawer, toggleIdColumn } from '../ui/uiSlice';
import type { Episode } from '../../types/episode';
import { useState } from 'react';

interface EpisodesTableProps {
  episodes: Episode[];
  showId: boolean;
}

export default function EpisodesTable({ episodes, showId }: EpisodesTableProps) {
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
      dispatch(selectEpisode(selectedId)); // Solo ID
      dispatch(openDrawer());
    }
    handleMenuClose();
  };

  const handleToggleId = () => {
    dispatch(toggleIdColumn());
  };

   return (
    <Box>
      <Toolbar>
        <Tooltip title={showId ? "Ocultar ID" : "Mostrar ID"}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleToggleId}
            startIcon={showId ? <VisibilityOffIcon /> : <VisibilityIcon />}
          >
            Toggle ID
          </Button>
        </Tooltip>
      </Toolbar>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Episode</TableCell>
              <TableCell>Air Date</TableCell>
              <TableCell>Created</TableCell>
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
    </Box>
  );
}