import Image from "next/image";
import type { TemplateProps } from "../types";
import MotionSection from "@/components/motion/MotionSection";
import { getEditorialSections, getGalleryImages } from "./shared";

export default function Gallery({ invitation }: TemplateProps) {
  const sections = getEditorialSections(invitation);
  const images = getGalleryImages(invitation);
  if (!sections.gallery || !images.length) return null;
  return (
    <MotionSection>
      <section className="relative z-10 bg-[#f5f2ed] px-5 py-24 text-[#171717] sm:px-8 md:py-32"><div className="mx-auto max-w-6xl"><div className="mb-12 flex items-end justify-between border-b border-[#171717]/20 pb-6"><div><p className="text-[10px] font-bold uppercase tracking-[0.42em] text-[#756d64]">The journal</p><h2 className="mt-4 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">Scenes from us.</h2></div><p className="hidden text-xs font-bold uppercase tracking-[0.22em] text-[#756d64] sm:block">{String(images.length).padStart(2, "0")} frames</p></div><div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">{images.map((image, index) => <div key={image} className={`relative overflow-hidden bg-[#ddd8d0] ${index === 0 ? "col-span-2 aspect-[4/5] md:col-span-7 md:row-span-2 md:aspect-auto" : index === 1 ? "aspect-[4/5] md:col-span-5 md:aspect-auto" : "aspect-square md:col-span-4"}`}><Image src={image} alt={`Moment ${index + 1}`} fill unoptimized sizes="(max-width: 768px) 50vw, 40vw" className="object-cover grayscale transition duration-700 hover:scale-105 hover:grayscale-0" /></div>)}</div></div></section>
    </MotionSection>
  );
}
