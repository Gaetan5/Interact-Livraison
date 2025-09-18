import { useMemo, useState } from 'react';
import { useAuth } from '../state/AuthContext.jsx';

export default function Wallet() {
  const { user, wallet, credit, debit } = useAuth();
  const [showTopUp, setShowTopUp] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState('');

  const formatted = useMemo(() => new Intl.NumberFormat('fr-FR').format(wallet.balance), [wallet.balance]);

  const submitTopUp = (e) => { e.preventDefault(); if (credit(amount, { note: 'Recharge manuelle' })) { setAmount(''); setShowTopUp(false); } };
  const submitWithdraw = (e) => { e.preventDefault(); if (debit(amount, { note: 'Retrait manuel' })) { setAmount(''); setShowWithdraw(false); } };

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
      <TransactionList items={wallet.transactions} />

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
          <span className="tx-date">{new Date(tx.at).toLocaleString('fr-FR')}</span>
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
