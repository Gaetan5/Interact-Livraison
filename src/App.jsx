import './styles.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './state/AuthContext.jsx';
import { ThemeProvider } from './state/ThemeContext.jsx';
import { I18nProvider, useI18n } from './state/I18nContext.jsx';
import AuthPanel from './components/AuthPanel.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import LangSwitch from './components/LangSwitch.jsx';
import Home from './pages/Home.jsx';
import RequestDelivery from './pages/RequestDelivery.jsx';
import BecomeCourier from './pages/BecomeCourier.jsx';
import LiveMap from './pages/LiveMap.jsx';
import Wallet from './pages/Wallet.jsx';

function Shell() {
  const { t } = useI18n();
  return (
    <AuthProvider>
      <BrowserRouter>
        <header className="top-nav">
          <div className="brand">{t('brand')}</div>
          <nav className="nav-links">
            <Link className="nav-link" to="/">{t('nav.home')}</Link>
            <Link className="nav-link" to="/demander">{t('nav.request')}</Link>
            <Link className="nav-link" to="/devenir-livreur">{t('nav.courier')}</Link>
            <Link className="nav-link" to="/carte">{t('nav.map')}</Link>
            <Link className="nav-link" to="/portefeuille">{t('nav.wallet')}</Link>
          </nav>
          <div className="nav-right">
            <LangSwitch />
            <ThemeToggle />
            <AuthPanel />
          </div>
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
    </AuthProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Shell />
      </I18nProvider>
    </ThemeProvider>
  );
}
