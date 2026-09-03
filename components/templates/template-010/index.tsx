"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { InvitationTemplate, TemplateProps } from "../types";
import CopyButton from "@/components/CopyButton";
import Guestbook from "@/components/Guestbook";
import MotionSection from "@/components/motion/MotionSection";
import RSVPForm from "@/components/RSVPForm";
import { defaultSections } from "@/lib/defaultSections";
import { atelierMedia } from "./shared";

const sections = (invitation: { sections?: Record<string, unknown> }) => ({ ...defaultSections, ...(invitation.sections ?? {}) });
const firstName = (name?: string) => name?.trim().split(" ")[0] || "";
const countdown = (date?: string) => {
  const target = new Date(`${date || ""}T00:00:00`).getTime();
  const remaining = Number.isNaN(target) ? 0 : Math.max(0, target - Date.now());
  return [
    [Math.floor(remaining / 86400000), "Days"],
    [Math.floor(remaining / 3600000) % 24, "Hours"],
    [Math.floor(remaining / 60000) % 60, "Minutes"],
    [Math.floor(remaining / 1000) % 60, "Seconds"],
  ];
};

function Cover({ invitation }: TemplateProps) {
  const [opened, setOpened] = useState(false);
  if (opened) return null;
  const groom = firstName(invitation.groom_name) || "Julien";
  const bride = firstName(invitation.bride_name) || "Aurelia";
  return <section className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[#e9e3da] p-5 text-[#211e1c]">
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#8d7a67 0.7px, transparent .7px)", backgroundSize: "7px 7px" }} />
    <div className="relative grid w-full max-w-5xl overflow-hidden border border-[#5c5149]/35 bg-[#f8f5ef] shadow-2xl md:grid-cols-[1.05fr_.95fr]">
      <div className="relative min-h-[25rem] border-b border-dashed border-[#5c5149]/45 md:border-b-0 md:border-r">
        <Image src={invitation.hero_background || atelierMedia.hero} alt="Atelier No. 27" fill priority unoptimized className="object-cover" />
        <div className="absolute inset-5 border border-white/60" />
      </div>
      <div className="relative flex min-h-[25rem] flex-col justify-between p-8 sm:p-12">
        <span className="absolute right-6 top-6 h-12 w-12 rounded-full border border-[#aa8b6c]/55" />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#9d7660]">AKSA STUDIO · ATELIER No. 27</p>
          <p className="mt-14 text-xs uppercase tracking-[.28em] text-[#6f6259]">A couture wedding collection</p>
          <h1 className="mt-5 font-serif text-5xl leading-[.87] sm:text-6xl">{groom}<br /><span className="italic text-[#ad806a]">&amp;</span> {bride}</h1>
          <div className="mt-8 h-px w-24 bg-[#aa8b6c]" />
          <p className="mt-6 text-sm leading-7 text-[#5c5149]">An invitation assembled with intention, texture, and a little bit of magic.</p>
        </div>
        <div className="mt-10 flex items-center justify-between gap-4 border-t border-dashed border-[#5c5149]/45 pt-6">
          <p className="text-[10px] font-bold uppercase tracking-[.24em]">{invitation.wedding_date}</p>
          <button onClick={() => { window.dispatchEvent(new Event("invitation-opened")); setOpened(true); }} className="border border-[#211e1c] bg-[#211e1c] px-5 py-3 text-[10px] font-bold uppercase tracking-[.2em] text-white transition hover:bg-[#ad806a] hover:border-[#ad806a]">Open the collection</button>
        </div>
      </div>
    </div>
  </section>;
}

function Hero({ invitation }: TemplateProps) {
  const [clock, setClock] = useState(() => countdown(invitation.wedding_date));
  const active = sections(invitation);
  useEffect(() => { const timer = setInterval(() => setClock(countdown(invitation.wedding_date)), 1000); return () => clearInterval(timer); }, [invitation.wedding_date]);
  if (!active.hero && !active.countdown) return null;
  return <section className="relative z-10 overflow-hidden bg-[#f8f5ef] px-5 py-20 text-[#211e1c] sm:px-8">
    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
      <div className="order-2 lg:order-1">
        <p className="text-[10px] font-bold uppercase tracking-[.45em] text-[#a77d66]">The wedding collection · 2026</p>
        <h1 className="mt-6 font-serif text-6xl leading-[.8] sm:text-8xl">{firstName(invitation.groom_name) || "Julien"}<br /><span className="text-[#ad806a] italic">&amp;</span> {firstName(invitation.bride_name) || "Aurelia"}</h1>
        <p className="mt-9 max-w-md text-base leading-8 text-[#5c5149]">A celebration composed like a favourite look: personal, considered, and made to be remembered.</p>
        <div className="mt-10 flex items-center gap-5"><span className="h-px w-16 bg-[#aa8b6c]" /><p className="text-[11px] font-bold uppercase tracking-[.22em]">Save the date · {invitation.wedding_date}</p></div>
      </div>
      <div className="relative order-1 mx-auto w-full max-w-2xl lg:order-2">
        <div className="relative aspect-[4/5] overflow-hidden border-[12px] border-white shadow-[18px_18px_0_#d8c4b5] sm:border-[18px]">
          <Image src={invitation.hero_background || atelierMedia.hero} alt="Atelier styling board" fill priority unoptimized className="object-cover" />
        </div>
        <div className="absolute -bottom-7 -left-3 max-w-[13rem] border border-[#5c5149]/25 bg-[#f8f5ef] p-4 shadow-lg sm:-left-10 sm:p-5"><p className="text-[9px] font-bold uppercase tracking-[.25em] text-[#a77d66]">Fabric note</p><p className="mt-2 font-serif text-xl italic">Ivory silk, warm vows.</p></div>
      </div>
    </div>
    {active.countdown !== false && <div className="mx-auto mt-20 grid max-w-5xl grid-cols-2 overflow-hidden border-y border-dashed border-[#5c5149]/45 sm:grid-cols-4">{clock.map(([value, label], index) => <div key={String(label)} className={`py-7 text-center ${index ? "sm:border-l sm:border-dashed sm:border-[#5c5149]/45" : ""}`}><p className="font-serif text-4xl">{String(value).padStart(2, "0")}</p><p className="mt-2 text-[9px] font-bold uppercase tracking-[.22em] text-[#8a7160]">{label}</p></div>)}</div>}
  </section>;
}

function Couple({ invitation }: TemplateProps) {
  if (!sections(invitation).couple) return null;
  const people = [
    ["Look 01 · The Groom", invitation.groom_name || "Julien Laurent", invitation.groom_cutout || invitation.groom_photo || atelierMedia.groom],
    ["Look 02 · The Bride", invitation.bride_name || "Aurelia Moreau", invitation.bride_cutout || invitation.bride_photo || atelierMedia.bride],
  ];
  return <MotionSection><section className="relative z-10 bg-[#211e1c] px-5 py-20 text-[#f8f5ef] sm:px-8"><div className="mx-auto max-w-6xl"><div className="max-w-xl"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#d6b6a0]">The muses</p><h2 className="mt-4 font-serif text-5xl">Two looks. One story.</h2></div><div className="mt-14 grid gap-6 md:grid-cols-2">{people.map(([label, name, image], index) => <article key={String(label)} className="group overflow-hidden border border-white/20 bg-[#2d2926] p-3"><div className="relative h-[31rem] overflow-hidden bg-[#e7ddd1]"><Image src={String(image)} alt={String(name)} fill unoptimized className="object-contain object-bottom transition duration-700 group-hover:scale-[1.03]" /><span className="absolute left-5 top-5 border border-[#211e1c]/20 bg-[#f8f5ef]/90 px-3 py-2 text-[9px] font-bold uppercase tracking-[.2em] text-[#211e1c]">{String(index + 1).padStart(2, "0")}</span></div><p className="mt-5 text-[9px] font-bold uppercase tracking-[.3em] text-[#d6b6a0]">{label}</p><h3 className="mt-2 pb-3 font-serif text-4xl">{name}</h3></article>)}</div></div></section></MotionSection>;
}

function Story({ invitation }: TemplateProps) {
  const chapters = [[invitation.story1_year, invitation.story1_title, invitation.story1_description], [invitation.story2_year, invitation.story2_title, invitation.story2_description], [invitation.story3_year, invitation.story3_title, invitation.story3_description]].filter((entry) => entry.some(Boolean));
  if (!sections(invitation).story || !chapters.length) return null;
  return <MotionSection><section className="relative z-10 bg-[#e9e3da] px-5 py-20 text-[#211e1c] sm:px-8"><div className="mx-auto max-w-6xl"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#a77d66]">The collection</p><div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end"><h2 className="font-serif text-5xl">Every piece led us here.</h2><p className="max-w-sm text-sm leading-7 text-[#5c5149]">A small archive of the moments that became our greatest love story.</p></div><div className="mt-14 grid gap-4 md:grid-cols-3">{chapters.map(([year, title, description], index) => <article key={`${year}-${title}`} className="border border-[#5c5149]/25 bg-[#f8f5ef] p-7 shadow-sm"><p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#a77d66]">Look {String(index + 1).padStart(2, "0")} · {year}</p><h3 className="mt-8 font-serif text-3xl">{title}</h3><p className="mt-5 text-sm leading-7 text-[#5c5149]">{description}</p><div className="mt-8 border-t border-dashed border-[#5c5149]/35 pt-4 text-[9px] font-bold uppercase tracking-[.25em] text-[#8a7160]">Private archive</div></article>)}</div></div></section></MotionSection>;
}

function EventCard({ title, date, time, venue, address, maps }: { title: string; date?: string; time?: string; venue?: string; address?: string; maps?: string }) {
  return <article className="border border-[#5c5149]/25 bg-[#f8f5ef] p-8"><p className="text-[10px] font-bold uppercase tracking-[.3em] text-[#a77d66]">{title}</p><h3 className="mt-6 font-serif text-3xl">{venue || title}</h3><div className="mt-7 border-y border-dashed border-[#5c5149]/35 py-4 text-sm"><p className="font-bold">{date}</p><p className="mt-2 text-[#5c5149]">{time}</p></div><p className="mt-6 whitespace-pre-line text-sm leading-7 text-[#5c5149]">{address}</p>{maps && <a href={maps} target="_blank" rel="noreferrer" className="mt-7 inline-block border-b border-[#211e1c] pb-1 text-[10px] font-bold uppercase tracking-[.18em]">View location ↗</a>}</article>;
}

function Celebration({ invitation }: TemplateProps) {
  if (!sections(invitation).event) return null;
  return <MotionSection><section className="relative z-10 bg-[#f8f5ef] px-5 py-20 text-[#211e1c] sm:px-8"><div className="mx-auto max-w-5xl"><div className="text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#a77d66]">The fitting schedule</p><h2 className="mt-4 font-serif text-5xl">Meet us under the lights.</h2></div><div className="mt-14 grid gap-6 md:grid-cols-2"><EventCard title="The ceremony" date={invitation.akad_date} time={invitation.akad_time} venue={invitation.akad_venue} address={invitation.akad_address} maps={invitation.akad_maps} /><EventCard title="The afterparty" date={invitation.reception_date} time={invitation.reception_time} venue={invitation.reception_venue} address={invitation.reception_address} maps={invitation.reception_maps} /></div></div></section></MotionSection>;
}

function LiveStream({ invitation }: TemplateProps) {
  const url = invitation.live_stream_url?.trim();
  if (!url && !invitation.is_demo) return null;
  return <MotionSection><section className="relative z-10 bg-[#d6c4b5] px-5 py-20 text-[#211e1c] sm:px-8"><div className="mx-auto max-w-4xl text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#765d50]">Front row access</p><h2 className="mt-4 font-serif text-5xl">{invitation.live_stream_title || "The celebration, live."}</h2><div className="mt-10 grid aspect-video place-items-center border-[10px] border-[#211e1c] bg-[#f8f5ef] shadow-xl"><div><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#211e1c] pl-1 text-white">▶</span><p className="mt-5 text-[10px] font-bold uppercase tracking-[.28em]">Live runway preview</p>{url && <a href={url} target="_blank" rel="noreferrer" className="mt-5 inline-block border-b border-[#211e1c] pb-1 text-xs font-bold">Open live stream ↗</a>}</div></div></div></section></MotionSection>;
}

function Gallery({ invitation }: TemplateProps) {
  if (!sections(invitation).gallery) return null;
  const images = invitation.gallery?.split(",").map((url: string) => url.trim()).filter(Boolean) || [];
  const positions = ["0% 0%", "100% 0%", "0% 100%", "100% 100%"];
  return <MotionSection><section className="relative z-10 bg-[#211e1c] px-5 py-20 text-[#f8f5ef] sm:px-8"><div className="mx-auto max-w-6xl"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#d6b6a0]">The lookbook</p><h2 className="mt-4 font-serif text-5xl">Love, in four frames.</h2></div><p className="max-w-xs text-sm leading-7 text-white/65">Details we will always want to keep close.</p></div><div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">{positions.map((position, index) => <div key={position} className={`overflow-hidden bg-[#5c5149] ${index === 0 ? "col-span-2 aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto" : "aspect-[4/5]"}`} style={images[index] ? undefined : { backgroundImage: `url('${atelierMedia.gallerySheet}')`, backgroundPosition: position, backgroundSize: "200% 200%" }}>{images[index] && <div className="relative h-full w-full"><Image src={images[index]} alt="Wedding editorial moment" fill unoptimized className="object-cover" /></div>}</div>)}</div></div></section></MotionSection>;
}

function RSVP({ invitation, guest }: TemplateProps) {
  if (!sections(invitation).rsvp) return null;
  return <MotionSection><section className="relative z-10 bg-[#f8f5ef] px-5 py-20 text-[#211e1c] sm:px-8"><div className="mx-auto max-w-4xl"><div className="text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#a77d66]">Guest list</p><h2 className="mt-4 font-serif text-5xl">Reserve your place.</h2></div>{invitation.is_demo ? <p className="mx-auto mt-12 max-w-xl border border-dashed border-[#5c5149]/45 p-7 text-center text-sm text-[#5c5149]">Your live RSVP form will appear here once this invitation is published.</p> : <div className="mt-12 grid gap-10 md:grid-cols-2"><RSVPForm invitationId={invitation.id} guest={guest ?? null} /><Guestbook invitationId={invitation.id} /></div>}</div></section></MotionSection>;
}

function Gift({ invitation }: TemplateProps) {
  if (!sections(invitation).gift || !invitation.bank_account) return null;
  return <section className="relative z-10 bg-[#e9e3da] px-5 py-20 text-[#211e1c]"><div className="mx-auto max-w-xl border border-[#5c5149]/30 bg-[#f8f5ef] p-10 text-center shadow-sm"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#a77d66]">With gratitude</p><h2 className="mt-4 font-serif text-4xl">A thank-you note.</h2><p className="mt-7 text-sm leading-7 text-[#5c5149]">Your presence is our favourite gift. For those who ask, a little love can be sent here.</p><p className="mt-8 font-serif text-2xl">{invitation.bank_name}</p><p className="mt-3 text-lg">{invitation.bank_account}</p><div className="mt-6"><CopyButton text={invitation.bank_account} /></div></div></section>;
}

function Footer({ invitation }: TemplateProps) {
  return <footer className="relative z-10 bg-[#211e1c] px-5 py-16 text-center text-[#f8f5ef]"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#d6b6a0]">Atelier No. 27</p><h2 className="mt-5 font-serif text-5xl">{firstName(invitation.groom_name) || "Julien"} <span className="italic text-[#d6b6a0]">&amp;</span> {firstName(invitation.bride_name) || "Aurelia"}</h2><p className="mt-8 text-[10px] uppercase tracking-[.32em] text-white/45">Crafted for a lifetime of stories · AKSA Digital Studio</p></footer>;
}

export const template010: InvitationTemplate = {
  id: "template-010",
  name: "Atelier No. 27",
  description: "A couture sketchbook invitation with fashion-editorial portraits, tactile details, and a private-dinner finish.",
  Cover,
  Hero,
  Couple,
  Story,
  Event: Celebration,
  LiveStream,
  Gallery,
  RSVP,
  Gift,
  Footer,
};
