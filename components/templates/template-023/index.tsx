"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { InvitationTemplate, TemplateProps } from "../types";
import CopyButton from "@/components/CopyButton";
import Guestbook from "@/components/Guestbook";
import MotionSection from "@/components/motion/MotionSection";
import RSVPForm from "@/components/RSVPForm";
import { defaultSections } from "@/lib/defaultSections";

const porcelainAssets = {
  hero: "/template-demos/template-004/hero.webp",
  groom: "/template-demos/template-004/groom.webp",
  bride: "/template-demos/template-004/bride.webp",
  gallery: ["/template-demos/template-004/gallery-1.webp", "/template-demos/template-004/gallery-2.webp", "/template-demos/template-004/gallery-3.webp"],
};

const sectionsFor = (invitation: { sections?: Record<string, unknown> }) => ({ ...defaultSections, ...(invitation.sections ?? {}) });
const firstName = (value?: string) => value?.trim().split(" ")[0] || "";
const initials = (invitation: TemplateProps["invitation"]) => `${firstName(invitation.groom_name).slice(0, 1) || "A"}${firstName(invitation.bride_name).slice(0, 1) || "Y"}`;

function valuesForCountdown(date?: string) {
  const target = new Date(`${date || ""}T00:00:00`).getTime();
  const remaining = Number.isNaN(target) ? 0 : Math.max(0, target - Date.now());
  return [[Math.floor(remaining / 86400000), "Days"], [Math.floor(remaining / 3600000) % 24, "Hours"], [Math.floor(remaining / 60000) % 60, "Minutes"], [Math.floor(remaining / 1000) % 60, "Seconds"]];
}

function useCountdown(date?: string) {
  const [values, setValues] = useState(() => valuesForCountdown(date));
  useEffect(() => { const timer = window.setInterval(() => setValues(valuesForCountdown(date)), 1000); return () => window.clearInterval(timer); }, [date]);
  return values;
}

function DoubleHappiness({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`font-serif leading-none ${className}`}>囍</span>;
}

function PorcelainPattern({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`pointer-events-none absolute ${className}`} style={{ backgroundImage: "radial-gradient(circle at 12px 12px, transparent 8px, currentColor 8.5px, currentColor 9.5px, transparent 10px), radial-gradient(circle at 28px 28px, transparent 8px, currentColor 8.5px, currentColor 9.5px, transparent 10px)", backgroundSize: "40px 40px" }} />;
}

