"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { InvitationTemplate, TemplateProps } from "../types";
import CopyButton from "@/components/CopyButton";
import Guestbook from "@/components/Guestbook";
import MotionSection from "@/components/motion/MotionSection";
import RSVPForm from "@/components/RSVPForm";
import { defaultSections } from "@/lib/defaultSections";
import { riadMedia } from "./shared";

const sectionState = (invitation: { sections?: Record<string, unknown> }) => ({ ...defaultSections, ...(invitation.sections ?? {}) });
const firstName = (value?: string) => value?.trim().split(" ")[0] || "";
const initials = (invitation: TemplateProps["invitation"]) => `${firstName(invitation.groom_name).slice(0, 1) || "Y"}${firstName(invitation.bride_name).slice(0, 1) || "A"}`;

function calculateCountdown(date?: string) {
  const target = new Date(`${date || ""}T00:00:00`).getTime();
  const rest = Number.isNaN(target) ? 0 : Math.max(0, target - Date.now());
  return [[Math.floor(rest / 86400000), "Days"], [Math.floor(rest / 3600000) % 24, "Hours"], [Math.floor(rest / 60000) % 60, "Minutes"], [Math.floor(rest / 1000) % 60, "Seconds"]] as const;
}

function useCountdown(date?: string) {
  const [time, setTime] = useState(() => calculateCountdown(date));
  useEffect(() => { const timer = window.setInterval(() => setTime(calculateCountdown(date)), 1000); return () => window.clearInterval(timer); }, [date]);
  return time;
}

function Zellige({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`pointer-events-none absolute inset-0 opacity-25 ${className}`} style={{ backgroundImage: "linear-gradient(45deg, transparent 47%, #d4a55b 48%, #d4a55b 52%, transparent 53%), linear-gradient(-45deg, transparent 47%, #d4a55b 48%, #d4a55b 52%, transparent 53%)", backgroundSize: "34px 34px" }} />;
}

function Arch({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`relative overflow-hidden rounded-t-[12rem] rounded-b-[2rem] border border-[#d8af61]/65 ${className}`}>{children}</div>;
}

