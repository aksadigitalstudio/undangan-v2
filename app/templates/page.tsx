import Link from "next/link";
import TemplateGallery from "@/components/TemplateGallery";

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#182235]"><header className="border-b border-[#182235]/10 bg-[#f8f5ef]/90"><div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10"><Link href="/" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#182235] text-sm font-bold text-[#f3c777]">A</span><span className="font-serif text-xl font-semibold">AKSA</span></Link><div className="flex items-center gap-3"><Link href="/login" className="rounded-full px-4 py-2.5 text-sm font-semibold">Masuk</Link><Link href="/signup" className="rounded-full bg-[#e65d51] px-5 py-2.5 text-sm font-semibold text-white">Mulai gratis</Link></div></div></header><div className="mx-auto max-w-7xl px-6 pt-16 text-center lg:px-10"><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c94d43]">Template collection</p><h1 className="mt-4 font-serif text-5xl tracking-[-0.04em] sm:text-7xl">Temukan tampilan<br /><span className="text-[#9aa2ad]">yang terasa seperti kamu.</span></h1><p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#687184]">Semua desain dibuat responsif dan siap kamu isi dengan cerita sendiri.</p></div><TemplateGallery /></main>
  );
}
