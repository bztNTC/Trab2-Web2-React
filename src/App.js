import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Inicio from './Inicio';
import './App.css';
import Modal from './modal';
import Jogos from './Jogos';
import Salas from './Salas';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/" className="logo">LetsPlay!</Link>
            <ul className="nav-list">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/jogos">Jogos</Link></li>
              <li><Link to="/salas">Salas</Link></li>
            </ul>
          </nav>
        </header>
        
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/jogos" element={<Jogos />} />
          <Route path="/salas" element={<Salas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
