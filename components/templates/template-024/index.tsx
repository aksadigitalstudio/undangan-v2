"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { InvitationTemplate, TemplateProps } from "../types";
import CopyButton from "@/components/CopyButton";
import Guestbook from "@/components/Guestbook";
import MotionSection from "@/components/motion/MotionSection";
import RSVPForm from "@/components/RSVPForm";
import { defaultSections } from "@/lib/defaultSections";

const satriaAssets = {
  hero: "/template-demos/template-004/hero.webp",
  groom: "/template-demos/template-004/groom.webp",
  bride: "/template-demos/template-004/bride.webp",
  gallery: ["/template-demos/template-004/gallery-1.webp", "/template-demos/template-004/gallery-2.webp", "/template-demos/template-004/gallery-3.webp"],
};

const sectionsFor = (invitation: { sections?: Record<string, unknown> }) => ({ ...defaultSections, ...(invitation.sections ?? {}) });
const firstName = (value?: string) => value?.trim().split(" ")[0] || "";
const initials = (invitation: TemplateProps["invitation"]) => `${firstName(invitation.groom_name).slice(0, 1) || "A"}${firstName(invitation.bride_name).slice(0, 1) || "N"}`;

function countdownFor(date?: string) {
  const target = new Date(`${date || ""}T00:00:00`).getTime();
  const remaining = Number.isNaN(target) ? 0 : Math.max(0, target - Date.now());
  return [[Math.floor(remaining / 86400000), "Days"], [Math.floor(remaining / 3600000) % 24, "Hours"], [Math.floor(remaining / 60000) % 60, "Minutes"], [Math.floor(remaining / 1000) % 60, "Seconds"]];
}

function useCountdown(date?: string) {
  const [values, setValues] = useState(() => countdownFor(date));
  useEffect(() => { const timer = window.setInterval(() => setValues(countdownFor(date)), 1000); return () => window.clearInterval(timer); }, [date]);
  return values;
}

function HonourMark({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`inline-flex items-center gap-1 text-[11px] tracking-[.28em] ${className}`}>✦ ✦ ✦</span>;
}

function ParadeLines({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`pointer-events-none absolute ${className}`} style={{ backgroundImage: "repeating-linear-gradient(135deg, currentColor 0 1px, transparent 1px 10px)" }} />;
}

