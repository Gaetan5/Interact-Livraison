import './styles.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import RequestDelivery from './pages/RequestDelivery.jsx';
import BecomeCourier from './pages/BecomeCourier.jsx';
import LiveMap from './pages/LiveMap.jsx';
import Wallet from './pages/Wallet.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <header className="top-nav">
        <div className="brand">Interact Livraison</div>
        <nav className="nav-links">
          <Link className="nav-link" to="/">Accueil</Link>
          <Link className="nav-link" to="/demander">Demander</Link>
          <Link className="nav-link" to="/devenir-livreur">Devenir livreur</Link>
          <Link className="nav-link" to="/carte">Carte live</Link>
          <Link className="nav-link" to="/portefeuille">Portefeuille</Link>
        </nav>
      </header>
      <div className="page-wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demander" element={<RequestDelivery />} />
          <Route path="/devenir-livreur" element={<BecomeCourier />} />
          <Route path="/carte" element={<LiveMap />} />
          <Route path="/portefeuille" element={<Wallet />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
