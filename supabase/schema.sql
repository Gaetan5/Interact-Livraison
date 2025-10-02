-- Enable needed extensions
create extension if not exists pgcrypto;

-- Profiles (one row per auth user)
create table if not exists public.profiles (
  id uuid primary key default auth.uid(),
  phone text unique,
  role text check (role in ('courier','client','admin')) default 'courier',
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

-- Wallets
create table if not exists public.wallets (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  balance bigint not null default 0,
  currency text not null default 'FCFA',
  updated_at timestamptz not null default now()
);
alter table public.wallets enable row level security;

-- Transactions
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('credit','debit','commission','payout','order_payment')),
  amount bigint not null check (amount > 0),
  note text,
  created_at timestamptz not null default now()
);
alter table public.transactions enable row level security;
create index if not exists idx_transactions_user_created on public.transactions(user_id, created_at desc);

-- Orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete set null,
  courier_id uuid references public.profiles(id) on delete set null,
  pickup_address text,
  pickup_lat numeric(10,6),
  pickup_lng numeric(10,6),
  dropoff_address text,
  dropoff_lat numeric(10,6),
  dropoff_lng numeric(10,6),
  details text,
  price bigint,
  status text not null check (status in ('pending','assigned','picked_up','delivered','cancelled')) default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_orders_client on public.orders(client_id);
create index if not exists idx_orders_courier on public.orders(courier_id);
alter table public.orders enable row level security;

-- Order status history
create table if not exists public.order_status_history (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  status text not null,
  at timestamptz not null default now()
);
alter table public.order_status_history enable row level security;

-- Courier profiles
create table if not exists public.courier_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  vehicle_type text,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.courier_profiles enable row level security;

-- Courier live locations
create table if not exists public.courier_locations (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  lat numeric(10,6),
  lng numeric(10,6),
  updated_at timestamptz not null default now()
);
alter table public.courier_locations enable row level security;

-- Payouts
create table if not exists public.payouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount bigint not null check (amount > 0),
  provider text check (provider in ('mtn_momo','orange_money','bank')) not null,
  account text not null,
  status text not null check (status in ('requested','processing','paid','failed')) default 'requested',
  created_at timestamptz not null default now()
);
alter table public.payouts enable row level security;

-- Commissions
create table if not exists public.commissions (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  percent numeric(5,2) not null default 10.00,
  amount bigint not null,
  created_at timestamptz not null default now()
);
alter table public.commissions enable row level security;

-- Utility: ensure profile + wallet on signup
create or replace function public.handle_new_user() returns trigger as $$
begin
  insert into public.profiles(id, phone, role) values (new.id, new.phone, 'courier')
  on conflict (id) do nothing;
  insert into public.wallets(user_id) values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$ language plpgsql security definer;
-- Attach to auth.users if available (run in SQL editor when connected to Supabase):
-- create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- RPC: credit/debit wallet safely
create or replace function public.fn_wallet_credit(amount bigint, note text default null)
returns void
language plpgsql
security definer
as $$
begin
  update public.wallets set balance = balance + amount, updated_at = now()
  where user_id = auth.uid();
  insert into public.transactions(user_id, type, amount, note) values (auth.uid(), 'credit', amount, note);
end;$$;

create or replace function public.fn_wallet_debit(amount bigint, note text default null)
returns void
language plpgsql
security definer
as $$
begin
  if (select balance from public.wallets where user_id = auth.uid()) < amount then
    raise exception 'insufficient_funds';
  end if;
  update public.wallets set balance = balance - amount, updated_at = now()
  where user_id = auth.uid();
  insert into public.transactions(user_id, type, amount, note) values (auth.uid(), 'debit', amount, note);
end;$$;

-- RLS Policies
-- profiles
create policy if not exists p_profiles_self_read on public.profiles for select using (id = auth.uid());
create policy if not exists p_profiles_self_upd on public.profiles for update using (id = auth.uid());

-- wallets
create policy if not exists p_wallets_self_read on public.wallets for select using (user_id = auth.uid());
create policy if not exists p_wallets_self_upd on public.wallets for update using (user_id = auth.uid());

-- transactions
create policy if not exists p_tx_self_read on public.transactions for select using (user_id = auth.uid());
create policy if not exists p_tx_insert_via_fn on public.transactions for insert with check (user_id = auth.uid());

-- orders
create policy if not exists p_orders_client_rw on public.orders
for all using (client_id = auth.uid()) with check (client_id = auth.uid());
create policy if not exists p_orders_courier_read on public.orders
for select using (courier_id = auth.uid());

-- order_status_history
create policy if not exists p_hist_related_read on public.order_status_history for select using (
  exists (select 1 from public.orders o where o.id = order_id and (o.client_id = auth.uid() or o.courier_id = auth.uid()))
);
create policy if not exists p_hist_insert_related on public.order_status_history for insert with check (
  exists (select 1 from public.orders o where o.id = order_id and (o.client_id = auth.uid() or o.courier_id = auth.uid()))
);

-- courier_profiles
create policy if not exists p_courier_self_rw on public.courier_profiles for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- courier_locations
create policy if not exists p_loc_self_upsert on public.courier_locations for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy if not exists p_loc_auth_read on public.courier_locations for select using (auth.role() = 'authenticated');

-- payouts
create policy if not exists p_payouts_self_read on public.payouts for select using (user_id = auth.uid());
create policy if not exists p_payouts_self_insert on public.payouts for insert with check (user_id = auth.uid());
