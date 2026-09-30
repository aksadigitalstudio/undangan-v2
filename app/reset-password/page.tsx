"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AksaBrand from "@/components/AksaBrand";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [hasRecoverySession, setHasRecoverySession] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setHasRecoverySession(Boolean(data.session));
      setChecking(false);
    });
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setHasRecoverySession(Boolean(session));
      setChecking(false);
    });
    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (password.length < 8) {
      setMessage("Your new password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Your passwords do not match.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f5ef] px-6 py-12 text-[#182235]">
      <div className="w-full max-w-md rounded-[2rem] border border-[#182235]/10 bg-white p-8 shadow-xl shadow-[#182235]/10 sm:p-10">
        <Link href="/" aria-label="AKSA Digital Studio home"><AksaBrand /></Link>
        <p className="mt-9 text-xs font-bold uppercase tracking-[0.2em] text-[#c94d43]">Account security</p>
        <h1 className="mt-3 font-serif text-4xl tracking-[-0.03em]">Choose a new password</h1>
        <p className="mt-3 text-sm leading-6 text-[#687184]">Use a strong password you have not used elsewhere.</p>

        {checking ? <p className="mt-7 rounded-xl bg-[#f4f5f8] p-4 text-sm text-[#687184]">Checking your secure link...</p> : !hasRecoverySession ? <div className="mt-7 rounded-xl bg-[#fff1ec] p-4 text-sm leading-6 text-[#a23d34]">This password-reset link is invalid or has expired. Please request a new one.<Link href="/forgot-password" className="mt-2 block font-bold underline">Request a new link</Link></div> : <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          {message && <p className="rounded-xl bg-[#fff1ec] p-3 text-sm text-[#a23d34]">{message}</p>}
          <label className="block space-y-2 text-sm font-semibold"><span>New password</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" minLength={8} required className="w-full rounded-xl border border-[#182235]/15 bg-[#fbfaf8] p-3.5 outline-none transition focus:border-[#e65d51] focus:ring-4 focus:ring-[#e65d51]/10" /></label>
          <label className="block space-y-2 text-sm font-semibold"><span>Confirm new password</span><input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" minLength={8} required className="w-full rounded-xl border border-[#182235]/15 bg-[#fbfaf8] p-3.5 outline-none transition focus:border-[#e65d51] focus:ring-4 focus:ring-[#e65d51]/10" /></label>
          <button type="submit" disabled={loading} className="w-full rounded-xl bg-[#e65d51] px-5 py-3.5 font-bold text-white transition hover:bg-[#d94f44] disabled:opacity-60">{loading ? "Saving password..." : "Save new password"}</button>
        </form>}
      </div>
    </main>
  );
}
