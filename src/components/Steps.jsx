export default function Steps() {
  const steps = [
    { title: '1. Publiez', text: 'Le client décrit le retrait et la livraison (adresse, détails, prix estimé).' },
    { title: '2. Assignez', text: 'Le livreur proche accepte. Suivi live et notifications.' },
    { title: '3. Livrez & créditez', text: 'À la livraison, le portefeuille du livreur est crédité. Commissions automatiques.' },
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
