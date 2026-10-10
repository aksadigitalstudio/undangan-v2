-- Each guest receives a concise, opaque code for their personal invitation
-- link. It replaces UUIDs in messages without exposing RSVP tokens.
alter table public.guests
  add column if not exists share_code text;

update public.guests
set share_code = lower(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10))
where share_code is null;

alter table public.guests
  alter column share_code set default lower(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10)),
  alter column share_code set not null;

create unique index if not exists guests_share_code_key
  on public.guests (share_code);

-- The public route needs only what is already visible in a published
-- invitation, and resolves the secret RSVP token server-side after a visitor
-- opens their short personal link.
create or replace function public.get_guest_short_share_preview(
  p_slug text,
  p_share_code text
)
returns table (
  rsvp_token uuid,
  groom_name text,
  bride_name text,
  wedding_date text,
  sections jsonb
)
language sql
security definer
set search_path = public
as $$
  select
    g.rsvp_token,
    i.groom_name::text,
    i.bride_name::text,
    i.wedding_date::text,
    i.sections::jsonb
  from public.guests g
  join public.invitations i on i.id = g.invitation_id
  where i.slug = p_slug
    and g.share_code = p_share_code
    and i.status = 'Published'
  limit 1;
$$;

revoke all on function public.get_guest_short_share_preview(text, text) from public;
grant execute on function public.get_guest_short_share_preview(text, text) to anon, authenticated;
