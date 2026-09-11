import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const orderCodePattern = /^AKSA-\d{13,}-[a-f0-9]{8}$/i;

export async function GET(_: Request, { params }: { params: Promise<{ orderCode: string }> }) {
  const { orderCode } = await params;
  if (!orderCodePattern.test(orderCode)) {
    return NextResponse.json({ message: "Invalid payment reference." }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "Please sign in to view this payment." }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data: order, error } = await admin
    .from("payment_orders")
    .select("order_code, product_name, amount_idr, status, paid_at, created_at")
    .eq("order_code", orderCode)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Could not retrieve payment status", error);
    return NextResponse.json({ message: "We could not check this payment yet." }, { status: 500 });
  }
  if (!order) {
    return NextResponse.json({ message: "Payment not found." }, { status: 404 });
  }

  return NextResponse.json({ order });
}
