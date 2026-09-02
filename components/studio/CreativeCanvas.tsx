"use client";
/* eslint-disable @next/next/no-img-element */

import { useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { Copy, ImagePlus, Layers3, RotateCcw, Sparkles, Type, Trash2, WandSparkles } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import CanvasArtwork from "./CanvasArtwork";
import { canvasBackgrounds, CanvasDocument, CanvasElement, CanvasFrame, CanvasAnimation, CanvasLibraryAsset, createCanvasDocument, ornamentLibrary } from "./canvasTypes";

const fontOptions = ["Georgia", "Arial", "'Times New Roman'", "cursive", "serif"];
const frameOptions: Array<{ id: CanvasFrame; label: string }> = [
  { id: "none", label: "None" }, { id: "rounded", label: "Rounded" }, { id: "arch", label: "Arch" }, { id: "circle", label: "Circle" }, { id: "polaroid", label: "Polaroid" }, { id: "gold", label: "Gold edge" },
];
const animationOptions: Array<{ id: CanvasAnimation; label: string }> = [
  { id: "none", label: "Still" }, { id: "fade", label: "Fade" }, { id: "float", label: "Float" }, { id: "zoom", label: "Soft zoom" },
];

function newId(prefix: string) { return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`; }
function clamp(value: number, min: number, max: number) { return Math.min(Math.max(value, min), max); }

export default function CreativeCanvas({ value, onChange, groomName, brideName, fallbackPhoto }: { value?: CanvasDocument; onChange: (document: CanvasDocument) => void; groomName: string; brideName: string; fallbackPhoto?: string }) {
  const [selectedId, setSelectedId] = useState<string | null>(value?.elements[0]?.id ?? null);
  const [assetCategory, setAssetCategory] = useState<"All" | "Floral" | "Culture" | "Frames" | "Icons" | "Effects">("All");
  const canvas = value ?? createCanvasDocument(groomName, brideName, fallbackPhoto);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: string; startX: number; startY: number; originX: number; originY: number } | null>(null);
  const selected = useMemo(() => canvas.elements.find((element) => element.id === selectedId) ?? null, [canvas.elements, selectedId]);
  const displayedAssets = assetCategory === "All" ? ornamentLibrary : ornamentLibrary.filter((asset) => asset.category === assetCategory);

  function commit(next: CanvasDocument) { onChange(next); }
  function updateElement(id: string, patch: Partial<CanvasElement>) { commit({ ...canvas, elements: canvas.elements.map((element) => element.id === id ? { ...element, ...patch } : element) }); }
  function addText() {
    const element: CanvasElement = { id: newId("text"), type: "text", text: "Your text", x: 16, y: 48, width: 68, height: 9, rotation: 0, zIndex: canvas.elements.length + 1, opacity: 1, color: "#1d283e", fontFamily: "Georgia", fontSize: 28, animation: "fade" };
    commit({ ...canvas, elements: [...canvas.elements, element] }); setSelectedId(element.id);
  }
  function addPhoto() {
    const element: CanvasElement = { id: newId("photo"), type: "photo", src: fallbackPhoto || "", x: 23, y: 28, width: 54, height: 32, rotation: 0, zIndex: canvas.elements.length + 1, opacity: 1, frame: "rounded", animation: "zoom" };
    commit({ ...canvas, elements: [...canvas.elements, element] }); setSelectedId(element.id);
  }
  function addOrnament(asset: CanvasLibraryAsset) {
    const width = asset.defaultWidth ?? 35;
    const height = asset.defaultHeight ?? 19;
    const element: CanvasElement = { id: newId("ornament"), type: "ornament", src: asset.src, x: clamp((100 - width) / 2, 0, 100), y: asset.category === "Frames" ? 13 : 5, width, height, rotation: 0, zIndex: canvas.elements.length + 1, opacity: 1, animation: asset.category === "Frames" ? "none" : "float" };
    commit({ ...canvas, elements: [...canvas.elements, element] }); setSelectedId(element.id);
  }
  function duplicate() {
    if (!selected) return;
    const copy = { ...selected, id: newId(selected.type), x: clamp(selected.x + 4, 0, 92), y: clamp(selected.y + 4, 0, 92), zIndex: canvas.elements.length + 1 };
    commit({ ...canvas, elements: [...canvas.elements, copy] }); setSelectedId(copy.id);
  }
  function remove() { if (!selected) return; commit({ ...canvas, elements: canvas.elements.filter((element) => element.id !== selected.id) }); setSelectedId(null); }
  function reset() { const next = createCanvasDocument(groomName, brideName, fallbackPhoto); commit(next); setSelectedId(next.elements[0]?.id ?? null); }
  function handlePointerDown(id: string, event: PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    const target = canvas.elements.find((element) => element.id === id); const stage = stageRef.current;
    if (!target || !stage) return;
    const rect = stage.getBoundingClientRect();
    dragRef.current = { id, startX: event.clientX, startY: event.clientY, originX: target.x, originY: target.y };
    event.currentTarget.setPointerCapture(event.pointerId);
    setSelectedId(id);
    void rect;
  }
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current; const stage = stageRef.current;
    if (!drag || !stage) return;
    const rect = stage.getBoundingClientRect(); const target = canvas.elements.find((element) => element.id === drag.id);
    if (!target) return;
    updateElement(drag.id, { x: clamp(drag.originX + ((event.clientX - drag.startX) / rect.width) * 100, -10, 100 - Math.min(target.width, 10)), y: clamp(drag.originY + ((event.clientY - drag.startY) / rect.height) * 100, -10, 100 - Math.min(target.height, 8)) });
  }
  function handlePointerUp() { dragRef.current = null; }

  return <div className="space-y-5">
    <section className="rounded-2xl border border-[#dce2ec] bg-[#fbfcfe] p-4 shadow-sm">
      <div className="flex items-start gap-3"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#19243a] text-white"><WandSparkles size={17} /></div><div><p className="font-semibold text-[#19243a]">Design your cover</p><p className="mt-1 text-xs leading-5 text-slate-500">Drag elements on the canvas, then refine the selected layer below.</p></div></div>
    </section>

    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_16rem]">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2"><button type="button" onClick={addText} className="studio-tool"><Type size={15} /> Add text</button><button type="button" onClick={addPhoto} className="studio-tool"><ImagePlus size={15} /> Add photo</button><button type="button" onClick={duplicate} disabled={!selected} className="studio-tool"><Copy size={14} /> Duplicate</button><button type="button" onClick={remove} disabled={!selected} className="studio-tool text-rose-600"><Trash2 size={14} /> Delete</button><button type="button" onClick={reset} className="studio-tool ml-auto"><RotateCcw size={14} /> Reset</button></div>
        <div ref={stageRef} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp} onClick={() => setSelectedId(null)} className="relative mx-auto aspect-[9/16] w-full max-w-[25rem] touch-none overflow-hidden rounded-[2rem] border-[9px] border-[#19243a] bg-[#f7f2e8] shadow-[0_24px_65px_rgba(25,36,58,0.22)]"><CanvasArtwork document={canvas} selectedId={selectedId} onSelect={setSelectedId} onElementPointerDown={handlePointerDown} editable /></div>
        <p className="text-center text-xs text-slate-500">Tip: select an element, then drag it directly on the canvas.</p>
      </div>

      <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2"><Layers3 size={16} className="text-[#52627a]" /><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Layers</p></div>
        <div className="mt-3 space-y-1.5">{canvas.elements.slice().sort((a, b) => b.zIndex - a.zIndex).map((element) => <button key={element.id} type="button" onClick={() => setSelectedId(element.id)} className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs transition ${selectedId === element.id ? "bg-[#19243a] text-white" : "hover:bg-slate-50 text-slate-600"}`}><span className="grid h-6 w-6 place-items-center rounded-md bg-current/10">{element.type === "text" ? <Type size={13} /> : element.type === "photo" ? <ImagePlus size={13} /> : <Sparkles size={13} />}</span><span className="truncate">{element.type === "text" ? element.text || "Text" : element.type === "photo" ? "Photo frame" : "Ornament"}</span></button>)}</div>
      </aside>
    </div>

    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Canvas background</p><div className="mt-3 flex flex-wrap gap-2">{canvasBackgrounds.map((background) => <button key={background.value} type="button" onClick={() => commit({ ...canvas, background: background.value })} className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${canvas.background === background.value ? "border-[#19243a] bg-slate-50" : "border-slate-200"}`}><span className="h-4 w-4 rounded-full border border-black/10" style={{ background: background.value }} />{background.label}</button>)}</div></section>

    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Asset library</p><p className="mt-1 text-xs text-slate-500">Original AKSA assets and themed collections.</p></div><span className="rounded-full bg-[#f2f5f9] px-3 py-1 text-[10px] font-bold text-[#52627a]">{displayedAssets.length} choices</span></div><div className="mt-4 flex flex-wrap gap-2">{(["All", "Floral", "Culture", "Frames", "Icons", "Effects"] as const).map((category) => <button key={category} type="button" onClick={() => setAssetCategory(category)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${assetCategory === category ? "border-[#19243a] bg-[#19243a] text-white" : "border-slate-200 text-slate-600 hover:border-slate-400"}`}>{category}</button>)}</div><div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">{displayedAssets.map((ornament) => <button key={ornament.id} type="button" onClick={() => addOrnament(ornament)} className="group overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-left transition hover:border-[#19243a] hover:shadow-sm"><div className="h-20 bg-[#eee8dc]"><img src={ornament.src} alt="" className="h-full w-full object-contain p-1 transition group-hover:scale-105" /></div><span className="block truncate px-2 py-2 text-[10px] font-semibold text-slate-600">{ornament.label}</span></button>)}</div></section>

    {selected && <section className="rounded-2xl border border-[#cfd8e6] bg-[#f8fafc] p-4 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Selected layer</p><div className="mt-4 space-y-4">{selected.type === "text" && <><label className="block text-xs font-semibold text-slate-700">Text<textarea value={selected.text ?? ""} onChange={(event) => updateElement(selected.id, { text: event.target.value })} className="studio-input mt-2 min-h-20" /></label><div className="grid grid-cols-2 gap-3"><label className="text-xs font-semibold text-slate-700">Font<select value={selected.fontFamily} onChange={(event) => updateElement(selected.id, { fontFamily: event.target.value })} className="studio-input mt-2">{fontOptions.map((font) => <option key={font} value={font}>{font}</option>)}</select></label><label className="text-xs font-semibold text-slate-700">Colour<input type="color" value={selected.color ?? "#19243a"} onChange={(event) => updateElement(selected.id, { color: event.target.value })} className="mt-2 h-10 w-full cursor-pointer rounded-lg border border-slate-200 bg-white p-1" /></label></div><label className="block text-xs font-semibold text-slate-700">Size <input type="range" min="12" max="72" value={selected.fontSize ?? 26} onChange={(event) => updateElement(selected.id, { fontSize: Number(event.target.value) })} className="mt-2 w-full accent-[#19243a]" /></label></>}{selected.type === "photo" && <><ImageUpload label="Replace photo" value={selected.src ?? ""} onChange={(src) => updateElement(selected.id, { src })} /><label className="block text-xs font-semibold text-slate-700">Frame<select value={selected.frame ?? "none"} onChange={(event) => updateElement(selected.id, { frame: event.target.value as CanvasFrame })} className="studio-input mt-2">{frameOptions.map((frame) => <option key={frame.id} value={frame.id}>{frame.label}</option>)}</select></label></>}{selected.type === "ornament" && <p className="text-sm leading-6 text-slate-500">Choose another ornament from the library or adjust its scale and motion below.</p>}<div className="grid grid-cols-2 gap-3"><label className="text-xs font-semibold text-slate-700">Scale<input type="range" min="10" max="90" value={selected.width} onChange={(event) => updateElement(selected.id, { width: Number(event.target.value) })} className="mt-2 w-full accent-[#19243a]" /></label><label className="text-xs font-semibold text-slate-700">Rotation<input type="range" min="-180" max="180" value={selected.rotation} onChange={(event) => updateElement(selected.id, { rotation: Number(event.target.value) })} className="mt-2 w-full accent-[#19243a]" /></label></div><label className="block text-xs font-semibold text-slate-700">Motion<select value={selected.animation ?? "none"} onChange={(event) => updateElement(selected.id, { animation: event.target.value as CanvasAnimation })} className="studio-input mt-2">{animationOptions.map((animation) => <option key={animation.id} value={animation.id}>{animation.label}</option>)}</select></label></div></section>}
  </div>;
}
