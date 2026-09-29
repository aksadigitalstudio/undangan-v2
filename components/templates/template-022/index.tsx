"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { InvitationTemplate, TemplateProps } from "../types";
import CopyButton from "@/components/CopyButton";
import Guestbook from "@/components/Guestbook";
import MotionSection from "@/components/motion/MotionSection";
import RSVPForm from "@/components/RSVPForm";
import { defaultSections } from "@/lib/defaultSections";

const jadeAssets = {
  hero: "/template-demos/template-004/hero.webp",
  groom: "/template-demos/template-004/groom.webp",
  bride: "/template-demos/template-004/bride.webp",
  gallery: ["/template-demos/template-004/gallery-1.webp", "/template-demos/template-004/gallery-2.webp", "/template-demos/template-004/gallery-3.webp"],
};

const activeSections = (invitation: { sections?: Record<string, unknown> }) => ({ ...defaultSections, ...(invitation.sections ?? {}) });
const firstName = (value?: string) => value?.trim().split(" ")[0] || "";
const monogram = (invitation: TemplateProps["invitation"]) => `${firstName(invitation.groom_name).slice(0, 1) || "J"}${firstName(invitation.bride_name).slice(0, 1) || "L"}`;

function getCountdown(date?: string) {
  const target = new Date(`${date || ""}T00:00:00`).getTime();
  const remaining = Number.isNaN(target) ? 0 : Math.max(0, target - Date.now());
  return [[Math.floor(remaining / 86400000), "Days"], [Math.floor(remaining / 3600000) % 24, "Hours"], [Math.floor(remaining / 60000) % 60, "Minutes"], [Math.floor(remaining / 1000) % 60, "Seconds"]];
}

function useCountdown(date?: string) {
  const [countdown, setCountdown] = useState(() => getCountdown(date));
  useEffect(() => { const timer = window.setInterval(() => setCountdown(getCountdown(date)), 1000); return () => window.clearInterval(timer); }, [date]);
  return countdown;
}

function DoubleHappiness({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`font-serif leading-none ${className}`}>囍</span>;
}

function CloudBorder({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`pointer-events-none absolute ${className}`} style={{ backgroundImage: "radial-gradient(circle at 15px 19px, transparent 14px, currentColor 15px, currentColor 16px, transparent 17px)", backgroundSize: "40px 40px" }} />;
}

