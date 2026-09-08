"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { InvitationTemplate, TemplateProps } from "../types";
import CopyButton from "@/components/CopyButton";
import Guestbook from "@/components/Guestbook";
import MotionSection from "@/components/motion/MotionSection";
import RSVPForm from "@/components/RSVPForm";
import { defaultSections } from "@/lib/defaultSections";
import { kintsugiMedia } from "./shared";

const sectionState = (invitation: { sections?: Record<string, unknown> }) => ({ ...defaultSections, ...(invitation.sections ?? {}) });
const firstName = (value?: string) => value?.trim().split(" ")[0] || "";
const initials = (invitation: TemplateProps["invitation"]) => `${firstName(invitation.groom_name).slice(0, 1) || "K"}${firstName(invitation.bride_name).slice(0, 1) || "M"}`;

function calculateCountdown(date?: string) {
  const target = new Date(`${date || ""}T00:00:00`).getTime();
  const remaining = Number.isNaN(target) ? 0 : Math.max(0, target - Date.now());
  return [
    [Math.floor(remaining / 86400000), "Days"],
    [Math.floor(remaining / 3600000) % 24, "Hours"],
    [Math.floor(remaining / 60000) % 60, "Minutes"],
    [Math.floor(remaining / 1000) % 60, "Seconds"],
  ];
}

function useCountdown(date?: string) {
  const [countdown, setCountdown] = useState(() => calculateCountdown(date));
  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(calculateCountdown(date)), 1000);
    return () => window.clearInterval(timer);
  }, [date]);
  return countdown;
}

function GoldSeam() {
  return <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-70" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M5 5 C20 18 8 28 28 38 S48 57 44 70 S63 84 94 95" fill="none" stroke="#c99b45" strokeWidth="0.7" strokeLinecap="round" /></svg>;
}

function Cover({ invitation }: TemplateProps) {
  const [open, setOpen] = useState(false);
  if (open) return null;
  return <section className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[#221912] p-5 text-[#fffaf1]"><div className="absolute inset-0 bg-cover bg-center opacity-65" style={{ backgroundImage: `linear-gradient(180deg,rgba(24,16,10,.28),rgba(24,16,10,.84)),url('${invitation.hero_background || kintsugiMedia.hero}')` }} /><div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-[#d7b86e]/40 bg-[#282018]/75 p-3 shadow-2xl backdrop-blur"><GoldSeam /><div className="relative border border-[#f5e7c8]/25 px-8 py-12 text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#e0bf70]">AKSA · Kintsugi Promise</p><div className="mx-auto mt-10 grid h-24 w-24 place-items-center rounded-full border border-[#d7b86e] bg-[#f6efe2]/90 font-serif text-4xl text-[#49311c] shadow-[0_0_0_9px_rgba(201,155,69,.12)]">{initials(invitation)}</div><p className="mt-9 text-[10px] font-bold uppercase tracking-[.28em] text-white/65">A promise made precious</p><h1 className="mt-5 font-serif text-5xl leading-[.85]">{firstName(invitation.groom_name) || "Kei"}<br /><span className="italic text-[#e0bf70]">&amp;</span> {firstName(invitation.bride_name) || "Mira"}</h1><p className="mt-8 text-[10px] font-bold uppercase tracking-[.25em] text-white/75">Golden date · {invitation.wedding_date}</p><button onClick={() => { window.dispatchEvent(new Event("invitation-opened")); setOpen(true); }} className="mt-9 rounded-full bg-[#e0bf70] px-7 py-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#302014] transition hover:bg-[#f6ddb0]">Open the promise</button></div></div></section>;
}

function Hero({ invitation }: TemplateProps) {
  const sections = sectionState(invitation);
  const countdown = useCountdown(invitation.wedding_date);
  if (!sections.hero && !sections.countdown) return null;
  return <section className="relative z-10 overflow-hidden bg-[#f3ecdf] px-5 py-20 text-[#332216] sm:px-8"><GoldSeam /><div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.85fr_1fr] lg:items-center"><div><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#9e7130]">Some things become more beautiful together</p><h1 className="mt-6 font-serif text-6xl leading-[.8] tracking-[-.04em] sm:text-8xl">{firstName(invitation.groom_name) || "Kei"}<br /><span className="italic text-[#b48639]">&amp;</span> {firstName(invitation.bride_name) || "Mira"}</h1><p className="mt-9 max-w-md text-base leading-8 text-[#725e4b]">A quiet love, mended and made brighter through every moment that brought us here.</p><p className="mt-10 border-l-2 border-[#c99b45] pl-4 text-[10px] font-bold uppercase tracking-[.25em] text-[#5c4734]">Our golden date · {invitation.wedding_date}</p></div><div className="relative mx-auto w-full max-w-xl"><div className="relative aspect-[4/5] overflow-hidden rounded-t-[12rem] rounded-b-[2rem] border-8 border-[#e1d3bb] bg-[#d8c5aa] shadow-2xl"><Image src={invitation.hero_background || kintsugiMedia.hero} alt="Kintsugi ceramic art" fill priority unoptimized className="object-cover" /></div><div className="absolute -bottom-5 -left-5 grid h-28 w-28 place-items-center rounded-full border-8 border-[#f3ecdf] bg-[#563d27] font-serif text-4xl text-[#f0cb76] shadow-xl">{initials(invitation)}</div></div></div>{sections.countdown !== false && <div className="relative mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">{countdown.map(([value, label]) => <div key={String(label)} className="border border-[#d7c5a8] bg-[#fbf8f1] py-7 text-center shadow-sm"><p className="font-serif text-4xl text-[#49311c]">{String(value).padStart(2, "0")}</p><p className="mt-2 text-[9px] font-bold uppercase tracking-[.2em] text-[#9e7130]">{label}</p></div>)}</div>}</section>;
}

