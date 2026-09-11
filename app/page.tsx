import Link from "next/link";
import { ArrowRight, Check, ChevronRight, CirclePlay, MessageCircle, Sparkles } from "lucide-react";
import HeroTemplateCarousel from "@/components/HeroTemplateCarousel";
import TemplateGallery from "@/components/TemplateGallery";
import AksaBrand from "@/components/AksaBrand";
import LandingProofSections from "@/components/LandingProofSections";

const whatsappNumber = "628133224919";
const whatsappUrl = (packageName = "an AKSA invitation") => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello AKSA, I am interested in ${packageName}. I would like to discuss my event invitation.`)}`;

const packages = [
  { code: "digital-invitation", name: "Digital Invitation", label: "The essential edit", price: "Rp199.000", was: "Rp250.000", color: "#f16e61", surface: "bg-[#fff1ec]", items: ["A template of your choice", "RSVP, gallery, map, gift & livestream", "One elegant shareable link"] },
  { code: "original-love-song", name: "Original Love Song", label: "AKSA signature", price: "Rp499.000", color: "#f4cf6c", surface: "bg-[#16243d] text-white", featured: true, items: ["Everything in Digital Invitation", "Original song concept from your story", "A soundtrack made only for your celebration"] },
  { code: "ai-love-film", name: "AI Love Film", label: "The cinematic commission", price: "From Rp1.499.000", note: "+ negotiable based on treatment", color: "#88b5c8", surface: "bg-[#e8f3f6]", items: ["Everything in Original Love Song", "AI visual storytelling around the couple", "Creative direction and guided review"] },
];

