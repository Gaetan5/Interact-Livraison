import { useI18n } from '../state/I18nContext.jsx';

export default function Steps() {
  const { t } = useI18n();
  const steps = [
    { title: t('steps.s1t'), text: t('steps.s1d') },
    { title: t('steps.s2t'), text: t('steps.s2d') },
    { title: t('steps.s3t'), text: t('steps.s3d') },
  ];
  return (
    <section className="steps">
      {steps.map((s) => (
        <div className="step-item" key={s.title}>
          <h4 className="step-title">{s.title}</h4>
          <p className="step-text">{s.text}</p>
        </div>
      ))}
    </section>
  );
}
