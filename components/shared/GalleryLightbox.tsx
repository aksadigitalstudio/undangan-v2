"use client";

import { useEffect } from "react";
import Image from "next/image";

interface GalleryLightboxProps {
  images: string[];
  activeIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function GalleryLightbox({
  images,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onPrevious, onNext]);

  const image = images[activeIndex];

  if (!image) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image preview"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-2xl text-white transition hover:bg-white/20"
        aria-label="Close image"
      >
        ×
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-4 py-3 text-2xl text-white transition hover:bg-white/20 md:left-8"
        aria-label="Previous image"
      >
        ‹
      </button>

      <div
        className="relative max-h-[80vh] max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={image}
          alt={`Gallery image ${activeIndex + 1}`}
          width={1600}
          height={1200}
          unoptimized
          className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
        />
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-4 py-3 text-2xl text-white transition hover:bg-white/20 md:right-8"
        aria-label="Next image"
      >
        ›
      </button>
    </div>
  );
}