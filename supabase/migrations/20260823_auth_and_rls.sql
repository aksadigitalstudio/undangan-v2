-- Apply in Supabase SQL Editor or with the Supabase CLI before opening preview.
-- This project exposes published invitations publicly, while admin data belongs
-- to authenticated Supabase users.

create extension if not exists pgcrypto;

alter table public.invitations
  add column if not exists user_id uuid references auth.users(id) on delete set null;

alter table public.guests
  add column if not exists rsvp_token uuid;

update public.guests
set rsvp_token = gen_random_uuid()
where rsvp_token is null;

alter table public.guests
  alter column rsvp_token set default gen_random_uuid(),
  alter column rsvp_token set not null;

create unique index if not exists guests_rsvp_token_key
  on public.guests (rsvp_token);

create index if not exists invitations_user_id_idx
  on public.invitations (user_id);

create index if not exists guests_invitation_id_rsvp_token_idx
  on public.guests (invitation_id, rsvp_token);

alter table public.invitations enable row level security;
alter table public.guests enable row level security;

-- This migration replaces existing policies on these two application tables.
do $$
declare policy_record record;
begin
  for policy_record in
    select policyname, tablename from pg_policies
    where schemaname = 'public' and tablename in ('invitations', 'guests')
  loop
    execute format(
      'drop policy if exists %I on public.%I',
      policy_record.policyname,
      policy_record.tablename
    );
  end loop;
end $$;

revoke all on public.invitations from anon, authenticated;
revoke all on public.guests from anon, authenticated;
grant select on public.invitations to anon, authenticated;
grant insert, update, delete on public.invitations to authenticated;
grant select, insert, update, delete on public.guests to authenticated;
grant usage, select on all sequences in schema public to authenticated;

create policy "published invitations are public"
  on public.invitations for select to anon, authenticated
  using (status = 'Published');

create policy "owners manage their invitations"
  on public.invitations for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "owners manage invitation guests"
  on public.guests for all to authenticated
  using (
    exists (
      select 1 from public.invitations
      where invitations.id = guests.invitation_id
        and invitations.user_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.invitations
      where invitations.id = guests.invitation_id
        and invitations.user_id = (select auth.uid())
    )
  );

create or replace function public.get_guest_rsvp(
  p_invitation_id bigint,
  p_rsvp_token uuid
)
returns table (
  guest_name text,
  max_guest integer,
  rsvp_status text,
  confirmed_guest integer,
  message text,
  responded_at text
)
language sql
security definer
set search_path = public
as $$
  select
    g.guest_name::text,
    g.max_guest::integer,
    g.rsvp_status::text,
    g.confirmed_guest::integer,
    g.message::text,
    g.responded_at::text
  from public.guests g
  join public.invitations i on i.id = g.invitation_id
  where g.invitation_id = p_invitation_id
    and g.rsvp_token = p_rsvp_token
    and i.status = 'Published';
$$;

create or replace function public.submit_guest_rsvp(
  p_invitation_id bigint,
  p_rsvp_token uuid,
  p_rsvp_status text,
  p_message text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_rsvp_status not in ('attending', 'declined') then
    raise exception 'Invalid RSVP status';
  end if;

  if length(coalesce(p_message, '')) > 1000 then
    raise exception 'Message is too long';
  end if;

  update public.guests g
  set rsvp_status = p_rsvp_status,
      message = nullif(trim(p_message), ''),
      responded_at = now()
  where g.invitation_id = p_invitation_id
    and g.rsvp_token = p_rsvp_token
    and exists (
      select 1 from public.invitations i
      where i.id = g.invitation_id and i.status = 'Published'
    );

  if not found then
    raise exception 'RSVP link is invalid or unavailable';
  end if;
end;
$$;

create or replace function public.get_guestbook(p_invitation_id bigint)
returns table (
  id bigint,
  guest_name text,
  rsvp_status text,
  message text,
  responded_at text
)
language sql
security definer
set search_path = public
as $$
  select
    g.id::bigint,
    g.guest_name::text,
    g.rsvp_status::text,
    g.message::text,
    g.responded_at::text
  from public.guests g
  join public.invitations i on i.id = g.invitation_id
  where g.invitation_id = p_invitation_id
    and i.status = 'Published'
    and g.responded_at is not null
    and g.message is not null
  order by g.responded_at desc;
$$;

revoke all on function public.get_guest_rsvp(bigint, uuid) from public;
revoke all on function public.submit_guest_rsvp(bigint, uuid, text, text) from public;
revoke all on function public.get_guestbook(bigint) from public;
grant execute on function public.get_guest_rsvp(bigint, uuid) to anon, authenticated;
grant execute on function public.submit_guest_rsvp(bigint, uuid, text, text) to anon, authenticated;
grant execute on function public.get_guestbook(bigint) to anon, authenticated;

insert into storage.buckets (id, name, public)
values ('photos2', 'photos2', true), ('Music', 'Music', true)
on conflict (id) do update set public = true;

-- This dedicated project uses only these asset buckets. The block removes any
-- prior broad policies before adding owner-scoped write access.
do $$
declare policy_record record;
begin
  for policy_record in
    select policyname from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
  loop
    execute format('drop policy if exists %I on storage.objects', policy_record.policyname);
  end loop;
end $$;

revoke all on storage.objects from anon, authenticated;
grant select on storage.objects to anon, authenticated;
grant insert, update, delete on storage.objects to authenticated;

create policy "public invitation assets are readable"
  on storage.objects for select to anon, authenticated
  using (bucket_id in ('photos2', 'Music'));

create policy "owners upload invitation assets"
  on storage.objects for insert to authenticated
  with check (
    bucket_id in ('photos2', 'Music')
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  );

create policy "owners update invitation assets"
  on storage.objects for update to authenticated
  using (
    bucket_id in ('photos2', 'Music')
    and owner_id = (select auth.uid()::text)
  )
  with check (
    bucket_id in ('photos2', 'Music')
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  );

create policy "owners delete invitation assets"
  on storage.objects for delete to authenticated
  using (
    bucket_id in ('photos2', 'Music')
    and owner_id = (select auth.uid()::text)
  );

-- REQUIRED MANUAL BACKFILL: after creating the first admin account, assign
-- existing invitations to that Auth user before enabling dashboard access:
-- update public.invitations set user_id = '<ADMIN_AUTH_UUID>' where user_id is null;
