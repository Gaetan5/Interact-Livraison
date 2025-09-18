export default function Wallet() {
  return (
    <section className="page-section">
      <h2 className="section-title">Portefeuille</h2>
      <div className="wallet-card">
        <div className="wallet-balance">
          <span className="balance-label">Solde disponible</span>
          <span className="balance-amount">0 FCFA</span>
        </div>
        <div className="action-row">
          <button className="primary-link" type="button">Recharger</button>
          <button className="primary-link" type="button">Retirer</button>
        </div>
      </div>
      <p className="section-subtext">Crédité par les clients après livraison. Commissions appliquées automatiquement.</p>
    </section>
  );
}
