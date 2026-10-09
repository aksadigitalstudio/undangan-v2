-- Social crawlers do not have a dashboard session. These narrowly scoped RPCs
-- expose only published invitation details that are already visible publicly.
create or replace function public.get_share_preview_v2(p_rsvp_token uuid)
returns table (
  slug text,
  groom_name text,
  bride_name text,
  hero_background text,
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
    i.hero_background::text,
    i.sections::jsonb
  from public.guests g
  join public.invitations i on i.id = g.invitation_id
  where g.rsvp_token = p_rsvp_token
    and i.status = 'Published'
  limit 1;
$$;

create or replace function public.get_opengraph_preview(p_slug text)
returns table (
  groom_name text,
  bride_name text,
  wedding_date text,
  hero_background text,
  sections jsonb
)
language sql
security definer
set search_path = public
as $$
  select
    i.groom_name::text,
    i.bride_name::text,
    i.wedding_date::text,
    i.hero_background::text,
    i.sections::jsonb
  from public.invitations i
  where i.slug = p_slug
    and i.status = 'Published'
  limit 1;
$$;

revoke all on function public.get_share_preview_v2(uuid) from public;
revoke all on function public.get_opengraph_preview(text) from public;
grant execute on function public.get_share_preview_v2(uuid) to anon, authenticated;
grant execute on function public.get_opengraph_preview(text) to anon, authenticated;
