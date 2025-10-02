import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadState, saveState } from '../lib/storage.js';
import { supabase } from '../lib/supabase.js';

const AuthCtx = createContext(null);

const initialData = {
  user: null, // { phone: string, role: 'courier' | 'client' }
  wallet: { balance: 0, currency: 'FCFA', transactions: [] },
};

export function AuthProvider({ children }) {
  const [data, setData] = useState(() => loadState() || initialData);
  const [pendingPhone, setPendingPhone] = useState('');

  useEffect(() => { saveState(data); }, [data]);

  const signIn = async (phone) => {
    setPendingPhone(phone);
    if (supabase) {
      const { error } = await supabase.auth.signInWithOtp({ phone, options: { channel: 'sms' } });
      if (error) return false;
    }
    return true; // prompt OTP step regardless; fallback uses demo code
  };

  const verifyOtp = async (code) => {
    if (!pendingPhone) return false;
    if (supabase) {
      const { data: sessionData, error } = await supabase.auth.verifyOtp({ phone: pendingPhone, token: code, type: 'sms' });
      if (error) return false;
      const phone = sessionData?.user?.phone || pendingPhone;
      setData((d) => ({ ...d, user: { phone, role: 'courier' } }));
      setPendingPhone('');
      return true;
    }
    if (code === '123456') {
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
