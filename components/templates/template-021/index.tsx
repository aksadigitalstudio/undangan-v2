"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { InvitationTemplate, TemplateProps } from "../types";
import CopyButton from "@/components/CopyButton";
import Guestbook from "@/components/Guestbook";
import MotionSection from "@/components/motion/MotionSection";
import RSVPForm from "@/components/RSVPForm";
import { defaultSections } from "@/lib/defaultSections";

const crimsonAssets = {
  hero: "/template-demos/template-004/hero.webp",
  groom: "/template-demos/template-004/groom.webp",
  bride: "/template-demos/template-004/bride.webp",
  gallery: [
    "/template-demos/template-004/gallery-1.webp",
    "/template-demos/template-004/gallery-2.webp",
    "/template-demos/template-004/gallery-3.webp",
  ],
};

const sectionsFor = (invitation: { sections?: Record<string, unknown> }) => ({
  ...defaultSections,
  ...(invitation.sections ?? {}),
});

const firstName = (value?: string) => value?.trim().split(" ")[0] || "";
const initials = (invitation: TemplateProps["invitation"]) =>
  `${firstName(invitation.groom_name).slice(0, 1) || "L"}${firstName(invitation.bride_name).slice(0, 1) || "M"}`;

function countdownValues(date?: string) {
  const target = new Date(`${date || ""}T00:00:00`).getTime();
  const difference = Number.isNaN(target) ? 0 : Math.max(0, target - Date.now());
  return [
    [Math.floor(difference / 86400000), "Days"],
    [Math.floor(difference / 3600000) % 24, "Hours"],
    [Math.floor(difference / 60000) % 60, "Minutes"],
    [Math.floor(difference / 1000) % 60, "Seconds"],
  ];
}

function useCountdown(date?: string) {
  const [values, setValues] = useState(() => countdownValues(date));
  useEffect(() => {
    const timer = window.setInterval(() => setValues(countdownValues(date)), 1000);
    return () => window.clearInterval(timer);
  }, [date]);
  return values;
}

function DoubleHappiness({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`font-serif leading-none ${className}`}>囍</span>;
}

function Lattice({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`pointer-events-none absolute opacity-30 ${className}`} style={{ backgroundImage: "linear-gradient(45deg, transparent 46%, #d9a741 47%, #d9a741 53%, transparent 54%), linear-gradient(-45deg, transparent 46%, #d9a741 47%, #d9a741 53%, transparent 54%)", backgroundSize: "34px 34px" }} />;
}

function Peony({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`pointer-events-none absolute grid h-24 w-24 place-items-center rounded-full border border-[#d9a741]/65 ${className}`}><div className="h-16 w-16 rounded-full border border-[#d9a741]/65" /><div className="absolute h-10 w-10 rounded-full border border-[#d9a741]/65" /><span className="absolute h-2 w-2 rounded-full bg-[#d9a741]" /></div>;
}