const reasons = [
  ["01", "A real invitation, not a landing page", "Guests receive the story, schedule, map, RSVP, gift details, gallery, and livestream in one considered space."],
  ["02", "A world that belongs to you", "Choose from original AKSA visual worlds, then make the names, images, sound, and details fully yours."],
  ["03", "A human behind every order", "Start with a direct conversation with AKSA. We confirm the creative direction and timeline together."],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf5] text-[#18243a]">
      <header className="sticky top-0 z-40 border-b border-[#18243a]/10 bg-[#fffaf5]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-6 lg:px-10">
          <Link href="/" aria-label="AKSA Digital Studio home"><AksaBrand /></Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#5c677d] md:flex">
            <a href="#how-it-works" className="transition hover:text-[#ef655a]">How it works</a><a href="#portfolio" className="transition hover:text-[#ef655a]">Portfolio</a><Link href="/templates" className="transition hover:text-[#ef655a]">Templates</Link><a href="#pricing" className="transition hover:text-[#ef655a]">Packages</a><a href="#faq" className="transition hover:text-[#ef655a]">FAQ</a>
          </nav>
          <div className="flex items-center gap-1.5 sm:gap-3"><Link href="/login" className="hidden rounded-full px-3 py-2 text-sm font-semibold transition hover:bg-white sm:block sm:px-4">Log in</Link><a href={whatsappUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#ef655a] px-3.5 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#ef655a]/25 transition hover:-translate-y-0.5 hover:bg-[#da5147] sm:px-5 sm:text-sm"><MessageCircle size={16} /> Chat with AKSA</a></div>
        </div>
      </header>

      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 overflow-hidden bg-[radial-gradient(circle_at_12%_20%,#ffd9c5_0,transparent_26%),radial-gradient(circle_at_83%_14%,#cde7ef_0,transparent_24%),radial-gradient(circle_at_55%_88%,#fde7a9_0,transparent_32%)]" />
        <div className="aksa-orb absolute -left-28 top-24 -z-10 h-72 w-72 rounded-full bg-[#ffc6b7]/60 blur-3xl" /><div className="aksa-orb-delayed absolute right-0 top-12 -z-10 h-80 w-80 rounded-full bg-[#badfeb]/70 blur-3xl" />
        <div className="mx-auto grid min-w-0 max-w-7xl gap-12 px-5 pb-20 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,.86fr)] lg:items-center lg:gap-20 lg:px-10 lg:pb-28 lg:pt-20">
          <div className="aksa-fade-up min-w-0 max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#ef655a]/20 bg-white/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#d95349] shadow-sm"><Sparkles size={14} /> Digital invitations, made personal</p>
            <h1 className="mt-6 font-serif text-[3.45rem] leading-[.88] tracking-[-.045em] text-[#18243a] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">Your story,<br /><span className="text-[#ed675d]">beautifully</span> invited.</h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-[#53627a] sm:text-lg">AKSA creates personal digital invitations for weddings, birthdays, intimate gatherings, community events, and meaningful farewells—made to feel like the occasion itself.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><Link href="/order?package=digital-invitation" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#18243a] px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#18243a]/20 transition hover:-translate-y-1 hover:bg-[#293957]"><MessageCircle size={17} /> Start your brief <ArrowRight size={16} /></Link><Link href="/templates" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#18243a]/15 bg-white/80 px-5 py-3.5 text-sm font-bold transition hover:-translate-y-1 hover:border-[#ef655a]/45 hover:text-[#d95349]"><CirclePlay size={17} /> View live templates</Link></div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-[#18243a]/10 pt-5 text-[#53627a]"><div><p className="font-serif text-2xl text-[#18243a]">17</p><p className="mt-1 text-xs leading-4">distinct live worlds</p></div><div><p className="font-serif text-2xl text-[#18243a]">1:1</p><p className="mt-1 text-xs leading-4">direct consultation</p></div><div><p className="font-serif text-2xl text-[#18243a]">1 link</p><p className="mt-1 text-xs leading-4">for every guest</p></div></div>
          </div>
          <div className="aksa-fade-up-delay min-w-0"><HeroTemplateCarousel /></div>
        </div>
      </section>

      <section id="how-it-works" className="relative bg-[#18243a] px-5 py-20 text-white sm:px-6 lg:px-10 lg:py-28">
        <div className="absolute inset-y-0 right-0 w-1/3 bg-[linear-gradient(135deg,transparent_48%,rgba(244,207,108,.12)_49%,transparent_51%)] bg-[length:36px_36px]" /><div className="relative mx-auto max-w-7xl"><div className="grid gap-10 lg:grid-cols-[.75fr_1fr] lg:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#f4cf6c]">From spark to send</p><h2 className="mt-5 max-w-md font-serif text-4xl leading-[.96] sm:text-5xl">A simple process with a personal finish.</h2><p className="mt-6 max-w-md text-sm leading-7 text-white/65">No empty template, no confusing checkout. You begin with a conversation and we shape the right invitation experience together.</p></div><div className="grid gap-5 sm:grid-cols-3">{reasons.map(([number, title, description]) => <article key={number} className="border-t border-white/20 pt-5"><p className="font-serif text-3xl text-[#f4cf6c]">{number}</p><h3 className="mt-5 text-base font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-white/60">{description}</p></article>)}</div></div></div>
      </section>

      <section id="pricing" className="relative overflow-hidden bg-[#fffaf5] px-5 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-[#ffe7bd]/60 blur-3xl" /><div className="relative mx-auto max-w-7xl"><div className="mx-auto max-w-3xl text-center"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#d95349]">Choose your AKSA experience</p><h2 className="mt-4 font-serif text-4xl leading-[.96] tracking-[-.035em] sm:text-5xl">A beautiful invitation can be the beginning of something bigger.</h2><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#5c677d]">Start with an elegant digital invitation, then add an original soundtrack or an AI-crafted love film when your story calls for more.</p></div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">{packages.map((pkg) => <article key={pkg.name} className={`aksa-lift relative flex min-h-[30rem] flex-col rounded-[1.75rem] border border-[#18243a]/10 p-6 shadow-[0_18px_45px_rgba(24,36,58,.08)] sm:p-7 ${pkg.surface}`}>{pkg.featured && <span className="absolute right-5 top-5 rounded-full bg-[#f4cf6c] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.16em] text-[#18243a]">Most loved</span>}<p className={`text-[10px] font-bold uppercase tracking-[.24em] ${pkg.featured ? "text-[#f4cf6c]" : ""}`} style={pkg.featured ? undefined : { color: pkg.color }}>{pkg.label}</p><h3 className="mt-4 font-serif text-3xl leading-none">{pkg.name}</h3><div className="mt-7 border-y border-current/15 py-5"><p className={`text-sm ${pkg.featured ? "text-white/50" : "text-[#667085]"}`}>{pkg.was && <span className="mr-2 line-through">{pkg.was}</span>}{pkg.was ? "launch price" : "investment"}</p><p className="mt-1 font-serif text-4xl">{pkg.price}</p>{pkg.note && <p className={`mt-2 text-xs ${pkg.featured ? "text-white/60" : "text-[#667085]"}`}>{pkg.note}</p>}</div><ul className={`mt-6 space-y-3 text-sm leading-6 ${pkg.featured ? "text-white/75" : "text-[#53627a]"}`}>{pkg.items.map((item) => <li key={item} className="flex gap-2.5"><Check className="mt-0.5 shrink-0" size={16} style={{ color: pkg.color }} />{item}</li>)}</ul><Link href={`/order?package=${pkg.code}`} className={`mt-auto inline-flex items-center justify-between pt-8 text-sm font-bold ${pkg.featured ? "text-[#f4cf6c]" : "text-[#18243a]"}`}>Start this brief <ArrowRight size={17} /></Link></article>)}</div>
          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-2xl border border-[#ef655a]/15 bg-[#fff0eb] px-5 py-4 text-center sm:flex-row sm:text-left"><p className="text-sm leading-6 text-[#6c554f]"><strong className="text-[#18243a]">Not sure what fits?</strong> Start a brief with your occasion, guest count, and desired feeling. AKSA will recommend the right experience.</p><Link href="/order" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#ef655a] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#da5147]"><MessageCircle size={16} /> Start a brief</Link></div><div className="mt-7 text-center"><Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-bold text-[#53627a] transition hover:text-[#ef655a]">See full package details <ChevronRight size={16} /></Link></div>
        </div>
      </section>

      <TemplateGallery />

      <LandingProofSections />

      <footer className="bg-[#18243a] px-5 py-9 text-white/65 sm:px-6 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center"><AksaBrand darkSurface /><div className="flex flex-wrap gap-x-5 gap-y-2 text-sm"><Link href="/templates" className="hover:text-white">Templates</Link><Link href="/pricing" className="hover:text-white">Packages</Link><Link href="/login" className="hover:text-white">Log in</Link><a href={whatsappUrl()} target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp AKSA</a></div><p className="text-xs">© 2026 AKSA Digital Studio</p></div></footer>
    </main>
  );
}
