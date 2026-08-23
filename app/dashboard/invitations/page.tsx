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

export default function InvitationsPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvitations();
  }, []);

  async function fetchInvitations() {
    setLoading(true);

    const { data, error } = await supabase
      .from("invitations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setInvitations(data ?? []);
    setLoading(false);
  }

  async function deleteInvitation(id: number) {
    const confirmDelete = confirm(
      "Yakin ingin menghapus undangan ini?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("invitations")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Undangan berhasil dihapus.");

    fetchInvitations();
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-black">
          Daftar Undangan
        </h1>

        <Link
          href="/dashboard/invitations/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Tambah Undangan
        </Link>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left text-gray-700 font-semibold">
                Mempelai
              </th>

              <th className="p-4 text-left text-gray-700 font-semibold">
                Slug
              </th>

              <th className="p-4 text-left text-gray-700 font-semibold">
                Status
              </th>

              <th className="p-4 text-left text-gray-700 font-semibold">
                Aksi
              </th>

            </tr>

          </thead>

          <tbody>

            {loading && (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-gray-600"
                >
                  Loading...
                </td>
              </tr>
            )}

            {!loading && invitations.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-gray-600"
                >
                  Belum ada undangan.
                </td>
              </tr>
            )}

            {invitations.map((item) => (

              <tr
                key={item.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4 text-black">
                  {item.groom_name} & {item.bride_name}
                </td>

                <td className="p-4 text-black">
                  {item.slug}
                </td>

                <td className="p-4">

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                    {item.status}

                  </span>

                </td>

                <td className="p-4">

<div className="flex gap-5">

  <Link
    href={`/${item.slug}`}
    target="_blank"
    className="text-green-600 hover:underline font-medium"
  >
    Lihat
  </Link>

  <Link
    href={`/dashboard/invitations/${item.id}/edit`}
    className="text-blue-600 hover:underline font-medium"
  >
    Edit
  </Link>

  <Link
    href={`/dashboard/invitations/${item.id}/guests`}
    className="text-purple-600 hover:underline font-medium"
  >
    Tamu
  </Link>

  <button
    onClick={() => deleteInvitation(item.id)}
    className="text-red-600 hover:underline font-medium"
  >
    Hapus
  </button>

</div>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}