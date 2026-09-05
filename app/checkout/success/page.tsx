import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import AksaBrand from "@/components/AksaBrand";

export default function CheckoutSuccessPage() {
  return <main className="grid min-h-screen place-items-center bg-[#fcfaf7] px-6 py-12 text-center text-[#19243a]"><div className="max-w-lg"><AksaBrand className="justify-center" /><span className="mx-auto mt-12 grid h-16 w-16 place-items-center rounded-full bg-[#e9f4eb] text-[#4d8558]"><CheckCircle2 size={32} /></span><p className="mt-7 text-xs font-bold uppercase tracking-[.22em] text-[#e26257]">Payment update received</p><h1 className="mt-4 font-serif text-5xl leading-none">Thank you for choosing AKSA.</h1><p className="mt-6 text-base leading-7 text-[#657087]">Your payment status is being confirmed by our payment partner. Our team will contact you using the details you provided to begin your creative brief.</p><Link href="/" className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#19243a] px-6 py-3.5 text-sm font-bold text-white">Return to AKSA <ArrowRight size={16} /></Link></div></main>;
}
