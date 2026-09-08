-- A paid order grants one invitation workspace. The invite can be edited
-- indefinitely by its owner, but an account cannot create a workspace until
-- a paid entitlement exists.

alter table public.payment_orders
  add column if not exists user_id uuid references auth.users(id) on delete set null;

create index if not exists payment_orders_user_id_idx
  on public.payment_orders (user_id);

create table if not exists public.account_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  -- Null is reserved for an explicitly granted internal/admin workspace.
  -- Payment-granted rows always contain the verified Midtrans order id.
  source_order_id uuid unique references public.payment_orders(id) on delete restrict,
  product_code text not null,
  status text not null default 'active' check (status in ('active', 'revoked')),
  used_at timestamptz,
  used_invitation_id bigint,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists account_entitlements_available_idx
  on public.account_entitlements (user_id, status, created_at)
  where used_at is null;

create or replace function public.set_account_entitlement_updated_at()
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

drop trigger if exists account_entitlements_updated_at on public.account_entitlements;
create trigger account_entitlements_updated_at
  before update on public.account_entitlements
  for each row execute procedure public.set_account_entitlement_updated_at();

alter table public.account_entitlements enable row level security;
revoke all on public.account_entitlements from anon, authenticated;
grant select on public.account_entitlements to authenticated;

create policy "users view their own entitlements"
  on public.account_entitlements for select to authenticated
  using (user_id = (select auth.uid()));

-- A trigger, not client-side state, consumes the credit. This prevents a user
-- from creating multiple invitations by opening the form in several tabs.
create or replace function public.consume_invitation_entitlement()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  entitlement_id uuid;
begin
  if new.user_id is null then
    raise exception 'A signed-in owner is required to create an invitation';
  end if;

  select id into entitlement_id
  from public.account_entitlements
  where user_id = new.user_id
    and status = 'active'
    and used_at is null
  order by created_at asc
  for update skip locked
  limit 1;

  if entitlement_id is null then
    raise exception 'A paid invitation workspace is required before creating an invitation';
  end if;

  update public.account_entitlements
  set used_at = now(), used_invitation_id = new.id
  where id = entitlement_id;

  return new;
end;
$$;

drop trigger if exists invitations_consume_entitlement on public.invitations;
create trigger invitations_consume_entitlement
  before insert on public.invitations
  for each row execute procedure public.consume_invitation_entitlement();

-- Rebuild invitation policies so only the database trigger decides creation.
-- Existing owners keep their existing invitations and can continue editing them.
do $$
declare policy_record record;
begin
  for policy_record in
    select policyname from pg_policies
    where schemaname = 'public' and tablename = 'invitations'
  loop
    execute format('drop policy if exists %I on public.invitations', policy_record.policyname);
  end loop;
end $$;

create policy "published invitations are public"
  on public.invitations for select to anon, authenticated
  using (status = 'Published');

create policy "owners view invitations"
  on public.invitations for select to authenticated
  using (user_id = (select auth.uid()));

create policy "signed in users request invitation creation"
  on public.invitations for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "owners update invitations"
  on public.invitations for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "owners delete invitations"
  on public.invitations for delete to authenticated
  using (user_id = (select auth.uid()));

-- A user may upload invitation media only after an invitation workspace exists.
-- This also blocks storage abuse by newly-created unpaid accounts.
create or replace function public.has_invitation_workspace(p_user_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.invitations
    where user_id = p_user_id
  );
$$;

drop policy if exists "owners upload invitation assets" on storage.objects;
drop policy if exists "owners update invitation assets" on storage.objects;
drop policy if exists "owners delete invitation assets" on storage.objects;

create policy "paid workspace owners upload invitation assets"
  on storage.objects for insert to authenticated
  with check (
    bucket_id in ('photos2', 'Music')
    and (storage.foldername(name))[1] = (select auth.uid()::text)
    and public.has_invitation_workspace((select auth.uid()))
  );

create policy "paid workspace owners update invitation assets"
  on storage.objects for update to authenticated
  using (
    bucket_id in ('photos2', 'Music')
    and owner_id = (select auth.uid()::text)
    and public.has_invitation_workspace((select auth.uid()))
  )
  with check (
    bucket_id in ('photos2', 'Music')
    and (storage.foldername(name))[1] = (select auth.uid()::text)
    and public.has_invitation_workspace((select auth.uid()))
  );

create policy "paid workspace owners delete invitation assets"
  on storage.objects for delete to authenticated
  using (
    bucket_id in ('photos2', 'Music')
    and owner_id = (select auth.uid()::text)
    and public.has_invitation_workspace((select auth.uid()))
  );
