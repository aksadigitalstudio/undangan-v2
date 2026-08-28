import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Gift,
  Globe2,
  MessageCircleHeart,
  Music2,
  Play,
  Sparkles,
} from "lucide-react";
import TemplateGallery from "@/components/TemplateGallery";

const invitationFeatures = [
  {
    icon: CalendarDays,
    title: "Every detail, in one place",
    description:
      "Share your date, venue, maps, schedule, and dress code in a calm, beautiful flow.",
  },
  {
    icon: MessageCircleHeart,
    title: "Made for your guests",
    description:
      "Collect RSVP responses and heartfelt wishes without sending guests from one link to another.",
  },
  {
    icon: Gift,
    title: "Thoughtful gifting",
    description:
      "Add gift registry and bank-transfer details elegantly, only when you need them.",
  },
  {
    icon: Music2,
    title: "A feeling they can hear",
    description:
      "Music, photo stories, and live streaming turn a simple link into a complete celebration.",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose your atmosphere",
    description: "Start with a live template and find the visual mood that feels most like you.",
  },
  {
    number: "02",
    title: "Make it personal",
    description: "Add your names, story, photos, event details, music, and every little touch.",
  },
  {
    number: "03",
    title: "Share the moment",
    description: "Publish one elegant link, then send it to everyone you love from any device.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fcfaf7] text-[#19243a]">
      <header className="border-b border-[#19243a]/10 bg-[#fcfaf7]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center gap-3" aria-label="AKSA Digital Studio home">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#19243a] font-serif text-lg font-bold text-[#f4c979] shadow-lg shadow-[#19243a]/10">
              A
            </span>
            <span className="font-serif text-xl font-semibold tracking-tight">AKSA</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#657087] md:flex">
            <a href="#features" className="transition hover:text-[#19243a]">Why AKSA</a>
            <Link href="/templates" className="transition hover:text-[#19243a]">Templates</Link>
            <a href="#how-it-works" className="transition hover:text-[#19243a]">How it works</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-full px-3 py-2.5 text-sm font-semibold text-[#19243a] transition hover:bg-white sm:px-5"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-[#ed6c62] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#ed6c62]/20 transition hover:-translate-y-0.5 hover:bg-[#db584e] sm:px-5"
            >
              Get started <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative isolate mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-10 lg:pb-32 lg:pt-24">
        <div className="pointer-events-none absolute -left-28 bottom-0 -z-10 h-72 w-72 rounded-full bg-[#f4c979]/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-6 -z-10 h-80 w-80 rounded-full bg-[#f4b7aa]/20 blur-3xl" />

        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#fdebe7] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#d95a50]">
              <Sparkles size={14} /> Modern wedding invitations
            </p>
            <h1 className="mt-7 font-serif text-5xl leading-[0.96] tracking-[-0.045em] text-[#19243a] sm:text-6xl lg:text-8xl">
              A beautiful beginning for your <span className="text-[#e26257]">forever.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#657087] sm:text-xl">
              Create a wedding invitation that feels unmistakably yours—thoughtful, effortless to share, and memorable for every guest.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center gap-3 rounded-full bg-[#19243a] px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#19243a]/20 transition hover:-translate-y-1 hover:bg-[#2a3853]"
              >
                Create your invitation <ArrowRight size={17} />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 rounded-full border border-[#19243a]/15 bg-white px-6 py-3.5 text-sm font-bold text-[#19243a] transition hover:-translate-y-1 hover:border-[#19243a]/30"
              >
                <Play size={15} fill="currentColor" /> Browse live demos
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#19243a]/10 pt-6 text-sm font-medium text-[#657087]">
              <span className="inline-flex items-center gap-2"><Check size={16} className="text-[#67906f]" /> Four original themes</span>
              <span className="inline-flex items-center gap-2"><Check size={16} className="text-[#67906f]" /> Built for every screen</span>
              <span className="inline-flex items-center gap-2"><Check size={16} className="text-[#67906f]" /> Ready to share</span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md">
            <Link
              href="/templates/template-004"
              className="group relative block rounded-[3rem] bg-[#f7dfe1] p-3 shadow-[0_30px_70px_rgba(34,30,45,0.16)] transition duration-300 hover:-translate-y-2"
              aria-label="Open the Chinese Imperial live demo"
            >
              <div className="relative overflow-hidden rounded-[2.45rem] border-[9px] border-[#19243a] bg-[#19243a] shadow-2xl">
                <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 text-[10px] font-bold tracking-[0.2em] text-white/75">
                  <span>AKSA</span>
                  <span>LIVE DEMO</span>
                </div>
                <div
                  className="flex aspect-[0.78] flex-col justify-end bg-cover bg-center p-7 text-white transition duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(12,19,32,0.04), rgba(12,19,32,0.9)), url('/decor/chinese-imperial/background/chinese-imperial-cover-v1.webp')",
                  }}
                >
                  <p className="text-xs uppercase tracking-[0.32em] text-[#f4c979]">The wedding of</p>
                  <h2 className="mt-3 font-serif text-5xl leading-none">Ferren<br />&amp; James</h2>
                  <div className="mt-6 flex items-center gap-3 text-xs text-white/75">
                    <span className="h-px w-8 bg-[#f4c979]" /> 12 . 08 . 26
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-white px-5 py-3 text-xs font-bold text-[#19243a] shadow-lg shadow-[#19243a]/10">
                <Play size={13} fill="currentColor" /> View live invitation
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-[#19243a]/10 bg-white/75 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d95a50]">Designed around the day</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.035em] text-[#19243a] sm:text-6xl">
              Everything guests need, beautifully considered.
            </h2>
          </div>

          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {invitationFeatures.map(({ icon: Icon, title, description }) => (
              <article key={title} className="border-t border-[#19243a]/15 pt-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#fdebe7] text-[#d95a50]">
                  <Icon size={19} />
                </span>
                <h3 className="mt-6 font-serif text-2xl text-[#19243a]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#657087]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TemplateGallery />

      <section id="how-it-works" className="bg-[#19243a] px-6 py-24 text-white lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f4c979]">A simpler way to invite</p>
              <h2 className="mt-5 max-w-lg font-serif text-5xl leading-[1.02] tracking-[-0.035em] sm:text-6xl">
                From your story to their screen.
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-white/60">
                No complicated setup, no scattered tools. Just one welcoming place for your celebration.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {steps.map((step) => (
                <article key={step.number} className="border-t border-white/20 pt-5">
                  <span className="font-serif text-3xl text-[#f4c979]">{step.number}</span>
                  <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/55">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f7dfe1] px-6 py-24 lg:px-10 lg:py-32">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border-[28px] border-white/30" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-9 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#b94f49]">
              <Globe2 size={15} /> One link. One beautiful welcome.
            </p>
            <h2 className="mt-5 font-serif text-5xl leading-[1.02] tracking-[-0.04em] text-[#19243a] sm:text-6xl">
              Let your guests feel the celebration before it begins.
            </h2>
          </div>
          <Link
            href="/signup"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#19243a] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#2a3853]"
          >
            Start creating <ChevronRight size={17} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#19243a]/10 bg-[#fcfaf7] px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-sm text-[#657087] sm:flex-row">
          <p>© 2026 AKSA Digital Studio</p>
          <div className="flex gap-5">
            <Link href="/templates" className="transition hover:text-[#19243a]">Templates</Link>
            <Link href="/login" className="transition hover:text-[#19243a]">Log in</Link>
            <Link href="/signup" className="transition hover:text-[#19243a]">Create an invitation</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
