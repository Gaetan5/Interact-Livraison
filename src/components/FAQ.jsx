export default function FAQ() {
  const faqs = [
    { q: 'Comment devenir livreur ?', a: 'Inscrivez-vous avec votre numéro. Vérification simple (pièce/eng in plus tard). Vous choisissez vos disponibilités.' },
    { q: 'Comment sont gérés les paiements ?', a: 'Portefeuille crédité après livraison. Retraits via MTN MoMo ou Orange Money. Commissions appliquées automatiquement.' },
    { q: 'Est-ce compatible avec les études ?', a: 'Oui, le modèle est flexible: activez-vous quand vous êtes disponible (soirées, week-end, entre les cours).' },
  ];
  return (
    <section className="faq-section">
      <h2 className="section-title">Questions fréquentes</h2>
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
