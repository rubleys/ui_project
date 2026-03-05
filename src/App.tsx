import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import EpisodesPage from './features/episodes/EpisodesPage';

function App() {
  

  return (
    <>
      <nav style={{ padding: 20 }}>
        <Link to="/">Inicio</Link> | <Link to="/episodes">Episodios</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Dashboard</h1>} />
        <Route path="/episodes" element={<EpisodesPage />} />
      </Routes>

    </>
  )
}

export default App