function Cover({ invitation }: TemplateProps) {
  const [opened, setOpened] = useState(false);
  if (opened) return null;

  return <section className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[#420b13] px-5 py-8 text-[#fff8e8]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-5%,#b52e3d_0%,#7d1422_40%,#34070f_100%)]" />
    <Lattice className="inset-0" />
    <Peony className="-left-8 top-12 scale-150" />
    <Peony className="-right-8 bottom-8 scale-150" />
    <div className="relative w-full max-w-md border border-[#d9a741]/65 bg-[#6f101c]/75 p-2 shadow-2xl backdrop-blur-sm">
      <div className="relative overflow-hidden border border-[#f4dc9a]/55 px-7 py-12 text-center sm:px-10">
        <DoubleHappiness className="absolute -left-5 top-1 text-9xl text-[#d9a741]/15" />
        <DoubleHappiness className="absolute -right-5 bottom-1 text-9xl text-[#d9a741]/15" />
        <p className="relative text-[10px] font-bold uppercase tracking-[.42em] text-[#f2ca62]">AKSA · Crimson Fortune</p>
        <div className="relative mx-auto mt-9 grid h-24 w-24 place-items-center rounded-full border border-[#f2ca62] bg-[#8d1827] text-[#f8dda0] shadow-[0_0_0_9px_rgba(217,167,65,.12)]"><DoubleHappiness className="text-5xl" /></div>
        <p className="relative mt-8 text-[10px] font-bold uppercase tracking-[.28em] text-white/70">With love and good fortune</p>
        <h1 className="relative mt-5 font-serif text-5xl leading-[.9] sm:text-6xl">{firstName(invitation.groom_name) || "Liang"}<br /><span className="italic text-[#f2ca62]">&amp;</span> {firstName(invitation.bride_name) || "Mei"}</h1>
        <p className="relative mt-8 text-[10px] font-bold uppercase tracking-[.25em] text-white/75">Auspicious date · {invitation.wedding_date}</p>
        <button onClick={() => { window.dispatchEvent(new Event("invitation-opened")); setOpened(true); }} className="relative mt-9 border border-[#f2ca62] bg-[#d9a741] px-7 py-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#4a0811] transition hover:bg-[#f9df9a]">Open invitation</button>
      </div>
    </div>
  </section>;
}

function Hero({ invitation }: TemplateProps) {
  const sections = sectionsFor(invitation);
  const countdown = useCountdown(invitation.wedding_date);
  if (!sections.hero && !sections.countdown) return null;

  return <section className="relative z-10 overflow-hidden bg-[#5a0c17] px-5 py-20 text-[#fff8e8] sm:px-8 sm:py-28">
    <Lattice className="inset-0" />
    <Peony className="-left-10 top-24 scale-[1.85]" />
    <Peony className="-right-10 bottom-24 scale-[1.85]" />
    <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.9fr_1fr] lg:items-center">
      <div className="text-center lg:text-left">
        <p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#f2ca62]">A red thread of destiny</p>
        <DoubleHappiness className="mt-7 block text-6xl text-[#f2ca62]" />
        <h1 className="mt-4 font-serif text-6xl leading-[.82] tracking-[-.04em] sm:text-8xl">{firstName(invitation.groom_name) || "Liang"}<br /><span className="italic text-[#f2ca62]">&amp;</span> {firstName(invitation.bride_name) || "Mei"}</h1>
        <p className="mx-auto mt-9 max-w-md text-base leading-8 text-white/75 lg:mx-0">A celebration of devotion, family, and every blessing that leads two hearts home.</p>
        <p className="mt-9 border-l-2 border-[#d9a741] pl-4 text-[10px] font-bold uppercase tracking-[.25em] text-[#f9e3ac]">Auspicious date · {invitation.wedding_date}</p>
      </div>
      <div className="relative mx-auto w-full max-w-xl">
        <div className="absolute -inset-4 border border-[#d9a741]/55" />
        <div className="relative aspect-[4/5] overflow-hidden bg-[#7e1826] shadow-[20px_20px_0_rgba(217,167,65,.22)]">
          <Image src={invitation.hero_background || crimsonAssets.hero} alt="Crimson Fortune wedding celebration" fill priority unoptimized className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(77,7,17,.08),rgba(77,7,17,.55))]" />
          <DoubleHappiness className="absolute bottom-6 left-1/2 -translate-x-1/2 text-7xl text-[#f5cf71] drop-shadow-lg" />
        </div>
        <div className="absolute -bottom-8 -left-5 grid h-28 w-28 place-items-center rounded-full border-8 border-[#5a0c17] bg-[#d9a741] font-serif text-3xl text-[#5a0c17] shadow-xl">{initials(invitation)}</div>
      </div>
    </div>
    {sections.countdown !== false && <div className="relative mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">{countdown.map(([value, label]) => <div key={String(label)} className="border border-[#d9a741]/65 bg-[#720f1d]/80 py-7 text-center backdrop-blur-sm"><p className="font-serif text-4xl text-[#f8dda0]">{String(value).padStart(2, "0")}</p><p className="mt-2 text-[9px] font-bold uppercase tracking-[.2em] text-white/65">{label}</p></div>)}</div>}
  </section>;
}

function Couple({ invitation }: TemplateProps) {
  if (!sectionsFor(invitation).couple) return null;
  const groom = invitation.groom_cutout || invitation.groom_photo || crimsonAssets.groom;
  const bride = invitation.bride_cutout || invitation.bride_photo || crimsonAssets.bride;
  return <MotionSection><section className="relative z-10 overflow-hidden bg-[#fff7e8] px-5 py-20 text-[#56101a] sm:px-8"><Lattice className="inset-0 opacity-[.11]" /><div className="relative mx-auto max-w-6xl"><div className="max-w-xl"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#af2933]">Two families, one joyful beginning</p><h2 className="mt-4 font-serif text-5xl">Made for a lifetime of fortune.</h2></div><div className="mt-14 grid gap-6 md:grid-cols-2">{[["The groom", invitation.groom_name || "Liang Chen", groom], ["The bride", invitation.bride_name || "Mei Lin", bride]].map(([role, name, image]) => <article key={String(role)} className="relative border border-[#d9a741]/65 bg-[#fffdf7] p-4 shadow-[12px_12px_0_rgba(217,167,65,.12)]"><div className="relative h-[29rem] overflow-hidden bg-[#e8d2a3]"><Image src={String(image)} alt={String(name)} fill unoptimized className="object-cover object-top" /><div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#58101a]/75 to-transparent" /></div><p className="mt-5 text-[9px] font-bold uppercase tracking-[.28em] text-[#af2933]">{role}</p><h3 className="mt-2 font-serif text-4xl">{name}</h3></article>)}</div></div></section></MotionSection>;
}

