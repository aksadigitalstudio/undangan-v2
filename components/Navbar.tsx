"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const router = useRouter();
  const [email, setEmail] = useState("Admin");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setEmail(data.user.email);
    });
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <nav className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h1 className="text-2xl font-bold text-gray-900">AKSA Digital Studio</h1>

      <div className="flex items-center gap-3">
        <span className="max-w-48 truncate text-sm font-medium text-gray-800">{email}</span>

        <button
          onClick={handleSignOut}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Keluar
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
          <span className="text-white font-semibold">A</span>
        </div>
      </div>
    </nav>
  );
}
