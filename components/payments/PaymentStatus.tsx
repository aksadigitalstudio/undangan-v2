"use client";

import Link from "next/link";
import { CheckCircle2, CircleAlert, LoaderCircle, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type PaymentOrder = {
  order_code: string;
  product_name: string;
  amount_idr: number;
  status: string;
  paid_at: string | null;
};

const pendingStatuses = new Set(["created", "pending", "processing"]);
const failedStatuses = new Set(["failed", "expired", "cancelled", "refunded", "deny"]);

function formatIdr(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
}

export default function PaymentStatus({ orderCode }: { orderCode: string }) {
  const [order, setOrder] = useState<PaymentOrder | null>(null);
  const [message, setMessage] = useState("Checking your payment securely…");
  const [checking, setChecking] = useState(true);

  const refresh = useCallback(async () => {
    setChecking(true);
    try {
      const response = await fetch(`/api/payments/${encodeURIComponent(orderCode)}`, { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "We could not check this payment.");
      setOrder(result.order);
      setMessage("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "We could not check this payment.");
    } finally {
      setChecking(false);
    }
  }, [orderCode]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (!order || !pendingStatuses.has(order.status)) return;
    const timer = window.setInterval(() => void refresh(), 4000);
    return () => window.clearInterval(timer);
  }, [order, refresh]);

  const isPaid = order?.status === "paid";
  const isFailed = order ? failedStatuses.has(order.status) : false;
  const isPending = !order || pendingStatuses.has(order.status);

  return (
    <div className="rounded-[2rem] border border-[#19243a]/10 bg-white p-7 text-center shadow-2xl shadow-[#19243a]/8 sm:p-10">
      {isPaid ? <CheckCircle2 size={42} className="mx-auto text-[#67906f]" /> : isFailed ? <CircleAlert size={42} className="mx-auto text-[#d75d52]" /> : <LoaderCircle size={42} className="mx-auto animate-spin text-[#e26257]" />}
      <p className="mt-6 text-xs font-bold uppercase tracking-[.22em] text-[#e26257]">{isPaid ? "Payment confirmed" : isFailed ? "Payment needs attention" : "Awaiting confirmation"}</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-[#19243a] sm:text-5xl">{isPaid ? "Your workspace is ready." : isFailed ? "No payment was confirmed." : "We are confirming your payment."}</h1>
      <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#657087]">{isPaid ? "Midtrans has confirmed your payment. Your AKSA invitation workspace is now unlocked for this account." : isFailed ? "This transaction was not completed. You can return to pricing and start a new secure checkout whenever you are ready." : "Do not close this page yet. We unlock your workspace only after Midtrans sends a verified payment confirmation."}</p>
      {order && <div className="mx-auto mt-7 max-w-sm rounded-2xl bg-[#fcfaf7] px-5 py-4 text-left text-sm text-[#657087]"><p className="font-semibold text-[#19243a]">{order.product_name}</p><p className="mt-1">{formatIdr(order.amount_idr)} · Ref {order.order_code}</p></div>}
      {message && <p className="mx-auto mt-6 max-w-md rounded-xl bg-[#fdebe7] px-4 py-3 text-sm leading-6 text-[#9c3933]">{message}</p>}
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        {isPaid ? <Link href="/dashboard/invitations/new" className="rounded-full bg-[#19243a] px-6 py-3.5 text-sm font-bold text-white">Create your invitation</Link> : <button type="button" onClick={() => void refresh()} disabled={checking} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#19243a] px-6 py-3.5 text-sm font-bold text-white disabled:opacity-60"><RefreshCw size={16} className={checking ? "animate-spin" : ""} /> Check again</button>}
        {!isPending && !isPaid && <Link href="/pricing" className="rounded-full border border-[#19243a]/15 px-6 py-3.5 text-sm font-bold text-[#19243a]">View experiences</Link>}
      </div>
    </div>
  );
}
