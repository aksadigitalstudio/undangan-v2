-- Payment orders are created only through the server API. There are no client
-- insert/update policies: client-supplied prices or payment statuses must never
-- be trusted.
create table if not exists public.payment_orders (
  id uuid primary key default gen_random_uuid(),
  order_code text not null unique,
  product_code text not null,
  product_name text not null,
  amount_idr integer not null check (amount_idr > 0),
  currency text not null default 'IDR' check (currency = 'IDR'),
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  customer_note text,
  provider text not null default 'midtrans',
  status text not null default 'created' check (status in ('created', 'pending', 'paid', 'failed', 'expired', 'cancelled', 'refunded')),
  provider_transaction_id text,
  payment_type text,
  raw_notification jsonb,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists payment_orders_status_created_at_idx
  on public.payment_orders (status, created_at desc);

create or replace function public.set_payment_order_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists payment_orders_updated_at on public.payment_orders;
create trigger payment_orders_updated_at
  before update on public.payment_orders
  for each row execute procedure public.set_payment_order_updated_at();

alter table public.payment_orders enable row level security;
revoke all on public.payment_orders from anon, authenticated;

-- The service-role server client bypasses RLS for checkout creation and webhook
-- processing. Admin reporting can be added later with a dedicated admin role.
