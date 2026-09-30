"use client";

import { FormEvent, useEffect, useState } from "react";
import { KeyRound, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsError(false);
    if (password.length < 8) {
      setMessage("Password baru minimal 8 karakter.");
      setIsError(true);
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Konfirmasi password belum sama.");
      setIsError(true);
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setMessage(error.message);
      setIsError(true);
      return;
    }
    setPassword("");
    setConfirmPassword("");
    setMessage("Password berhasil diperbarui.");
  }

  return (
    <section className="mx-auto max-w-2xl py-4 sm:py-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c94d43]">Account</p>
      <h1 className="mt-3 font-serif text-4xl tracking-[-0.03em] text-[#182235]">Keamanan akun</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-[#687184]">Kelola password untuk dashboard undangan Anda.</p>

      <div className="mt-8 rounded-[1.75rem] border border-[#182235]/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#fff1ec] text-[#c94d43]"><ShieldCheck size={21} /></span><div><p className="font-bold text-[#182235]">Akun yang sedang digunakan</p><p className="mt-1 text-sm text-[#687184]">{email || "Memuat email..."}</p></div></div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {message && <p className={`rounded-xl p-3 text-sm ${isError ? "bg-[#fff1ec] text-[#a23d34]" : "bg-emerald-50 text-emerald-800"}`}>{message}</p>}
          <label className="block space-y-2 text-sm font-semibold text-[#182235]"><span>Password baru</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" minLength={8} required className="w-full rounded-xl border border-[#182235]/15 bg-[#fbfaf8] p-3.5 outline-none transition focus:border-[#e65d51] focus:ring-4 focus:ring-[#e65d51]/10" /></label>
          <label className="block space-y-2 text-sm font-semibold text-[#182235]"><span>Konfirmasi password baru</span><input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" minLength={8} required className="w-full rounded-xl border border-[#182235]/15 bg-[#fbfaf8] p-3.5 outline-none transition focus:border-[#e65d51] focus:ring-4 focus:ring-[#e65d51]/10" /></label>
          <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-[#182235] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#263653] disabled:opacity-60"><KeyRound size={16} />{loading ? "Menyimpan..." : "Perbarui password"}</button>
        </form>
      </div>
    </section>
  );
}
