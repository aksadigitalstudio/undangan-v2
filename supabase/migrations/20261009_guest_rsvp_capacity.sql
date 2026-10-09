-- RSVP guests choose their actual party size, up to the capacity assigned to
-- their unique invitation. The public RPC remains the only public write path.
drop function if exists public.submit_guest_rsvp(bigint, uuid, text, text);

create function public.submit_guest_rsvp(
  p_invitation_id bigint,
  p_rsvp_token uuid,
  p_rsvp_status text,
  p_confirmed_guest integer default 1,
  p_message text default ''
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_max_guest integer;
begin
  if p_rsvp_status not in ('attending', 'declined') then
    raise exception 'Invalid RSVP status';
  end if;

  if length(coalesce(p_message, '')) > 1000 then
    raise exception 'Message is too long';
  end if;

  select g.max_guest
  into v_max_guest
  from public.guests g
  join public.invitations i on i.id = g.invitation_id
  where g.invitation_id = p_invitation_id
    and g.rsvp_token = p_rsvp_token
    and i.status = 'Published';

  if not found then
    raise exception 'RSVP link is invalid or unavailable';
  end if;

  if p_rsvp_status = 'attending'
    and (p_confirmed_guest < 1 or p_confirmed_guest > least(v_max_guest, 5)) then
    raise exception 'Confirmed guest count exceeds this invitation capacity';
  end if;

  update public.guests
  set rsvp_status = p_rsvp_status,
      confirmed_guest = case when p_rsvp_status = 'attending' then p_confirmed_guest else 0 end,
      message = nullif(trim(p_message), ''),
      responded_at = now()
  where invitation_id = p_invitation_id
    and rsvp_token = p_rsvp_token;
end;
$$;

revoke all on function public.submit_guest_rsvp(bigint, uuid, text, integer, text) from public;
grant execute on function public.submit_guest_rsvp(bigint, uuid, text, integer, text) to anon, authenticated;