function Couple({ invitation }: TemplateProps) {
  if (!sectionState(invitation).couple) return null;
  const groom = invitation.groom_cutout || invitation.groom_photo;
  const bride = invitation.bride_cutout || invitation.bride_photo;
  const showSeparatePortraits = groom && bride && groom !== bride;
  return <MotionSection><section className="relative z-10 bg-[#2f241c] px-5 py-20 text-[#fbf7ef] sm:px-8"><div className="mx-auto max-w-6xl"><div className="max-w-xl"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#e0bf70]">Two pieces, one promise</p><h2 className="mt-4 font-serif text-5xl">Made more beautiful together.</h2></div>{showSeparatePortraits ? <div className="mt-14 grid gap-6 md:grid-cols-2">{[["The first piece", invitation.groom_name, groom], ["The second piece", invitation.bride_name, bride]].map(([label, name, image]) => <article key={String(label)} className="border border-white/15 bg-[#3b2c20] p-4"><div className="relative h-[31rem] overflow-hidden bg-[#54402e]"><Image src={String(image)} alt={String(name)} fill unoptimized className="object-contain object-bottom" /></div><p className="mt-5 text-[9px] font-bold uppercase tracking-[.28em] text-[#e0bf70]">{label}</p><h3 className="mt-2 font-serif text-4xl">{name}</h3></article>)}</div> : <div className="mt-14 grid gap-8 lg:grid-cols-[.82fr_1fr] lg:items-center"><div className="relative aspect-[4/5] overflow-hidden rounded-t-[12rem] rounded-b-[2rem] border border-[#e0bf70]/50"><Image src={invitation.groom_photo || invitation.bride_photo || kintsugiMedia.couple} alt="The couple" fill unoptimized className="object-cover" /></div><div className="max-w-lg"><p className="text-[10px] font-bold uppercase tracking-[.32em] text-[#e0bf70]">Our shared piece</p><h3 className="mt-5 font-serif text-5xl">{invitation.groom_name || "Kei Nakamura"} <span className="italic text-[#e0bf70]">&amp;</span> {invitation.bride_name || "Mira Sato"}</h3><p className="mt-6 leading-8 text-white/65">Two lives with their own histories, choosing to become a place of warmth, grace, and gold.</p></div></div>}</div></section></MotionSection>;
}

