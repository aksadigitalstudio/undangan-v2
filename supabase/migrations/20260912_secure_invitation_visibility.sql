-- Published invitations must be available to visitors without exposing every
-- client invitation to any authenticated dashboard user.
drop policy if exists "published invitations are public" on public.invitations;

create policy "anonymous visitors view published invitations"
  on public.invitations for select to anon
  using (status = 'Published');
