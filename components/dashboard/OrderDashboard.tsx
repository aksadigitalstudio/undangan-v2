"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, ClipboardList, ExternalLink, MapPin, MessageCircle, Save, Search } from "lucide-react";

const statuses = ["new", "discussion", "awaiting_payment", "paid", "production", "revision", "completed", "cancelled"] as const;
type Status = (typeof statuses)[number];

type OrderBrief = {
  id: string; package_code: string; event_type: string; template_id: string | null; event_date: string | null; city: string | null; guest_count: string | null;
  contact_name: string; whatsapp: string; email: string | null; hosts: string | null; story: string | null; feeling: string | null; add_ons: string[] | null;
  desired_delivery: string | null; reference_url: string | null; notes: string | null; status: Status; admin_notes: string | null; created_at: string;
};

const labels: Record<Status, string> = {
  new: "New", discussion: "Discussion", awaiting_payment: "Awaiting payment", paid: "Paid", production: "Production", revision: "Revision", completed: "Completed", cancelled: "Cancelled",
};
const packageNames: Record<string, string> = { "digital-invitation": "Digital Invitation", "original-love-song": "Original Love Song", "ai-love-film": "AI Love Film" };
const statusClasses: Record<Status, string> = {
  new: "bg-[#fff0ea] text-[#b7473d]", discussion: "bg-[#eef0ff] text-[#5261a5]", awaiting_payment: "bg-[#fff5d9] text-[#986d13]", paid: "bg-[#e9f6ec] text-[#287346]", production: "bg-[#e4f2f5] text-[#277081]", revision: "bg-[#f4eafe] text-[#7b4c9e]", completed: "bg-[#e8f4ea] text-[#357447]", cancelled: "bg-[#f2f3f5] text-[#697386]",
};

function displayDate(value?: string | null) {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}
function displayTime(value: string) {
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}
function whatsappLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const number = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return `https://wa.me/${number}`;
}

