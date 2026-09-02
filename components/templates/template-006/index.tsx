"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { InvitationTemplate, TemplateProps } from "../types";
import CopyButton from "@/components/CopyButton";
import Guestbook from "@/components/Guestbook";
import MotionSection from "@/components/motion/MotionSection";
import RSVPForm from "@/components/RSVPForm";
import { defaultSections } from "@/lib/defaultSections";
import { amalfiMedia } from "./shared";

const palette = {
  blue: "#123b75",
  ink: "#102c57",
  cream: "#fff9eb",
  lemon: "#f5cc43",
  terracotta: "#d76b43",
};

function getSections(invitation: { sections?: Record<string, unknown> }) {
  return { ...defaultSections, ...(invitation.sections ?? {}) };
}

function firstName(name?: string) {
  return name?.trim().split(" ")[0] || "";
}

function countdownTo(dateValue?: string) {
  const date = new Date(`${dateValue || ""}T00:00:00`).getTime();
  const remaining = Number.isNaN(date) ? 0 : Math.max(0, date - Date.now());
  return [
    [Math.floor(remaining / 86_400_000), "Days"],
    [Math.floor((remaining / 3_600_000) % 24), "Hours"],
    [Math.floor((remaining / 60_000) % 60), "Minutes"],
    [Math.floor((remaining / 1_000) % 60), "Seconds"],
  ];
}

function TileDivider() {
  return <div className="h-3 w-full bg-[linear-gradient(90deg,#123b75_0_10px,#fff9eb_10px_20px,#f5cc43_20px_30px,#fff9eb_30px_40px)] bg-[length:40px_12px]" />;
}

