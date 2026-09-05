"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Invitation {
  id: number;
  groom_name: string;
  bride_name: string;
  slug: string;
  status: string;
  created_at: string;
}

function StatusPill({ status }: { status: string }) {
  const isPublished = status.toLowerCase() === "published";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${isPublished ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{status}</span>;
}

export default function InvitationsPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvitations();
  }, []);

  async function fetchInvitations() {
    setLoading(true);
    const { data, error } = await supabase.from("invitations").select("*").order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setInvitations(data ?? []);
    setLoading(false);
  }

  async function deleteInvitation(id: number) {
    if (!confirm("Yakin ingin menghapus undangan ini?")) return;

    const { error } = await supabase.from("invitations").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }

    alert("Undangan berhasil dihapus.");
    fetchInvitations();
  }

  const actionClass = "rounded-lg px-2.5 py-2 text-center text-xs font-bold transition hover:bg-slate-100";

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e65d51]">Workspace</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#182235] sm:text-4xl">Daftar Undangan</h1>
        </div>
        <Link href="/dashboard/invitations/new" className="inline-flex w-full items-center justify-center rounded-xl bg-[#182235] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#182235]/15 transition hover:-translate-y-0.5 hover:bg-[#263653] sm:w-auto">+ Tambah Undangan</Link>
      </div>

      <div className="space-y-3 md:hidden">
        {loading && <div className="rounded-2xl border border-[#182235]/10 bg-white p-6 text-center text-sm text-[#687184]">Loading invitations...</div>}
        {!loading && invitations.length === 0 && <div className="rounded-2xl border border-[#182235]/10 bg-white p-6 text-center text-sm text-[#687184]">Belum ada undangan.</div>}
        {!loading && invitations.map((item) => (
          <article key={item.id} className="rounded-2xl border border-[#182235]/10 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-base font-bold leading-5 text-[#182235]">{item.groom_name} <span className="text-[#e65d51]">&amp;</span> {item.bride_name}</h2>
                <p className="mt-2 break-all text-xs leading-5 text-[#687184]">{item.slug}</p>
              </div>
              <StatusPill status={item.status} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#182235]/8 pt-3">
              <Link href={`/${item.slug}?return=dashboard`} target="_blank" className={`${actionClass} bg-emerald-50 text-emerald-700`}>View</Link>
              <Link href={`/dashboard/invitations/${item.id}/edit`} className={`${actionClass} bg-blue-50 text-blue-700`}>Edit</Link>
              <Link href={`/dashboard/invitations/${item.id}/studio`} className={`${actionClass} bg-slate-100 text-slate-800`}>Studio</Link>
              <Link href={`/dashboard/invitations/${item.id}/guests`} className={`${actionClass} bg-violet-50 text-violet-700`}>Guests</Link>
              <button onClick={() => deleteInvitation(item.id)} className={`${actionClass} col-span-2 bg-red-50 text-red-700`}>Delete invitation</button>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-[#182235]/10 bg-white shadow-sm md:block">
        <table className="min-w-[760px] w-full">
          <thead className="bg-[#f8f5ef]">
            <tr>
              <th className="p-4 text-left text-sm font-bold text-[#182235]">Mempelai</th>
              <th className="p-4 text-left text-sm font-bold text-[#182235]">Slug</th>
              <th className="p-4 text-left text-sm font-bold text-[#182235]">Status</th>
              <th className="p-4 text-left text-sm font-bold text-[#182235]">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={4} className="p-8 text-center text-sm text-[#687184]">Loading invitations...</td></tr>}
            {!loading && invitations.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-sm text-[#687184]">Belum ada undangan.</td></tr>}
            {invitations.map((item) => (
              <tr key={item.id} className="border-t border-[#182235]/8 transition hover:bg-[#fcfaf7]">
                <td className="p-4 font-semibold text-[#182235]">{item.groom_name} &amp; {item.bride_name}</td>
                <td className="p-4 text-sm text-[#657087]">{item.slug}</td>
                <td className="p-4"><StatusPill status={item.status} /></td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm font-bold">
                    <Link href={`/${item.slug}?return=dashboard`} target="_blank" className="rounded px-2 py-1 text-emerald-700 hover:bg-emerald-50">View</Link>
                    <Link href={`/dashboard/invitations/${item.id}/edit`} className="rounded px-2 py-1 text-blue-700 hover:bg-blue-50">Edit</Link>
                    <Link href={`/dashboard/invitations/${item.id}/studio`} className="rounded px-2 py-1 text-slate-800 hover:bg-slate-100">Studio</Link>
                    <Link href={`/dashboard/invitations/${item.id}/guests`} className="rounded px-2 py-1 text-violet-700 hover:bg-violet-50">Guests</Link>
                    <button onClick={() => deleteInvitation(item.id)} className="rounded px-2 py-1 text-red-700 hover:bg-red-50">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
