import { useI18n } from '../state/I18nContext.jsx';

export default function FeatureGrid() {
  const { t } = useI18n();
  const items = [
    { title: t('features.gainsTitle'), text: t('features.gainsText'), icon: '💼' },
    { title: t('features.geoTitle'), text: t('features.geoText'), icon: '📍' },
    { title: t('features.payTitle'), text: t('features.payText'), icon: '💳' },
  ];
  return (
    <section className="feature-grid">
      {items.map((it) => (
        <article className="feature-card" key={it.title}>
          <div className="feature-icon" aria-hidden>{it.icon}</div>
          <h3 className="feature-title">{it.title}</h3>
          <p className="feature-text">{it.text}</p>
        </article>
      ))}
    </section>
  );
}
