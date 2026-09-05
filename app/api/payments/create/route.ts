import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getPaymentProduct } from "@/lib/payments/catalog";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type CheckoutRequest = {
  productCode?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerNote?: string;
};

function cleanText(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createOrderCode() {
  return `AKSA-${Date.now()}-${randomUUID().slice(0, 8)}`;
}

export async function POST(request: Request) {
  let body: CheckoutRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid checkout request." }, { status: 400 });
  }

  const product = getPaymentProduct(cleanText(body.productCode, 64));
  const customerName = cleanText(body.customerName, 120);
  const customerEmail = cleanText(body.customerEmail, 160).toLowerCase();
  const customerPhone = cleanText(body.customerPhone, 32);
  const customerNote = cleanText(body.customerNote, 500);

  if (!product || !product.priceIdr) {
    return NextResponse.json({ message: "This product is not ready for checkout yet." }, { status: 400 });
  }
  if (customerName.length < 2 || !isValidEmail(customerEmail)) {
    return NextResponse.json({ message: "Please enter a valid name and email address." }, { status: 400 });
  }

  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aksadigitalstudio.com").replace(/\/$/, "");
  if (!serverKey) {
    return NextResponse.json({ message: "Payment is not configured yet." }, { status: 503 });
  }

  const orderCode = createOrderCode();
  const admin = createAdminClient();
  const { error: orderError } = await admin.from("payment_orders").insert({
    order_code: orderCode,
    product_code: product.code,
    product_name: product.name,
    amount_idr: product.priceIdr,
    customer_name: customerName,
    customer_email: customerEmail,
    customer_phone: customerPhone || null,
    customer_note: customerNote || null,
    provider: "midtrans",
    status: "created",
  });

  if (orderError) {
    console.error("Unable to create payment order", orderError);
    return NextResponse.json({ message: "We could not create your order. Please try again." }, { status: 500 });
  }

  const midtransUrl = isProduction
    ? "https://app.midtrans.com/snap/v1/transactions"
    : "https://app.sandbox.midtrans.com/snap/v1/transactions";

  const midtransBody = {
    transaction_details: { order_id: orderCode, gross_amount: product.priceIdr },
    item_details: [{ id: product.code, price: product.priceIdr, quantity: 1, name: product.name.slice(0, 50) }],
    customer_details: { first_name: customerName, email: customerEmail, phone: customerPhone || undefined },
    callbacks: { finish: `${siteUrl}/checkout/success?order=${encodeURIComponent(orderCode)}` },
  };

  try {
    const midtransResponse = await fetch(midtransUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString("base64")}`,
        "X-Override-Notification": `${siteUrl}/api/payments/midtrans-webhook`,
      },
      body: JSON.stringify(midtransBody),
      cache: "no-store",
    });
    const transaction = await midtransResponse.json();

    if (!midtransResponse.ok || !transaction.token) {
      console.error("Midtrans transaction creation failed", transaction);
      await admin.from("payment_orders").update({ status: "failed" }).eq("order_code", orderCode);
      return NextResponse.json({ message: "The payment gateway could not start this transaction." }, { status: 502 });
    }

    return NextResponse.json({ token: transaction.token, orderCode });
  } catch (error) {
    console.error("Midtrans connection failed", error);
    await admin.from("payment_orders").update({ status: "failed" }).eq("order_code", orderCode);
    return NextResponse.json({ message: "The payment gateway is unavailable. Please try again." }, { status: 502 });
  }
}
