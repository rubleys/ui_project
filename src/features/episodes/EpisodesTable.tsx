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
  Skeleton,
  Typography,
} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { selectEpisode } from './episodesSlice';
import { openDrawer, toggleIdColumn } from '../ui/uiSlice';
import type { Episode } from '../../types/episode';
import { useState, useCallback, useMemo, memo } from 'react';
import { formatDate } from '../../utils/dateHelper';

const EpisodeRow = memo(({ ep, showId, isMobile, onMenuOpen }: {
  ep: Episode;
  showId: boolean;
  isMobile: boolean;
  onMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}) => (
  <TableRow hover>
    <TableCell>
      <IconButton onClick={(event) => onMenuOpen(event, ep.id)}>
        <MoreVertIcon />
      </IconButton>
    </TableCell>
    {showId && <TableCell>{ep.id}</TableCell>}
    <TableCell>{ep.name}</TableCell>
    <TableCell>{ep.episode}</TableCell>
    <TableCell>{ep.air_date}</TableCell>
    {!isMobile && <TableCell>{formatDate(ep.created)}</TableCell>}
  </TableRow>
));

interface EpisodesTableProps {
  episodes: Episode[];
  showId: boolean;
  loading?: boolean;
}

export default function EpisodesTable({ episodes, showId, loading = false }: EpisodesTableProps) {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:768px)');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    setSelectedId(null);
  }, []);

  const handleView = useCallback(() => {
    if (selectedId) {
      dispatch(selectEpisode(selectedId));
      dispatch(openDrawer());
    }
    handleMenuClose();
  }, [selectedId, dispatch]);

  const handleToggleId = useCallback(() => {
    dispatch(toggleIdColumn());
  }, [dispatch]);

 const renderSkeletons = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => (
      <TableRow key={`skeleton-${index}`}>
        <TableCell><Skeleton /></TableCell>
        <TableCell><Skeleton /></TableCell>
        <TableCell><Skeleton /></TableCell>
        <TableCell><Skeleton /></TableCell>
        <TableCell><Skeleton /></TableCell>
        {showId && <TableCell><Skeleton /></TableCell>}
      </TableRow>
    ));
  }, [showId]);

   return (
    <Box>
     <Toolbar>
        <Typography variant="h5">Episodes List</Typography>
        <Box sx={{ flexGrow: 1 }} /> 
        <Tooltip title={showId ? "Hide ID" : "Show ID"}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleToggleId}
            startIcon={showId ? <VisibilityOffIcon /> : <VisibilityIcon />}
          >
            {showId ? "Hide Id" : "Show Id"}
          </Button>
        </Tooltip>
      </Toolbar>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              {showId && <TableCell>ID</TableCell>}
              <TableCell>Name</TableCell>
              <TableCell>Episode</TableCell>
              <TableCell>Air Date</TableCell>
              {!isMobile && <TableCell>Created</TableCell>} 
              
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              renderSkeletons
            ) : episodes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={showId ? 5 : 4} align="center" sx={{ py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No episodes available.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            episodes.map((ep) => (
              <EpisodeRow
                key={ep.id}
                ep={ep}
                showId={showId}
                isMobile={isMobile}
                onMenuOpen={handleMenuOpen}
              />
              ))
            )}
          </TableBody>
        </Table>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleView}>View</MenuItem>
        </Menu>
      </TableContainer>
    </Box>
  );
}