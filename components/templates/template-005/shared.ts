import { defaultSections } from "@/lib/defaultSections";

export const editorialMedia = {
  hero: "/template-demos/template-005/gallery-1.png",
  groom: "/template-demos/template-005/groom.png",
  bride: "/template-demos/template-005/bride.png",
  gallery: [
    "/template-demos/template-005/gallery-1.png",
    "/template-demos/template-005/gallery-2.png",
    "/template-demos/template-005/gallery-3.png",
    "/template-demos/template-005/gallery-4.png",
    "/template-demos/template-005/gallery-5.png",
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