function Cover({ invitation }: TemplateProps) {
  const [opened, setOpened] = useState(false);
  if (opened) return null;
  return <section className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[#063d38] px-5 py-8 text-[#173d36]"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#217567_0%,#0a4f45_34%,#042e2b_100%)]" /><CloudBorder className="inset-x-0 top-0 h-20 text-[#d8b86d]/45" /><CloudBorder className="inset-x-0 bottom-0 h-20 rotate-180 text-[#d8b86d]/45" /><div className="relative w-full max-w-md border border-[#d8b86d]/70 bg-[#f7f2e6] p-2 shadow-2xl"><div className="relative overflow-hidden border border-[#0f695b]/60 px-7 py-12 text-center sm:px-10"><div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(#0f695b 1px,transparent 1px)", backgroundSize: "16px 16px" }} /><DoubleHappiness className="relative text-6xl text-[#0d6558]" /><p className="relative mt-6 text-[10px] font-bold uppercase tracking-[.42em] text-[#a77722]">AKSA · Jade Dynasty</p><div className="relative mx-auto mt-8 grid h-24 w-24 place-items-center rounded-full border-2 border-[#0d6558] bg-[#e6ddc7] font-serif text-3xl text-[#0d6558] shadow-[0_0_0_8px_rgba(216,184,109,.22)]">{monogram(invitation)}</div><p className="relative mt-8 text-[10px] font-bold uppercase tracking-[.28em] text-[#39746a]">A dynasty of two hearts</p><h1 className="relative mt-5 font-serif text-5xl leading-[.9] sm:text-6xl">{firstName(invitation.groom_name) || "Jun"}<br /><span className="italic text-[#a77722]">&amp;</span> {firstName(invitation.bride_name) || "Lian"}</h1><p className="relative mt-8 text-[10px] font-bold uppercase tracking-[.25em] text-[#39746a]">Auspicious date · {invitation.wedding_date}</p><button onClick={() => { window.dispatchEvent(new Event("invitation-opened")); setOpened(true); }} className="relative mt-9 bg-[#0d6558] px-7 py-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#fff8e9] transition hover:bg-[#0a4d43]">Open invitation</button></div></div></section>;
}

function Hero({ invitation }: TemplateProps) {
  const sections = activeSections(invitation);
  const countdown = useCountdown(invitation.wedding_date);
  if (!sections.hero && !sections.countdown) return null;
  return <section className="relative z-10 overflow-hidden bg-[#f7f2e6] px-5 py-20 text-[#123d36] sm:px-8 sm:py-28"><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,83,71,.07)_1px,transparent_1px),linear-gradient(rgba(8,83,71,.07)_1px,transparent_1px)] bg-[size:32px_32px]" /><CloudBorder className="-left-12 top-16 h-48 w-44 text-[#0d6558]/20" /><CloudBorder className="-right-12 bottom-16 h-48 w-44 text-[#0d6558]/20" /><div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_.9fr] lg:items-center"><div className="text-center lg:text-left"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#a77722]">An auspicious new chapter</p><DoubleHappiness className="mt-7 block text-6xl text-[#0d6558]" /><h1 className="mt-4 font-serif text-6xl leading-[.82] tracking-[-.04em] sm:text-8xl">{firstName(invitation.groom_name) || "Jun"}<br /><span className="italic text-[#a77722]">&amp;</span> {firstName(invitation.bride_name) || "Lian"}</h1><p className="mx-auto mt-9 max-w-md text-base leading-8 text-[#527169] lg:mx-0">With the calm strength of jade and the warmth of our families, we begin a life written together.</p><p className="mt-9 border-l-2 border-[#d8b86d] pl-4 text-[10px] font-bold uppercase tracking-[.25em] text-[#27675d]">Auspicious date · {invitation.wedding_date}</p></div><div className="relative mx-auto w-full max-w-xl"><div className="absolute -inset-4 rounded-t-[13rem] rounded-b-[2rem] border border-[#d8b86d]" /><div className="relative aspect-[4/5] overflow-hidden rounded-t-[12rem] rounded-b-[2rem] bg-[#0d6558] shadow-[18px_18px_0_rgba(13,101,88,.16)]"><Image src={invitation.hero_background || jadeAssets.hero} alt="Jade Dynasty wedding celebration" fill priority unoptimized className="object-cover mix-blend-multiply opacity-85" /><div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,68,59,.08),rgba(4,68,59,.6))]" /><DoubleHappiness className="absolute bottom-6 left-1/2 -translate-x-1/2 text-7xl text-[#f5d986] drop-shadow-lg" /></div><div className="absolute -bottom-7 -left-4 grid h-28 w-28 place-items-center rounded-full border-8 border-[#f7f2e6] bg-[#d8b86d] font-serif text-3xl text-[#0d6558] shadow-xl">{monogram(invitation)}</div></div></div>{sections.countdown !== false && <div className="relative mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">{countdown.map(([value, label]) => <div key={String(label)} className="border border-[#0d6558]/30 bg-[#fffdf7] py-7 text-center shadow-sm"><p className="font-serif text-4xl text-[#0d6558]">{String(value).padStart(2, "0")}</p><p className="mt-2 text-[9px] font-bold uppercase tracking-[.2em] text-[#a77722]">{label}</p></div>)}</div>}</section>;
}

function Couple({ invitation }: TemplateProps) {
  if (!activeSections(invitation).couple) return null;
  const groom = invitation.groom_cutout || invitation.groom_photo || jadeAssets.groom;
  const bride = invitation.bride_cutout || invitation.bride_photo || jadeAssets.bride;
  return <MotionSection><section className="relative z-10 overflow-hidden bg-[#0a5046] px-5 py-20 text-[#fff9ea] sm:px-8"><CloudBorder className="inset-x-0 bottom-0 h-24 text-[#d8b86d]/30" /><div className="relative mx-auto max-w-6xl"><div className="max-w-xl"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#f5d986]">The house of jade</p><h2 className="mt-4 font-serif text-5xl">One harmonious beginning.</h2></div><div className="mt-14 grid gap-6 md:grid-cols-2">{[["The groom", invitation.groom_name || "Jun Wei", groom], ["The bride", invitation.bride_name || "Lian Yue", bride]].map(([role, name, image]) => <article key={String(role)} className="border border-[#d8b86d]/60 bg-[#0e6256] p-4"><div className="relative h-[29rem] overflow-hidden bg-[#1f8875]"><Image src={String(image)} alt={String(name)} fill unoptimized className="object-cover object-top" /><div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#063d38]/75 to-transparent" /></div><p className="mt-5 text-[9px] font-bold uppercase tracking-[.28em] text-[#f5d986]">{role}</p><h3 className="mt-2 font-serif text-4xl">{name}</h3></article>)}</div></div></section></MotionSection>;
}

