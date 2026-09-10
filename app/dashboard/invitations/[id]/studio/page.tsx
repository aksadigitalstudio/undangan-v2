import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import InvitationStudio from "@/components/studio/InvitationStudio";
import { isAksaAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function InvitationStudioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user && isAksaAdmin(user.email)) return <InvitationStudio invitationId={id} />;

  const { data: entitlement } = user
    ? await supabase
      .from("account_entitlements")
      .select("id")
      .eq("user_id", user.id)
      .eq("used_invitation_id", Number(id))
      .eq("status", "active")
      .maybeSingle()
    : { data: null };

  if (entitlement) return <InvitationStudio invitationId={id} />;

  return <section className="mx-auto grid min-h-[65vh] max-w-xl place-items-center py-12 text-center"><div className="rounded-[2rem] border border-[#e65d51]/20 bg-[#fff8f5] p-8 shadow-sm"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#fff0ea] text-[#c94d43]"><LockKeyhole size={24} /></span><p className="mt-6 text-[10px] font-bold uppercase tracking-[.2em] text-[#d15a4e]">Workspace locked</p><h1 className="mt-3 font-serif text-4xl text-[#182235]">Your editor unlocks after payment.</h1><p className="mt-4 text-sm leading-7 text-[#687184]">Use the same email from your order brief to sign in. Once AKSA confirms payment, your invitation studio and publishing tools become available here.</p><Link href="/dashboard/invitations" className="mt-7 inline-flex rounded-full bg-[#182235] px-5 py-3 text-sm font-bold text-white">Back to invitations</Link></div></section>;
}
