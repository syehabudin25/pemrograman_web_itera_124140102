import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import StatsPage from './pages/Stats/Stats';

function App() {
  return (
    <div className="app">
      <h1>Manajemen Buku Pribadi</h1>
      <nav>
        <NavLink to="/">Daftar Buku</NavLink>
        <NavLink to="/statistik">Statistik</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/statistik" element={<StatsPage />} />
      </Routes>
    </div>
  );
}

export default App;
