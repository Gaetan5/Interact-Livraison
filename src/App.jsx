import './styles.css';
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
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
        <header className="top-nav" role="banner">
          <a href="#main" className="skip-link">Aller au contenu</a>
          <Link className="brand" to="/" aria-label={t('nav.home')}>{t('brand')}</Link>
          <nav className="nav-links" aria-label="Navigation principale">
            <NavLink className={({isActive}) => `nav-link${isActive ? ' is-active' : ''}`} to="/">{t('nav.home')}</NavLink>
            <NavLink className={({isActive}) => `nav-link${isActive ? ' is-active' : ''}`} to="/demander">{t('nav.request')}</NavLink>
            <NavLink className={({isActive}) => `nav-link${isActive ? ' is-active' : ''}`} to="/devenir-livreur">{t('nav.courier')}</NavLink>
            <NavLink className={({isActive}) => `nav-link${isActive ? ' is-active' : ''}`} to="/carte">{t('nav.map')}</NavLink>
            <NavLink className={({isActive}) => `nav-link${isActive ? ' is-active' : ''}`} to="/portefeuille">{t('nav.wallet')}</NavLink>
          </nav>
          <div className="nav-right">
            <LangSwitch />
            <ThemeToggle />
            <AuthPanel />
          </div>
        </header>
        <div className="page-wrap" id="main">
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
