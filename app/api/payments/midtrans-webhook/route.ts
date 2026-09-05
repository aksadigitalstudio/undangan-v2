import { createHash, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type MidtransNotification = {
  order_id?: string;
  status_code?: string;
  gross_amount?: string;
  transaction_status?: string;
  fraud_status?: string;
  transaction_id?: string;
  payment_type?: string;
  signature_key?: string;
};

function matchesSignature(notification: MidtransNotification, serverKey: string) {
  if (!notification.order_id || !notification.status_code || !notification.gross_amount || !notification.signature_key) return false;
  const expected = createHash("sha512").update(`${notification.order_id}${notification.status_code}${notification.gross_amount}${serverKey}`).digest("hex");
  const received = notification.signature_key;
  return expected.length === received.length && timingSafeEqual(Buffer.from(expected), Buffer.from(received));
}

function mapStatus(transactionStatus: string | undefined, fraudStatus: string | undefined) {
  if (transactionStatus === "settlement" || (transactionStatus === "capture" && fraudStatus === "accept")) return "paid";
  if (transactionStatus === "expire") return "expired";
  if (transactionStatus === "cancel") return "cancelled";
  if (transactionStatus === "refund" || transactionStatus === "partial_refund") return "refunded";
  if (transactionStatus === "deny" || transactionStatus === "failure") return "failed";
  return "pending";
}

export async function POST(request: Request) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) return NextResponse.json({ message: "Payment is not configured." }, { status: 503 });

  let notification: MidtransNotification;
  try {
    notification = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid notification." }, { status: 400 });
  }

  if (!matchesSignature(notification, serverKey)) {
    return NextResponse.json({ message: "Invalid signature." }, { status: 401 });
  }

  const amount = Math.round(Number(notification.gross_amount));
  if (!notification.order_id || !Number.isSafeInteger(amount)) {
    return NextResponse.json({ message: "Invalid transaction data." }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: order, error: readError } = await admin
    .from("payment_orders")
    .select("amount_idr")
    .eq("order_code", notification.order_id)
    .maybeSingle();

  if (readError || !order || order.amount_idr !== amount) {
    return NextResponse.json({ message: "Order verification failed." }, { status: 400 });
  }

  const status = mapStatus(notification.transaction_status, notification.fraud_status);
  const { error: updateError } = await admin
    .from("payment_orders")
    .update({
      status,
      provider_transaction_id: notification.transaction_id ?? null,
      payment_type: notification.payment_type ?? null,
      raw_notification: notification,
      paid_at: status === "paid" ? new Date().toISOString() : null,
    })
    .eq("order_code", notification.order_id);

  if (updateError) {
    console.error("Unable to update payment order", updateError);
    return NextResponse.json({ message: "Unable to save payment status." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
