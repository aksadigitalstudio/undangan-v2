"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function EditInvitationPage({ params }: Props) {
  const router = useRouter();

  const [id, setId] = useState("");

  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [status, setStatus] = useState("Draft");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadInvitation();
  }, []);

  async function loadInvitation() {
    const { id } = await params;
    setId(id);

    const { data, error } = await supabase
      .from("invitations")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    setGroomName(data.groom_name ?? "");
    setBrideName(data.bride_name ?? "");
    setStatus(data.status ?? "Draft");

    setLoading(false);
  }

  async function updateInvitation() {
    setSaving(true);

    const { error } = await supabase
      .from("invitations")
      .update({
        groom_name: groomName,
        bride_name: brideName,
        status: status,
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Undangan berhasil diperbarui.");

    router.push("/dashboard/invitations");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="text-black text-xl">
        Loading...
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-black mb-8">
        Edit Undangan
      </h1>

      <div className="bg-white rounded-xl shadow p-8">

        <div className="mb-6">
          <label className="block text-black font-semibold mb-2">
            Nama Mempelai Pria
          </label>

          <input
            type="text"
            value={groomName}
            onChange={(e) => setGroomName(e.target.value)}
            className="w-full border rounded-lg p-3 text-black"
          />
        </div>

        <div className="mb-6">
          <label className="block text-black font-semibold mb-2">
            Nama Mempelai Wanita
          </label>

          <input
            type="text"
            value={brideName}
            onChange={(e) => setBrideName(e.target.value)}
            className="w-full border rounded-lg p-3 text-black"
          />
        </div>

        <div className="mb-8">
          <label className="block text-black font-semibold mb-2">
            Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-lg p-3 text-black"
          >
            <option>Draft</option>
            <option>Published</option>
          </select>
        </div>

        <button
          onClick={updateInvitation}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          {saving ? "Menyimpan..." : "Simpan Perubahan"}
        </button>

      </div>
    </>
  );
}