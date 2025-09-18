import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

function Locator({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, 14);
  }, [position, map]);
  if (!position) return null;
  return (
    <>
      <CircleMarker center={position} radius={10} pathOptions={{ color: '#4ea1ff' }} />
      <Popup position={position}>Vous êtes ici</Popup>
    </>
  );
}

export default function LiveMap() {
  const [pos, setPos] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    const id = navigator.geolocation.watchPosition(
      (p) => setPos([p.coords.latitude, p.coords.longitude]),
      () => {},
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return (
    <section className="page-section">
      <h2 className="section-title">Carte en temps réel</h2>
      <div className="map-frame">
        <MapContainer center={pos || [3.848, 11.502]} zoom={13} className="map-canvas">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
          <Locator position={pos} />
        </MapContainer>
      </div>
      <p className="section-subtext">Activez la localisation pour voir votre position. Source: OpenStreetMap.</p>
    </section>
  );
}
