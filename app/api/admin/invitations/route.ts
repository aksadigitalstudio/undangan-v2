import { NextResponse } from "next/server";
import { isAksaAdmin } from "@/lib/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user && isAksaAdmin(user.email) ? user : null;
}

function cleanText(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ message: "Administrator access is required." }, { status: 403 });

  const { data, error } = await createAdminClient().from("invitations").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ message: "Invitations could not be loaded." }, { status: 500 });
  return NextResponse.json({ invitations: data ?? [] });
}

export async function POST(request: Request) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ message: "Administrator access is required." }, { status: 403 });

  let body: { groomName?: string; brideName?: string; templateId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid invitation request." }, { status: 400 });
  }

  const groomName = cleanText(body.groomName, 120);
  const brideName = cleanText(body.brideName, 120);
  const templateId = cleanText(body.templateId, 80);
  if (groomName.length < 2 || brideName.length < 2 || !/^template-\d{3}$/.test(templateId)) {
    return NextResponse.json({ message: "Please provide valid names and a template." }, { status: 400 });
  }

  const slug = `${groomName.toLowerCase().replace(/\s+/g, "-")}-${brideName.toLowerCase().replace(/\s+/g, "-")}`;
  const admin = createAdminClient();

  // Admin-created internal workspaces still use the same database trigger as
  // paid workspaces. This preserves one owner per invitation without giving
  // the browser any service-role access.
  const { data: entitlement, error: entitlementError } = await admin
    .from("account_entitlements")
    .insert({ user_id: user.id, product_code: "internal-admin-workspace", status: "active" })
    .select("id")
    .single();

  if (entitlementError) return NextResponse.json({ message: "Admin workspace could not be prepared." }, { status: 500 });

  const { data: invitation, error: invitationError } = await admin
    .from("invitations")
    .insert({ groom_name: groomName, bride_name: brideName, slug, status: "Draft", template_id: templateId, user_id: user.id })
    .select("id")
    .single();

  if (invitationError) {
    await admin.from("account_entitlements").delete().eq("id", entitlement.id);
    return NextResponse.json({ message: invitationError.message }, { status: 400 });
  }

  return NextResponse.json({ invitation }, { status: 201 });
}

export async function DELETE(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ message: "Administrator access is required." }, { status: 403 });

  const id = new URL(request.url).searchParams.get("id");
  if (!id || !/^\d+$/.test(id)) return NextResponse.json({ message: "Invalid invitation id." }, { status: 400 });

  const { error } = await createAdminClient().from("invitations").delete().eq("id", Number(id));
  if (error) return NextResponse.json({ message: "Invitation could not be deleted." }, { status: 500 });
  return NextResponse.json({ deleted: true });
}
