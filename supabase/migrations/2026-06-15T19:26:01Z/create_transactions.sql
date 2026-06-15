create type public.transaction_type as enum ('income', 'expense');

create table public.transactions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id),
  amount      numeric(12,2) not null,
  type        public.transaction_type not null,
  description text,
  date        date not null default current_date,
  created_at  timestamptz not null default now()
);

create index transactions_user_id_date_idx on public.transactions (user_id, date desc);

alter table public.transactions enable row level security;

create policy "select own" on public.transactions for select using (auth.uid() = user_id);
create policy "insert own" on public.transactions for insert with check (auth.uid() = user_id);
create policy "update own" on public.transactions for update using (auth.uid() = user_id);
create policy "delete own" on public.transactions for delete using (auth.uid() = user_id);
