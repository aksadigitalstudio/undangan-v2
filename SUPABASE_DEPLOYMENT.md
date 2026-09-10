# Supabase security rollout

Before preview deployment, apply `supabase/migrations/20260823_auth_and_rls.sql` in the Supabase SQL Editor or through the Supabase CLI.

1. Create the first administrator in **Authentication → Users**.
2. Copy its UUID and run the backfill statement at the end of the migration for existing invitations.
3. Create a new invitation while logged in and verify that only its owner can edit it.
4. Use the regenerated guest links from the dashboard. Links now use a random `rsvp_token`, not the old guest-name slug.
5. Verify one published invitation, one draft, RSVP submission, public guestbook, dashboard upload, and sign-out.

The migration deliberately removes existing policies on `public.invitations`, `public.guests`, and `storage.objects`. Review it in the SQL Editor before running if the Supabase project contains other applications or buckets.

## Hosting environment

Add these variables to the production host before deployment:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Use the existing `.env.local` only as the source of the values; do not commit it.

## Order briefs and private admin sales dashboard

1. Run `supabase/migrations/20260909_order_briefs.sql`, then `supabase/migrations/20260910_paid_editor_access.sql` in the Supabase SQL Editor, in that order.
2. Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` and the production host. Keep this server-only secret out of browser variables and Git.
3. Add `AKSA_ADMIN_EMAILS` to `.env.local` and the production host with the exact email address of each staff member allowed to see all customer enquiries. For multiple administrators, separate email addresses with commas.
4. Sign in using one of those addresses, then open `/dashboard/orders`.

The public order form saves a brief first and only then opens WhatsApp. Customer accounts cannot read this sales data or change its status. When an admin moves an order to `Paid`, `Production`, `Revision`, or `Completed`, the customer can sign in using the exact email from their brief and receive one invitation workspace. Moving the order back to a non-paid status revokes editor and publish access.
