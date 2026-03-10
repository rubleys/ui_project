import './App.css'
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


function App() {
  const mode = useSelector((state: RootState) => state.theme.mode);

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          
          {/* Navegación */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Home
            </Typography>

            <Typography variant="h6" component={Link} to="/episodes" style={{ textDecoration: 'none', color: 'inherit' }}>
              Episodes
            </Typography>
          </Box>

          {/* Botón de tema */}
          <ThemeToggleButton />
        </Toolbar>
      </AppBar>


      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/episodes" element={<EpisodesPage />} />
      </Routes>

    </ThemeProvider>
  )
}

export default App
