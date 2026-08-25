import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Heart,
  Play,
  Sparkles,
} from "lucide-react";
import TemplateGallery from "@/components/TemplateGallery";

const features = [
  "RSVP dan guestbook real-time",
  "Galeri foto, musik, dan live streaming",
  "Tampilan responsif untuk setiap layar",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f5ef] text-[#182235]">
      <header className="relative z-20 border-b border-[#1b2940]/10 bg-[#f8f5ef]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center gap-3" aria-label="AKSA Digital Studio home">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#182235] text-sm font-bold text-[#f3c777] shadow-lg shadow-[#182235]/15">A</span>
            <span className="font-serif text-xl font-semibold tracking-tight">AKSA</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-[#5f6879] md:flex">
            <Link href="/templates" className="transition hover:text-[#182235]">Templates</Link>
            <a href="#features" className="transition hover:text-[#182235]">Fitur</a>
            <a href="#how-it-works" className="transition hover:text-[#182235]">Cara kerja</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden rounded-full px-4 py-2.5 text-sm font-semibold text-[#182235] transition hover:bg-white md:inline-flex">Masuk</Link>
            <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-[#e65d51] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#e65d51]/20 transition hover:-translate-y-0.5 hover:bg-[#d94f44]">Mulai gratis <ArrowRight size={15} /></Link>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-14 lg:px-10 lg:pb-28 lg:pt-24">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#f3c777]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#e65d51]/10 blur-3xl" />
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#e65d51]/20 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c94d43]"><Sparkles size={14} /> Undangan digital yang berkesan</div>
            <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-[#182235] sm:text-6xl lg:text-8xl">Cerita cintamu, <span className="text-[#d9574d]">dibuat indah.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#687184] sm:text-xl">Buat undangan pernikahan digital yang terasa personal, mudah dibagikan, dan siap menemani momen paling berarti.</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/signup" className="inline-flex items-center gap-3 rounded-full bg-[#182235] px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#182235]/20 transition hover:-translate-y-1 hover:bg-[#263653]">Buat undangan saya <ArrowRight size={17} /></Link>
              <Link href="/templates" className="inline-flex items-center gap-2 rounded-full border border-[#182235]/15 bg-white/70 px-6 py-3.5 text-sm font-bold text-[#182235] transition hover:-translate-y-1 hover:bg-white"><Play size={15} fill="currentColor" /> Lihat template</Link>
            </div>
            <div className="mt-11 flex flex-wrap gap-8 border-t border-[#182235]/10 pt-7 text-sm text-[#687184]">
              <div><span className="block font-serif text-2xl font-semibold text-[#182235]">4+</span>template siap pakai</div>
              <div><span className="block font-serif text-2xl font-semibold text-[#182235]">100%</span>mobile friendly</div>
              <div><span className="block font-serif text-2xl font-semibold text-[#182235]">24/7</span>mudah dibagikan</div>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:mr-4">
            <div className="absolute -left-8 top-14 hidden rounded-2xl border border-white/70 bg-white/80 p-4 shadow-xl backdrop-blur md:block"><Heart size={18} className="text-[#e65d51]" fill="currentColor" /><p className="mt-2 text-xs font-semibold text-[#182235]">Made with love</p></div>
            <div className="absolute -right-8 bottom-16 hidden rounded-2xl border border-white/70 bg-[#182235] p-4 text-white shadow-xl md:block"><p className="text-xs text-white/60">RSVP online</p><p className="mt-1 font-serif text-xl">87 guests</p></div>
            <div className="relative overflow-hidden rounded-[2.5rem] border-[10px] border-[#182235] bg-[#19253b] shadow-2xl shadow-[#182235]/30">
              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 text-[10px] font-bold tracking-[0.2em] text-white/70"><span>AKSA</span><span>LOVE STORY</span></div>
              <div className="flex aspect-[0.78] flex-col justify-end bg-cover bg-center p-7 text-white" style={{ backgroundImage: "linear-gradient(180deg, rgba(9,16,28,0.08), rgba(9,16,28,0.88)), url('/decor/chinese-imperial/background/chinese-imperial-cover-v1.webp')" }}><p className="text-xs uppercase tracking-[0.35em] text-[#f3c777]">The wedding of</p><h2 className="mt-3 font-serif text-5xl leading-none">Ferren<br />&amp; James</h2><div className="mt-6 flex items-center gap-3 text-xs text-white/75"><span className="h-px w-8 bg-[#f3c777]" /> 12 . 08 . 26</div></div>
            </div>
            <div className="mx-auto mt-5 flex w-32 items-center justify-center gap-1.5 rounded-full bg-[#182235] py-2 text-[10px] font-semibold tracking-[0.18em] text-white/70"><span className="h-1.5 w-1.5 rounded-full bg-[#f3c777]" /> SCROLL TO EXPLORE</div>
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-[#182235]/10 bg-white/55"><div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 sm:grid-cols-3 lg:px-10">{features.map((feature) => <div key={feature} className="flex items-center gap-3 text-sm font-semibold text-[#536075]"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#e8f0e8] text-[#4b8b6a]"><Check size={15} /></span>{feature}</div>)}</div></section>
      <TemplateGallery />

      <section id="how-it-works" className="bg-[#182235] px-6 py-24 text-white lg:px-10 lg:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-14 lg:grid-cols-[0.75fr_1fr] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f3c777]">Simple by design</p><h2 className="mt-5 max-w-lg font-serif text-5xl leading-[1.02] tracking-[-0.03em] sm:text-6xl">Dari ide kecil, jadi momen besar.</h2></div><div className="grid gap-8 sm:grid-cols-3">{["Pilih desain", "Isi cerita", "Bagikan link"].map((title, index) => <div key={title} className="border-t border-white/20 pt-5"><span className="font-serif text-3xl text-[#f3c777]">0{index + 1}</span><h3 className="mt-6 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/55">{index === 0 ? "Temukan template yang paling terasa seperti kamu." : index === 1 ? "Atur detail acara dan cerita cinta tanpa ribet." : "Kirim ke keluarga dan teman dalam satu klik."}</p></div>)}</div></div></div></section>

      <section className="px-6 py-24 lg:px-10 lg:py-32"><div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 rounded-[2rem] bg-[#f3c777] px-8 py-12 sm:px-14 lg:flex-row lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#5f4720]">Your day, your story</p><h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-[#182235] sm:text-5xl">Siap membuat undangan yang tidak terlupakan?</h2></div><Link href="/signup" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#182235] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#263653]">Mulai sekarang <ChevronRight size={17} /></Link></div></section>
      <footer className="border-t border-[#182235]/10 px-6 py-8 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-sm text-[#687184] sm:flex-row"><p>© 2026 AKSA Digital Studio</p><p>Undangan digital, dibuat dengan hati.</p></div></footer>
    </main>
  );
}
