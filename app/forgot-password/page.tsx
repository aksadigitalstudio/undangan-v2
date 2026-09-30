"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import AksaBrand from "@/components/AksaBrand";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);
    setMessage(error ? "We could not send a reset link. Please try again or contact AKSA." : "If this email is registered, we have sent a secure password-reset link. Please check your inbox.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f5ef] px-6 py-12 text-[#182235]">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-[2rem] border border-[#182235]/10 bg-white p-8 shadow-xl shadow-[#182235]/10 sm:p-10">
        <Link href="/" aria-label="AKSA Digital Studio home"><AksaBrand /></Link>
        <p className="mt-9 text-xs font-bold uppercase tracking-[0.2em] text-[#c94d43]">Account recovery</p>
        <h1 className="mt-3 font-serif text-4xl tracking-[-0.03em]">Reset your password</h1>
        <p className="mt-3 text-sm leading-6 text-[#687184]">Enter your account email and we will send a secure, one-time link to choose a new password.</p>

        {message && <p className="mt-6 rounded-xl bg-[#f4f5f8] p-3 text-sm leading-6 text-[#41506b]">{message}</p>}

        <label className="mt-7 block space-y-2 text-sm font-semibold">
          <span>Email</span>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required className="w-full rounded-xl border border-[#182235]/15 bg-[#fbfaf8] p-3.5 outline-none transition focus:border-[#e65d51] focus:ring-4 focus:ring-[#e65d51]/10" />
        </label>
        <button type="submit" disabled={loading} className="mt-5 w-full rounded-xl bg-[#182235] px-5 py-3.5 font-bold text-white transition hover:bg-[#263653] disabled:opacity-60">{loading ? "Sending link..." : "Send reset link"}</button>
        <p className="mt-7 text-center text-sm text-[#687184]">Remembered it? <Link href="/login" className="font-bold text-[#c94d43] hover:underline">Log in</Link></p>
      </form>
    </main>
  );
}