function Story({ invitation }: TemplateProps) {
  const stories = [[invitation.story1_year, invitation.story1_title, invitation.story1_description], [invitation.story2_year, invitation.story2_title, invitation.story2_description], [invitation.story3_year, invitation.story3_title, invitation.story3_description]].filter((story) => story.some(Boolean));
  if (!sectionsFor(invitation).story || !stories.length) return null;
  return <MotionSection><section className="relative z-10 bg-[#7a1320] px-5 py-20 text-[#fff8e8] sm:px-8"><Lattice className="inset-0" /><div className="relative mx-auto max-w-6xl"><div className="text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#f2ca62]">The red thread</p><h2 className="mt-4 font-serif text-5xl">Every blessing led us here.</h2></div><div className="mt-14 grid gap-5 md:grid-cols-3">{stories.map(([year, title, description], index) => <article key={`${year}-${title}`} className="relative overflow-hidden border border-[#d9a741]/65 bg-[#8b1a28]/75 p-7"><span className="absolute -right-3 -top-5 font-serif text-8xl text-[#f2ca62]/10">0{index + 1}</span><DoubleHappiness className="text-3xl text-[#f2ca62]" /><p className="mt-5 text-[9px] font-bold uppercase tracking-[.25em] text-[#f8dda0]">{year}</p><h3 className="mt-3 font-serif text-3xl">{title}</h3><p className="mt-5 text-sm leading-7 text-white/70">{description}</p></article>)}</div></div></section></MotionSection>;
}

function EventCard({ title, date, time, venue, address, map }: { title: string; date?: string; time?: string; venue?: string; address?: string; map?: string }) {
  return <article className="relative border border-[#d9a741]/70 bg-[#fffdf6] p-8 text-center shadow-[10px_10px_0_rgba(217,167,65,.14)]"><DoubleHappiness className="text-4xl text-[#af2933]" /><p className="mt-4 text-[10px] font-bold uppercase tracking-[.28em] text-[#af2933]">{title}</p><h3 className="mt-6 font-serif text-3xl text-[#56101a]">{venue || title}</h3><div className="mt-7 border-y border-dashed border-[#d9a741] py-4 text-sm text-[#6d4b3e]"><p className="font-bold text-[#56101a]">{date}</p><p className="mt-2">{time}</p></div><p className="mt-6 whitespace-pre-line text-sm leading-7 text-[#6d4b3e]">{address}</p>{map && <a href={map} target="_blank" rel="noreferrer" className="mt-6 inline-block border-b border-[#56101a] pb-1 text-[10px] font-bold uppercase tracking-[.16em] text-[#56101a]">Find the celebration ↗</a>}</article>;
}

function EventDetails({ invitation }: TemplateProps) {
  if (!sectionsFor(invitation).event) return null;
  return <MotionSection><section className="relative z-10 overflow-hidden bg-[#f7ead0] px-5 py-20 sm:px-8"><Lattice className="inset-0 opacity-[.14]" /><div className="relative mx-auto max-w-5xl"><div className="text-center text-[#56101a]"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#af2933]">The auspicious gathering</p><h2 className="mt-4 font-serif text-5xl">Join our celebration.</h2></div><div className="mt-14 grid gap-6 md:grid-cols-2"><EventCard title="The vows" date={invitation.akad_date} time={invitation.akad_time} venue={invitation.akad_venue} address={invitation.akad_address} map={invitation.akad_maps} /><EventCard title="The banquet" date={invitation.reception_date} time={invitation.reception_time} venue={invitation.reception_venue} address={invitation.reception_address} map={invitation.reception_maps} /></div></div></section></MotionSection>;
}

function LiveStream({ invitation }: TemplateProps) {
  const url = invitation.live_stream_url?.trim();
  if (!url && !invitation.is_demo) return null;
  return <MotionSection><section className="relative z-10 overflow-hidden bg-[#4c0a14] px-5 py-20 text-[#fff8e8] sm:px-8"><Lattice className="inset-0" /><div className="relative mx-auto max-w-4xl text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#f2ca62]">Celebrate from afar</p><h2 className="mt-4 font-serif text-5xl">{invitation.live_stream_title || "Join the celebration, live."}</h2><div className="mt-10 grid aspect-video place-items-center border border-[#d9a741]/70 bg-[#710f1d]/70"><div><span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#f2ca62] pl-1 text-xl text-[#f2ca62]">▶</span><p className="mt-5 text-[10px] font-bold uppercase tracking-[.28em]">The auspicious moment, live</p>{url && <a href={url} target="_blank" rel="noreferrer" className="mt-5 inline-block border-b border-[#f2ca62] pb-1 text-xs text-[#f8dda0]">Open live stream ↗</a>}</div></div></div></section></MotionSection>;
}

