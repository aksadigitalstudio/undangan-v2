import type { TemplateProps } from "../types";
import MotionSection from "@/components/motion/MotionSection";
import { getEditorialSections } from "./shared";

function EventCard({ title, date, time, venue, address, maps }: { title: string; date?: string; time?: string; venue?: string; address?: string; maps?: string }) {
  if (!date && !time && !venue && !address) return null;
  return (
    <article className="border-t border-[#171717]/25 pt-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#7a7066]">Celebration</p>
      <h3 className="mt-4 font-serif text-4xl tracking-[-0.035em]">{title}</h3>
      {date && <p className="mt-7 text-sm font-bold tracking-[0.15em]">{date}</p>}
      {time && <p className="mt-2 text-sm text-[#625c55]">{time}</p>}
      {venue && <p className="mt-8 font-serif text-2xl">{venue}</p>}
      {address && <p className="mt-3 max-w-md whitespace-pre-line text-sm leading-6 text-[#625c55]">{address}</p>}
      {maps && <a href={maps} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex border border-[#171717] px-5 py-3 text-xs font-bold tracking-[0.15em] transition hover:bg-[#171717] hover:text-white">VIEW LOCATION ↗</a>}
    </article>
  );
}

export default function Event({ invitation }: TemplateProps) {
  const sections = getEditorialSections(invitation);
  if (!sections.event) return null;
  return (
    <MotionSection>
      <section className="relative z-10 bg-[#ddd8d0] px-5 py-24 text-[#171717] sm:px-8 md:py-32">
        <div className="mx-auto max-w-5xl"><div className="mb-14 flex flex-col justify-between gap-5 border-b border-[#171717]/25 pb-6 sm:flex-row sm:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[0.42em] text-[#756d64]">The day</p><h2 className="mt-4 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">Join the celebration.</h2></div><p className="max-w-xs text-sm leading-6 text-[#625c55]">We would be honoured to have you there for every meaningful moment.</p></div><div className="grid gap-14 md:grid-cols-2"><EventCard title="Ceremony" date={invitation.akad_date} time={invitation.akad_time} venue={invitation.akad_venue} address={invitation.akad_address} maps={invitation.akad_maps} /><EventCard title="Reception" date={invitation.reception_date} time={invitation.reception_time} venue={invitation.reception_venue} address={invitation.reception_address} maps={invitation.reception_maps} /></div></div>
      </section>
    </MotionSection>
  );
}
