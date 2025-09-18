import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadState, saveState } from '../lib/storage.js';

const AuthCtx = createContext(null);

const initialData = {
  user: null, // { phone: string, role: 'courier' | 'client' }
  wallet: { balance: 0, currency: 'FCFA', transactions: [] },
};

export function AuthProvider({ children }) {
  const [data, setData] = useState(() => loadState() || initialData);
  const [pendingPhone, setPendingPhone] = useState('');

  useEffect(() => { saveState(data); }, [data]);

  const signIn = (phone) => {
    setPendingPhone(phone);
    return true; // trigger OTP step
  };

  const verifyOtp = (code) => {
    if (code === '123456' && pendingPhone) {
      setData((d) => ({ ...d, user: { phone: pendingPhone, role: 'courier' } }));
      setPendingPhone('');
      return true;
    }
    return false;
  };

  const signOut = () => setData(initialData);

  const credit = (amount, meta = {}) => {
    const amt = Number(amount) || 0;
    if (amt <= 0) return false;
    setData((d) => ({
      ...d,
      wallet: {
        ...d.wallet,
        balance: d.wallet.balance + amt,
        transactions: [
          { id: crypto.randomUUID(), type: 'credit', amount: amt, at: Date.now(), ...meta },
          ...d.wallet.transactions,
        ],
      },
    }));
    return true;
  };

  const debit = (amount, meta = {}) => {
    const amt = Number(amount) || 0;
    if (amt <= 0) return false;
    setData((d) => {
      if (d.wallet.balance < amt) return d;
      return {
        ...d,
        wallet: {
          ...d.wallet,
          balance: d.wallet.balance - amt,
          transactions: [
            { id: crypto.randomUUID(), type: 'debit', amount: amt, at: Date.now(), ...meta },
            ...d.wallet.transactions,
          ],
        },
      };
    });
    return true;
  };

  const value = useMemo(() => ({
    user: data.user,
    wallet: data.wallet,
    signIn,
    verifyOtp,
    signOut,
    credit,
    debit,
  }), [data]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() { return useContext(AuthCtx); }
export function useWallet() { return useContext(AuthCtx)?.wallet; }
