export default function RequestDelivery() {
  return (
    <section className="page-section">
      <h2 className="section-title">Demander une course</h2>
      <form className="form-grid" onSubmit={(e)=>e.preventDefault()}>
        <label className="form-field">
          <span className="label-text">Point de retrait</span>
          <input className="input-control" type="text" autoComplete="street-address" placeholder="Adresse complète" />
        </label>
        <label className="form-field">
          <span className="label-text">Point de livraison</span>
          <input className="input-control" type="text" autoComplete="street-address" placeholder="Adresse complète" />
        </label>
        <label className="form-field">
          <span className="label-text">Détails colis</span>
          <input className="input-control" type="text" autoComplete="off" placeholder="Taille, fragilité, remarques" />
        </label>
        <div className="action-row">
          <button className="primary-link" type="submit">Calculer et publier</button>
        </div>
      </form>
    </section>
  );
}
