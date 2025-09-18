import { useMemo, useState } from 'react';
import { useAuth } from '../state/AuthContext.jsx';

export default function AuthPanel() {
  const { user, signIn, verifyOtp, signOut } = useAuth();
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');

  if (user) {
    const short = useMemo(() => `+237 ${user.phone}`.slice(0, 16) + '…', [user.phone]);
    return (
      <div className="account-chip">
        <span className="chip-badge">Connecté</span>
        <span className="chip-text">{short}</span>
        <button className="chip-action" onClick={signOut}>Quitter</button>
      </div>
    );
  }

  return (
    <div className="auth-box">
      {step === 'phone' && (
        <form onSubmit={async (e)=>{e.preventDefault(); setErr(''); const ok = await signIn(phone); if(ok){ setStep('otp'); } else { setErr('Impossible d’envoyer l’OTP'); } }} className="auth-row">
          <input className="input-control" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Téléphone (Ex: 6xx xxx xxx)" />
          <button className="primary-link" type="submit">Recevoir OTP</button>
        </form>
      )}
      {step === 'otp' && (
        <form onSubmit={async (e)=>{e.preventDefault(); setErr(''); const ok = await verifyOtp(code); if(!ok){ setErr('Code invalide. Utilisez 123456'); } }} className="auth-row">
          <input className="input-control" value={code} onChange={(e)=>setCode(e.target.value)} placeholder="Code OTP (123456)" />
          <button className="primary-link" type="submit">Valider</button>
        </form>
      )}
      {err && <div className="error-text">{err}</div>}
    </div>
  );
}
