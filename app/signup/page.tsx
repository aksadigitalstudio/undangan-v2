"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setErrorMessage(""); setSuccessMessage("");
    if (password.length < 8) { setErrorMessage("Password minimal 8 karakter."); return; }
    if (password !== confirmPassword) { setErrorMessage("Konfirmasi password belum sama."); return; }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/dashboard` } });
    setLoading(false);
    if (error) { setErrorMessage(error.message); return; }
    if (data.session) { router.replace("/dashboard"); router.refresh(); return; }
    setSuccessMessage("Akun berhasil dibuat. Cek email kamu untuk konfirmasi, lalu masuk ke dashboard.");
  }

  return <main className="flex min-h-screen items-center justify-center bg-[#f8f5ef] px-6 py-12 text-[#182235]"><div className="w-full max-w-md rounded-[2rem] border border-[#182235]/10 bg-white p-8 shadow-xl shadow-[#182235]/10 sm:p-10"><Link href="/" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#182235] text-sm font-bold text-[#f3c777]">A</span><span className="font-serif text-xl font-semibold">AKSA</span></Link><div className="mt-9"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c94d43]">Start your story</p><h1 className="mt-3 font-serif text-4xl tracking-[-0.03em]">Buat akun gratis</h1><p className="mt-3 text-sm leading-6 text-[#687184]">Mulai susun undangan yang terasa personal untuk hari istimewamu.</p></div>{errorMessage && <p className="mt-6 rounded-xl bg-red-50 p-3 text-sm text-red-700">{errorMessage}</p>}{successMessage && <p className="mt-6 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{successMessage}</p>}<form onSubmit={handleSubmit} className="mt-7 space-y-5"><label className="block space-y-2 text-sm font-semibold"><span>Email</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required className="w-full rounded-xl border border-[#182235]/15 bg-[#fbfaf8] p-3.5 outline-none transition focus:border-[#e65d51] focus:ring-4 focus:ring-[#e65d51]/10" /></label><label className="block space-y-2 text-sm font-semibold"><span>Password</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" minLength={8} required className="w-full rounded-xl border border-[#182235]/15 bg-[#fbfaf8] p-3.5 outline-none transition focus:border-[#e65d51] focus:ring-4 focus:ring-[#e65d51]/10" /></label><label className="block space-y-2 text-sm font-semibold"><span>Ulangi password</span><input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" minLength={8} required className="w-full rounded-xl border border-[#182235]/15 bg-[#fbfaf8] p-3.5 outline-none transition focus:border-[#e65d51] focus:ring-4 focus:ring-[#e65d51]/10" /></label><button type="submit" disabled={loading} className="w-full rounded-xl bg-[#e65d51] px-5 py-3.5 font-bold text-white transition hover:bg-[#d94f44] disabled:opacity-60">{loading ? "Membuat akun..." : "Daftar gratis"}</button></form><p className="mt-7 text-center text-sm text-[#687184]">Sudah punya akun? <Link href="/login" className="font-bold text-[#c94d43] hover:underline">Masuk di sini</Link></p></div></main>;
}
