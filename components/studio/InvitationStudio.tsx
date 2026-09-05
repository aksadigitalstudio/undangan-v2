"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronLeft,
  Eye,
  Image as ImageIcon,
  LayoutTemplate,
  LoaderCircle,
  Palette,
  Save,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Volume2,
} from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import AudioUpload from "@/components/AudioUpload";
import { templateCatalog } from "@/components/TemplateGallery";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import CreativeCanvas from "@/components/studio/CreativeCanvas";
import { CanvasDocument, isCanvasDocument } from "@/components/studio/canvasTypes";
import { defaultSections } from "@/lib/defaultSections";
import { supabase } from "@/lib/supabase";

type StudioTab = "content" | "design" | "canvas" | "sections" | "publish";

type InvitationDraft = {
  id: string;
  template_id?: string;
  sections?: Record<string, unknown>;
  status?: string;
  gallery?: string;
  [key: string]: unknown;
};

const tabs: Array<{ id: StudioTab; label: string; icon: typeof Settings2 }> = [
  { id: "content", label: "Content", icon: Settings2 },
  { id: "design", label: "Design", icon: Palette },
  { id: "canvas", label: "Canvas", icon: Sparkles },
  { id: "sections", label: "Sections", icon: LayoutTemplate },
  { id: "publish", label: "Publish", icon: Eye },
];

const sectionItems = [
  ["hero", "Hero & countdown"],
  ["couple", "Bride & groom"],
  ["story", "Love story"],
  ["event", "Event details"],
  ["live_stream", "Live streaming"],
  ["gallery", "Photo gallery"],
  ["rsvp", "RSVP & guestbook"],
  ["gift", "Gift registry"],
  ["music", "Background music"],
] as const;

const themeOptions = [
  ["elegant-gold", "Elegant Gold", "#c9a227"],
  ["luxury-black", "Luxury Black", "#171717"],
  ["sakura-pink", "Sakura Pink", "#e8a8b9"],
  ["forest-green", "Forest Green", "#45694c"],
  ["royal-blue", "Royal Blue", "#35568e"],
] as const;

const editableColumns = new Set([
  "groom_name", "bride_name", "groom_father", "groom_mother", "bride_father", "bride_mother",
  "groom_photo", "bride_photo", "groom_cutout", "bride_cutout", "hero_background", "wedding_date",
  "wedding_time", "venue", "address", "akad_date", "akad_time", "akad_venue", "akad_address",
  "akad_maps", "reception_date", "reception_time", "reception_venue", "reception_address", "reception_maps",
  "story1_year", "story1_title", "story1_description", "story2_year", "story2_title", "story2_description",
  "story3_year", "story3_title", "story3_description", "gallery", "bank_name", "bank_account", "account_name",
  "gift_address", "gift_note", "qris_image", "music", "live_stream_title", "live_stream_url", "theme",
  "template_id", "sections", "status",
]);

function textValue(data: InvitationDraft, key: string) {
  const value = data[key];
  return typeof value === "string" ? value : "";
}

function Field({ label, value, onChange, type = "text", multiline = false, placeholder = "" }: { label: string; value: string; onChange: (value: string) => void; type?: string; multiline?: boolean; placeholder?: string }) {
  const className = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#19243a] focus:ring-2 focus:ring-[#19243a]/10";
  return <label className="block text-sm font-semibold text-slate-700">{label}{multiline ? <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} rows={4} className={className} /> : <input value={value} type={type} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className={className} />}</label>;
}

