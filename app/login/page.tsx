"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setErrorMessage("Email atau password tidak valid.");
      return;
    }

    const next = new URLSearchParams(window.location.search).get("next");
    router.replace(next?.startsWith("/") ? next : "/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-3xl bg-white p-8 shadow-2xl"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            AKSA Digital Studio
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Masuk Admin</h1>
          <p className="mt-2 text-sm text-slate-600">
            Gunakan akun Supabase Auth yang telah dibuat untuk mengelola undangan.
          </p>
        </div>

        {errorMessage && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{errorMessage}</p>
        )}

        <label className="block space-y-2 text-sm font-medium text-slate-700">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            className="w-full rounded-lg border border-slate-300 p-3 text-slate-900"
          />
        </label>

        <label className="block space-y-2 text-sm font-medium text-slate-700">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            className="w-full rounded-lg border border-slate-300 p-3 text-slate-900"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </main>
  );
}
