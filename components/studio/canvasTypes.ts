export type CanvasElementType = "text" | "photo" | "ornament";
export type CanvasFrame = "none" | "rounded" | "arch" | "circle" | "polaroid" | "gold";
export type CanvasAnimation = "none" | "fade" | "float" | "zoom";
export type CanvasAssetCategory = "Floral" | "Culture" | "Frames" | "Icons" | "Effects";

export type CanvasElement = {
  id: string;
  type: CanvasElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  opacity: number;
  text?: string;
  src?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: number;
  frame?: CanvasFrame;
  animation?: CanvasAnimation;
};

export type CanvasDocument = {
  version: 1;
  background: string;
  elements: CanvasElement[];
};

export type CanvasLibraryAsset = {
  id: string;
  label: string;
  src: string;
  category: CanvasAssetCategory;
  defaultWidth?: number;
  defaultHeight?: number;
};

export const ornamentLibrary: CanvasLibraryAsset[] = [
  { id: "ivory-garden", label: "Ivory Garden", src: "/studio-assets/ornaments/ivory-garden-corner.png", category: "Floral" },
  { id: "sakura-original", label: "Sakura Romance", src: "/studio-assets/ornaments/sakura-corner.png", category: "Floral" },
  { id: "gold-top-left", label: "Golden florals", src: "/decor/elegant-gold/foreground/floral-top-left.webp", category: "Floral" },
  { id: "gold-bottom-right", label: "Golden garden", src: "/decor/elegant-gold/foreground/floral-bottom-right.webp", category: "Floral" },
  { id: "sakura", label: "Sakura spray", src: "/decor/sakura-pink/foreground/sakura-top-right.webp", category: "Floral" },
  { id: "banana", label: "Priangan blooms", src: "/decor/puspa-priangan/foreground/puspa-priangan-banana-floral-v1.png", category: "Floral" },
  { id: "javanese-sogan", label: "Sogan Heritage", src: "/studio-assets/ornaments/javanese-sogan-corner.png", category: "Culture" },
  { id: "chinese-imperial", label: "Imperial Romance", src: "/studio-assets/ornaments/chinese-imperial-corner.png", category: "Culture" },
  { id: "batik", label: "Sogan ornament", src: "/decor/sekar-sogan/foreground/sekar-sogan-ornament.png", category: "Culture" },
  { id: "royal", label: "Royal corner", src: "/decor/royal-blue/foreground/royal-bottom-left.webp", category: "Culture" },
  { id: "ivory-arch-frame", label: "Ivory Arch Frame", src: "/studio-assets/frames/ivory-arch-frame.png", category: "Frames", defaultWidth: 58, defaultHeight: 68 },
  { id: "black-tie-frame", label: "Black Tie Frame", src: "/studio-assets/frames/black-tie-frame.png", category: "Frames", defaultWidth: 58, defaultHeight: 68 },
  { id: "dove", label: "Golden Dove", src: "/decor/elegant-gold/icons/dove.webp", category: "Icons" },
  { id: "rings", label: "Wedding Rings", src: "/decor/elegant-gold/icons/wedding-ring.webp", category: "Icons" },
  { id: "wax-seal", label: "Wax Seal", src: "/decor/elegant-gold/icons/wax-seal.webp", category: "Icons" },
  { id: "sakura-fan", label: "Sakura Fan", src: "/decor/sakura-pink/icons/fan.webp", category: "Icons" },
  { id: "sakura-crane", label: "Sakura Crane", src: "/decor/sakura-pink/icons/crane.webp", category: "Icons" },
  { id: "fleur-de-lis", label: "Fleur de Lis", src: "/decor/royal-blue/icons/fleur-de-lis.webp", category: "Icons" },
  { id: "sparkles", label: "Gold Sparkles", src: "/decor/elegant-gold/particles/sparkle.webp", category: "Effects" },
  { id: "floating-petals", label: "Floating Petals", src: "/decor/elegant-gold/particles/floating-petals.webp", category: "Effects" },
  { id: "sakura-bokeh", label: "Pink Bokeh", src: "/decor/sakura-pink/particles/pink-bokeh.webp", category: "Effects" },
  { id: "royal-rays", label: "Light Rays", src: "/decor/royal-blue/particles/light-rays.webp", category: "Effects" },
  { id: "forest-fireflies", label: "Fireflies", src: "/decor/forest-green/particles/fireflies.webp", category: "Effects" },
];

export const canvasBackgrounds = [
  { label: "Ivory Paper", value: "#f7f2e8" },
  { label: "Soft Blush", value: "#f9e8ea" },
  { label: "Midnight", value: "#182235" },
  { label: "Forest", value: "#dfeadf" },
  { label: "Warm Sand", value: "#ead9bd" },
  { label: "Ivory Texture", value: "url('/studio-assets/backgrounds/ivory-paper-texture.png') center / cover" },
];

export function createCanvasDocument(groomName: string, brideName: string, photo = ""): CanvasDocument {
  return {
    version: 1,
    background: "#f7f2e8",
    elements: [
      { id: "ornament-top", type: "ornament", src: ornamentLibrary[0].src, x: -2, y: -2, width: 42, height: 22, rotation: 0, zIndex: 1, opacity: 0.92, animation: "float" },
      { id: "ornament-bottom", type: "ornament", src: ornamentLibrary[1].src, x: 56, y: 75, width: 46, height: 23, rotation: 0, zIndex: 1, opacity: 0.92, animation: "float" },
      { id: "names", type: "text", text: `${groomName || "Groom"} & ${brideName || "Bride"}`, x: 10, y: 63, width: 80, height: 11, rotation: 0, zIndex: 5, opacity: 1, color: "#1d283e", fontFamily: "Georgia", fontSize: 35, animation: "fade" },
      { id: "subtitle", type: "text", text: "THE WEDDING CELEBRATION", x: 14, y: 76, width: 72, height: 4, rotation: 0, zIndex: 5, opacity: 1, color: "#b58b36", fontFamily: "Arial", fontSize: 10, animation: "fade" },
      ...(photo ? [{ id: "photo", type: "photo" as const, src: photo, x: 20, y: 18, width: 60, height: 38, rotation: 0, zIndex: 3, opacity: 1, frame: "arch" as CanvasFrame, animation: "zoom" as CanvasAnimation }] : []),
    ],
  };
}

export function isCanvasDocument(value: unknown): value is CanvasDocument {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<CanvasDocument>;
  return candidate.version === 1 && Array.isArray(candidate.elements) && typeof candidate.background === "string";
}
