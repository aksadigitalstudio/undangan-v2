export type CanvasElementType = "text" | "photo" | "ornament";
export type CanvasFrame = "none" | "rounded" | "arch" | "circle" | "polaroid" | "gold";
export type CanvasAnimation = "none" | "fade" | "float" | "zoom";

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

export const ornamentLibrary = [
  { id: "gold-top-left", label: "Golden florals", src: "/decor/elegant-gold/foreground/floral-top-left.webp" },
  { id: "gold-bottom-right", label: "Golden garden", src: "/decor/elegant-gold/foreground/floral-bottom-right.webp" },
  { id: "sakura", label: "Sakura corner", src: "/decor/sakura-pink/foreground/sakura-top-right.webp" },
  { id: "royal", label: "Royal corner", src: "/decor/royal-blue/foreground/royal-bottom-left.webp" },
  { id: "banana", label: "Priangan blooms", src: "/decor/puspa-priangan/foreground/puspa-priangan-banana-floral-v1.png" },
  { id: "batik", label: "Sogan ornament", src: "/decor/sekar-sogan/foreground/sekar-sogan-ornament.png" },
];

export const canvasBackgrounds = [
  { label: "Ivory Paper", value: "#f7f2e8" },
  { label: "Soft Blush", value: "#f9e8ea" },
  { label: "Midnight", value: "#182235" },
  { label: "Forest", value: "#dfeadf" },
  { label: "Warm Sand", value: "#ead9bd" },
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
