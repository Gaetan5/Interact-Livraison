import { useI18n } from '../state/I18nContext.jsx';

export default function FAQ() {
  const { t } = useI18n();
  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
  ];
  return (
    <section className="faq-section">
      <h2 className="section-title">{t('faq.title')}</h2>
      <div className="faq-list">
        {faqs.map((f) => (
          <details className="faq-item" key={f.q}>
            <summary className="faq-question">{f.q}</summary>
            <p className="faq-answer">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
