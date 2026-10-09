-- Expose only the public metadata required to render a personal invitation
-- preview. The RSVP token is unguessable and the function returns rows only
-- for published invitations.
create or replace function public.get_share_preview(p_rsvp_token uuid)
returns table (
  slug text,
  groom_name text,
  bride_name text,
  sections jsonb
)
language sql
security definer
set search_path = public
as $$
  select
    i.slug::text,
    i.groom_name::text,
    i.bride_name::text,
    i.sections::jsonb
  from public.guests g
  join public.invitations i on i.id = g.invitation_id
  where g.rsvp_token = p_rsvp_token
    and i.status = 'Published'
  limit 1;
$$;

revoke all on function public.get_share_preview(uuid) from public;
grant execute on function public.get_share_preview(uuid) to anon, authenticated;
