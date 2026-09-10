import { NextResponse } from "next/server";
import { isAksaAdmin } from "@/lib/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const statuses = ["new", "discussion", "awaiting_payment", "paid", "production", "revision", "completed", "cancelled"] as const;
type Status = (typeof statuses)[number];
const workspaceStatuses: Status[] = ["paid", "production", "revision", "completed"];

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user && isAksaAdmin(user.email) ? user : null;
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ message: "Administrator access is required." }, { status: 403 });
  }
  try {
    const { data, error } = await createAdminClient().from("order_briefs").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ orders: data ?? [] });
  } catch (error) {
    console.error("Unable to load admin orders", error);
    return NextResponse.json({ message: "Orders are unavailable. Apply the latest database migration first." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ message: "Administrator access is required." }, { status: 403 });
  }
  let body: { id?: string; status?: string; adminNotes?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid update request." }, { status: 400 });
  }
  const id = typeof body.id === "string" ? body.id : "";
  const status = body.status as Status;
  if (!/^[0-9a-f-]{36}$/i.test(id) || !statuses.includes(status)) {
    return NextResponse.json({ message: "Invalid order update." }, { status: 400 });
  }
  const adminNotes = typeof body.adminNotes === "string" ? body.adminNotes.trim().slice(0, 2000) : "";
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.from("order_briefs").update({ status, admin_notes: adminNotes || null }).eq("id", id).select("*").single();
    if (error) throw error;
    if (!workspaceStatuses.includes(status)) {
      const { error: revokeError } = await admin
        .from("account_entitlements")
        .update({ status: "revoked" })
        .eq("source_order_brief_id", id);
      if (revokeError) throw revokeError;
    }
    return NextResponse.json({ order: data });
  } catch (error) {
    console.error("Unable to update admin order", error);
    return NextResponse.json({ message: "We could not save this order update." }, { status: 500 });
  }
}
