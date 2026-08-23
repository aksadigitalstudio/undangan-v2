import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import GalleryGrid from "@/components/Gallery";

export default function Gallery({ invitation }: TemplateProps) {
  const data = invitation;

  const sections = {
    ...defaultSections,
    ...(data.sections ?? {}),
  };

  const images =
    data.gallery
      ?.split(",")
      .map((image: string) => image.trim())
      .filter(Boolean) ?? [];

  if (!sections.gallery || images.length === 0) {
    return null;
  }

  return (
    <section className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
<div className="mx-auto mb-14 max-w-3xl rounded-[28px] border border-[#D5B477]/25 bg-[#21170F]/70 px-6 py-8 text-center shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm">
  <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-[#E2B968]">
    Kenangan Kami
  </p>

  <div className="mx-auto mb-6 h-px w-16 bg-[#D5A54D]" />

  <h2 className="font-serif text-4xl text-[#FFF6E5] md:text-5xl">
    Galeri Bahagia
  </h2>

  <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#F3DEC0]/85">
    Setiap foto menyimpan cerita dan kenangan indah
    dalam perjalanan kami.
  </p>
</div>

        <div className="rounded-[32px] border border-[#D5B477]/60 bg-[#FFF8EA]/85 p-4 shadow-[0_16px_35px_rgba(78,48,24,0.12)] md:p-7">
          <GalleryGrid images={images} />
        </div>
      </div>
    </section>
  );
}