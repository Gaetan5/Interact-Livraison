import { Link } from 'react-router-dom';

export default function StickyCTA() {
  return (
    <div className="sticky-cta" role="region" aria-label="Devenir livreur">
      <div className="sticky-text">Prêt à gagner avec vos trajets libres ?</div>
      <Link className="primary-link" to="/devenir-livreur">Devenir livreur</Link>
    </div>
  );
}
