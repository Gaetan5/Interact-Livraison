import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

const LangCtx = createContext({ lang: 'fr', t: (k)=>k, setLang: ()=>{} });
const KEY = 'interact_lang_v1';

const dict = {
  fr: {
    brand: 'Interact Livraison',
    nav: { home: 'Accueil', request: 'Demander', courier: 'Devenir livreur', map: 'Carte live', wallet: 'Portefeuille' },
    home: {
      modeConnected: 'Supabase connecté', modeLocal: 'Mode local', heading: 'Votre serveur est prêt',
      subtext: 'Application de livraison contextualisée Cameroun. Port 3000.',
      enableSupabaseHint: 'Pour activer l’auth SMS et le portefeuille en temps réel: Connectez Supabase et ajoutez VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.',
      refresh: 'Actualiser'
    },
    hero: { title: 'Livrez, gagnez, étudiez serein', subtitle: 'Plateforme pensée pour les étudiants au Cameroun: courses rapides, géolocalisation instantanée, paiements mobiles sécurisés.', ctaCourier: 'Devenir livreur', ctaRequest: 'Demander une course' },
    features: {
      gainsTitle: 'Gains flexibles', gainsText: 'Choisissez vos disponibilités. Gagnez sur chaque course + bonus.',
      geoTitle: 'Localisation instantanée', geoText: 'Suivi en temps réel pour livrer plus vite et en sécurité.',
      payTitle: 'Paiements mobiles', payText: 'MTN MoMo et Orange Money pour recharges et retraits.'
    },
    steps: {
      s1t: '1. Publiez', s1d: 'Le client décrit retrait/livraison (adresse, détails, prix estimé).',
      s2t: '2. Assignez', s2d: 'Un livreur proche accepte. Suivi live et notifications.',
      s3t: '3. Livrez & créditez', s3d: 'À la livraison, le portefeuille est crédité. Commissions automatiques.'
    },
    faq: {
      title: 'Questions fréquentes',
      q1: 'Comment devenir livreur ?', a1: 'Inscrivez-vous avec votre numéro. Vérification simple. Disponibilités flexibles.',
      q2: 'Comment sont gérés les paiements ?', a2: 'Portefeuille crédité après livraison. Retraits via MTN MoMo/Orange Money.',
      q3: 'Compatible avec les études ?', a3: 'Oui, activez-vous quand vous êtes disponible (soirées, week-end, entre les cours).'
    }
  },
  en: {
    brand: 'Interact Delivery',
    nav: { home: 'Home', request: 'Request', courier: 'Become courier', map: 'Live map', wallet: 'Wallet' },
    home: {
      modeConnected: 'Supabase connected', modeLocal: 'Local mode', heading: 'Your server is ready',
      subtext: 'Delivery app contextualized for Cameroon. Port 3000.',
      enableSupabaseHint: 'To enable SMS auth and real-time wallet: Connect Supabase and add VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.',
      refresh: 'Refresh'
    },
    hero: { title: 'Deliver, earn, study with ease', subtitle: 'Built for students in Cameroon: fast jobs, instant geolocation, secure mobile payments.', ctaCourier: 'Become courier', ctaRequest: 'Request delivery' },
    features: {
      gainsTitle: 'Flexible earnings', gainsText: 'Choose availability. Earn per delivery + bonuses.',
      geoTitle: 'Instant geolocation', geoText: 'Real-time tracking for faster, safer deliveries.',
      payTitle: 'Mobile payments', payText: 'MTN MoMo and Orange Money for top-ups and withdrawals.'
    },
    steps: {
      s1t: '1. Post', s1d: 'Client describes pickup/dropoff (address, details, estimated price).',
      s2t: '2. Assign', s2d: 'Nearby courier accepts. Live tracking and notifications.',
      s3t: '3. Deliver & credit', s3d: 'Upon delivery, courier wallet is credited. Commissions auto-applied.'
    },
    faq: {
      title: 'Frequently asked questions',
      q1: 'How to become a courier?', a1: 'Sign up with your phone. Simple verification. Flexible availability.',
      q2: 'How are payments handled?', a2: 'Wallet credited after delivery. Withdraw via MTN MoMo/Orange Money.',
      q3: 'Compatible with studies?', a3: 'Yes, work when available (evenings, weekends, between classes).'
    }
  }
};

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem(KEY) || 'fr');
  useEffect(() => { localStorage.setItem(KEY, lang); }, [lang]);
  const t = (key) => key.split('.').reduce((o,k)=> (o && o[k] != null ? o[k] : null), dict[lang]) ?? key;
  const value = useMemo(() => ({ lang, setLang, t }), [lang]);
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useI18n() { return useContext(LangCtx); }
