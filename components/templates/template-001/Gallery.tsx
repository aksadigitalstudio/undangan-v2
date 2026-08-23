import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import GalleryGrid from "@/components/Gallery";

export default function Gallery({ invitation }: TemplateProps) {
  const data = invitation;

  const sections = {
    ...defaultSections,
    ...(data.sections ?? {}),
  };

  if (!sections.gallery) {
    return null;
  }

  const images =
    data.gallery
      ?.split(",")
      .map((image: string) => image.trim())
      .filter(Boolean) ?? [];

  return (
    <section className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <p
            className="mb-3 text-sm uppercase tracking-[0.45em]"
            style={{
              color: "#FFFFFF",
              textShadow: "0 2px 8px rgba(0,0,0,0.45)",
            }}
          >
            Our Gallery
          </p>

          <h2
            className="font-serif text-5xl text-white md:text-6xl"
            style={{
              WebkitTextStroke: "1px rgba(0,0,0,0.45)",
              textShadow: "0 4px 18px rgba(0,0,0,0.35)",
            }}
          >
            Wedding Moments
          </h2>
        </div>

        <GalleryGrid images={images} />
      </div>
    </section>
  );
}