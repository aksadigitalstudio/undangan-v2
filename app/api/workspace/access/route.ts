import { NextResponse } from "next/server";
import { isAksaAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ message: "Please sign in first." }, { status: 401 });
  if (isAksaAdmin(user.email)) return NextResponse.json({ canCreate: true, isAdmin: true });

  const { count, error } = await supabase
    .from("account_entitlements")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("status", "active")
    .is("used_at", null);

  if (error) return NextResponse.json({ message: "Workspace access could not be checked." }, { status: 500 });
  return NextResponse.json({ canCreate: (count ?? 0) > 0, isAdmin: false });
}