function Story({ invitation }: TemplateProps) {
  const stories = [[invitation.story1_year, invitation.story1_title, invitation.story1_description, "The first piece"], [invitation.story2_year, invitation.story2_title, invitation.story2_description, "The golden seam"], [invitation.story3_year, invitation.story3_title, invitation.story3_description, "The whole promise"]].filter((story) => story.slice(0, 3).some(Boolean));
  if (!sectionState(invitation).story || !stories.length) return null;
  return <MotionSection><section className="relative z-10 bg-[#e9ddcb] px-5 py-20 text-[#3b2b1e] sm:px-8"><GoldSeam /><div className="relative mx-auto max-w-6xl"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#9e7130]">The pieces of us</p><h2 className="mt-4 font-serif text-5xl">Every line led home.</h2><div className="mt-14 grid gap-5 md:grid-cols-3">{stories.map(([year, title, description, label], index) => <article key={`${year}-${title}`} className="relative overflow-hidden border border-[#cbb998] bg-[#f8f3e9] p-7 shadow-sm"><span className="absolute right-5 top-3 font-serif text-7xl text-[#c99b45]/20">0{index + 1}</span><p className="relative text-[9px] font-bold uppercase tracking-[.25em] text-[#9e7130]">{label} · {year}</p><h3 className="relative mt-5 font-serif text-3xl">{title}</h3><p className="relative mt-5 text-sm leading-7 text-[#725e4b]">{description}</p></article>)}</div></div></section></MotionSection>;
}

function Events({ invitation }: TemplateProps) {
  if (!sectionState(invitation).event) return null;
  const card = (title: string, date?: string, time?: string, venue?: string, address?: string, map?: string) => <article className="border border-[#cbb998] bg-[#fffaf1] p-8 shadow-sm"><p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#9e7130]">{title}</p><h3 className="mt-6 font-serif text-3xl">{venue || title}</h3><div className="mt-7 border-y border-dashed border-[#cbb998] py-4 text-sm"><p className="font-bold">{date}</p><p className="mt-2 text-[#725e4b]">{time}</p></div><p className="mt-6 whitespace-pre-line text-sm leading-7 text-[#725e4b]">{address}</p>{map && <a href={map} target="_blank" className="mt-6 inline-block border-b border-[#49311c] pb-1 text-[10px] font-bold uppercase tracking-[.16em]">Find the gathering ↗</a>}</article>;
  return <MotionSection><section className="relative z-10 bg-[#f6efe2] px-5 py-20 text-[#3b2b1e] sm:px-8"><div className="mx-auto max-w-5xl"><div className="text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#9e7130]">The gathering</p><h2 className="mt-4 font-serif text-5xl">Come share the warmth.</h2></div><div className="mt-14 grid gap-6 md:grid-cols-2">{card("The vows", invitation.akad_date, invitation.akad_time, invitation.akad_venue, invitation.akad_address, invitation.akad_maps)}{card("The celebration", invitation.reception_date, invitation.reception_time, invitation.reception_venue, invitation.reception_address, invitation.reception_maps)}</div></div></section></MotionSection>;
}

function LiveStream({ invitation }: TemplateProps) {
  const url = invitation.live_stream_url?.trim();
  if (!url && !invitation.is_demo) return null;
  return <MotionSection><section className="relative z-10 bg-[#49311c] px-5 py-20 text-[#fffaf1] sm:px-8"><div className="mx-auto max-w-4xl text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#e0bf70]">Golden hour broadcast</p><h2 className="mt-4 font-serif text-5xl">{invitation.live_stream_title || "The ceremony, live."}</h2><div className="relative mt-10 grid aspect-video place-items-center overflow-hidden border border-[#e0bf70]/50 bg-[#2f241c] shadow-2xl"><GoldSeam /><div className="relative"><span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#f3dfaf] pl-1 text-xl">▶</span><p className="mt-5 text-[10px] font-bold uppercase tracking-[.28em]">Join the live gathering</p>{url && <a href={url} target="_blank" className="mt-5 inline-block border-b border-white pb-1 text-xs">Open live stream ↗</a>}</div></div></div></section></MotionSection>;
}