function Story({ invitation }: TemplateProps) {
  const stories = [[invitation.story1_year, invitation.story1_title, invitation.story1_description], [invitation.story2_year, invitation.story2_title, invitation.story2_description], [invitation.story3_year, invitation.story3_title, invitation.story3_description]].filter((story) => story.some(Boolean));
  if (!activeSections(invitation).story || !stories.length) return null;
  return <MotionSection><section className="relative z-10 bg-[#e9e0ca] px-5 py-20 text-[#123d36] sm:px-8"><div className="mx-auto max-w-6xl"><div className="text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#a77722]">A story of harmony</p><h2 className="mt-4 font-serif text-5xl">Three moments, one destiny.</h2></div><div className="mt-14 grid gap-5 md:grid-cols-3">{stories.map(([year, title, description], index) => <article key={`${year}-${title}`} className="relative border border-[#0d6558]/30 bg-[#fdf9ee] p-7 shadow-sm"><span className="grid h-12 w-12 place-items-center rounded-full border border-[#d8b86d] bg-[#0d6558] font-serif text-lg text-[#f5d986]">0{index + 1}</span><p className="mt-6 text-[9px] font-bold uppercase tracking-[.25em] text-[#a77722]">{year}</p><h3 className="mt-3 font-serif text-3xl">{title}</h3><p className="mt-5 text-sm leading-7 text-[#527169]">{description}</p></article>)}</div></div></section></MotionSection>;
}

function ScheduleCard({ title, date, time, venue, address, map }: { title: string; date?: string; time?: string; venue?: string; address?: string; map?: string }) {
  return <article className="relative overflow-hidden border border-[#0d6558]/30 bg-[#fffdf7] p-8 text-center shadow-sm"><div className="absolute inset-x-0 top-0 h-2 bg-[#0d6558]" /><DoubleHappiness className="text-4xl text-[#0d6558]" /><p className="mt-4 text-[10px] font-bold uppercase tracking-[.28em] text-[#a77722]">{title}</p><h3 className="mt-6 font-serif text-3xl text-[#123d36]">{venue || title}</h3><div className="mt-7 border-y border-dashed border-[#d8b86d] py-4 text-sm text-[#527169]"><p className="font-bold text-[#123d36]">{date}</p><p className="mt-2">{time}</p></div><p className="mt-6 whitespace-pre-line text-sm leading-7 text-[#527169]">{address}</p>{map && <a href={map} target="_blank" rel="noreferrer" className="mt-6 inline-block border-b border-[#123d36] pb-1 text-[10px] font-bold uppercase tracking-[.16em] text-[#123d36]">Find the celebration ↗</a>}</article>;
}

function CelebrationDetails({ invitation }: TemplateProps) {
  if (!activeSections(invitation).event) return null;
  return <MotionSection><section className="relative z-10 overflow-hidden bg-[#f7f2e6] px-5 py-20 sm:px-8"><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,83,71,.06)_1px,transparent_1px),linear-gradient(rgba(8,83,71,.06)_1px,transparent_1px)] bg-[size:32px_32px]" /><div className="relative mx-auto max-w-5xl"><div className="text-center text-[#123d36]"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#a77722]">The jade gathering</p><h2 className="mt-4 font-serif text-5xl">We would be honoured.</h2></div><div className="mt-14 grid gap-6 md:grid-cols-2"><ScheduleCard title="The vows" date={invitation.akad_date} time={invitation.akad_time} venue={invitation.akad_venue} address={invitation.akad_address} map={invitation.akad_maps} /><ScheduleCard title="The banquet" date={invitation.reception_date} time={invitation.reception_time} venue={invitation.reception_venue} address={invitation.reception_address} map={invitation.reception_maps} /></div></div></section></MotionSection>;
}

function LiveStream({ invitation }: TemplateProps) {
  const url = invitation.live_stream_url?.trim();
  if (!url && !invitation.is_demo) return null;
  return <MotionSection><section className="relative z-10 bg-[#083f37] px-5 py-20 text-[#fff9ea] sm:px-8"><div className="mx-auto max-w-4xl text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#f5d986]">Together, wherever you are</p><h2 className="mt-4 font-serif text-5xl">{invitation.live_stream_title || "Join the ceremony, live."}</h2><div className="mt-10 grid aspect-video place-items-center border border-[#d8b86d]/70 bg-[#0e6256]"><div><span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#f5d986] pl-1 text-xl text-[#f5d986]">▶</span><p className="mt-5 text-[10px] font-bold uppercase tracking-[.28em]">A moment to share</p>{url && <a href={url} target="_blank" rel="noreferrer" className="mt-5 inline-block border-b border-[#f5d986] pb-1 text-xs text-[#f5d986]">Open live stream ↗</a>}</div></div></div></section></MotionSection>;
}

