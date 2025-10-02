import { supabase } from '../lib/supabase.js';
import Hero from '../components/Hero.jsx';
import FeatureGrid from '../components/FeatureGrid.jsx';
import Steps from '../components/Steps.jsx';
import FAQ from '../components/FAQ.jsx';
import StickyCTA from '../components/StickyCTA.jsx';
import { useI18n } from '../state/I18nContext.jsx';

export default function Home() {
  const connected = !!supabase;
  const { t } = useI18n();
  return (
    <div className="home-page">
      <main className="app-shell">
        <div className="status-badge">{connected ? t('home.modeConnected') : t('home.modeLocal')}</div>
        <h1 className="heading">{t('home.heading')}</h1>
        <p className="subtext">{t('home.subtext')}</p>
        {!connected && <p className="section-subtext">{t('home.enableSupabaseHint')}</p>}
        <div className="action-row">
          <a className="primary-link" href="/">{t('home.refresh')}</a>
        </div>
      </main>

      <Hero />
      <FeatureGrid />
      <Steps />
      <FAQ />
      <StickyCTA />
    </div>
  );
}
