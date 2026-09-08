"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import TemplatePicker from "@/components/dashboard/TemplatePicker";
import { LockKeyhole } from "lucide-react";
export default function NewInvitationPage() {
  const router = useRouter();

  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [loading, setLoading] = useState(false);
  const [templateId, setTemplateId] = useState("template-001");
  const [accessLoading, setAccessLoading] = useState(true);
  const [canCreateInvitation, setCanCreateInvitation] = useState(false);

  useEffect(() => {
    async function checkAccess() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login?next=/dashboard/invitations/new");
        return;
      }

      const { count, error } = await supabase
        .from("account_entitlements")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("status", "active")
        .is("used_at", null);

      setCanCreateInvitation(!error && (count ?? 0) > 0);
      setAccessLoading(false);
    }

    void checkAccess();
  }, [router]);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const slug =
      groomName.toLowerCase().replace(/\s+/g, "-") +
      "-" +
      brideName.toLowerCase().replace(/\s+/g, "-");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      alert("Sesi admin berakhir. Silakan masuk kembali.");
      router.replace("/login");
      return;
    }

    const { error } = await supabase.from("invitations").insert([
      {
        groom_name: groomName,
        bride_name: brideName,
        slug,
        status: "Draft",
        template_id: templateId,
        user_id: user.id,
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Undangan berhasil dibuat!");

    router.push("/dashboard/invitations");
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-black mb-8">
        Tambah Undangan
      </h1>

      {accessLoading ? <div className="rounded-2xl bg-white p-8 text-sm text-slate-600 shadow">Checking your workspace access...</div> : !canCreateInvitation ? <div className="max-w-2xl rounded-2xl border border-[#e65d51]/20 bg-[#fff6f3] p-7 shadow-sm"><LockKeyhole className="text-[#c94d43]" size={26} /><h2 className="mt-4 text-2xl font-bold text-[#182235]">Choose an experience to unlock your workspace.</h2><p className="mt-3 leading-7 text-[#687184]">Discuss your package with AKSA first. Your workspace is unlocked only after the order is confirmed, protecting it from unpaid access.</p><Link href="/pricing" className="mt-6 inline-flex rounded-xl bg-[#182235] px-5 py-3 text-sm font-bold text-white">View experiences</Link></div> : <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-8 space-y-6"
      >

        <div>
          <label className="block font-semibold text-black mb-2">
            Nama Mempelai Pria
          </label>

          <input
            type="text"
            value={groomName}
            onChange={(e) => setGroomName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-black placeholder:text-gray-400"
            placeholder="Contoh: Handi"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-black mb-2">
            Nama Mempelai Wanita
          </label>

          <input
            type="text"
            value={brideName}
            onChange={(e) => setBrideName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-black placeholder:text-gray-400"
            placeholder="Contoh: Maureen"
            required
          />
        </div>
        <TemplatePicker
          value={templateId}
          onChange={setTemplateId}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Menyimpan..." : "Simpan Undangan"}
        </button>
      </form>}
    </>
  );
}
