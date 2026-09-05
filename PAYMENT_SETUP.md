# AKSA Payment Setup — Midtrans Snap

This project contains a payment-ready checkout. It does **not** accept a payment until the required environment variables and product prices have been configured.

## 1. Apply the database migration

Open the Supabase SQL Editor, paste the content of:

`supabase/migrations/20260906_payment_orders.sql`

and run it once. This creates the private `payment_orders` table. Orders are created and updated only by server routes; users cannot submit a price or mark an order paid from the browser.

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

## 3. Approve and set package prices

Fill only approved final amounts in rupiah. Example values below are examples only—replace them with AKSA’s real price list before enabling checkout.

```env
AKSA_PRICE_DIGITAL_INVITATION_IDR=350000
AKSA_PRICE_ORIGINAL_LOVE_SONG_IDR=1500000
AKSA_PRICE_AI_LOVE_FILM_IDR=2500000
```

The server reads the amount from these variables. The browser only sends a product code, so a customer cannot edit the price in DevTools.

## 4. Configure the webhook

In Midtrans Snap Preferences, set the payment notification URL to:

```text
https://aksadigitalstudio.com/api/payments/midtrans-webhook
```

The checkout also sends that URL as an `X-Override-Notification` header. Midtrans notifications are signature-verified before an order can become `paid`.

## 5. Test in sandbox

After setting the variables, deploy and open:

```text
https://aksadigitalstudio.com/checkout?product=digital-invitation
```

Use Midtrans Sandbox payment instructions. A successful payment should update `payment_orders.status` to `paid` only after the webhook is received.

## 6. Go live

After the business is verified by Midtrans:

1. Replace Sandbox client and server keys with Production keys in Vercel.
2. Set `MIDTRANS_IS_PRODUCTION=true`.
3. Confirm the production notification URL in the Midtrans dashboard.
4. Make one low-value real transaction and verify the matching order, amount, and webhook status in Supabase.

Do not switch production mode before completing the sandbox webhook test.