function Cover({ invitation }: TemplateProps) {
  const [opened, setOpened] = useState(false);
  if (opened) return null;
  return <section className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[#133e78] px-5 py-8 text-[#173767]"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,#4775af_0%,#1e4a88_42%,#0b2858_100%)]" /><PorcelainPattern className="inset-0 text-[#dceaf7]/20" /><div className="relative w-full max-w-md rounded-[2rem] border border-[#dce5ed] bg-[#fbfaf4] p-3 shadow-2xl"><div className="relative overflow-hidden rounded-[1.5rem] border border-[#245192]/45 px-7 py-12 text-center sm:px-10"><PorcelainPattern className="inset-0 text-[#245192]/12" /><DoubleHappiness className="relative text-6xl text-[#245192]" /><p className="relative mt-6 text-[10px] font-bold uppercase tracking-[.42em] text-[#2c609f]">AKSA · Porcelain Reverie</p><div className="relative mx-auto mt-8 grid h-24 w-24 place-items-center rounded-full border-2 border-[#245192] bg-[#e7eff4] font-serif text-3xl text-[#245192] shadow-[0_0_0_8px_rgba(66,116,171,.14)]">{initials(invitation)}</div><p className="relative mt-8 text-[10px] font-bold uppercase tracking-[.28em] text-[#4e769e]">A story in blue and white</p><h1 className="relative mt-5 font-serif text-5xl leading-[.9] sm:text-6xl">{firstName(invitation.groom_name) || "Arden"}<br /><span className="italic text-[#2c609f]">&amp;</span> {firstName(invitation.bride_name) || "Yue"}</h1><p className="relative mt-8 text-[10px] font-bold uppercase tracking-[.25em] text-[#4e769e]">Auspicious date · {invitation.wedding_date}</p><button onClick={() => { window.dispatchEvent(new Event("invitation-opened")); setOpened(true); }} className="relative mt-9 bg-[#245192] px-7 py-3 text-[10px] font-bold uppercase tracking-[.2em] text-white transition hover:bg-[#183d76]">Open invitation</button></div></div></section>;
}

function Hero({ invitation }: TemplateProps) {
  const sections = sectionsFor(invitation);
  const countdown = useCountdown(invitation.wedding_date);
  if (!sections.hero && !sections.countdown) return null;
  return <section className="relative z-10 overflow-hidden bg-[#fbfaf4] px-5 py-20 text-[#173767] sm:px-8 sm:py-28"><PorcelainPattern className="inset-0 text-[#245192]/10" /><div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.9fr_1fr] lg:items-center"><div className="text-center lg:text-left"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#2c609f]">A love made timeless</p><DoubleHappiness className="mt-7 block text-6xl text-[#245192]" /><h1 className="mt-4 font-serif text-6xl leading-[.82] tracking-[-.04em] sm:text-8xl">{firstName(invitation.groom_name) || "Arden"}<br /><span className="italic text-[#2c609f]">&amp;</span> {firstName(invitation.bride_name) || "Yue"}</h1><p className="mx-auto mt-9 max-w-md text-base leading-8 text-[#5e7694] lg:mx-0">A gentle celebration of devotion, family, and the beautiful rituals that make a home.</p><p className="mt-9 border-l-2 border-[#2c609f] pl-4 text-[10px] font-bold uppercase tracking-[.25em] text-[#416f9e]">Auspicious date · {invitation.wedding_date}</p></div><div className="relative mx-auto w-full max-w-xl"><div className="absolute -inset-4 rounded-[1.5rem] border border-[#2c609f]/45" /><div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-[#2a5b99] shadow-[18px_18px_0_rgba(36,81,146,.14)]"><Image src={invitation.hero_background || porcelainAssets.hero} alt="Porcelain Reverie wedding celebration" fill priority unoptimized className="object-cover mix-blend-multiply opacity-80" /><div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,71,133,.04),rgba(16,49,99,.58))]" /><DoubleHappiness className="absolute bottom-6 left-1/2 -translate-x-1/2 text-7xl text-[#e7eff4] drop-shadow-lg" /></div><div className="absolute -bottom-7 -left-4 grid h-28 w-28 place-items-center rounded-full border-8 border-[#fbfaf4] bg-[#245192] font-serif text-3xl text-[#e7eff4] shadow-xl">{initials(invitation)}</div></div></div>{sections.countdown !== false && <div className="relative mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">{countdown.map(([value, label]) => <div key={String(label)} className="border border-[#245192]/25 bg-white/80 py-7 text-center shadow-sm"><p className="font-serif text-4xl text-[#245192]">{String(value).padStart(2, "0")}</p><p className="mt-2 text-[9px] font-bold uppercase tracking-[.2em] text-[#4e769e]">{label}</p></div>)}</div>}</section>;
}

function Couple({ invitation }: TemplateProps) {
  if (!sectionsFor(invitation).couple) return null;
  const groom = invitation.groom_cutout || invitation.groom_photo || porcelainAssets.groom;
  const bride = invitation.bride_cutout || invitation.bride_photo || porcelainAssets.bride;
  return <MotionSection><section className="relative z-10 overflow-hidden bg-[#183d76] px-5 py-20 text-[#f8fbfb] sm:px-8"><PorcelainPattern className="inset-0 text-[#dce5ed]/15" /><div className="relative mx-auto max-w-6xl"><div className="max-w-xl"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#bcd8ed]">Two names, one keepsake</p><h2 className="mt-4 font-serif text-5xl">A ceremony of belonging.</h2></div><div className="mt-14 grid gap-6 md:grid-cols-2">{[["The groom", invitation.groom_name || "Arden Wu", groom], ["The bride", invitation.bride_name || "Yue Han", bride]].map(([role, name, image]) => <article key={String(role)} className="border border-[#bcd8ed]/50 bg-[#245192] p-4"><div className="relative h-[29rem] overflow-hidden bg-[#5382b7]"><Image src={String(image)} alt={String(name)} fill unoptimized className="object-cover object-top" /><div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#15386d]/75 to-transparent" /></div><p className="mt-5 text-[9px] font-bold uppercase tracking-[.28em] text-[#bcd8ed]">{role}</p><h3 className="mt-2 font-serif text-4xl">{name}</h3></article>)}</div></div></section></MotionSection>;
}

function Story({ invitation }: TemplateProps) {
  const stories = [[invitation.story1_year, invitation.story1_title, invitation.story1_description], [invitation.story2_year, invitation.story2_title, invitation.story2_description], [invitation.story3_year, invitation.story3_title, invitation.story3_description]].filter((story) => story.some(Boolean));
  if (!sectionsFor(invitation).story || !stories.length) return null;
  return <MotionSection><section className="relative z-10 bg-[#e8eff2] px-5 py-20 text-[#173767] sm:px-8"><div className="mx-auto max-w-6xl"><div className="text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#2c609f]">The porcelain pages</p><h2 className="mt-4 font-serif text-5xl">A love drawn in gentle lines.</h2></div><div className="mt-14 grid gap-5 md:grid-cols-3">{stories.map(([year, title, description], index) => <article key={`${year}-${title}`} className="relative overflow-hidden border border-[#245192]/25 bg-[#fbfaf4] p-7 shadow-sm"><PorcelainPattern className="-right-5 -top-5 h-28 w-28 text-[#245192]/10" /><span className="relative grid h-12 w-12 place-items-center rounded-full border border-[#245192] font-serif text-lg text-[#245192]">0{index + 1}</span><p className="relative mt-6 text-[9px] font-bold uppercase tracking-[.25em] text-[#2c609f]">{year}</p><h3 className="relative mt-3 font-serif text-3xl">{title}</h3><p className="relative mt-5 text-sm leading-7 text-[#5e7694]">{description}</p></article>)}</div></div></section></MotionSection>;
}

function ScheduleCard({ title, date, time, venue, address, map }: { title: string; date?: string; time?: string; venue?: string; address?: string; map?: string }) {
  return <article className="relative overflow-hidden border border-[#245192]/25 bg-[#fbfaf4] p-8 text-center shadow-sm"><div className="absolute inset-x-0 top-0 h-2 bg-[#245192]" /><DoubleHappiness className="text-4xl text-[#245192]" /><p className="mt-4 text-[10px] font-bold uppercase tracking-[.28em] text-[#2c609f]">{title}</p><h3 className="mt-6 font-serif text-3xl text-[#173767]">{venue || title}</h3><div className="mt-7 border-y border-dashed border-[#7aa3c9] py-4 text-sm text-[#5e7694]"><p className="font-bold text-[#173767]">{date}</p><p className="mt-2">{time}</p></div><p className="mt-6 whitespace-pre-line text-sm leading-7 text-[#5e7694]">{address}</p>{map && <a href={map} target="_blank" rel="noreferrer" className="mt-6 inline-block border-b border-[#173767] pb-1 text-[10px] font-bold uppercase tracking-[.16em] text-[#173767]">Find the celebration ↗</a>}</article>;
}

function CeremonySchedule({ invitation }: TemplateProps) {
  if (!sectionsFor(invitation).event) return null;
  return <MotionSection><section className="relative z-10 overflow-hidden bg-[#fbfaf4] px-5 py-20 sm:px-8"><PorcelainPattern className="inset-0 text-[#245192]/8" /><div className="relative mx-auto max-w-5xl"><div className="text-center text-[#173767]"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#2c609f]">The porcelain gathering</p><h2 className="mt-4 font-serif text-5xl">Please join our table.</h2></div><div className="mt-14 grid gap-6 md:grid-cols-2"><ScheduleCard title="The vows" date={invitation.akad_date} time={invitation.akad_time} venue={invitation.akad_venue} address={invitation.akad_address} map={invitation.akad_maps} /><ScheduleCard title="The banquet" date={invitation.reception_date} time={invitation.reception_time} venue={invitation.reception_venue} address={invitation.reception_address} map={invitation.reception_maps} /></div></div></section></MotionSection>;
}

function LiveStream({ invitation }: TemplateProps) {
  const url = invitation.live_stream_url?.trim();
  if (!url && !invitation.is_demo) return null;
  return <MotionSection><section className="relative z-10 bg-[#183d76] px-5 py-20 text-[#f8fbfb] sm:px-8"><div className="mx-auto max-w-4xl text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#bcd8ed]">A shared moment</p><h2 className="mt-4 font-serif text-5xl">{invitation.live_stream_title || "Join the ceremony, live."}</h2><div className="mt-10 grid aspect-video place-items-center border border-[#bcd8ed]/55 bg-[#245192]"><div><span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#bcd8ed] pl-1 text-xl text-[#bcd8ed]">▶</span><p className="mt-5 text-[10px] font-bold uppercase tracking-[.28em]">A moment to share</p>{url && <a href={url} target="_blank" rel="noreferrer" className="mt-5 inline-block border-b border-[#bcd8ed] pb-1 text-xs text-[#dce5ed]">Open live stream ↗</a>}</div></div></div></section></MotionSection>;
}

function Gallery({ invitation }: TemplateProps) {
  if (!sectionsFor(invitation).gallery) return null;
  const uploaded = invitation.gallery?.split(",").map((item: string) => item.trim()).filter(Boolean) || [];
  const images = uploaded.length ? uploaded : [porcelainAssets.gallery[0], porcelainAssets.gallery[1], porcelainAssets.gallery[2], invitation.hero_background || porcelainAssets.hero];
  return <MotionSection><section className="relative z-10 bg-[#e8eff2] px-5 py-20 text-[#173767] sm:px-8"><div className="mx-auto max-w-6xl"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#2c609f]">The blue-and-white album</p><h2 className="mt-4 font-serif text-5xl">The moments we will keep.</h2><div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">{images.slice(0, 4).map((image: string, index: number) => <div key={`${image}-${index}`} className={`relative overflow-hidden border-4 border-[#fbfaf4] bg-[#245192] shadow-sm ${index === 0 ? "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto" : "aspect-[4/5]"}`}><Image src={image} alt="Porcelain Reverie wedding moment" fill unoptimized className="object-cover transition duration-700 hover:scale-105" /></div>)}</div></div></section></MotionSection>;
}

function RSVP({ invitation, guest }: TemplateProps) {
  if (!sectionsFor(invitation).rsvp) return null;
  return <MotionSection><section className="relative z-10 bg-[#fbfaf4] px-5 py-20 text-[#173767] sm:px-8"><div className="mx-auto max-w-4xl"><div className="text-center"><DoubleHappiness className="text-5xl text-[#245192]" /><p className="mt-4 text-[10px] font-bold uppercase tracking-[.42em] text-[#2c609f]">Your place at our table</p><h2 className="mt-4 font-serif text-5xl">RSVP</h2></div>{invitation.is_demo ? <p className="mx-auto mt-12 max-w-xl border border-dashed border-[#7aa3c9] bg-white p-7 text-center text-sm leading-7 text-[#5e7694]">Your personal RSVP confirmation will appear here once this invitation is published.</p> : <div className="mt-12 grid gap-10 md:grid-cols-2"><RSVPForm invitationId={invitation.id} guest={guest ?? null} /><Guestbook invitationId={invitation.id} /></div>}</div></section></MotionSection>;
}

function Gift({ invitation }: TemplateProps) {
  if (!sectionsFor(invitation).gift || !invitation.bank_account) return null;
  return <section className="relative z-10 bg-[#183d76] px-5 py-20 text-[#f8fbfb]"><div className="mx-auto max-w-xl border border-[#bcd8ed]/60 bg-[#245192] p-10 text-center"><DoubleHappiness className="text-5xl text-[#bcd8ed]" /><p className="mt-5 text-[10px] font-bold uppercase tracking-[.42em] text-[#bcd8ed]">With gratitude</p><h2 className="mt-4 font-serif text-4xl">A generous kindness.</h2><p className="mt-8 font-serif text-2xl">{invitation.bank_name}</p><p className="mt-3 text-lg">{invitation.bank_account}</p><div className="mt-6"><CopyButton text={invitation.bank_account} /></div></div></section>;
}

function Footer({ invitation }: TemplateProps) {
  return <footer className="relative z-10 overflow-hidden bg-[#0d2d62] px-5 py-16 text-center text-[#f8fbfb]"><PorcelainPattern className="inset-0 text-[#dce5ed]/12" /><div className="relative"><DoubleHappiness className="text-5xl text-[#bcd8ed]" /><p className="mt-5 text-[10px] font-bold uppercase tracking-[.42em] text-[#bcd8ed]">Porcelain Reverie</p><h2 className="mt-5 font-serif text-5xl">{firstName(invitation.groom_name) || "Arden"} <span className="italic text-[#bcd8ed]">&amp;</span> {firstName(invitation.bride_name) || "Yue"}</h2><p className="mt-8 text-[10px] uppercase tracking-[.32em] text-white/55">AKSA Digital Studio · A story in blue and white</p></div></footer>;
}

export const template023: InvitationTemplate = {
  id: "template-023",
  name: "Porcelain Reverie",
  description: "An original blue-and-white porcelain Chinese-inspired wedding invitation with a quiet, editorial sense of ceremony.",
  Cover,
  Hero,
  Couple,
  Story,
  Event: CeremonySchedule,
  LiveStream,
  Gallery,
  RSVP,
  Gift,
  Footer,
};
