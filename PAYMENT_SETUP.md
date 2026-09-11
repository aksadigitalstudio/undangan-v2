# AKSA Payment Setup — Midtrans Snap

This project contains a Midtrans Snap checkout. It does **not** accept a payment until the required environment variables have been configured.

## 1. Apply the database migration

Open the Supabase SQL Editor and run these files in order:

1. `supabase/migrations/20260906_payment_orders.sql`
2. `supabase/migrations/20260908_paid_workspace_access.sql`
3. `supabase/migrations/20260909_order_briefs.sql`
4. `supabase/migrations/20260910_paid_editor_access.sql`

This creates the private `payment_orders` table and paid workspace entitlement system. Orders are created and updated only by server routes; users cannot submit a price, mark an order paid, or create an invitation without an available paid workspace credit.

### Grant your existing admin account one testing workspace

The new gate deliberately locks every account until it has a paid order. For your existing AKSA admin account, you can grant one internal testing workspace once in the SQL Editor (replace the UUID with the user id from **Authentication → Users**):

```sql
insert into public.account_entitlements (user_id, product_code, status)
values ('YOUR_AUTH_USER_UUID', 'internal-admin-workspace', 'active');
```

This is only for AKSA’s own test/admin workspace. Do not use it for paying clients.

## 2. Configure sandbox keys

Create a Midtrans Sandbox account, then copy the Sandbox keys from **Settings → Access Keys** to your local `.env.local` and Vercel Environment Variables:

```env
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
MIDTRANS_SERVER_KEY=SB-Mid-server-...
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-...
MIDTRANS_IS_PRODUCTION=false
NEXT_PUBLIC_SITE_URL=https://aksadigitalstudio.com
```

`SUPABASE_SERVICE_ROLE_KEY` and `MIDTRANS_SERVER_KEY` are private server credentials. Never expose them in client-side code, a public Git repository, screenshots, or chat.

## 3. Package prices

The fixed-price editions are set in code to AKSA’s approved launch prices: Digital Invitation is **Rp199.000** (shown from Rp250.000) and Original Love Song is **Rp499.000**. You may override either value in Vercel only if the published price changes:

```env
AKSA_PRICE_DIGITAL_INVITATION_IDR=199000
AKSA_PRICE_ORIGINAL_LOVE_SONG_IDR=499000
```

AI Love Film starts from **Rp1.499.000** and remains a WhatsApp/brief quotation because it is negotiable. Leave `AKSA_PRICE_AI_LOVE_FILM_IDR` empty unless AKSA later decides to sell a fixed AI Film edition. The server reads the amount; the browser only sends a product code, so a customer cannot edit the price in DevTools.

## 4. Configure the webhook

In Midtrans Snap Preferences, set the payment notification URL to:

```text
https://aksadigitalstudio.com/api/payments/midtrans-webhook
```

The checkout also sends that URL as an `X-Override-Notification` header. Midtrans notifications are signature-verified before an order can become `paid`.

## 5. Test in sandbox

After setting the variables, deploy, sign in to an AKSA account, then choose Digital Invitation or Original Love Song from the landing page or open:

```text
https://aksadigitalstudio.com/checkout?product=digital-invitation
```

Use Midtrans Sandbox payment instructions. A successful payment should update `payment_orders.status` to `paid` only after the webhook is received, then grant that signed-in account one unused row in `account_entitlements`.

## 6. Go live

After the business is verified by Midtrans:

1. Replace Sandbox client and server keys with Production keys in Vercel.
2. Set `MIDTRANS_IS_PRODUCTION=true`.
3. Confirm the production notification URL in the Midtrans dashboard.
4. Make one low-value real transaction and verify the matching order, amount, and webhook status in Supabase.

Do not switch production mode before completing the sandbox webhook test.
