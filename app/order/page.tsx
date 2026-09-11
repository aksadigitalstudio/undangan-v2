import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Check, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import AksaBrand from "@/components/AksaBrand";
import OrderBriefForm from "@/components/orders/OrderBriefForm";

type Props = { searchParams: Promise<{ package?: string }> };
export const metadata = { title: "Start your order" };

export default async function OrderPage({ searchParams }: Props) {
  const { package: initialPackage } = await searchParams;
  // Fixed-price editions go straight to protected Midtrans checkout. The
  // open brief remains for custom, negotiable productions such as AI Love Film.
  if (initialPackage === "digital-invitation" || initialPackage === "original-love-song") {
    redirect(`/checkout?product=${initialPackage}`);
  }
  return <main className="min-h-screen overflow-hidden bg-[#fffaf5] px-5 py-5 text-[#19243a] sm:px-6 sm:py-8 lg:px-10"><div className="mx-auto max-w-7xl"><header className="flex items-center justify-between"><Link href="/" aria-label="AKSA Digital Studio home"><AksaBrand /></Link><Link href="/pricing" className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-[#657087] transition hover:bg-white"><ArrowLeft size={16} /> Packages</Link></header><div className="mt-10 grid gap-10 lg:grid-cols-[.78fr_1fr] lg:gap-16"><section className="lg:pt-8"><p className="inline-flex items-center gap-2 rounded-full bg-[#fff0ea] px-3 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#d95349]"><Sparkles size={13} /> Start your AKSA order</p><h1 className="mt-6 max-w-xl font-serif text-5xl leading-[.92] tracking-[-.04em] sm:text-6xl">A few details now.<br /><span className="text-[#ef655a]">A better beginning later.</span></h1><p className="mt-7 max-w-md text-base leading-8 text-[#5d6980]">This brief gives AKSA the context to recommend the right visual direction, production scope, and timeline before we speak on WhatsApp.</p><div className="mt-10 space-y-5"><p className="flex gap-3 text-sm leading-6 text-[#53627a]"><Check size={18} className="mt-0.5 shrink-0 text-[#67906f]" />Takes about three minutes to complete.</p><p className="flex gap-3 text-sm leading-6 text-[#53627a]"><Check size={18} className="mt-0.5 shrink-0 text-[#67906f]" />No payment is requested in this step.</p><p className="flex gap-3 text-sm leading-6 text-[#53627a]"><ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#67906f]" />You stay in control—your brief is sent to AKSA only when you choose WhatsApp.</p></div><div className="mt-12 rounded-2xl border border-[#19243a]/10 bg-[#e7f2f4] p-5"><p className="flex items-center gap-2 text-sm font-bold text-[#19243a]"><MessageCircle size={17} className="text-[#4b7d93]" /> What happens next</p><p className="mt-2 text-sm leading-6 text-[#58717c]">AKSA reviews your brief, confirms the package and timeline, then sends payment and production details personally.</p></div></section><OrderBriefForm initialPackage={initialPackage} /></div></div></main>;
}
