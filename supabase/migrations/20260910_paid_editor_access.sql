-- A manually-confirmed order (from the admin Orders dashboard) grants a
-- workspace only to the authenticated account using that order's email.
alter table public.order_briefs
  add column if not exists account_user_id uuid references auth.users(id) on delete set null;

alter table public.account_entitlements
  add column if not exists source_order_brief_id uuid unique references public.order_briefs(id) on delete restrict;

create index if not exists order_briefs_account_user_id_idx
  on public.order_briefs (account_user_id);

-- New invitation workspaces consume an entitlement. Once an entitlement is
-- linked to an invitation, revoking it also revokes editor and publish rights.
create or replace function public.can_edit_paid_invitation(p_user_id uuid, p_invitation_id bigint)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select
    not exists (
      select 1 from public.account_entitlements
      where used_invitation_id = p_invitation_id
    )
    or exists (
      select 1 from public.account_entitlements
      where user_id = p_user_id
        and used_invitation_id = p_invitation_id
        and status = 'active'
    );
$$;

-- Preserve legacy invitations already created before this payment lock was
-- introduced, while enforcing every invitation created from a paid credit.
drop policy if exists "owners update invitations" on public.invitations;
create policy "owners update paid invitations"
  on public.invitations for update to authenticated
  using (
    user_id = (select auth.uid())
    and public.can_edit_paid_invitation((select auth.uid()), id)
  )
  with check (
    user_id = (select auth.uid())
    and public.can_edit_paid_invitation((select auth.uid()), id)
  );

create or replace function public.has_editable_invitation_workspace(p_user_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.invitations
    where user_id = p_user_id
      and public.can_edit_paid_invitation(p_user_id, id)
  );
$$;

drop policy if exists "paid workspace owners upload invitation assets" on storage.objects;
drop policy if exists "paid workspace owners update invitation assets" on storage.objects;
drop policy if exists "paid workspace owners delete invitation assets" on storage.objects;

create policy "active workspace owners upload invitation assets"
  on storage.objects for insert to authenticated
  with check (
    bucket_id in ('photos2', 'Music')
    and (storage.foldername(name))[1] = (select auth.uid()::text)
    and public.has_editable_invitation_workspace((select auth.uid()))
  );

create policy "active workspace owners update invitation assets"
  on storage.objects for update to authenticated
  using (
    bucket_id in ('photos2', 'Music')
    and owner_id = (select auth.uid()::text)
    and public.has_editable_invitation_workspace((select auth.uid()))
  )
  with check (
    bucket_id in ('photos2', 'Music')
    and (storage.foldername(name))[1] = (select auth.uid()::text)
    and public.has_editable_invitation_workspace((select auth.uid()))
  );

create policy "active workspace owners delete invitation assets"
  on storage.objects for delete to authenticated
  using (
    bucket_id in ('photos2', 'Music')
    and owner_id = (select auth.uid()::text)
    and public.has_editable_invitation_workspace((select auth.uid()))
  );