function Cover({ invitation }: TemplateProps) {
  const [opened, setOpened] = useState(false);
  if (opened) return null;
  return <section className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[#071b35] px-5 py-8 text-[#fffaf0]"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-15%,#284b76_0%,#0b274a_42%,#06152b_100%)]" /><ParadeLines className="inset-0 text-[#d7b664]/15" /><div className="relative w-full max-w-md border border-[#d7b664]/60 bg-[#0c2c52]/90 p-2 shadow-2xl"><div className="relative overflow-hidden border border-[#f5deb0]/45 px-7 py-12 text-center sm:px-10"><div className="absolute inset-x-0 top-0 h-2 bg-[#a52c39]" /><HonourMark className="relative text-[#d7b664]" /><p className="relative mt-7 text-[10px] font-bold uppercase tracking-[.42em] text-[#f5deb0]">AKSA · Satria Nusantara</p><div className="relative mx-auto mt-8 grid h-24 w-24 place-items-center rounded-full border-2 border-[#d7b664] bg-[#f5eee0] font-serif text-3xl text-[#0b2b52] shadow-[0_0_0_8px_rgba(215,182,100,.14)]">{initials(invitation)}</div><p className="relative mt-8 text-[10px] font-bold uppercase tracking-[.28em] text-white/65">A ceremony of service and love</p><h1 className="relative mt-5 font-serif text-5xl leading-[.9] sm:text-6xl">{firstName(invitation.groom_name) || "Arga"}<br /><span className="italic text-[#d7b664]">&amp;</span> {firstName(invitation.bride_name) || "Nadira"}</h1><p className="relative mt-8 text-[10px] font-bold uppercase tracking-[.25em] text-white/70">The honour date · {invitation.wedding_date}</p><button onClick={() => { window.dispatchEvent(new Event("invitation-opened")); setOpened(true); }} className="relative mt-9 bg-[#d7b664] px-7 py-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#0a274b] transition hover:bg-[#f2d996]">Open invitation</button></div></div></section>;
}

function Hero({ invitation }: TemplateProps) {
  const sections = sectionsFor(invitation);
  const countdown = useCountdown(invitation.wedding_date);
  if (!sections.hero && !sections.countdown) return null;
  return <section className="relative z-10 overflow-hidden bg-[#071b35] px-5 py-20 text-[#fffaf0] sm:px-8 sm:py-28"><ParadeLines className="inset-0 text-[#d7b664]/15" /><div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.9fr_1fr] lg:items-center"><div className="text-center lg:text-left"><HonourMark className="text-[#d7b664]" /><p className="mt-5 text-[10px] font-bold uppercase tracking-[.42em] text-[#f5deb0]">A proud new beginning</p><h1 className="mt-6 font-serif text-6xl leading-[.82] tracking-[-.04em] sm:text-8xl">{firstName(invitation.groom_name) || "Arga"}<br /><span className="italic text-[#d7b664]">&amp;</span> {firstName(invitation.bride_name) || "Nadira"}</h1><p className="mx-auto mt-9 max-w-md text-base leading-8 text-white/70 lg:mx-0">With gratitude to our families and respect for every journey that brought us here, we invite you to celebrate our union.</p><p className="mt-9 border-l-2 border-[#d7b664] pl-4 text-[10px] font-bold uppercase tracking-[.25em] text-[#f5deb0]">The honour date · {invitation.wedding_date}</p></div><div className="relative mx-auto w-full max-w-xl"><div className="absolute -inset-4 border border-[#d7b664]/55" /><div className="relative aspect-[4/5] overflow-hidden bg-[#17416f] shadow-[18px_18px_0_rgba(165,44,57,.3)]"><Image src={invitation.hero_background || satriaAssets.hero} alt="Satria Nusantara wedding celebration" fill priority unoptimized className="object-cover mix-blend-luminosity opacity-80" /><div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,23,51,.04),rgba(3,23,51,.7))]" /><HonourMark className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[#f5deb0]" /></div><div className="absolute -bottom-7 -left-4 grid h-28 w-28 place-items-center rounded-full border-8 border-[#071b35] bg-[#d7b664] font-serif text-3xl text-[#0b2b52] shadow-xl">{initials(invitation)}</div></div></div>{sections.countdown !== false && <div className="relative mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">{countdown.map(([value, label]) => <div key={String(label)} className="border border-[#d7b664]/55 bg-[#0b2b52]/85 py-7 text-center"><p className="font-serif text-4xl text-[#f5deb0]">{String(value).padStart(2, "0")}</p><p className="mt-2 text-[9px] font-bold uppercase tracking-[.2em] text-white/60">{label}</p></div>)}</div>}</section>;
}

function Couple({ invitation }: TemplateProps) {
  if (!sectionsFor(invitation).couple) return null;
  const groom = invitation.groom_cutout || invitation.groom_photo || satriaAssets.groom;
  const bride = invitation.bride_cutout || invitation.bride_photo || satriaAssets.bride;
  return <MotionSection><section className="relative z-10 overflow-hidden bg-[#f7f1e5] px-5 py-20 text-[#0a2a4f] sm:px-8"><ParadeLines className="inset-0 text-[#0a2a4f]/7" /><div className="relative mx-auto max-w-6xl"><div className="max-w-xl"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#a52c39]">Two stories, one commitment</p><h2 className="mt-4 font-serif text-5xl">A life of courage and care.</h2></div><div className="mt-14 grid gap-6 md:grid-cols-2">{[["The groom", invitation.groom_name || "Arga Pratama", groom], ["The bride", invitation.bride_name || "Nadira Putri", bride]].map(([role, name, image]) => <article key={String(role)} className="relative border border-[#d7b664]/70 bg-[#fffdf7] p-4 shadow-[10px_10px_0_rgba(10,42,79,.1)]"><div className="absolute inset-x-4 top-4 h-2 bg-[#a52c39]" /><div className="relative mt-3 h-[29rem] overflow-hidden bg-[#d5bf8a]"><Image src={String(image)} alt={String(name)} fill unoptimized className="object-cover object-top" /><div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0a2a4f]/75 to-transparent" /></div><p className="mt-5 text-[9px] font-bold uppercase tracking-[.28em] text-[#a52c39]">{role}</p><h3 className="mt-2 font-serif text-4xl">{name}</h3></article>)}</div></div></section></MotionSection>;
}

function Story({ invitation }: TemplateProps) {
  const stories = [[invitation.story1_year, invitation.story1_title, invitation.story1_description], [invitation.story2_year, invitation.story2_title, invitation.story2_description], [invitation.story3_year, invitation.story3_title, invitation.story3_description]].filter((story) => story.some(Boolean));
  if (!sectionsFor(invitation).story || !stories.length) return null;
  return <MotionSection><section className="relative z-10 bg-[#12365f] px-5 py-20 text-[#fffaf0] sm:px-8"><ParadeLines className="inset-0 text-[#d7b664]/15" /><div className="relative mx-auto max-w-6xl"><div className="text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#f5deb0]">The chapters of us</p><h2 className="mt-4 font-serif text-5xl">Every step brought us home.</h2></div><div className="mt-14 grid gap-5 md:grid-cols-3">{stories.map(([year, title, description], index) => <article key={`${year}-${title}`} className="relative overflow-hidden border border-[#d7b664]/55 bg-[#0b2b52]/80 p-7"><p className="text-[9px] font-bold uppercase tracking-[.25em] text-[#f5deb0]">Chapter 0{index + 1} · {year}</p><div className="mt-5 h-px w-14 bg-[#a52c39]" /><h3 className="mt-5 font-serif text-3xl">{title}</h3><p className="mt-5 text-sm leading-7 text-white/70">{description}</p></article>)}</div></div></section></MotionSection>;
}

function ScheduleCard({ title, date, time, venue, address, map }: { title: string; date?: string; time?: string; venue?: string; address?: string; map?: string }) {
  return <article className="relative overflow-hidden border border-[#d7b664]/65 bg-[#fffdf7] p-8 text-center shadow-sm"><div className="absolute inset-x-0 top-0 h-2 bg-[#a52c39]" /><HonourMark className="text-[#a52c39]" /><p className="mt-4 text-[10px] font-bold uppercase tracking-[.28em] text-[#a52c39]">{title}</p><h3 className="mt-6 font-serif text-3xl text-[#0a2a4f]">{venue || title}</h3><div className="mt-7 border-y border-dashed border-[#d7b664] py-4 text-sm text-[#5b6c7d]"><p className="font-bold text-[#0a2a4f]">{date}</p><p className="mt-2">{time}</p></div><p className="mt-6 whitespace-pre-line text-sm leading-7 text-[#5b6c7d]">{address}</p>{map && <a href={map} target="_blank" rel="noreferrer" className="mt-6 inline-block border-b border-[#0a2a4f] pb-1 text-[10px] font-bold uppercase tracking-[.16em] text-[#0a2a4f]">Find the celebration ↗</a>}</article>;
}

function FormalProgramme({ invitation }: TemplateProps) {
  if (!sectionsFor(invitation).event) return null;
  return <MotionSection><section className="relative z-10 bg-[#f7f1e5] px-5 py-20 sm:px-8"><div className="mx-auto max-w-5xl"><div className="text-center text-[#0a2a4f]"><HonourMark className="text-[#a52c39]" /><p className="mt-5 text-[10px] font-bold uppercase tracking-[.42em] text-[#a52c39]">The formal programme</p><h2 className="mt-4 font-serif text-5xl">Join us in celebration.</h2></div><div className="mt-14 grid gap-6 md:grid-cols-2"><ScheduleCard title="The vows" date={invitation.akad_date} time={invitation.akad_time} venue={invitation.akad_venue} address={invitation.akad_address} map={invitation.akad_maps} /><ScheduleCard title="The reception" date={invitation.reception_date} time={invitation.reception_time} venue={invitation.reception_venue} address={invitation.reception_address} map={invitation.reception_maps} /></div></div></section></MotionSection>;
}

function LiveStream({ invitation }: TemplateProps) {
  const url = invitation.live_stream_url?.trim();
  if (!url && !invitation.is_demo) return null;
  return <MotionSection><section className="relative z-10 bg-[#071b35] px-5 py-20 text-[#fffaf0] sm:px-8"><div className="mx-auto max-w-4xl text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#f5deb0]">Share the moment</p><h2 className="mt-4 font-serif text-5xl">{invitation.live_stream_title || "Join our ceremony, live."}</h2><div className="mt-10 grid aspect-video place-items-center border border-[#d7b664]/60 bg-[#0b2b52]"><div><span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#f5deb0] pl-1 text-xl text-[#f5deb0]">▶</span><p className="mt-5 text-[10px] font-bold uppercase tracking-[.28em]">A moment of honour</p>{url && <a href={url} target="_blank" rel="noreferrer" className="mt-5 inline-block border-b border-[#f5deb0] pb-1 text-xs text-[#f5deb0]">Open live stream ↗</a>}</div></div></div></section></MotionSection>;
}

function Gallery({ invitation }: TemplateProps) {
  if (!sectionsFor(invitation).gallery) return null;
  const uploaded = invitation.gallery?.split(",").map((item: string) => item.trim()).filter(Boolean) || [];
  const images = uploaded.length ? uploaded : [satriaAssets.gallery[0], satriaAssets.gallery[1], satriaAssets.gallery[2], invitation.hero_background || satriaAssets.hero];
  return <MotionSection><section className="relative z-10 bg-[#e9e2d3] px-5 py-20 text-[#0a2a4f] sm:px-8"><div className="mx-auto max-w-6xl"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#a52c39]">The honour album</p><h2 className="mt-4 font-serif text-5xl">A day of our greatest joy.</h2><div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">{images.slice(0, 4).map((image: string, index: number) => <div key={`${image}-${index}`} className={`relative overflow-hidden border-4 border-[#fffdf7] bg-[#0b2b52] shadow-sm ${index === 0 ? "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto" : "aspect-[4/5]"}`}><Image src={image} alt="Satria Nusantara wedding moment" fill unoptimized className="object-cover transition duration-700 hover:scale-105" /></div>)}</div></div></section></MotionSection>;
}

function RSVP({ invitation, guest }: TemplateProps) {
  if (!sectionsFor(invitation).rsvp) return null;
  return <MotionSection><section className="relative z-10 bg-[#f7f1e5] px-5 py-20 text-[#0a2a4f] sm:px-8"><div className="mx-auto max-w-4xl"><div className="text-center"><HonourMark className="text-[#a52c39]" /><p className="mt-5 text-[10px] font-bold uppercase tracking-[.42em] text-[#a52c39]">Your place in our celebration</p><h2 className="mt-4 font-serif text-5xl">RSVP</h2></div>{invitation.is_demo ? <p className="mx-auto mt-12 max-w-xl border border-dashed border-[#d7b664] bg-[#fffdf7] p-7 text-center text-sm leading-7 text-[#5b6c7d]">Your personal RSVP confirmation will appear here once this invitation is published.</p> : <div className="mt-12 grid gap-10 md:grid-cols-2"><RSVPForm invitationId={invitation.id} guest={guest ?? null} /><Guestbook invitationId={invitation.id} /></div>}</div></section></MotionSection>;
}

function Gift({ invitation }: TemplateProps) {
  if (!sectionsFor(invitation).gift || !invitation.bank_account) return null;
  return <section className="relative z-10 bg-[#12365f] px-5 py-20 text-[#fffaf0]"><div className="mx-auto max-w-xl border border-[#d7b664]/60 bg-[#0b2b52] p-10 text-center"><HonourMark className="text-[#f5deb0]" /><p className="mt-5 text-[10px] font-bold uppercase tracking-[.42em] text-[#f5deb0]">With gratitude</p><h2 className="mt-4 font-serif text-4xl">A generous blessing.</h2><p className="mt-8 font-serif text-2xl">{invitation.bank_name}</p><p className="mt-3 text-lg">{invitation.bank_account}</p><div className="mt-6"><CopyButton text={invitation.bank_account} /></div></div></section>;
}

function Footer({ invitation }: TemplateProps) {
  return <footer className="relative z-10 overflow-hidden bg-[#06152b] px-5 py-16 text-center text-[#fffaf0]"><ParadeLines className="inset-0 text-[#d7b664]/12" /><div className="relative"><HonourMark className="text-[#f5deb0]" /><p className="mt-5 text-[10px] font-bold uppercase tracking-[.42em] text-[#f5deb0]">Satria Nusantara</p><h2 className="mt-5 font-serif text-5xl">{firstName(invitation.groom_name) || "Arga"} <span className="italic text-[#d7b664]">&amp;</span> {firstName(invitation.bride_name) || "Nadira"}</h2><p className="mt-8 text-[10px] uppercase tracking-[.32em] text-white/55">AKSA Digital Studio · A ceremony of service and love</p></div></footer>;
}

export const template024: InvitationTemplate = {
  id: "template-024",
  name: "Satria Nusantara",
  description: "A formal navy, ivory, crimson, and gold wedding invitation inspired by service, family, and devotion. It uses no official institutional insignia.",
  Cover,
  Hero,
  Couple,
  Story,
  Event: FormalProgramme,
  LiveStream,
  Gallery,
  RSVP,
  Gift,
  Footer,
};
