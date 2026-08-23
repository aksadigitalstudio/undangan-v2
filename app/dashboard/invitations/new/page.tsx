"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import TemplatePicker from "@/components/dashboard/TemplatePicker";
export default function NewInvitationPage() {
  const router = useRouter();

  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [loading, setLoading] = useState(false);
  const [templateId, setTemplateId] = useState("template-001");
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

      <form
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
      </form>
    </>
  );
}
