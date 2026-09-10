import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const accessStatuses = ["paid", "production", "revision", "completed"];

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return NextResponse.json({ message: "Please sign in first." }, { status: 401 });

  try {
    const admin = createAdminClient();
    const { data: orders, error: ordersError } = await admin
      .from("order_briefs")
      .select("id, package_code, account_user_id")
      .eq("email", user.email.toLowerCase())
      .in("status", accessStatuses);
    if (ordersError) throw ordersError;

    let granted = 0;
    for (const order of orders ?? []) {
      if (order.account_user_id && order.account_user_id !== user.id) continue;
      const { data: existing, error: existingError } = await admin
        .from("account_entitlements")
        .select("id, user_id")
        .eq("source_order_brief_id", order.id)
        .maybeSingle();
      if (existingError) throw existingError;
      if (existing && existing.user_id !== user.id) continue;

      const { error: entitlementError } = await admin
        .from("account_entitlements")
        .upsert(
          {
            user_id: user.id,
            source_order_brief_id: order.id,
            product_code: order.package_code,
            status: "active",
          },
          { onConflict: "source_order_brief_id" },
        );
      if (entitlementError) throw entitlementError;

      const { error: orderUpdateError } = await admin
        .from("order_briefs")
        .update({ account_user_id: user.id })
        .eq("id", order.id);
      if (orderUpdateError) throw orderUpdateError;
      granted += 1;
    }

    return NextResponse.json({ granted });
  } catch (error) {
    console.error("Unable to claim paid workspace", error);
    return NextResponse.json({ message: "Workspace access could not be checked. Please contact AKSA." }, { status: 503 });
  }
}
