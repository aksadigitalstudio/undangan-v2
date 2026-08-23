"use client";

import { useState } from "react";
import Image from "next/image";
import MotionGroup from "@/components/motion/MotionGroup";
import MotionItem from "@/components/motion/MotionItem";
import GalleryLightbox from "@/components/shared/GalleryLightbox";

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  function showPreviousImage() {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) return null;

      return currentIndex === 0
        ? images.length - 1
        : currentIndex - 1;
    });
  }

  function showNextImage() {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) return null;

      return currentIndex === images.length - 1
        ? 0
        : currentIndex + 1;
    });
  }

  return (
    <>
      <MotionGroup>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {images.map((image, index) => (
            <MotionItem key={image}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="block w-full overflow-hidden rounded-3xl"
                aria-label={`Open gallery image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  width={600}
                  height={600}
                  unoptimized
                  className="aspect-square w-full rounded-3xl object-cover transition-all duration-700 hover:scale-105 hover:shadow-2xl"
                />
              </button>
            </MotionItem>
          ))}
        </div>
      </MotionGroup>

      {activeIndex !== null && (
        <GalleryLightbox
          images={images}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onPrevious={showPreviousImage}
          onNext={showNextImage}
        />
      )}
    </>
  );
}