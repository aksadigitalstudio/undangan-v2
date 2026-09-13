import { defaultSections } from "@/lib/defaultSections";

export const editorialMedia = {
  hero: "/template-demos/template-005/gallery-1.webp",
  groom: "/template-demos/template-005/groom.webp",
  bride: "/template-demos/template-005/bride.webp",
  gallery: [
    "/template-demos/template-005/gallery-1.webp",
    "/template-demos/template-005/gallery-2.webp",
    "/template-demos/template-005/gallery-3.webp",
    "/template-demos/template-005/gallery-4.webp",
    "/template-demos/template-005/gallery-5.webp",
  ],
};

export function getEditorialSections(data: { sections?: Record<string, boolean> }) {
  return { ...defaultSections, ...(data.sections ?? {}) };
}

export function getGalleryImages(data: { gallery?: string }) {
  const uploadedImages = data.gallery
    ?.split(",")
    .map((image) => image.trim())
    .filter(Boolean);

  return uploadedImages?.length ? uploadedImages : editorialMedia.gallery;
}
