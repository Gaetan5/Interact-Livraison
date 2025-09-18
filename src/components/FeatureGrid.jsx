export default function FeatureGrid() {
  const items = [
    { title: 'Gains flexibles', text: 'Choisissez vos disponibilités. Gagnez sur chaque course + bonus.', icon: '💼' },
    { title: 'Localisation instantanée', text: 'Suivi en temps réel pour livrer plus vite et en sécurité.', icon: '📍' },
    { title: 'Paiements mobiles', text: 'MTN MoMo et Orange Money pris en charge pour recharges et retraits.', icon: '💳' },
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
