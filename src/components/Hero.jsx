import { Link } from 'react-router-dom';
import { useI18n } from '../state/I18nContext.jsx';

export default function Hero() {
  const { t } = useI18n();
  return (
    <section className="home-hero">
      <h1 className="hero-title">{t('hero.title')}</h1>
      <p className="hero-subtext">{t('hero.subtitle')}</p>
      <div className="hero-cta-row">
        <Link className="primary-link" to="/devenir-livreur">{t('hero.ctaCourier')}</Link>
        <Link className="primary-link" to="/demander">{t('hero.ctaRequest')}</Link>
      </div>
    </section>
  );
}
