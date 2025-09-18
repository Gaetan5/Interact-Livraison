export default function Home() {
  return (
    <main className="app-shell">
      <div className="status-badge">Environment ready</div>
      <h1 className="heading">Votre serveur est prêt</h1>
      <p className="subtext">Application de livraison contextualisée Cameroun. Port 3000.</p>
      <div className="action-row">
        <a className="primary-link" href="/">Actualiser</a>
      </div>
    </main>
  );
}
