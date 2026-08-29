import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const templateCatalog = [
  { id: "template-001", name: "Elegant Gold", label: "Classic · Refined", description: "Warm ivory and golden details for a celebration that feels timeless.", image: "/decor/elegant-gold/background/ivory-texture.webp", accent: "#b58b36" },
  { id: "template-002", name: "Sekar Sogan", label: "Javanese · Warm", description: "Soft batik, florals, and graceful details rooted in tradition.", image: "/decor/sekar-sogan/background/sekar-sogan-background-v1.png", accent: "#9a633d" },
  { id: "template-003", name: "Puspa Priangan", label: "Botanical · Lush", description: "A vibrant botanical atmosphere with an intimate, romantic feel.", image: "/decor/puspa-priangan/background/puspa-priangan-wallpaper.webp", accent: "#527052" },
  { id: "template-004", name: "Chinese Imperial", label: "Bold · Regal", description: "Red, gold, and dramatic ornament for a story with presence.", image: "/decor/chinese-imperial/background/chinese-imperial-opening-v2.png", accent: "#c18c3b" },
  { id: "template-005", name: "The Edit", label: "Editorial · Modern", description: "Monochrome photography and magazine-inspired composition for a black-tie celebration.", image: "/template-demos/template-005/gallery-1.png", accent: "#d6c1a3" },
];

export default function TemplateGallery() {
  return (
    <section id="templates" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c94d43]">Find your feeling</p><h2 className="mt-4 font-serif text-5xl leading-none tracking-[-0.03em] text-[#182235] sm:text-6xl">Choose the setting<br /><span className="text-[#9aa2ad]">for your story.</span></h2></div><Link href="/templates" className="inline-flex items-center gap-2 text-sm font-bold text-[#182235] underline decoration-[#f3c777] decoration-4 underline-offset-8 transition hover:text-[#c94d43]">See all live demos <ArrowUpRight size={17} /></Link></div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">{templateCatalog.map((template, index) => <Link href={`/templates/${template.id}`} key={template.id} className="group block"><div className="relative overflow-hidden rounded-[1.5rem] bg-[#182235] shadow-lg shadow-[#182235]/10"><div className={`aspect-[0.76] bg-cover bg-center transition duration-700 group-hover:scale-105 ${index === 1 ? "brightness-90" : ""}`} style={{ backgroundImage: `linear-gradient(180deg, rgba(14,22,36,0.02) 25%, rgba(14,22,36,0.84) 100%), url('${template.image}')` }} /><div className="absolute inset-x-0 bottom-0 p-5 text-white"><p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: template.accent }}>{template.label}</p><h3 className="mt-2 font-serif text-2xl">{template.name}</h3><p className="mt-2 text-xs leading-5 text-white/65">{template.description}</p></div><span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition group-hover:opacity-100"><ArrowUpRight size={16} /></span></div></Link>)}</div>
    </section>
  );
}
