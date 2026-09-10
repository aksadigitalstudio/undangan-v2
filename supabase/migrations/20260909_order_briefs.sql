-- Sales enquiries sent from the public order brief. These records are only
-- accessed with the server-side service-role key; there is no public RLS policy.
create table if not exists public.order_briefs (
  id uuid primary key default gen_random_uuid(),
  package_code text not null check (package_code in ('digital-invitation', 'original-love-song', 'ai-love-film')),
  event_type text not null,
  template_id text,
  event_date date,
  city text,
  guest_count text,
  contact_name text not null,
  whatsapp text not null,
  email text,
  hosts text,
  story text,
  feeling text,
  add_ons jsonb not null default '[]'::jsonb,
  desired_delivery date,
  reference_url text,
  notes text,
  status text not null default 'new' check (status in ('new', 'discussion', 'awaiting_payment', 'paid', 'production', 'revision', 'completed', 'cancelled')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists order_briefs_status_created_at_idx
  on public.order_briefs (status, created_at desc);

create or replace function public.set_order_brief_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists order_briefs_updated_at on public.order_briefs;
create trigger order_briefs_updated_at
before update on public.order_briefs
for each row execute function public.set_order_brief_updated_at();

alter table public.order_briefs enable row level security;
revoke all on table public.order_briefs from anon, authenticated;