function Gallery({ invitation }: TemplateProps) {
  if (!sectionsFor(invitation).gallery) return null;
  const uploaded = invitation.gallery?.split(",").map((item: string) => item.trim()).filter(Boolean) || [];
  const images = uploaded.length ? uploaded : [crimsonAssets.gallery[0], crimsonAssets.gallery[1], crimsonAssets.gallery[2], invitation.hero_background || crimsonAssets.hero];
  return <MotionSection><section className="relative z-10 bg-[#fff7e8] px-5 py-20 text-[#56101a] sm:px-8"><div className="mx-auto max-w-6xl"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#af2933]">Our fortune album</p><h2 className="mt-4 font-serif text-5xl">A day written in joy.</h2><div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">{images.slice(0, 4).map((image: string, index: number) => <div key={`${image}-${index}`} className={`relative overflow-hidden bg-[#d7b469] ${index === 0 ? "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto" : "aspect-[4/5]"}`}><Image src={image} alt="Crimson Fortune wedding moment" fill unoptimized className="object-cover transition duration-700 hover:scale-105" /></div>)}</div></div></section></MotionSection>;
}

function RSVP({ invitation, guest }: TemplateProps) {
  if (!sectionsFor(invitation).rsvp) return null;
  return <MotionSection><section className="relative z-10 bg-[#f7ead0] px-5 py-20 text-[#56101a] sm:px-8"><div className="mx-auto max-w-4xl"><div className="text-center"><DoubleHappiness className="text-5xl text-[#af2933]" /><p className="mt-4 text-[10px] font-bold uppercase tracking-[.42em] text-[#af2933]">A place at our table</p><h2 className="mt-4 font-serif text-5xl">RSVP</h2></div>{invitation.is_demo ? <p className="mx-auto mt-12 max-w-xl border border-dashed border-[#d9a741] bg-[#fffdf6] p-7 text-center text-sm leading-7 text-[#6d4b3e]">Your personal RSVP confirmation will appear here once this invitation is published.</p> : <div className="mt-12 grid gap-10 md:grid-cols-2"><RSVPForm invitationId={invitation.id} guest={guest ?? null} /><Guestbook invitationId={invitation.id} /></div>}</div></section></MotionSection>;
}

function Gift({ invitation }: TemplateProps) {
  if (!sectionsFor(invitation).gift || !invitation.bank_account) return null;
  return <section className="relative z-10 bg-[#7a1320] px-5 py-20 text-[#fff8e8]"><div className="mx-auto max-w-xl border border-[#d9a741]/70 bg-[#650d18] p-10 text-center"><DoubleHappiness className="text-5xl text-[#f2ca62]" /><p className="mt-5 text-[10px] font-bold uppercase tracking-[.42em] text-[#f2ca62]">With gratitude</p><h2 className="mt-4 font-serif text-4xl">A fortunate kindness.</h2><p className="mt-8 font-serif text-2xl">{invitation.bank_name}</p><p className="mt-3 text-lg">{invitation.bank_account}</p><div className="mt-6"><CopyButton text={invitation.bank_account} /></div></div></section>;
}

function Footer({ invitation }: TemplateProps) {
  return <footer className="relative z-10 overflow-hidden bg-[#400810] px-5 py-16 text-center text-[#fff8e8]"><Lattice className="inset-0" /><div className="relative"><DoubleHappiness className="text-5xl text-[#f2ca62]" /><p className="mt-5 text-[10px] font-bold uppercase tracking-[.42em] text-[#f2ca62]">Crimson Fortune</p><h2 className="mt-5 font-serif text-5xl">{firstName(invitation.groom_name) || "Liang"} <span className="italic text-[#f2ca62]">&amp;</span> {firstName(invitation.bride_name) || "Mei"}</h2><p className="mt-8 text-[10px] uppercase tracking-[.32em] text-white/55">AKSA Digital Studio · With love and good fortune</p></div></footer>;
}

export const template021: InvitationTemplate = {
  id: "template-021",
  name: "Crimson Fortune",
  description: "An original crimson and gold Chinese-inspired wedding invitation, made for an auspicious celebration.",
  Cover,
  Hero,
  Couple,
  Story,
  Event: EventDetails,
  LiveStream,
  Gallery,
  RSVP,
  Gift,
  Footer,
};
