export default function BecomeCourier() {
  return (
    <section className="page-section">
      <h2 className="section-title">Devenir livreur</h2>
      <p className="section-subtext">Inscription avec OTP SMS, validation pièce d'identité et engin. Gagnez sur chaque course (+ commissions).</p>
      <form className="form-grid" onSubmit={(e)=>e.preventDefault()}>
        <label className="form-field">
          <span className="label-text">Nom complet</span>
          <input className="input-control" placeholder="Ex: Jean Doe" />
        </label>
        <label className="form-field">
          <span className="label-text">Téléphone (OTP)</span>
          <input className="input-control" placeholder="Ex: 6xx xxx xxx" />
        </label>
        <div className="action-row">
          <button className="primary-link" type="submit">Recevoir OTP</button>
        </div>
      </form>
    </section>
  );
}
