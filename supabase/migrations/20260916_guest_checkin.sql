-- AKSA Event Pass: unique QR check-in for each guest.
create extension if not exists pgcrypto;

alter table public.guests
  add column if not exists check_in_token uuid,
  add column if not exists checked_in_at timestamptz,
  add column if not exists checked_in_guest_count integer,
  add column if not exists checked_in_by uuid references auth.users(id) on delete set null;

update public.guests
set check_in_token = gen_random_uuid()
where check_in_token is null;

alter table public.guests
  alter column check_in_token set default gen_random_uuid(),
  alter column check_in_token set not null;

alter table public.guests
  alter column checked_in_guest_count set default 0;

alter table public.guests
  drop constraint if exists guests_checked_in_guest_count_valid;

alter table public.guests
  add constraint guests_checked_in_guest_count_valid
  check (checked_in_guest_count >= 0 and checked_in_guest_count <= max_guest);

create unique index if not exists guests_check_in_token_key
  on public.guests (check_in_token);

create index if not exists guests_invitation_id_checked_in_at_idx
  on public.guests (invitation_id, checked_in_at);

-- The public invitation only receives its own pass token. It never receives
-- the event guest list, and only an authenticated owner can write check-ins.
drop function if exists public.get_guest_rsvp(bigint, uuid);

create function public.get_guest_rsvp(
  p_invitation_id bigint,
  p_rsvp_token uuid
)
returns table (
  guest_name text,
  max_guest integer,
  rsvp_status text,
  confirmed_guest integer,
  message text,
  responded_at text,
  check_in_token uuid
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
    g.responded_at::text,
    g.check_in_token
  from public.guests g
  join public.invitations i on i.id = g.invitation_id
  where g.invitation_id = p_invitation_id
    and g.rsvp_token = p_rsvp_token
    and i.status = 'Published';
$$;

revoke all on function public.get_guest_rsvp(bigint, uuid) from public;
grant execute on function public.get_guest_rsvp(bigint, uuid) to anon, authenticated;
