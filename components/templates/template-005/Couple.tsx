import Image from "next/image";
import type { TemplateProps } from "../types";
import MotionSection from "@/components/motion/MotionSection";
import { editorialMedia, getEditorialSections } from "./shared";

export default function Couple({ invitation }: TemplateProps) {
  const sections = getEditorialSections(invitation);
  if (!sections.couple) return null;

  const people = [
    { label: "The groom", name: invitation.groom_name ?? "Groom", image: invitation.groom_cutout || invitation.groom_photo || editorialMedia.groom, family: invitation.groom_father || invitation.groom_mother },
    { label: "The bride", name: invitation.bride_name ?? "Bride", image: invitation.bride_cutout || invitation.bride_photo || editorialMedia.bride, family: invitation.bride_father || invitation.bride_mother },
  ];

  return (
    <MotionSection>
      <section className="relative z-10 bg-[#171717] px-5 py-24 text-[#f7f4ee] sm:px-8 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 flex items-end justify-between border-b border-white/20 pb-6">
            <div><p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#d6c1a3]">The couple</p><h2 className="mt-4 font-serif text-4xl sm:text-6xl">Two, becoming one.</h2></div>
            <p className="hidden max-w-xs text-right text-sm leading-6 text-white/55 md:block">Two individual stories, now a shared beginning.</p>
          </div>
          <div className="grid gap-12 sm:grid-cols-2 sm:gap-8">
            {people.map((person) => (
              <article key={person.label} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e4de]">
                  <Image src={person.image} alt={person.name} fill unoptimized sizes="(max-width: 640px) 100vw, 50vw" className="object-cover object-top grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                </div>
                <div className="mt-5 flex items-start justify-between border-t border-white/20 pt-4"><div><p className="text-[9px] uppercase tracking-[0.36em] text-[#d6c1a3]">{person.label}</p><h3 className="mt-2 font-serif text-3xl">{person.name}</h3></div>{person.family && <p className="max-w-[10rem] text-right text-xs leading-5 text-white/55">Child of {person.family}</p>}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </MotionSection>
  );
}
