import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../state/AuthContext.jsx';
import { supabase } from '../lib/supabase.js';
import { getWallet, getTransactions, walletCredit, walletDebit } from '../lib/db.js';

export default function Wallet() {
  const { user, wallet, credit, debit } = useAuth();
  const [showTopUp, setShowTopUp] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState('');
  const [remoteTx, setRemoteTx] = useState([]);
  const [remoteBalance, setRemoteBalance] = useState(null);

  useEffect(() => {
    (async () => {
      if (supabase && user) {
        const w = await getWallet();
        if (w.ok) setRemoteBalance(w.data?.balance ?? 0);
        const tx = await getTransactions();
        if (tx.ok) setRemoteTx(tx.data || []);
      }
    })();
  }, [user]);

  const formatted = useMemo(() => {
    const val = supabase && user && remoteBalance !== null ? remoteBalance : wallet.balance;
    return new Intl.NumberFormat('fr-FR').format(val);
  }, [wallet.balance, remoteBalance, user]);

  const submitTopUp = async (e) => {
    e.preventDefault();
    if (supabase && user) {
      const res = await walletCredit(Number(amount), 'Recharge manuelle');
      if (res.ok) {
        const w = await getWallet(); if (w.ok) setRemoteBalance(w.data?.balance ?? 0);
        const tx = await getTransactions(); if (tx.ok) setRemoteTx(tx.data || []);
        setAmount(''); setShowTopUp(false);
      }
      return;
    }
    if (credit(amount, { note: 'Recharge manuelle' })) { setAmount(''); setShowTopUp(false); }
  };

  const submitWithdraw = async (e) => {
    e.preventDefault();
    if (supabase && user) {
      const res = await walletDebit(Number(amount), 'Retrait manuel');
      if (res.ok) {
        const w = await getWallet(); if (w.ok) setRemoteBalance(w.data?.balance ?? 0);
        const tx = await getTransactions(); if (tx.ok) setRemoteTx(tx.data || []);
        setAmount(''); setShowWithdraw(false);
      }
      return;
    }
    if (debit(amount, { note: 'Retrait manuel' })) { setAmount(''); setShowWithdraw(false); }
  };

  return (
    <section className="page-section">
      <h2 className="section-title">Portefeuille</h2>
      <div className="wallet-card">
        <div className="wallet-balance">
          <span className="balance-label">Solde disponible</span>
          <span className="balance-amount">{formatted} FCFA</span>
        </div>
        <div className="action-row">
          <button className="primary-link" type="button" onClick={()=>setShowTopUp(true)}>Recharger</button>
          <button className="primary-link" type="button" onClick={()=>setShowWithdraw(true)}>Retirer</button>
        </div>
      </div>
      {!user && <p className="section-subtext">Connectez-vous pour synchroniser votre solde et retraits.</p>}
      {supabase && user ? <TransactionList items={remoteTx} remote /> : <TransactionList items={wallet.transactions} />}

      {showTopUp && (
        <Modal onClose={()=>setShowTopUp(false)} title="Recharger">
          <form onSubmit={submitTopUp} className="form-grid">
            <input className="input-control" inputMode="numeric" placeholder="Montant (FCFA)" value={amount} onChange={(e)=>setAmount(e.target.value)} />
            <button className="primary-link" type="submit">Confirmer</button>
          </form>
        </Modal>
      )}
      {showWithdraw && (
        <Modal onClose={()=>setShowWithdraw(false)} title="Retirer">
          <form onSubmit={submitWithdraw} className="form-grid">
            <input className="input-control" inputMode="numeric" placeholder="Montant (FCFA)" value={amount} onChange={(e)=>setAmount(e.target.value)} />
            <button className="primary-link" type="submit">Confirmer</button>
          </form>
        </Modal>
      )}
    </section>
  );
}

function TransactionList({ items }) {
  if (!items?.length) return <p className="section-subtext">Aucune transaction pour le moment.</p>;
  return (
    <div className="tx-list">
      {items.map((tx)=> (
        <div key={tx.id} className="tx-row">
          <span className={`tx-type ${tx.type === 'credit' ? 't-credit' : 't-debit'}`}>{tx.type === 'credit' ? '+ ' : '- '}{new Intl.NumberFormat('fr-FR').format(tx.amount)} FCFA</span>
          <span className="tx-note">{tx.note || '—'}</span>
          <span className="tx-date">{new Date(tx.created_at || tx.at).toLocaleString('fr-FR')}</span>
        </div>
      ))}
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-head">
          <h3 className="modal-title">{title}</h3>
          <button className="chip-action" onClick={onClose}>Fermer</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
