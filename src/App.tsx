import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import EpisodesPage from './features/episodes/EpisodesPage';
import DashboardPage from './features/dashboard/DashboardPage';

function App() {
  

  return (
    <>
      <nav style={{ padding: 20 }}>
        <Link to="/">Inicio</Link> | <Link to="/episodes">Episodios</Link>
      </nav>

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/episodes" element={<EpisodesPage />} />
      </Routes>

    </>
  )
}

export default App
