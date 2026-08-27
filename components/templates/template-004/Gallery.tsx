"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import MotionSection from "@/components/motion/MotionSection";

export default function Gallery({ invitation }: TemplateProps) {
  const data = invitation;
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const sections = {
    ...defaultSections,
    ...(data.sections ?? {}),
  };

  const images: string[] =
    data.gallery
      ?.split(",")
      .map((image: string) => image.trim())
      .filter(Boolean) ?? [];

  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!sections.gallery || images.length === 0) {
    return null;
  }

  const selectedImage = images[selectedIndex];

  function selectImage(index: number) {
    setSelectedIndex(index);

    thumbnailRef.current?.children[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function showPrevious() {
    selectImage(
      selectedIndex === 0 ? images.length - 1 : selectedIndex - 1
    );
  }

  function showNext() {
    selectImage(
      selectedIndex === images.length - 1 ? 0 : selectedIndex + 1
    );
  }

  return (
    <MotionSection>
      <section className="relative z-10 overflow-hidden bg-[#FFF4D7] py-20 md:py-28">
        {/* Nuansa langit/istana lembut di bagian atas */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] overflow-hidden">
          <Image
            src="/decor/chinese-imperial/background/chinese-imperial-cover-v1.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-top opacity-35"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF4D7]/20 via-[#FFF4D7]/65 to-[#FFF4D7]" />
        </div>

        {/* Ornamen bunga bawah */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#B51C28]/20 via-[#FFF4D7]/70 to-transparent" />

        <div className="relative mx-auto max-w-[620px] px-5">
          <div className="mb-10 text-center">
            <p className="font-serif text-5xl italic text-[#B20F1C] md:text-6xl">
              Gallery
            </p>

            <div className="mx-auto mt-4 flex items-center justify-center gap-2 text-[#A30F1B]">
              <span className="h-px w-12 bg-[#C89B3C]" />
              <span className="text-sm">✦</span>
              <span className="h-px w-12 bg-[#C89B3C]" />
            </div>

            <p className="mt-5 font-serif text-sm italic text-[#7A2C27]">
              Precious moments from our journey together.
            </p>
          </div>

          {/* Bangunan / bingkai galeri */}
          <div className="relative overflow-hidden rounded-t-[28px] border-x-4 border-t-4 border-[#A30F1B] bg-[#D85D5D] px-4 pb-6 pt-24 shadow-[0_18px_45px_rgba(104,13,20,0.25)] md:px-7 md:pt-32">
            {/* Atap istana */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 overflow-hidden md:h-36">
              <Image
                src="/decor/chinese-imperial/background/chinese-imperial-cover-v1.webp"
                alt=""
                fill
                sizes="(max-width: 620px) 100vw, 620px"
                className="object-cover object-top"
              />

              <div className="absolute inset-0 bg-[#8B111C]/25" />
            </div>

            {/* Master photo */}
            <div className="relative overflow-hidden border-4 border-[#7D0711] bg-[#69070F] shadow-[0_14px_28px_rgba(72,0,6,0.34)]">
              <div className="relative aspect-[4/5] w-full md:aspect-[16/11]">
                <Image
                  src={selectedImage}
                  alt={`Gallery photo ${selectedIndex + 1}`}
                  fill
                  unoptimized
                  sizes="(max-width: 620px) 100vw, 620px"
                  className="object-cover"
                />
              </div>

              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-[#B70E25]/90 text-2xl text-[#FFF4D7] shadow-lg transition hover:bg-[#8D0716]"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-[#B70E25]/90 text-2xl text-[#FFF4D7] shadow-lg transition hover:bg-[#8D0716]"
              >
                ›
              </button>
            </div>

            {/* Thumbnail horizontal */}
            <div
              ref={thumbnailRef}
              className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 scrollbar-hide"
            >
              {images.map((image, index) => {
                const isSelected = index === selectedIndex;

                return (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => selectImage(index)}
                    aria-label={`Show photo ${index + 1}`}
                    className={`relative h-24 w-20 shrink-0 snap-center overflow-hidden border-2 transition md:h-28 md:w-24 ${
                      isSelected
                        ? "border-[#FFE5A0] opacity-100"
                        : "border-[#9E1720] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      unoptimized
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bunga sebagai penutup bawah galeri */}
          <div className="relative -mt-5 h-24 overflow-hidden md:h-32">
            <Image
              src="/decor/chinese-imperial/foreground/chinese-imperial-blessing-v1.png"
              alt=""
              fill
              sizes="(max-width: 620px) 100vw, 620px"
              className="object-cover object-bottom opacity-95"
            />
          </div>
        </div>
      </section>
    </MotionSection>
  );
}
