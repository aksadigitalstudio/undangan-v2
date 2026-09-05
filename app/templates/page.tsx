import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TemplateGallery from "@/components/TemplateGallery";
import AksaBrand from "@/components/AksaBrand";

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#182235]">
      <header className="border-b border-[#182235]/10 bg-[#f8f5ef]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" aria-label="AKSA Digital Studio home"><AksaBrand /></Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login" className="rounded-full px-3 py-2.5 text-sm font-semibold transition hover:bg-white sm:px-5">Log in</Link>
            <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-[#e65d51] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#e65d51]/20 transition hover:-translate-y-0.5 hover:bg-[#d94f44] sm:px-5">Get started <ArrowRight size={15} /></Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 pb-2 pt-16 text-center lg:px-10 lg:pt-24">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c94d43]">Template collection</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.95] tracking-[-0.04em] sm:text-7xl">
          Find a design<br />
          <span className="text-[#9aa2ad]">that feels like you.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#687184]">Every design is responsive and ready to be made entirely your own.</p>
      </div>

      <TemplateGallery />
    </main>
  );
}
