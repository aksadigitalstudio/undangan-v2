import Link from "next/link";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import AksaBrand from "@/components/AksaBrand";
import CheckoutForm from "@/components/payments/CheckoutForm";
import { formatIdr, getPaymentProduct } from "@/lib/payments/catalog";

type Props = { searchParams: Promise<{ product?: string }> };
export const dynamic = "force-dynamic";

export default async function CheckoutPage({ searchParams }: Props) {
  const { product: productCode } = await searchParams;
  const product = getPaymentProduct(productCode);
  const isGatewayConfigured = Boolean(process.env.MIDTRANS_SERVER_KEY && process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY);

  if (!product) {
    return <main className="grid min-h-screen place-items-center bg-[#fcfaf7] px-6 text-center text-[#19243a]"><div><AksaBrand className="justify-center" /><h1 className="mt-10 font-serif text-5xl">Choose your experience first.</h1><Link href="/pricing" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#19243a] px-6 py-3.5 text-sm font-bold text-white"><ArrowLeft size={16} /> View experiences</Link></div></main>;
  }

  return <main className="min-h-screen bg-[#fcfaf7] px-6 py-7 text-[#19243a] sm:py-10"><div className="mx-auto max-w-5xl"><header className="flex items-center justify-between"><Link href="/pricing" aria-label="Back to experiences"><AksaBrand /></Link><Link href="/pricing" className="hidden items-center gap-2 text-sm font-semibold text-[#657087] sm:inline-flex"><ArrowLeft size={16} /> Back to experiences</Link></header><div className="mt-12 grid gap-10 lg:grid-cols-[.85fr_1fr] lg:gap-20"><section><p className="text-xs font-bold uppercase tracking-[.22em] text-[#e26257]">Secure checkout</p><h1 className="mt-4 font-serif text-5xl leading-[.98] tracking-[-.04em] sm:text-6xl">Make your story<br />officially yours.</h1><p className="mt-6 max-w-md text-base leading-7 text-[#657087]">Your order begins with a personal creative brief. We will contact you to confirm the details and production timeline.</p><div className="mt-10 rounded-[1.5rem] border border-[#19243a]/10 bg-white p-6 shadow-lg shadow-[#19243a]/5"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#e26257]">Selected experience</p><h2 className="mt-3 font-serif text-3xl">{product.name}</h2><p className="mt-3 text-sm leading-6 text-[#657087]">{product.description}</p><div className="my-6 h-px bg-[#19243a]/10" /><p className="text-sm text-[#657087]">Investment</p><p className="mt-1 font-serif text-4xl">{product.priceIdr ? formatIdr(product.priceIdr) : "Price not configured"}</p></div><div className="mt-8 space-y-4 text-sm leading-6 text-[#657087]"><p className="flex gap-3"><Check size={18} className="mt-0.5 shrink-0 text-[#67906f]" />A personal creative brief after payment.</p><p className="flex gap-3"><Check size={18} className="mt-0.5 shrink-0 text-[#67906f]" />Confirmation and delivery timeline from AKSA.</p><p className="flex gap-3"><ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#67906f]" />Payment status verified by the gateway webhook, not browser callbacks.</p></div></section><section className="self-start rounded-[2rem] border border-[#19243a]/10 bg-white p-6 shadow-2xl shadow-[#19243a]/8 sm:p-8"><h2 className="font-serif text-3xl">Your details</h2><p className="mt-2 text-sm leading-6 text-[#657087]">We only use these details for your order and creative consultation.</p><div className="mt-7">{product.priceIdr && isGatewayConfigured ? <CheckoutForm productCode={product.code} productName={product.name} amountLabel={formatIdr(product.priceIdr)} clientKey={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} isProduction={process.env.MIDTRANS_IS_PRODUCTION === "true"} /> : <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">This checkout is being prepared. AKSA must first configure the product price and Midtrans keys before payments can be accepted.</div>}</div></section></div></div></main>;
}
