import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Citas from './pages/Citas';
import CitaDetalle from './pages/CitaDetalle';
import NotFound from './pages/NotFound';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Inicio</Link>
        <Link to="/citas">Ver Citas</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/cita/:id" element={<CitaDetalle />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;