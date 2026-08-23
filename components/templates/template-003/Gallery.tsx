"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import MotionSection from "@/components/motion/MotionSection";

export default function Gallery({ invitation }: TemplateProps) {
  const data = invitation;
  const galleryRef = useRef<HTMLDivElement>(null);
  const isAdjustingRef = useRef(false);

  const sections = {
    ...defaultSections,
    ...(data.sections ?? {}),
  };

  const images: string[] =
    data.gallery
      ?.split(",")
      .map((image: string) => image.trim())
      .filter(Boolean) ?? [];

  const loopImages = [...images, ...images, ...images];

useEffect(() => {
  if (!galleryRef.current || images.length < 2) {
    return;
  }

  const galleryElement = galleryRef.current!;

  function moveToMiddle() {
    galleryElement.scrollLeft =
      galleryElement.scrollWidth / 3;
  }

  function handleScroll() {
    const oneGalleryWidth =
      galleryElement.scrollWidth / 3;

    if (!oneGalleryWidth || isAdjustingRef.current) {
      return;
    }

    if (galleryElement.scrollLeft < 20) {
      isAdjustingRef.current = true;
      galleryElement.scrollLeft += oneGalleryWidth;
      isAdjustingRef.current = false;
    }

    if (
      galleryElement.scrollLeft >
      oneGalleryWidth * 2 - 20
    ) {
      isAdjustingRef.current = true;
      galleryElement.scrollLeft -= oneGalleryWidth;
      isAdjustingRef.current = false;
    }
  }

  const animationFrame =
    window.requestAnimationFrame(moveToMiddle);

  galleryElement.addEventListener(
    "scroll",
    handleScroll
  );

  return () => {
    window.cancelAnimationFrame(animationFrame);

    galleryElement.removeEventListener(
      "scroll",
      handleScroll
    );
  };
}, [images.length]);

  if (!sections.gallery || images.length === 0) {
    return null;
  }

  function scrollGallery(direction: "left" | "right") {
    galleryRef.current?.scrollBy({
      left: direction === "right" ? 320 : -320,
      behavior: "smooth",
    });
  }

  return (
    <MotionSection>
      <section className="relative z-10 overflow-hidden bg-[#FCF8ED] py-24 md:py-32">
        <div className="px-6">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-[#6C8668]">
              Kenangan Kami
            </p>

            <div className="mx-auto mb-6 h-px w-16 bg-[#B89A57]" />

            <h2 className="font-serif text-4xl text-[#214D3C] md:text-5xl">
              Frame by Frame
            </h2>

            <p className="mx-auto mt-5 max-w-md font-serif text-sm italic leading-7 text-[#527052]">
              Geser untuk melihat potongan momen bahagia
              dalam perjalanan kami.
            </p>
          </div>
        </div>

        <div className="relative">
          <div
            ref={galleryRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-5 scrollbar-hide md:gap-6 md:px-12"
          >
            {loopImages.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="relative h-[360px] w-[72vw] shrink-0 snap-center overflow-hidden rounded-2xl bg-[#E7E1CF] md:h-[480px] md:w-[360px]"
              >
                <Image
                  src={image}
                  alt={`Kenangan ${(index % images.length) + 1}`}
                  fill
                  sizes="(max-width: 768px) 72vw, 360px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollGallery("left")}
            aria-label="Foto sebelumnya"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#789573] text-xl text-white shadow-lg transition hover:bg-[#214D3C]"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => scrollGallery("right")}
            aria-label="Foto berikutnya"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#789573] text-xl text-white shadow-lg transition hover:bg-[#214D3C]"
          >
            →
          </button>
        </div>
      </section>
    </MotionSection>
  );
}
