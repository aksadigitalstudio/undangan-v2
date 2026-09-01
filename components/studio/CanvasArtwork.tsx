"use client";
/* eslint-disable @next/next/no-img-element */

import type { CSSProperties, PointerEvent } from "react";
import type { CanvasDocument, CanvasElement } from "./canvasTypes";

function frameClass(frame: CanvasElement["frame"]) {
  if (frame === "circle") return "rounded-full";
  if (frame === "arch") return "rounded-t-[999px] rounded-b-[1.25rem]";
  if (frame === "rounded") return "rounded-[1.5rem]";
  if (frame === "polaroid") return "rounded-sm border-[10px] border-white pb-7 shadow-xl";
  if (frame === "gold") return "rounded-[1.25rem] border-4 border-[#c7a24a] p-1 shadow-xl";
  return "";
}

function animationClass(animation: CanvasElement["animation"]) {
  if (animation === "fade") return "studio-canvas-fade";
  if (animation === "float") return "studio-canvas-float";
  if (animation === "zoom") return "studio-canvas-zoom";
  return "";
}

export default function CanvasArtwork({ document, selectedId, onSelect, onElementPointerDown, editable = false }: { document: CanvasDocument; selectedId?: string | null; onSelect?: (id: string) => void; onElementPointerDown?: (id: string, event: PointerEvent<HTMLButtonElement>) => void; editable?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: document.background }}>
      {document.elements.slice().sort((a, b) => a.zIndex - b.zIndex).map((element) => {
        const style: CSSProperties = { left: `${element.x}%`, top: `${element.y}%`, width: `${element.width}%`, height: `${element.height}%`, transform: `rotate(${element.rotation}deg)`, zIndex: element.zIndex, opacity: element.opacity };
        const isSelected = editable && selectedId === element.id;
        const common = `${animationClass(element.animation)} absolute select-none ${editable ? "cursor-move" : "pointer-events-none"} ${isSelected ? "ring-2 ring-[#2563eb] ring-offset-2" : ""}`;
        if (element.type === "text") return <button key={element.id} type="button" aria-label="Select text" className={`${common} flex items-center justify-center text-center`} style={{ ...style, color: element.color, fontFamily: element.fontFamily, fontSize: `${element.fontSize ?? 22}px`, lineHeight: 1.05 }} onPointerDown={(event) => onElementPointerDown?.(element.id, event)} onClick={(event) => { event.stopPropagation(); onSelect?.(element.id); }}>{element.text}</button>;
        return <button key={element.id} type="button" aria-label={`Select ${element.type}`} className={common} style={style} onPointerDown={(event) => onElementPointerDown?.(element.id, event)} onClick={(event) => { event.stopPropagation(); onSelect?.(element.id); }}><img src={element.src} alt="" className={`h-full w-full object-cover ${element.type === "photo" ? frameClass(element.frame) : "object-contain"}`} draggable={false} /></button>;
      })}
    </div>
  );
}
