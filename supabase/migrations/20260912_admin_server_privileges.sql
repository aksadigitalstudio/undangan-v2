-- Server routes authenticate with the Supabase service-role key only. These
-- grants do not expose data to browsers, anon visitors, or normal customers.
-- They repair permission-denied responses from the protected admin APIs.
grant usage on schema public to service_role;

grant select, insert, update, delete on table public.invitations to service_role;
grant select, insert, update, delete on table public.account_entitlements to service_role;
grant select, insert, update, delete on table public.order_briefs to service_role;
grant select, insert, update, delete on table public.payment_orders to service_role;

grant usage, select on all sequences in schema public to service_role;