function Gallery({ invitation }: TemplateProps) {
  if (!activeSections(invitation).gallery) return null;
  const uploaded = invitation.gallery?.split(",").map((item: string) => item.trim()).filter(Boolean) || [];
  const images = uploaded.length ? uploaded : [jadeAssets.gallery[0], jadeAssets.gallery[1], jadeAssets.gallery[2], invitation.hero_background || jadeAssets.hero];
  return <MotionSection><section className="relative z-10 bg-[#e9e0ca] px-5 py-20 text-[#123d36] sm:px-8"><div className="mx-auto max-w-6xl"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#a77722]">The jade album</p><h2 className="mt-4 font-serif text-5xl">A celebration to remember.</h2><div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">{images.slice(0, 4).map((image: string, index: number) => <div key={`${image}-${index}`} className={`relative overflow-hidden border-4 border-[#fdf9ee] bg-[#0d6558] shadow-sm ${index === 0 ? "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto" : "aspect-[4/5]"}`}><Image src={image} alt="Jade Dynasty wedding moment" fill unoptimized className="object-cover transition duration-700 hover:scale-105" /></div>)}</div></div></section></MotionSection>;
}

function RSVP({ invitation, guest }: TemplateProps) {
  if (!activeSections(invitation).rsvp) return null;
  return <MotionSection><section className="relative z-10 bg-[#f7f2e6] px-5 py-20 text-[#123d36] sm:px-8"><div className="mx-auto max-w-4xl"><div className="text-center"><DoubleHappiness className="text-5xl text-[#0d6558]" /><p className="mt-4 text-[10px] font-bold uppercase tracking-[.42em] text-[#a77722]">Your place in our story</p><h2 className="mt-4 font-serif text-5xl">RSVP</h2></div>{invitation.is_demo ? <p className="mx-auto mt-12 max-w-xl border border-dashed border-[#d8b86d] bg-[#fffdf7] p-7 text-center text-sm leading-7 text-[#527169]">Your personal RSVP confirmation will appear here once this invitation is published.</p> : <div className="mt-12 grid gap-10 md:grid-cols-2"><RSVPForm invitationId={invitation.id} guest={guest ?? null} /><Guestbook invitationId={invitation.id} /></div>}</div></section></MotionSection>;
}

function Gift({ invitation }: TemplateProps) {
  if (!activeSections(invitation).gift || !invitation.bank_account) return null;
  return <section className="relative z-10 bg-[#0a5046] px-5 py-20 text-[#fff9ea]"><div className="mx-auto max-w-xl border border-[#d8b86d]/70 bg-[#0e6256] p-10 text-center"><DoubleHappiness className="text-5xl text-[#f5d986]" /><p className="mt-5 text-[10px] font-bold uppercase tracking-[.42em] text-[#f5d986]">With gratitude</p><h2 className="mt-4 font-serif text-4xl">A generous blessing.</h2><p className="mt-8 font-serif text-2xl">{invitation.bank_name}</p><p className="mt-3 text-lg">{invitation.bank_account}</p><div className="mt-6"><CopyButton text={invitation.bank_account} /></div></div></section>;
}

function Footer({ invitation }: TemplateProps) {
  return <footer className="relative z-10 overflow-hidden bg-[#063d38] px-5 py-16 text-center text-[#fff9ea]"><CloudBorder className="inset-x-0 bottom-0 h-20 text-[#d8b86d]/35" /><div className="relative"><DoubleHappiness className="text-5xl text-[#f5d986]" /><p className="mt-5 text-[10px] font-bold uppercase tracking-[.42em] text-[#f5d986]">Jade Dynasty</p><h2 className="mt-5 font-serif text-5xl">{firstName(invitation.groom_name) || "Jun"} <span className="italic text-[#f5d986]">&amp;</span> {firstName(invitation.bride_name) || "Lian"}</h2><p className="mt-8 text-[10px] uppercase tracking-[.32em] text-white/55">AKSA Digital Studio · A dynasty of two hearts</p></div></footer>;
}

export const template022: InvitationTemplate = {
  id: "template-022",
  name: "Jade Dynasty",
  description: "An original jade, ivory, and gold Chinese-inspired wedding invitation with quiet strength and ceremonial warmth.",
  Cover,
  Hero,
  Couple,
  Story,
  Event: CelebrationDetails,
  LiveStream,
  Gallery,
  RSVP,
  Gift,
  Footer,
};
