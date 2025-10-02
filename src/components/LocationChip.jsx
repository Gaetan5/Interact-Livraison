import { useEffect, useState } from 'react';

function cityFromLatLng(lat, lng) {
  if (lat == null || lng == null) return null;
  // Approx bounding boxes
  // Douala: 3.95..4.15 N, 9.55..9.85 E
  if (lat >= 3.95 && lat <= 4.15 && lng >= 9.55 && lng <= 9.85) return 'Douala';
  // Yaoundé: 3.75..3.95 N, 11.40..11.60 E
  if (lat >= 3.75 && lat <= 3.95 && lng >= 11.40 && lng <= 11.60) return 'Yaoundé';
  return 'Cameroun';
}

export default function LocationChip() {
  const [label, setLabel] = useState('Cameroun');

  useEffect(() => {
    if (!navigator.geolocation) return;
    const id = navigator.geolocation.watchPosition(
      (p) => {
        const { latitude, longitude } = p.coords;
        setLabel(cityFromLatLng(latitude, longitude));
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 60000 }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return (
    <div className="city-chip" title="Localisation approximative">
      <span className="chip-badge">Ville</span>
      <span className="chip-text">{label}</span>
    </div>
  );
}
