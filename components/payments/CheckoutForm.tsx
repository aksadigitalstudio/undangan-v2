"use client";

import Script from "next/script";
import { FormEvent, useState } from "react";
import { CreditCard, LoaderCircle, ShieldCheck } from "lucide-react";

declare global {
  interface Window {
    snap?: {
      pay: (token: string, options: {
        onSuccess?: () => void;
        onPending?: () => void;
        onError?: () => void;
        onClose?: () => void;
      }) => void;
    };
  }
}

type CheckoutFormProps = {
  productCode: string;
  productName: string;
  amountLabel: string;
  clientKey: string | undefined;
  isProduction: boolean;
};

export default function CheckoutForm({ productCode, productName, amountLabel, clientKey, isProduction }: CheckoutFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productCode,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          customerNote: note,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "We could not start your payment.");
      if (!window.snap) throw new Error("The payment window is still loading. Please try again.");

      window.snap.pay(result.token, {
        onSuccess: () => { window.location.href = `/checkout/success?order=${encodeURIComponent(result.orderCode)}`; },
        onPending: () => { window.location.href = `/checkout/success?order=${encodeURIComponent(result.orderCode)}`; },
        onError: () => setMessage("Your payment was not completed. You can try again whenever you are ready."),
        onClose: () => setMessage("Payment window closed. Your order has not been marked as paid."),
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "We could not start your payment.");
    } finally {
      setLoading(false);
    }
  }

  if (!clientKey) {
    return <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">Payments are not connected yet. Add the Midtrans client key and server key before accepting transactions.</div>;
  }

  return (
    <>
      <Script src={isProduction ? "https://app.midtrans.com/snap/snap.js" : "https://app.sandbox.midtrans.com/snap/snap.js"} data-client-key={clientKey} strategy="afterInteractive" />
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block text-sm font-semibold text-[#19243a]">Your name<input required minLength={2} value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-xl border border-[#19243a]/15 bg-[#fcfaf7] px-4 py-3.5 font-normal outline-none transition focus:border-[#e26257] focus:ring-4 focus:ring-[#e26257]/10" /></label>
        <label className="block text-sm font-semibold text-[#19243a]">Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-[#19243a]/15 bg-[#fcfaf7] px-4 py-3.5 font-normal outline-none transition focus:border-[#e26257] focus:ring-4 focus:ring-[#e26257]/10" /></label>
        <label className="block text-sm font-semibold text-[#19243a]">WhatsApp number <span className="font-normal text-[#657087]">(optional)</span><input value={phone} onChange={(event) => setPhone(event.target.value)} inputMode="tel" className="mt-2 w-full rounded-xl border border-[#19243a]/15 bg-[#fcfaf7] px-4 py-3.5 font-normal outline-none transition focus:border-[#e26257] focus:ring-4 focus:ring-[#e26257]/10" /></label>
        <label className="block text-sm font-semibold text-[#19243a]">A note for AKSA <span className="font-normal text-[#657087]">(optional)</span><textarea value={note} onChange={(event) => setNote(event.target.value)} rows={3} maxLength={500} className="mt-2 w-full resize-none rounded-xl border border-[#19243a]/15 bg-[#fcfaf7] px-4 py-3.5 font-normal outline-none transition focus:border-[#e26257] focus:ring-4 focus:ring-[#e26257]/10" /></label>
        {message && <p className="rounded-xl bg-[#fdebe7] p-3 text-sm leading-6 text-[#9c3933]">{message}</p>}
        <button disabled={loading} type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#19243a] px-5 py-4 text-sm font-bold text-white shadow-xl shadow-[#19243a]/15 transition hover:bg-[#2a3853] disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? <><LoaderCircle size={17} className="animate-spin" /> Preparing payment...</> : <><CreditCard size={17} /> Pay {amountLabel}</>}
        </button>
        <p className="flex items-start justify-center gap-2 text-center text-xs leading-5 text-[#657087]"><ShieldCheck size={15} className="mt-0.5 shrink-0 text-[#67906f]" />Payments are processed securely by Midtrans. AKSA never stores payment card or wallet details.</p>
        <p className="text-center text-xs text-[#657087]">You are purchasing: <span className="font-bold text-[#19243a]">{productName}</span></p>
      </form>
    </>
  );
}