function Cover({ invitation }: TemplateProps) {
  const [open, setOpen] = useState(false);
  if (open) return null;
  return <section className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[#062b2b] p-5 text-[#fff6e6]"><div className="absolute inset-0 bg-cover bg-center opacity-55" style={{ backgroundImage: `linear-gradient(180deg,rgba(3,26,27,.35),rgba(3,26,27,.93)),url('${invitation.hero_background || riadMedia.hero}')` }} /><Zellige /><div className="relative w-full max-w-md border border-[#d8af61]/70 bg-[#073b3b]/80 p-3 shadow-2xl backdrop-blur"><Arch className="border-[#d8af61]/70"><div className="relative px-8 py-14 text-center"><p className="text-[10px] font-bold uppercase tracking-[.38em] text-[#e8bd70]">AKSA · Riad After Dark</p><div className="mx-auto mt-9 grid h-24 w-24 place-items-center rounded-full border-2 border-[#d8af61] bg-[#c96143] font-serif text-4xl text-[#fff4df] shadow-[0_0_0_8px_rgba(201,156,82,.2)]">{initials(invitation)}</div><p className="mt-8 text-[10px] font-bold uppercase tracking-[.3em] text-[#f9e7c8]/75">An evening in the courtyard</p><h1 className="mt-5 font-serif text-5xl leading-[.84]">{firstName(invitation.groom_name) || "Yara"}<br /><span className="italic text-[#e8bd70]">&amp;</span> {firstName(invitation.bride_name) || "Amir"}</h1><p className="mt-8 text-[10px] font-bold uppercase tracking-[.25em] text-[#f9e7c8]/75">{invitation.wedding_date}</p><button onClick={() => { window.dispatchEvent(new Event("invitation-opened")); setOpen(true); }} className="mt-9 rounded-full bg-[#d8af61] px-8 py-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#073333] transition hover:bg-[#f4d18e]">Enter the riad</button></div></Arch></div></section>;
}

function Hero({ invitation }: TemplateProps) {
  const sections = sectionState(invitation);
  const countdown = useCountdown(invitation.wedding_date);
  if (!sections.hero && !sections.countdown) return null;
  return <section className="relative z-10 overflow-hidden bg-[#f5ead5] px-5 py-20 text-[#073535] sm:px-8"><Zellige /><div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.85fr_1fr] lg:items-center"><div><p className="text-[10px] font-bold uppercase tracking-[.4em] text-[#b65c43]">A celebration under lantern light</p><h1 className="mt-6 font-serif text-6xl leading-[.78] tracking-[-.04em] sm:text-8xl">{firstName(invitation.groom_name) || "Yara"}<br /><span className="italic text-[#c56242]">&amp;</span> {firstName(invitation.bride_name) || "Amir"}</h1><p className="mt-9 max-w-md text-base leading-8 text-[#42615a]">We invite you through the arch and into one unforgettable evening of music, candlelight, and love.</p><p className="mt-10 border-l-2 border-[#c99c52] pl-4 text-[10px] font-bold uppercase tracking-[.25em] text-[#84603d]">The night of · {invitation.wedding_date}</p></div><div className="relative mx-auto w-full max-w-xl"><Arch className="aspect-[4/5] border-8 border-[#0a4542] bg-[#0a4542] shadow-2xl"><Image src={invitation.hero_background || riadMedia.hero} alt="Marrakech riad at night" fill priority unoptimized className="object-cover" /></Arch><div className="absolute -bottom-5 -left-5 grid h-28 w-28 place-items-center rounded-full border-8 border-[#f5ead5] bg-[#c56242] font-serif text-4xl text-[#fff5df] shadow-xl">{initials(invitation)}</div></div></div>{sections.countdown !== false && <div className="relative mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">{countdown.map(([value, label]) => <div key={label} className="border border-[#d5b778] bg-[#fff9ed] py-7 text-center shadow-sm"><p className="font-serif text-4xl text-[#063c3b]">{String(value).padStart(2, "0")}</p><p className="mt-2 text-[9px] font-bold uppercase tracking-[.2em] text-[#b45b42]">{label}</p></div>)}</div>}</section>;
}

function Couple({ invitation }: TemplateProps) {
  if (!sectionState(invitation).couple) return null;
  const groom = invitation.groom_cutout || invitation.groom_photo;
  const bride = invitation.bride_cutout || invitation.bride_photo;
  const distinct = groom && bride && groom !== bride;
  return <MotionSection><section className="relative z-10 overflow-hidden bg-[#063938] px-5 py-20 text-[#fff5e1] sm:px-8"><Zellige /><div className="relative mx-auto max-w-6xl"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#e8bd70]">Two paths, one doorway</p><h2 className="mt-4 max-w-xl font-serif text-5xl">Meet us at the heart of the house.</h2>{distinct ? <div className="mt-14 grid gap-6 md:grid-cols-2">{[["The host", invitation.groom_name, groom], ["The heart", invitation.bride_name, bride]].map(([label, name, image]) => <article key={String(label)} className="border border-[#e8bd70]/35 bg-[#0d4a46] p-4"><Arch className="h-[31rem] rounded-b-none"><Image src={String(image)} alt={String(name)} fill unoptimized className="object-contain object-bottom" /></Arch><p className="mt-5 text-[9px] font-bold uppercase tracking-[.28em] text-[#e8bd70]">{label}</p><h3 className="mt-2 font-serif text-4xl">{name}</h3></article>)}</div> : <div className="mt-14 grid gap-9 lg:grid-cols-[.82fr_1fr] lg:items-center"><Arch className="aspect-[4/5] border-[#d8af61]/60"><Image src={invitation.groom_photo || invitation.bride_photo || riadMedia.couple} alt="The couple" fill unoptimized className="object-cover" /></Arch><div className="max-w-lg"><p className="text-[10px] font-bold uppercase tracking-[.3em] text-[#e8bd70]">The two of us</p><h3 className="mt-5 font-serif text-5xl">{invitation.groom_name || "Yara El Mansouri"} <span className="italic text-[#e8bd70]">&amp;</span> {invitation.bride_name || "Amir Haddad"}</h3><p className="mt-6 leading-8 text-white/65">A shared table, a thousand small moments, and a promise to keep finding our way to each other.</p></div></div>}</div></section></MotionSection>;
}

function Story({ invitation }: TemplateProps) {
  const stories = [[invitation.story1_year, invitation.story1_title, invitation.story1_description, "First light"], [invitation.story2_year, invitation.story2_title, invitation.story2_description, "The question"], [invitation.story3_year, invitation.story3_title, invitation.story3_description, "After dark"]].filter((story) => story.slice(0, 3).some(Boolean));
  if (!sectionState(invitation).story || !stories.length) return null;
  return <MotionSection><section className="relative z-10 bg-[#e7d5b4] px-5 py-20 text-[#063938] sm:px-8"><Zellige /><div className="relative mx-auto max-w-6xl"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#a94f3c]">Three doorways</p><h2 className="mt-4 font-serif text-5xl">The way we found home.</h2><div className="mt-14 grid gap-5 md:grid-cols-3">{stories.map(([year, title, description, label], index) => <article key={`${year}-${title}`} className="relative overflow-hidden border border-[#bd9154] bg-[#fff5e3] p-7 shadow-sm"><span className="absolute right-5 top-2 font-serif text-7xl text-[#c56242]/15">0{index + 1}</span><p className="relative text-[9px] font-bold uppercase tracking-[.25em] text-[#b35d41]">{label} · {year}</p><h3 className="relative mt-5 font-serif text-3xl">{title}</h3><p className="relative mt-5 text-sm leading-7 text-[#52635b]">{description}</p></article>)}</div></div></section></MotionSection>;
}

function Events({ invitation }: TemplateProps) {
  if (!sectionState(invitation).event) return null;
  const event = (title: string, date?: string, time?: string, venue?: string, address?: string, map?: string) => <article className="border border-[#d4b067] bg-[#fff8e9] p-8 shadow-sm"><p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#ad573d]">{title}</p><h3 className="mt-6 font-serif text-3xl">{venue || title}</h3><div className="mt-7 border-y border-dashed border-[#d4b067] py-4 text-sm"><p className="font-bold">{date}</p><p className="mt-2 text-[#52635b]">{time}</p></div><p className="mt-6 whitespace-pre-line text-sm leading-7 text-[#52635b]">{address}</p>{map && <a href={map} target="_blank" rel="noreferrer" className="mt-6 inline-block border-b border-[#063938] pb-1 text-[10px] font-bold uppercase tracking-[.16em]">Find the riad ↗</a>}</article>;
  return <MotionSection><section className="relative z-10 bg-[#f4e7d0] px-5 py-20 text-[#063938] sm:px-8"><div className="mx-auto max-w-5xl"><div className="text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#ad573d]">The gathering</p><h2 className="mt-4 font-serif text-5xl">The doors are open.</h2></div><div className="mt-14 grid gap-6 md:grid-cols-2">{event("Courtyard vows", invitation.akad_date, invitation.akad_time, invitation.akad_venue, invitation.akad_address, invitation.akad_maps)}{event("Lantern dinner", invitation.reception_date, invitation.reception_time, invitation.reception_venue, invitation.reception_address, invitation.reception_maps)}</div></div></section></MotionSection>;
}

function LiveStream({ invitation }: TemplateProps) {
  const url = invitation.live_stream_url?.trim();
  if (!url && !invitation.is_demo) return null;
  return <MotionSection><section className="relative z-10 overflow-hidden bg-[#082d39] px-5 py-20 text-[#fff6e6] sm:px-8"><Zellige /><div className="relative mx-auto max-w-4xl text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#e8bd70]">Courtyard broadcast</p><h2 className="mt-4 font-serif text-5xl">{invitation.live_stream_title || "Live from the riad."}</h2><Arch className="mt-10 aspect-video border-4 border-[#d8af61] bg-[#073d3b] shadow-2xl"><div className="relative grid h-full place-items-center"><span className="grid h-16 w-16 place-items-center rounded-full border border-[#f5dfaa] pl-1 text-xl">▶</span><p className="mt-5 text-[10px] font-bold uppercase tracking-[.28em]">Join the celebration live</p>{url && <a href={url} target="_blank" rel="noreferrer" className="mt-5 inline-block border-b border-white pb-1 text-xs">Open live stream ↗</a>}</div></Arch></div></section></MotionSection>;
}

function Gallery({ invitation }: TemplateProps) {
  if (!sectionState(invitation).gallery) return null;
  const uploaded = invitation.gallery?.split(",").map((image: string) => image.trim()).filter(Boolean) || [];
  const images = uploaded.length ? uploaded : [riadMedia.couple, riadMedia.lanterns, riadMedia.dinner, invitation.hero_background || riadMedia.hero];
  return <MotionSection><section className="relative z-10 bg-[#e7d5b4] px-5 py-20 text-[#063938] sm:px-8"><div className="mx-auto max-w-6xl"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#ad573d]">After dark, together</p><h2 className="mt-4 font-serif text-5xl">A night worth remembering.</h2><div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">{images.slice(0, 4).map((image: string, index: number) => <div key={`${image}-${index}`} className={`relative overflow-hidden bg-[#bd9154] ${index === 0 ? "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto" : "aspect-[4/5]"}`}><Image src={image} alt="Riad wedding moment" fill unoptimized className="object-cover transition duration-700 hover:scale-105" /></div>)}</div></div></section></MotionSection>;
}

function RSVP({ invitation, guest }: TemplateProps) {
  if (!sectionState(invitation).rsvp) return null;
  return <MotionSection><section className="relative z-10 bg-[#fff5e4] px-5 py-20 text-[#063938] sm:px-8"><div className="mx-auto max-w-4xl"><div className="text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#ad573d]">Your place at the table</p><h2 className="mt-4 font-serif text-5xl">RSVP</h2></div>{invitation.is_demo ? <p className="mx-auto mt-12 max-w-xl border border-dashed border-[#bd9154] bg-white/60 p-7 text-center text-sm leading-7 text-[#52635b]">Your personal RSVP confirmation will appear here once this invitation is published.</p> : <div className="mt-12 grid gap-10 md:grid-cols-2"><RSVPForm invitationId={invitation.id} guest={guest ?? null} /><Guestbook invitationId={invitation.id} /></div>}</div></section></MotionSection>;
}

function Gift({ invitation }: TemplateProps) {
  if (!sectionState(invitation).gift || !invitation.bank_account) return null;
  return <section className="relative z-10 bg-[#063938] px-5 py-20 text-[#fff6e6]"><div className="mx-auto max-w-xl border border-[#d8af61]/60 p-10 text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#e8bd70]">With gratitude</p><h2 className="mt-4 font-serif text-4xl">A kindness for our new home.</h2><p className="mt-8 font-serif text-2xl">{invitation.bank_name}</p><p className="mt-3 text-lg">{invitation.bank_account}</p><div className="mt-6"><CopyButton text={invitation.bank_account} /></div></div></section>;
}

function Footer({ invitation }: TemplateProps) {
  return <footer className="relative z-10 overflow-hidden bg-[#082d39] px-5 py-16 text-center text-[#fff6e6]"><Zellige /><div className="relative"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#e8bd70]">Riad After Dark</p><h2 className="mt-5 font-serif text-5xl">{firstName(invitation.groom_name) || "Yara"} <span className="italic text-[#e8bd70]">&amp;</span> {firstName(invitation.bride_name) || "Amir"}</h2><p className="mt-8 text-[10px] uppercase tracking-[.32em] text-white/55">AKSA Digital Studio · A night worth remembering</p></div></footer>;
}

export const template016: InvitationTemplate = { id: "template-016", name: "Riad After Dark", description: "A Marrakech-inspired invitation with emerald zellige, brass lanterns, terracotta, and a candlelit courtyard.", Cover, Hero, Couple, Story, Event: Events, LiveStream, Gallery, RSVP, Gift, Footer };
