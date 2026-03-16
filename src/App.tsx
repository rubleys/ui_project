//import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import EpisodesPage from './features/episodes/EpisodesPage';
import DashboardPage from './features/dashboard/DashboardPage';
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeToggleButton from './features/theme/ThemeToggleButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useMediaQuery, Menu, MenuItem, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


function App() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery('(max-width:768px)'); // Simple breakpoint

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  

  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={1}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
              Rick & Morty
            </Typography>
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Typography variant="body1" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
                  Home
                </Typography>
                <Typography variant="body1" component={Link} to="/episodes" sx={{ textDecoration: 'none', color: 'inherit' }}>
                  Episodes
                </Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <MenuIcon />
              </IconButton>
            )}
            <ThemeToggleButton />
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem component={Link} to="/" onClick={handleMenuClose}>Home</MenuItem>
        <MenuItem component={Link} to="/episodes" onClick={handleMenuClose}>Episodes</MenuItem>
      </Menu>

      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: 'background.default' }}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/episodes" element={<EpisodesPage />} />
        </Routes>
      </Box>
    </Box>
  </ThemeProvider>
);
}

export default App
