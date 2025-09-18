import { supabase } from '../lib/supabase.js';
import Hero from '../components/Hero.jsx';
import FeatureGrid from '../components/FeatureGrid.jsx';
import Steps from '../components/Steps.jsx';

export default function Home() {
  const connected = !!supabase;
  return (
    <div className="home-page">
      <main className="app-shell">
        <div className="status-badge">{connected ? 'Supabase connecté' : 'Mode local'}</div>
        <h1 className="heading">Votre serveur est prêt</h1>
        <p className="subtext">Application de livraison contextualisée Cameroun. Port 3000.</p>
        {!connected && <p className="section-subtext">Pour activer l’auth SMS et le portefeuille en temps réel: Connectez Supabase et ajoutez VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.</p>}
        <div className="action-row">
          <a className="primary-link" href="/">Actualiser</a>
        </div>
      </main>

      <Hero />
      <FeatureGrid />
      <Steps />
    </div>
  );
}