export default function InvitationStudio({ invitationId }: { invitationId: string }) {
  const router = useRouter();
  const [draft, setDraft] = useState<InvitationDraft | null>(null);
  const [activeTab, setActiveTab] = useState<StudioTab>("content");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from("invitations").select("*").eq("id", invitationId).single();
      if (error || !data) {
        alert(error?.message || "Invitation not found.");
        router.replace("/dashboard/invitations");
        return;
      }
      setDraft({ ...data, sections: { ...defaultSections, ...(data.sections ?? {}) } });
    }
    void load();
  }, [invitationId, router]);

  const gallery = useMemo(() => textValue(draft ?? { id: "" }, "gallery").split(",").map((item) => item.trim()).filter(Boolean), [draft]);

  function setField(key: string, value: unknown) {
    setSaveMessage("");
    setDraft((current) => current ? { ...current, [key]: value } : current);
  }

  function setGalleryImage(index: number, value: string) {
    const next = [...gallery];
    next[index] = value;
    setField("gallery", next.filter(Boolean).join(","));
  }

  async function save() {
    if (!draft) return;
    setIsSaving(true);
    setSaveMessage("");
    const payload = Object.fromEntries(Object.entries(draft).filter(([key]) => editableColumns.has(key)));
    const { error } = await supabase.from("invitations").update(payload).eq("id", invitationId);
    setIsSaving(false);
    if (error) {
      setSaveMessage(error.message);
      return;
    }
    setSaveMessage("All changes saved.");
    router.refresh();
  }

  if (!draft) {
    return <div className="grid min-h-[60vh] place-items-center"><LoaderCircle className="animate-spin text-[#19243a]" size={28} /></div>;
  }

  const storedSections = draft.sections ?? {};
  const sections = {
    ...defaultSections,
    ...Object.fromEntries(Object.entries(storedSections).filter(([, value]) => typeof value === "boolean")),
  } as Record<string, boolean>;
  const canvasDocument = isCanvasDocument(storedSections.studio_canvas) ? storedSections.studio_canvas : undefined;

  function setCanvasDocument(document: CanvasDocument) {
    setField("sections", { ...storedSections, studio_canvas: document });
  }
  const showPortraitUpload = ["template-002", "template-003", "template-005", "template-006", "template-007", "template-008", "template-009", "template-010", "template-011", "template-012", "template-013", "template-014"].includes(textValue(draft, "template_id"));

  return (
    <div className="-m-8 min-h-[calc(100vh-4rem)] bg-[#eff1f5] text-[#19243a]">
      <header className="sticky top-0 z-40 flex min-h-16 items-center justify-between border-b border-slate-200 bg-white px-5 shadow-sm lg:px-7">
        <div className="flex items-center gap-3"><button onClick={() => router.push("/dashboard/invitations")} className="grid h-9 w-9 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100" aria-label="Back to invitations"><ChevronLeft size={20} /></button><div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e26257]">AKSA Studio</p><h1 className="font-serif text-xl">{textValue(draft, "groom_name")} &amp; {textValue(draft, "bride_name")}</h1></div></div>
        <div className="flex items-center gap-3"><span className={`hidden text-xs font-semibold sm:inline ${saveMessage === "All changes saved." ? "text-emerald-600" : "text-rose-600"}`}>{saveMessage}</span><button onClick={save} disabled={isSaving} className="inline-flex items-center gap-2 rounded-xl bg-[#19243a] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#2a3853] disabled:opacity-60">{isSaving ? <LoaderCircle size={16} className="animate-spin" /> : <Save size={16} />}{isSaving ? "Saving" : "Save changes"}</button></div>
      </header>

      <div className={`grid min-h-[calc(100vh-4rem)] ${activeTab === "canvas" ? "lg:grid-cols-1" : "lg:grid-cols-[25rem_minmax(0,1fr)]"}`}>
        <aside className={`border-b border-slate-200 bg-white ${activeTab === "canvas" ? "lg:border-b-0" : "lg:border-b-0 lg:border-r"}`}>
          <div className="flex overflow-x-auto border-b border-slate-200 px-3 pt-3">{tabs.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setActiveTab(id)} className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-xs font-bold transition ${activeTab === id ? "border-[#19243a] text-[#19243a]" : "border-transparent text-slate-500 hover:text-[#19243a]"}`}><Icon size={15} />{label}</button>)}</div>
          <div className={activeTab === "canvas" ? "p-5 lg:p-7" : "max-h-[calc(100vh-8rem)] overflow-y-auto p-5"}>
            {activeTab === "content" && <div className="space-y-8"><section><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">The basics</p><div className="mt-4 grid gap-4"><Field label="Groom name" value={textValue(draft, "groom_name")} onChange={(value) => setField("groom_name", value)} /><Field label="Bride name" value={textValue(draft, "bride_name")} onChange={(value) => setField("bride_name", value)} /><Field label="Wedding date" type="date" value={textValue(draft, "wedding_date")} onChange={(value) => setField("wedding_date", value)} /></div></section><section className="border-t border-slate-100 pt-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Love story</p><div className="mt-4 space-y-5">{[1, 2, 3].map((number) => <div key={number} className="rounded-xl bg-slate-50 p-4"><div className="grid grid-cols-[5rem_1fr] gap-3"><Field label="Year" value={textValue(draft, `story${number}_year`)} onChange={(value) => setField(`story${number}_year`, value)} /><Field label="Title" value={textValue(draft, `story${number}_title`)} onChange={(value) => setField(`story${number}_title`, value)} /></div><div className="mt-3"><Field label="Story" multiline value={textValue(draft, `story${number}_description`)} onChange={(value) => setField(`story${number}_description`, value)} /></div></div>)}</div></section><section className="border-t border-slate-100 pt-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Event details</p><div className="mt-4 space-y-5">{[["akad", "Ceremony"], ["reception", "Reception"]].map(([prefix, title]) => <div key={prefix} className="rounded-xl bg-slate-50 p-4"><p className="font-serif text-xl">{title}</p><div className="mt-4 grid grid-cols-2 gap-3"><Field label="Date" type="date" value={textValue(draft, `${prefix}_date`)} onChange={(value) => setField(`${prefix}_date`, value)} /><Field label="Time" type="time" value={textValue(draft, `${prefix}_time`)} onChange={(value) => setField(`${prefix}_time`, value)} /></div><div className="mt-3"><Field label="Venue" value={textValue(draft, `${prefix}_venue`)} onChange={(value) => setField(`${prefix}_venue`, value)} /><div className="mt-3"><Field label="Address" multiline value={textValue(draft, `${prefix}_address`)} onChange={(value) => setField(`${prefix}_address`, value)} /></div><div className="mt-3"><Field label="Google Maps link" value={textValue(draft, `${prefix}_maps`)} onChange={(value) => setField(`${prefix}_maps`, value)} placeholder="https://maps.google.com/..." /></div></div></div>)}</div></section></div>}

            {activeTab === "design" && <div className="space-y-8"><section><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Template direction</p><p className="mt-2 text-sm leading-6 text-slate-500">Choose the visual world for this invitation. You can switch it any time before publishing.</p><div className="mt-5 space-y-2.5">{templateCatalog.map((template) => { const selected = textValue(draft, "template_id") === template.id; return <button key={template.id} type="button" onClick={() => setField("template_id", template.id)} className={`group flex w-full items-center gap-3 rounded-2xl border p-2.5 text-left transition ${selected ? "border-[#19243a] bg-[#f6f8fb] shadow-[0_8px_24px_rgba(25,36,58,0.08)] ring-1 ring-[#19243a]/10" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"}`}><span className="h-[4.5rem] w-[3.25rem] shrink-0 rounded-xl bg-slate-100 bg-cover bg-center shadow-sm" style={{ backgroundImage: `linear-gradient(180deg, rgba(13,24,42,0.03), rgba(13,24,42,0.24)), url('${template.image}')` }} /><span className="min-w-0 flex-1"><span className="block text-[9px] font-bold uppercase tracking-[0.17em]" style={{ color: template.accent }}>{template.label}</span><span className="mt-1 block truncate font-serif text-lg leading-5 text-[#19243a]">{template.name}</span><span className="mt-1 block max-h-8 overflow-hidden text-xs leading-4 text-slate-500">{template.description}</span></span><span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition ${selected ? "bg-[#19243a] text-white" : "border border-slate-200 text-transparent group-hover:border-slate-300"}`}><Check size={14} /></span></button>; })}</div></section><section className="border-t border-slate-100 pt-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Accent preset</p><p className="mt-2 text-sm leading-6 text-slate-500">Choose the base palette for templates that support theme variants.</p><div className="mt-4 grid grid-cols-2 gap-3">{themeOptions.map(([id, label, color]) => <button key={id} type="button" onClick={() => setField("theme", id)} className={`flex items-center gap-3 rounded-xl border p-3 text-left text-xs font-bold transition ${textValue(draft, "theme") === id ? "border-[#19243a] bg-slate-50 ring-2 ring-[#19243a]/10" : "border-slate-200 hover:border-slate-300"}`}><span className="h-5 w-5 rounded-full border border-black/10" style={{ background: color }} />{label}</button>)}</div></section><section className="border-t border-slate-100 pt-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Photos</p><div className="mt-4 space-y-5"><ImageUpload label="Hero image" value={textValue(draft, "hero_background")} onChange={(value) => setField("hero_background", value)} /><ImageUpload label="Groom portrait" value={textValue(draft, "groom_photo")} onChange={(value) => setField("groom_photo", value)} /><ImageUpload label="Bride portrait" value={textValue(draft, "bride_photo")} onChange={(value) => setField("bride_photo", value)} />{showPortraitUpload && <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900"><p className="font-bold">Full-body portrait layers</p><p className="mt-1">Use transparent PNG or WebP for the strongest result in this template.</p><div className="mt-4 space-y-4"><ImageUpload label="Groom full body" value={textValue(draft, "groom_cutout")} onChange={(value) => setField("groom_cutout", value)} /><ImageUpload label="Bride full body" value={textValue(draft, "bride_cutout")} onChange={(value) => setField("bride_cutout", value)} /></div></div>}</div></section><section className="border-t border-slate-100 pt-7"><div className="flex items-center gap-2"><ImageIcon size={15} /><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Gallery</p></div><div className="mt-4 space-y-4">{Array.from({ length: 6 }, (_, index) => <ImageUpload key={index} label={`Photo ${index + 1}`} value={gallery[index] ?? ""} onChange={(value) => setGalleryImage(index, value)} />)}</div></section><section className="border-t border-slate-100 pt-7"><div className="flex items-center gap-2"><Volume2 size={15} /><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Music</p></div><div className="mt-4"><AudioUpload label="Background music" value={textValue(draft, "music")} onChange={(value) => setField("music", value)} /></div></section></div>}

            {activeTab === "canvas" && <CreativeCanvas value={canvasDocument} onChange={setCanvasDocument} groomName={textValue(draft, "groom_name")} brideName={textValue(draft, "bride_name")} fallbackPhoto={textValue(draft, "hero_background") || textValue(draft, "groom_photo")} />}

            {activeTab === "sections" && <div className="space-y-7"><section><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Visibility</p><p className="mt-2 text-sm leading-6 text-slate-500">Turn sections on or off. The preview updates immediately.</p><div className="mt-5 divide-y rounded-xl border border-slate-200">{sectionItems.map(([key, label]) => <button key={key} type="button" onClick={() => setField("sections", { ...storedSections, [key]: !sections[key] })} className="flex w-full items-center justify-between p-4 text-left"><span className="text-sm font-semibold text-slate-700">{label}</span><span className={`relative h-6 w-11 rounded-full transition ${sections[key] ? "bg-emerald-500" : "bg-slate-300"}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${sections[key] ? "left-6" : "left-1"}`} /></span></button>)}</div></section><section className="border-t border-slate-100 pt-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Live streaming</p><div className="mt-4 space-y-4"><Field label="Stream title" value={textValue(draft, "live_stream_title")} onChange={(value) => setField("live_stream_title", value)} /><Field label="Stream link" value={textValue(draft, "live_stream_url")} onChange={(value) => setField("live_stream_url", value)} placeholder="YouTube, Zoom, or Instagram URL" /></div></section><section className="border-t border-slate-100 pt-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Gift registry</p><div className="mt-4 space-y-4"><Field label="Bank name" value={textValue(draft, "bank_name")} onChange={(value) => setField("bank_name", value)} /><Field label="Account number" value={textValue(draft, "bank_account")} onChange={(value) => setField("bank_account", value)} /><Field label="Account holder" value={textValue(draft, "account_name")} onChange={(value) => setField("account_name", value)} /><Field label="Gift delivery address" multiline value={textValue(draft, "gift_address")} onChange={(value) => setField("gift_address", value)} /><ImageUpload label="QRIS image" value={textValue(draft, "qris_image")} onChange={(value) => setField("qris_image", value)} /></div></section></div>}

            {activeTab === "publish" && <div className="space-y-7"><section className="rounded-2xl bg-[#19243a] p-5 text-white"><Sparkles size={19} className="text-[#f4c979]" /><h2 className="mt-4 font-serif text-3xl">Ready when you are.</h2><p className="mt-3 text-sm leading-6 text-white/65">Save your latest changes, then publish when the invitation is complete.</p></section><section><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Status</p><div className="mt-4 grid grid-cols-2 gap-3"><button type="button" onClick={() => setField("status", "Draft")} className={`rounded-xl border p-4 text-left ${textValue(draft, "status") === "Draft" ? "border-[#19243a] bg-slate-50 ring-2 ring-[#19243a]/10" : "border-slate-200"}`}><p className="font-bold text-slate-800">Draft</p><p className="mt-1 text-xs leading-5 text-slate-500">Only visible in your dashboard.</p></button><button type="button" onClick={() => setField("status", "Published")} className={`rounded-xl border p-4 text-left ${textValue(draft, "status") === "Published" ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100" : "border-slate-200"}`}><p className="font-bold text-slate-800">Published</p><p className="mt-1 text-xs leading-5 text-slate-500">Ready to share with guests.</p></button></div></section><a href={`/${textValue(draft, "slug")}?return=dashboard`} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#19243a] px-4 py-3 text-sm font-bold text-[#19243a] transition hover:bg-[#19243a] hover:text-white"><Eye size={16} /> Open public invitation</a></div>}
          </div>
        </aside>

        {activeTab !== "canvas" && <section className="relative min-w-0 overflow-hidden bg-[radial-gradient(circle_at_50%_-15%,#fffdf8_0%,#edf0f4_44%,#d8dee7_100%)] p-4 sm:p-7"><div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/40 to-transparent" /><div className="relative mx-auto max-w-[520px]"><div className="mb-4 flex items-center justify-between rounded-2xl border border-white/70 bg-white/55 px-4 py-3 shadow-sm backdrop-blur"><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#52627a]"><SlidersHorizontal size={14} /> Live preview</p><span className="rounded-full bg-[#19243a] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white">Live draft</span></div><div className="overflow-hidden rounded-[2.35rem] border-[10px] border-[#19243a] bg-[#f5f2ed] shadow-[0_28px_85px_rgba(25,36,58,0.25)]"><div className="studio-template-preview max-h-[calc(100vh-11.5rem)] overflow-x-hidden overflow-y-auto overscroll-contain touch-pan-y"><TemplateRenderer templateId={textValue(draft, "template_id") || "template-001"} invitation={draft} guest={null} sections={sections} showCover={false} showMusic={false} /></div></div><p className="mx-auto mt-5 flex max-w-[460px] items-center justify-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2.5 text-center text-xs text-slate-600 shadow-sm"><Check size={14} className="shrink-0 text-emerald-600" />Scroll inside the invitation to review every section. Save when ready.</p></div></section>}
      </div>
    </div>
  );
}