function Cover({ invitation }: TemplateProps) {
  const [opened, setOpened] = useState(false);
  if (opened) return null;
  const groom = firstName(invitation.groom_name) || "Matteo";
  const bride = firstName(invitation.bride_name) || "Sofia";
  const guest = invitation.guest_name?.trim() || "Dear Guest";
  const image = invitation.hero_background || amalfiMedia.hero;
  const open = () => { window.dispatchEvent(new Event("invitation-opened")); setOpened(true); };

  return <section className="fixed inset-0 z-50 grid min-h-screen place-items-center overflow-hidden px-5 py-8 text-white" style={{ backgroundImage: `linear-gradient(180deg,rgba(11,34,69,.15),rgba(11,34,69,.78)),url('${image}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,transparent_0,rgba(10,30,59,.35)_58%,rgba(10,30,59,.8)_100%)]" />
    <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/50 bg-[#fff9eb]/95 text-center shadow-2xl shadow-[#0b2345]/40">
      <TileDivider />
      <div className="px-8 py-10 sm:px-12 sm:py-12" style={{ color: palette.ink }}>
        <p className="text-[10px] font-bold uppercase tracking-[.45em]" style={{ color: palette.terracotta }}>AKSA · Amalfi Afterglow</p>
        <p className="mt-8 font-serif text-xl italic">You are invited to celebrate</p>
        <h1 className="mt-4 font-serif text-5xl leading-[.9] tracking-tight sm:text-6xl">{groom}<span className="mx-2 text-[#d76b43]">&amp;</span>{bride}</h1>
        <p className="mt-6 text-[10px] font-bold uppercase tracking-[.3em]" style={{ color: palette.blue }}>{invitation.wedding_date || "A golden day by the sea"}</p>
        <div className="my-8 border-y border-[#123b75]/20 py-5"><p className="text-[9px] font-bold uppercase tracking-[.35em] text-[#123b75]/60">For</p><p className="mt-2 font-serif text-2xl">{guest}</p></div>
        <button type="button" onClick={open} className="rounded-full bg-[#123b75] px-7 py-3.5 text-xs font-bold tracking-[.18em] text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#0b2b5e]">OPEN INVITATION <span className="ml-2 text-[#f5cc43]">→</span></button>
      </div>
      <TileDivider />
    </div>
  </section>;
}

function Hero({ invitation }: TemplateProps) {
  const sections = getSections(invitation);
  const [countdown, setCountdown] = useState(() => countdownTo(invitation.wedding_date));
  useEffect(() => { const tick = () => setCountdown(countdownTo(invitation.wedding_date)); tick(); const timer = window.setInterval(tick, 1000); return () => window.clearInterval(timer); }, [invitation.wedding_date]);
  if (!sections.hero && !sections.countdown) return null;
  const groom = firstName(invitation.groom_name) || "Matteo";
  const bride = firstName(invitation.bride_name) || "Sofia";
  const image = invitation.hero_background || amalfiMedia.hero;
  return <section className="relative z-10 overflow-hidden bg-[#fff9eb] px-5 py-14 sm:px-8 md:py-24">
    <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border-[7px] border-[#123b75] bg-[#123b75] shadow-2xl">
      <div className="relative min-h-[42rem] overflow-hidden px-6 py-12 sm:px-12 sm:py-16" style={{ backgroundImage: `linear-gradient(90deg,rgba(10,37,77,.88)_0%,rgba(10,37,77,.48)_52%,rgba(10,37,77,.15)_100%),url('${image}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_10%,rgba(245,204,67,.36),transparent_33%)]" />
        {sections.hero !== false && <div className="relative flex min-h-[30rem] max-w-xl flex-col justify-end text-white"><p className="text-[10px] font-bold uppercase tracking-[.48em] text-[#f5cc43]">La dolce vita begins</p><h1 className="mt-6 font-serif text-6xl leading-[.82] tracking-[-.06em] sm:text-8xl">{groom}<br /><span className="text-[#f5cc43]">&amp;</span> {bride}</h1><p className="mt-8 max-w-md text-base leading-7 text-white/85">A sunset celebration, lemon groves, cobalt tiles, and the people we love most.</p><p className="mt-8 text-xs font-bold uppercase tracking-[.27em] text-[#f5cc43]">{invitation.wedding_date || "Save the date"}</p></div>}
      </div>
      {sections.countdown !== false && <div className="grid grid-cols-4 bg-[#fff9eb] px-4 py-6 text-center sm:px-10"><p className="col-span-4 mb-5 text-[9px] font-bold uppercase tracking-[.38em] text-[#123b75]/65">Counting down to the coast</p>{countdown.map(([value, label], index) => <div key={String(label)} className={index ? "border-l border-[#123b75]/15" : ""}><p className="font-serif text-3xl text-[#123b75] sm:text-5xl">{String(value).padStart(2, "0")}</p><p className="mt-1 text-[8px] font-bold uppercase tracking-[.2em] text-[#d76b43] sm:text-[10px]">{label}</p></div>)}</div>}
    </div>
  </section>;
}

function Couple({ invitation }: TemplateProps) {
  const sections = getSections(invitation); if (!sections.couple) return null;
  const people = [
    { role: "Il signore", name: invitation.groom_name || "Matteo Romano", image: invitation.groom_cutout || invitation.groom_photo || amalfiMedia.groom, family: invitation.groom_father || invitation.groom_mother },
    { role: "La signora", name: invitation.bride_name || "Sofia Bellini", image: invitation.bride_cutout || invitation.bride_photo || amalfiMedia.bride, family: invitation.bride_father || invitation.bride_mother },
  ];
  return <MotionSection><section className="relative z-10 overflow-hidden bg-[#123b75] px-5 py-20 text-white sm:px-8 md:py-28"><div className="absolute inset-0 opacity-[.09] [background-image:radial-gradient(#fff9eb_1px,transparent_1px)] [background-size:20px_20px]" /><div className="relative mx-auto max-w-6xl"><div className="mb-14 text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#f5cc43]">Meet the couple</p><h2 className="mt-4 font-serif text-5xl sm:text-6xl">Made for this moment.</h2></div><div className="grid gap-8 md:grid-cols-2">{people.map((person, index) => <article key={person.role} className="overflow-hidden rounded-[2rem] bg-[#fff9eb] p-4 text-[#123b75] shadow-xl"><div className="relative h-[30rem] overflow-hidden rounded-[1.45rem] bg-[radial-gradient(circle_at_50%_15%,#f7d980,transparent_54%),linear-gradient(160deg,#fff9eb,#e8bd78)]"><Image src={person.image} alt={person.name} fill unoptimized sizes="(max-width: 768px) 100vw, 50vw" className="object-contain object-bottom" /></div><div className="px-3 pb-3 pt-6"><p className="text-[9px] font-bold uppercase tracking-[.35em] text-[#d76b43]">{person.role}</p><h3 className="mt-2 font-serif text-4xl">{person.name}</h3>{person.family && <p className="mt-3 text-sm text-[#123b75]/70">Child of {person.family}</p>}<p className="mt-5 text-xs font-bold uppercase tracking-[.25em] text-[#123b75]/55">{index === 0 ? "The gentleman" : "The lady"}</p></div></article>)}</div></div></section></MotionSection>;
}

function Story({ invitation }: TemplateProps) {
  const sections = getSections(invitation); const stories = [[invitation.story1_year, invitation.story1_title, invitation.story1_description], [invitation.story2_year, invitation.story2_title, invitation.story2_description], [invitation.story3_year, invitation.story3_title, invitation.story3_description]].filter(([year, title, description]) => year || title || description);
  if (!sections.story || !stories.length) return null;
  return <MotionSection><section className="relative z-10 bg-[#fff9eb] px-5 py-20 text-[#123b75] sm:px-8 md:py-28"><div className="mx-auto max-w-5xl"><p className="text-center text-[10px] font-bold uppercase tracking-[.42em] text-[#d76b43]">Our journey</p><h2 className="mt-4 text-center font-serif text-5xl leading-none sm:text-6xl">A love worth travelling for.</h2><div className="mt-14 grid gap-5 md:grid-cols-3">{stories.map(([year, title, description], index) => <article key={`${year}-${index}`} className="rounded-[1.7rem] border border-[#123b75]/15 bg-white p-7 shadow-sm"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#f5cc43] text-sm font-bold">0{index + 1}</span><p className="mt-7 font-serif text-3xl text-[#d76b43]">{year}</p><h3 className="mt-3 font-serif text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-[#123b75]/70">{description}</p></article>)}</div></div></section></MotionSection>;
}

function EventCard({ title, date, time, venue, address, maps }: { title: string; date?: string; time?: string; venue?: string; address?: string; maps?: string }) {
  if (!date && !time && !venue && !address) return null;
  return <article className="rounded-[1.75rem] bg-[#fff9eb] p-7 text-[#123b75] shadow-lg sm:p-9"><p className="text-[10px] font-bold uppercase tracking-[.38em] text-[#d76b43]">{title}</p><div className="mt-6 h-px w-12 bg-[#f5cc43]" /><p className="mt-6 font-serif text-3xl">{venue || title}</p><p className="mt-4 text-sm font-bold tracking-[.12em]">{date}</p><p className="mt-2 text-sm text-[#123b75]/70">{time}</p>{address && <p className="mt-6 whitespace-pre-line text-sm leading-7 text-[#123b75]/70">{address}</p>}{maps && <a href={maps} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-full bg-[#123b75] px-5 py-3 text-[10px] font-bold tracking-[.16em] text-white transition hover:bg-[#d76b43]">VIEW LOCATION ↗</a>}</article>;
}

function Schedule({ invitation }: TemplateProps) {
  const sections = getSections(invitation); if (!sections.event) return null;
  return <MotionSection><section className="relative z-10 bg-[#e9bd64] px-5 py-20 sm:px-8 md:py-28"><div className="mx-auto max-w-6xl"><div className="mb-12 text-center text-[#123b75]"><p className="text-[10px] font-bold uppercase tracking-[.42em]">The celebration</p><h2 className="mt-4 font-serif text-5xl sm:text-6xl">Meet us by the sea.</h2></div><div className="grid gap-6 md:grid-cols-2"><EventCard title="Ceremony" date={invitation.akad_date} time={invitation.akad_time} venue={invitation.akad_venue} address={invitation.akad_address} maps={invitation.akad_maps} /><EventCard title="Reception" date={invitation.reception_date} time={invitation.reception_time} venue={invitation.reception_venue} address={invitation.reception_address} maps={invitation.reception_maps} /></div></div></section></MotionSection>;
}

function LiveStream({ invitation }: TemplateProps) {
  const url = invitation.live_stream_url?.trim(); if (!url) return null;
  let embed: string | null = null; try { const parsed = new URL(url); const id = parsed.hostname.includes("youtu.be") ? parsed.pathname.slice(1) : parsed.searchParams.get("v"); embed = id ? `https://www.youtube.com/embed/${id}` : null; } catch { embed = null; }
  return <MotionSection><section className="relative z-10 bg-[#123b75] px-5 py-20 text-white sm:px-8 md:py-28"><div className="mx-auto max-w-4xl text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#f5cc43]">From afar, with love</p><h2 className="mt-4 font-serif text-5xl">{invitation.live_stream_title || "Join us live"}</h2><div className="mt-10 overflow-hidden rounded-[1.5rem] border border-white/20 bg-black shadow-2xl">{embed ? <div className="aspect-video"><iframe src={embed} title="Live celebration" className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div> : <a href={url} target="_blank" rel="noopener noreferrer" className="flex aspect-video items-center justify-center text-sm font-bold tracking-[.16em] text-[#f5cc43]">WATCH THE LIVESTREAM ↗</a>}</div></div></section></MotionSection>;
}

function Gallery({ invitation }: TemplateProps) {
  const sections = getSections(invitation); if (!sections.gallery) return null;
  const uploaded = invitation.gallery?.split(",").map((image: string) => image.trim()).filter(Boolean) ?? [];
  const positions = ["0% 0%", "100% 0%", "0% 100%", "100% 100%"];
  return <MotionSection><section className="relative z-10 bg-[#fff9eb] px-5 py-20 text-[#123b75] sm:px-8 md:py-28"><div className="mx-auto max-w-6xl"><div className="mb-12 flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#d76b43]">Dolce memories</p><h2 className="mt-4 font-serif text-5xl sm:text-6xl">Postcards from us.</h2></div><span className="hidden rounded-full border border-[#123b75]/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[.2em] sm:block">Amalfi · Italia</span></div><div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">{positions.map((position, index) => uploaded[index] ? <div key={uploaded[index]} className={`relative overflow-hidden rounded-[1.5rem] bg-[#e8d7a9] ${index === 0 ? "col-span-2 aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto" : "aspect-[4/5]"}`}><Image src={uploaded[index]} alt={`Wedding moment ${index + 1}`} fill unoptimized sizes="(max-width: 768px) 50vw, 30vw" className="object-cover transition duration-700 hover:scale-105" /></div> : <div key={position} className={`overflow-hidden rounded-[1.5rem] bg-[#e8d7a9] ${index === 0 ? "col-span-2 aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto" : "aspect-[4/5]"}`} style={{ backgroundImage: `url('${amalfiMedia.gallerySheet}')`, backgroundPosition: position, backgroundSize: "200% 200%" }} />)}</div></div></section></MotionSection>;
}

function RSVP({ invitation, guest }: TemplateProps) {
  const sections = getSections(invitation); if (!sections.rsvp) return null;
  return <MotionSection><section className="relative z-10 bg-[#d76b43] px-5 py-20 text-[#fff9eb] sm:px-8 md:py-28"><style>{`.amalfi-rsvp input,.amalfi-rsvp select,.amalfi-rsvp textarea{border-color:rgba(255,249,235,.55)!important;background:#fff9eb!important;color:#123b75!important;border-radius:1rem!important}.amalfi-rsvp button{background:#123b75!important;color:#fff!important;border-radius:999px!important}`}</style><div className="mx-auto max-w-4xl"><div className="mb-12 text-center"><p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#f5cc43]">Reply with sunshine</p><h2 className="mt-4 font-serif text-5xl sm:text-6xl">Will you join us?</h2><p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/80">Pack your happiest heart. We cannot wait to celebrate with you.</p></div>{invitation.is_demo ? <p className="rounded-2xl border border-white/30 bg-white/10 px-6 py-5 text-center text-sm leading-6">This is a live template preview. RSVP will be active on your client invitation.</p> : <div className="amalfi-rsvp grid gap-12 md:grid-cols-2"><RSVPForm invitationId={invitation.id} guest={guest ?? null} /><Guestbook invitationId={invitation.id} /></div>}</div></section></MotionSection>;
}

function Gift({ invitation }: TemplateProps) {
  const sections = getSections(invitation); const bank = invitation.bank_account?.trim(); const qris = invitation.qris_image?.trim(); const address = invitation.gift_address?.trim(); if (!sections.gift || (!bank && !qris && !address)) return null;
  return <MotionSection><section className="relative z-10 bg-[#fff9eb] px-5 py-20 text-[#123b75] sm:px-8 md:py-28"><div className="mx-auto max-w-5xl"><p className="text-center text-[10px] font-bold uppercase tracking-[.42em] text-[#d76b43]">With gratitude</p><h2 className="mt-4 text-center font-serif text-5xl sm:text-6xl">A little something.</h2><p className="mx-auto mt-5 max-w-xl text-center text-sm leading-7 text-[#123b75]/70">Your presence is the greatest gift. If you wish to share a little more, these details are here with love.</p><div className="mt-12 grid gap-6 md:grid-cols-2">{bank && <article className="rounded-[1.7rem] border border-[#123b75]/15 bg-white p-7 shadow-sm"><p className="text-[10px] font-bold uppercase tracking-[.32em] text-[#d76b43]">Bank transfer</p><h3 className="mt-5 font-serif text-3xl">{invitation.bank_name || "Bank account"}</h3><p className="mt-7 text-2xl font-semibold tracking-[.08em]">{bank}</p><p className="mt-3 text-sm text-[#123b75]/70">a.n. {invitation.account_name || "-"}</p><div className="mt-6"><CopyButton text={bank} /></div></article>}{qris && <article className="rounded-[1.7rem] border border-[#123b75]/15 bg-white p-7 shadow-sm"><p className="text-[10px] font-bold uppercase tracking-[.32em] text-[#d76b43]">Digital payment</p><h3 className="mt-5 font-serif text-3xl">QRIS</h3><Image src={qris} alt="QRIS" width={260} height={260} className="mt-6 h-auto w-48 rounded-xl border border-[#123b75]/10 p-2" /></article>}{address && <article className="rounded-[1.7rem] border border-[#123b75]/15 bg-white p-7 shadow-sm md:col-span-2"><p className="text-[10px] font-bold uppercase tracking-[.32em] text-[#d76b43]">Send a gift</p><p className="mt-5 whitespace-pre-line text-sm leading-7 text-[#123b75]/70">{address}</p></article>}</div></div></section></MotionSection>;
}

function Footer({ invitation }: TemplateProps) {
  const groom = firstName(invitation.groom_name) || "Matteo"; const bride = firstName(invitation.bride_name) || "Sofia";
  return <footer className="relative z-10 overflow-hidden bg-[#123b75] px-5 py-16 text-center text-white sm:px-8"><div className="absolute inset-x-0 top-0"><TileDivider /></div><p className="pt-5 text-[10px] font-bold uppercase tracking-[.42em] text-[#f5cc43]">Grazie</p><h2 className="mt-5 font-serif text-5xl"><span>{groom}</span> <span className="text-[#f5cc43]">&amp;</span> <span>{bride}</span></h2><p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/70">Thank you for bringing your love to our day by the sea.</p><p className="mt-10 text-[8px] font-bold uppercase tracking-[.28em] text-white/40">Crafted by AKSA Digital Studio</p></footer>;
}

export const template006: InvitationTemplate = { id: "template-006", name: "Amalfi Afterglow", description: "A joyful Italian Riviera invitation in cobalt, lemon, and sunset light.", Cover, Hero, Couple, Story, Event: Schedule, LiveStream, Gallery, RSVP, Gift, Footer };
