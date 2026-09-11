import Link from "next/link";
import AksaBrand from "@/components/AksaBrand";
import PaymentStatus from "@/components/payments/PaymentStatus";

export default async function CheckoutSuccessPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-[#fcfaf7] px-6 py-12 text-[#19243a]">
      <div className="w-full max-w-2xl">
        <AksaBrand className="justify-center" />
        <div className="mt-10">
          {order ? <PaymentStatus orderCode={order} /> : <div className="rounded-[2rem] border border-[#19243a]/10 bg-white p-8 text-center shadow-xl shadow-[#19243a]/5"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#e26257]">Secure payment</p><h1 className="mt-4 font-serif text-4xl">No payment reference found.</h1><p className="mt-4 text-sm leading-7 text-[#657087]">Please return to the experiences page to begin a secure checkout.</p><Link href="/pricing" className="mt-7 inline-flex rounded-full bg-[#19243a] px-6 py-3.5 text-sm font-bold text-white">View experiences</Link></div>}
        </div>
      </div>
    </main>
  );
}
