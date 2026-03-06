import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import EpisodesPage from './features/episodes/EpisodesPage';
import DashboardPage from './features/dashboard/DashboardPage';
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeToggleButton from './features/theme/ThemeToggleButton';


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
      <nav style={{ 
  padding: 20, 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center' 
}}>
  <div>
    <Link to="/">Inicio</Link> | <Link to="/episodes">Episodios</Link>
  </div>

  <ThemeToggleButton />
</nav>

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/episodes" element={<EpisodesPage />} />
      </Routes>

    </ThemeProvider>
  )
}

export default App
