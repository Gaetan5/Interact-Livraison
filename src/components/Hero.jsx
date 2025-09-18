import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="home-hero">
      <h1 className="hero-title">Livrez, gagnez, étudiez serein</h1>
      <p className="hero-subtext">Une plateforme pensée pour les étudiants au Cameroun: courses rapides, géolocalisation instantanée, paiements mobiles sécurisés.</p>
      <div className="hero-cta-row">
        <Link className="primary-link" to="/devenir-livreur">Devenir livreur</Link>
        <Link className="primary-link" to="/demander">Demander une course</Link>
      </div>
    </section>
  );
}
