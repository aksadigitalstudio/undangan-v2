"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AksaBrand from "@/components/AksaBrand";

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
      setErrorMessage("Your email or password is incorrect.");
      return;
    }

    const next = new URLSearchParams(window.location.search).get("next");
    router.replace(next?.startsWith("/") ? next : "/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f5ef] px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-[2rem] border border-[#182235]/10 bg-white p-8 shadow-xl shadow-[#182235]/10 sm:p-10"
      >
        <div>
          <AksaBrand />
          <h1 className="mt-3 font-serif text-4xl tracking-[-0.03em] text-[#182235]">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to continue shaping your invitation.
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
            className="w-full rounded-xl border border-[#182235]/15 bg-[#fbfaf8] p-3.5 text-[#182235] outline-none focus:border-[#e65d51] focus:ring-4 focus:ring-[#e65d51]/10"
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
            className="w-full rounded-xl border border-[#182235]/15 bg-[#fbfaf8] p-3.5 text-[#182235] outline-none focus:border-[#e65d51] focus:ring-4 focus:ring-[#e65d51]/10"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#182235] px-5 py-3.5 font-semibold text-white hover:bg-[#263653] disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Log in"}
        </button>
        <p className="text-center text-sm text-slate-600">New to AKSA? <Link href="/signup" className="font-semibold text-[#c94d43] hover:underline">Create an account</Link></p>
      </form>
    </main>
  );
}
