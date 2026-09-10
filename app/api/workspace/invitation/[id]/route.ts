import { NextResponse } from "next/server";
import { isAksaAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) return NextResponse.json({ message: "Invalid invitation." }, { status: 400 });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ message: "Please sign in first." }, { status: 401 });
  if (isAksaAdmin(user.email)) return NextResponse.json({ allowed: true, admin: true });

  const { data: invitation } = await supabase.from("invitations").select("id").eq("id", id).maybeSingle();
  if (!invitation) return NextResponse.json({ message: "Invitation not found." }, { status: 404 });

  const { data: entitlement } = await supabase
    .from("account_entitlements")
    .select("id")
    .eq("user_id", user.id)
    .eq("used_invitation_id", Number(id))
    .eq("status", "active")
    .maybeSingle();

  return NextResponse.json({ allowed: Boolean(entitlement) });
}