function Gallery({ invitation }: TemplateProps) {
  if (!sectionState(invitation).gallery) return null;
  const uploaded = invitation.gallery?.split(",").map((value: string) => value.trim()).filter(Boolean) || [];
  const images = uploaded.length ? uploaded : [kintsugiMedia.couple, kintsugiMedia.hands, kintsugiMedia.dinner, invitation.hero_background || kintsugiMedia.hero];
  return <MotionSection><section className="relative z-10 bg-[#e9ddcb] px-5 py-20 text-[#3b2b1e] sm:px-8"><div className="mx-auto max-w-6xl"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#9e7130]">The golden album</p><h2 className="mt-4 font-serif text-5xl">The moments that made us.</h2><div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">{images.slice(0, 4).map((image: string, index: number) => <div key={`${image}-${index}`} className={`relative overflow-hidden bg-[#cbb998] ${index === 0 ? "col-span-2 aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto" : "aspect-[4/5]"}`}><Image src={image} alt="Kintsugi wedding moment" fill unoptimized className="object-cover transition duration-700 hover:scale-105" /></div>)}</div></div></section></MotionSection>;
}

function RSVP({ invitation, guest }: TemplateProps) {
  if (!sectionState(invitation).rsvp) return null;
  return <MotionSection><section className="relative z-10 bg-[#f7f1e6] px-5 py-20 text-[#3b2b1e] sm:px-8"><div className="mx-auto max-w-4xl"><div className="text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#9e7130]">A place at our table</p><h2 className="mt-4 font-serif text-5xl">RSVP</h2></div>{invitation.is_demo ? <p className="mx-auto mt-12 max-w-xl border border-dashed border-[#c99b45] bg-[#fffaf1] p-7 text-center text-sm leading-7 text-[#725e4b]">Your personal RSVP confirmation will appear here once this invitation is published.</p> : <div className="mt-12 grid gap-10 md:grid-cols-2"><RSVPForm invitationId={invitation.id} guest={guest ?? null} /><Guestbook invitationId={invitation.id} /></div>}</div></section></MotionSection>;
}

function Gift({ invitation }: TemplateProps) {
  if (!sectionState(invitation).gift || !invitation.bank_account) return null;
  return <section className="relative z-10 bg-[#2f241c] px-5 py-20 text-[#fffaf1]"><div className="mx-auto max-w-xl border border-[#e0bf70]/45 p-10 text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#e0bf70]">With gratitude</p><h2 className="mt-4 font-serif text-4xl">A small golden kindness.</h2><p className="mt-8 font-serif text-2xl">{invitation.bank_name}</p><p className="mt-3 text-lg">{invitation.bank_account}</p><div className="mt-6"><CopyButton text={invitation.bank_account} /></div></div></section>;
}

function Footer({ invitation }: TemplateProps) {
  return <footer className="relative z-10 overflow-hidden bg-[#49311c] px-5 py-16 text-center text-[#fffaf1]"><GoldSeam /><div className="relative"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#e0bf70]">Kintsugi Promise</p><h2 className="mt-5 font-serif text-5xl">{firstName(invitation.groom_name) || "Kei"} <span className="italic text-[#e0bf70]">&amp;</span> {firstName(invitation.bride_name) || "Mira"}</h2><p className="mt-8 text-[10px] uppercase tracking-[.32em] text-white/55">AKSA Digital Studio · Made more beautiful together</p></div></footer>;
}

export const template015: InvitationTemplate = {
  id: "template-015",
  name: "Kintsugi Promise",
  description: "A quiet clay, ivory, and gold wedding invitation inspired by the beauty of a promise made whole.",
  Cover,
  Hero,
  Couple,
  Story,
  Event: Events,
  LiveStream,
  Gallery,
  RSVP,
  Gift,
  Footer,
};
