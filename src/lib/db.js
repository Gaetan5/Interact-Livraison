import { supabase } from './supabase.js';

export async function ensureSession() {
  if (!supabase) return { ok: false, reason: 'no_supabase' };
  const { data: { session } } = await supabase.auth.getSession();
  return { ok: !!session, session };
}

export async function getWallet() {
  const session = await ensureSession();
  if (!session.ok) return { ok: false };
  const { data, error } = await supabase.from('wallets').select('*').eq('user_id', session.session.user.id).maybeSingle();
  if (error) return { ok: false, error };
  return { ok: true, data };
}

export async function getTransactions(limit = 50) {
  const session = await ensureSession();
  if (!session.ok) return { ok: false };
  const { data, error } = await supabase.from('transactions').select('*').eq('user_id', session.session.user.id).order('created_at', { ascending: false }).limit(limit);
  if (error) return { ok: false, error };
  return { ok: true, data };
}

export async function walletCredit(amount, note) {
  const session = await ensureSession();
  if (!session.ok) return { ok: false };
  const { error } = await supabase.rpc('fn_wallet_credit', { amount, note });
  return { ok: !error, error };
}

export async function walletDebit(amount, note) {
  const session = await ensureSession();
  if (!session.ok) return { ok: false };
  const { error } = await supabase.rpc('fn_wallet_debit', { amount, note });
  return { ok: !error, error };
}