export default function OrderDashboard() {
  const [orders, setOrders] = useState<OrderBrief[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [draftStatus, setDraftStatus] = useState<Status>("new");
  const [draftNotes, setDraftNotes] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await fetch("/api/admin/orders", { cache: "no-store" });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Orders could not be loaded.");
        const loaded = result.orders as OrderBrief[];
        setOrders(loaded);
        if (loaded[0]) setSelectedId(loaded[0].id);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Orders could not be loaded.");
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  const filtered = useMemo(() => orders.filter((order) => {
    const matchesStatus = filter === "all" || order.status === filter;
    const haystack = `${order.contact_name} ${order.whatsapp} ${order.hosts || ""} ${order.event_type}`.toLowerCase();
    return matchesStatus && haystack.includes(query.trim().toLowerCase());
  }), [filter, orders, query]);
  const selected = orders.find((order) => order.id === selectedId) || filtered[0] || null;

  useEffect(() => {
    if (selected) { setDraftStatus(selected.status); setDraftNotes(selected.admin_notes || ""); }
  }, [selected]);

  const totals = {
    all: orders.length,
    new: orders.filter((order) => order.status === "new").length,
    awaiting: orders.filter((order) => order.status === "awaiting_payment").length,
    production: orders.filter((order) => order.status === "production").length,
  };

  async function saveOrder() {
    if (!selected) return;
    setSaving(true); setError("");
    try {
      const response = await fetch("/api/admin/orders", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: selected.id, status: draftStatus, adminNotes: draftNotes }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "This order could not be updated.");
      setOrders((current) => current.map((order) => order.id === selected.id ? result.order : order));
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "This order could not be updated.");
    } finally { setSaving(false); }
  }

  return <section className="space-y-6 text-[#182235]">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e26257]">Sales workspace</p><h1 className="mt-2 font-serif text-4xl tracking-[-.03em] sm:text-5xl">Order briefs</h1><p className="mt-2 max-w-xl text-sm leading-6 text-[#657087]">Every consultation request, in one private place. Move each lead from first hello to final delivery.</p></div><div className="rounded-2xl border border-[#19243a]/10 bg-white px-4 py-3 text-sm text-[#657087]"><span className="font-bold text-[#182235]">Private admin view</span><span className="mx-2 text-[#c4cad4]">•</span>customer data protected</div></div>

    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[
      ["All enquiries", totals.all, "Every submitted brief", "all"], ["New", totals.new, "Needs first response", "new"], ["Awaiting payment", totals.awaiting, "Ready to follow up", "awaiting_payment"], ["In production", totals.production, "Active creative work", "production"],
    ].map(([label, value, caption, valueFilter]) => <button key={label as string} onClick={() => setFilter(valueFilter as "all" | Status)} className={`rounded-2xl border p-5 text-left transition ${filter === valueFilter ? "border-[#e26257] bg-[#fff9f6] shadow-sm" : "border-[#19243a]/10 bg-white hover:border-[#19243a]/25"}`}><p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#718097]">{label}</p><p className="mt-2 font-serif text-4xl">{value}</p><p className="mt-1 text-xs text-[#748096]">{caption}</p></button>)}</div>

    {error && <p role="alert" className="rounded-2xl border border-[#f1b9b3] bg-[#fff0ea] px-4 py-3 text-sm text-[#a33f37]">{error}</p>}
    <div className="grid min-h-[650px] gap-5 xl:grid-cols-[minmax(360px,.85fr)_minmax(0,1.35fr)]">
      <div className="overflow-hidden rounded-[1.6rem] border border-[#19243a]/10 bg-white"><div className="border-b border-[#19243a]/10 p-4"><div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8490a1]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, WhatsApp, event…" className="w-full rounded-xl bg-[#f6f7f9] py-3 pl-9 pr-3 text-sm outline-none placeholder:text-[#9aa3b1] focus:ring-2 focus:ring-[#ef655a]/25" /></div><div className="mt-3 flex gap-2 overflow-x-auto pb-0.5">{(["all", ...statuses] as const).map((status) => <button key={status} onClick={() => setFilter(status)} className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-bold ${filter === status ? "bg-[#182235] text-white" : "bg-[#f3f5f8] text-[#69758a] hover:bg-[#e8ebf0]"}`}>{status === "all" ? "All" : labels[status]}</button>)}</div></div>
        <div className="max-h-[590px] overflow-y-auto p-2">{loading ? <p className="p-6 text-sm text-[#718097]">Loading order briefs…</p> : filtered.length === 0 ? <div className="p-8 text-center"><ClipboardList className="mx-auto text-[#a3adbb]" size={28} /><p className="mt-3 font-semibold">No matching briefs</p><p className="mt-1 text-sm text-[#748096]">New customer briefs will appear here.</p></div> : filtered.map((order) => <button key={order.id} onClick={() => setSelectedId(order.id)} className={`w-full rounded-2xl p-4 text-left transition ${selected?.id === order.id ? "bg-[#fff2ec]" : "hover:bg-[#f7f8fa]"}`}><div className="flex gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#182235] font-serif text-lg text-white">{order.contact_name.slice(0, 1).toUpperCase()}</div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><p className="truncate font-bold">{order.contact_name}</p><span className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-[.08em] ${statusClasses[order.status]}`}>{labels[order.status]}</span></div><p className="mt-1 truncate text-xs text-[#69758a]">{order.hosts || order.event_type}</p><div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-[#7e899b]"><span>{packageNames[order.package_code] || order.package_code}</span><span>{displayTime(order.created_at)}</span></div></div></div></button>)}</div>
      </div>

      <div className="rounded-[1.6rem] border border-[#19243a]/10 bg-white p-5 sm:p-7">{selected ? <div><div className="flex flex-col justify-between gap-4 border-b border-[#19243a]/10 pb-6 sm:flex-row sm:items-start"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#e26257]">{packageNames[selected.package_code] || selected.package_code}</p><h2 className="mt-2 font-serif text-3xl">{selected.contact_name}</h2><p className="mt-1 text-sm text-[#69758a]">{selected.hosts || selected.event_type}</p></div><a href={whatsappLink(selected.whatsapp)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-[#102817] transition hover:brightness-95"><MessageCircle size={16} /> WhatsApp customer</a></div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2"><Info icon={<CalendarDays size={16} />} label="Event date" value={displayDate(selected.event_date)} /><Info icon={<MapPin size={16} />} label="Location" value={selected.city || "Not set"} /><Info label="Guests" value={selected.guest_count || "Not set"} /><Info label="Received" value={displayTime(selected.created_at)} /></div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-[#f7f8fa] p-4"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#788498]">Contact</p><p className="mt-2 text-sm font-semibold">{selected.whatsapp}</p><p className="mt-1 break-all text-sm text-[#69758a]">{selected.email || "No email provided"}</p></div><div className="rounded-2xl bg-[#f7f8fa] p-4"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#788498]">Creative direction</p><p className="mt-2 text-sm font-semibold">{selected.feeling || "Needs consultation"}</p><p className="mt-1 text-sm text-[#69758a]">Template: {selected.template_id || "AKSA recommendation"}</p></div></div>
        <div className="mt-6 space-y-4"><Detail label="Story / purpose" value={selected.story} /><Detail label="Add-ons" value={selected.add_ons?.length ? selected.add_ons.map((item) => item.replaceAll("_", " ")).join(", ") : "None selected"} /><Detail label="Reference" value={selected.reference_url} link /><Detail label="Customer notes" value={selected.notes} /></div>
        <div className="mt-7 rounded-2xl border border-[#19243a]/10 bg-[#fcfaf7] p-4 sm:p-5"><div className="flex items-center gap-2"><CheckCircle2 size={17} className="text-[#e26257]" /><h3 className="font-bold">Internal order control</h3></div><div className="mt-4 grid gap-4 sm:grid-cols-[210px_1fr]"><label className="block text-sm font-semibold">Status<select value={draftStatus} onChange={(event) => setDraftStatus(event.target.value as Status)} className="mt-2 w-full rounded-xl border border-[#19243a]/12 bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-[#ef655a]/25">{statuses.map((status) => <option key={status} value={status}>{labels[status]}</option>)}</select></label><label className="block text-sm font-semibold">Private notes<textarea value={draftNotes} onChange={(event) => setDraftNotes(event.target.value)} rows={4} placeholder="Payment follow-up, deadline, production handoff…" className="mt-2 w-full resize-none rounded-xl border border-[#19243a]/12 bg-white px-3 py-3 text-sm font-normal outline-none focus:ring-2 focus:ring-[#ef655a]/25" /></label></div><div className="mt-4 flex justify-end"><button onClick={saveOrder} disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-[#182235] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#2b3a56] disabled:cursor-not-allowed disabled:opacity-60"><Save size={16} />{saving ? "Saving…" : "Save order update"}</button></div></div>
      </div> : <div className="flex h-full min-h-80 flex-col items-center justify-center text-center"><ClipboardList size={34} className="text-[#a1abba]" /><h2 className="mt-4 font-serif text-2xl">No brief selected</h2><p className="mt-2 max-w-sm text-sm leading-6 text-[#748096]">Choose a customer brief from the list to see its details and manage the sales progress.</p></div>}</div>
    </div>
  </section>;
}

function Info({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return <div className="flex items-center gap-3 rounded-xl border border-[#19243a]/10 p-3"><span className="text-[#e26257]">{icon}</span><div><p className="text-[10px] font-bold uppercase tracking-[.1em] text-[#8590a0]">{label}</p><p className="mt-0.5 text-sm font-semibold">{value}</p></div></div>;
}
function Detail({ label, value, link = false }: { label: string; value?: string | null; link?: boolean }) {
  if (!value) return null;
  return <div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#8490a1]">{label}</p>{link ? <a href={value} target="_blank" rel="noreferrer" className="mt-1 inline-flex max-w-full items-center gap-1 break-all text-sm font-semibold text-[#c8554c] hover:underline">{value}<ExternalLink size={13} /></a> : <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-[#445069]">{value}</p>}</div>;
}
