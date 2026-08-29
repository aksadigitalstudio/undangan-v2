import type { TemplateProps } from "../types";
import MotionSection from "@/components/motion/MotionSection";
import { getEditorialSections } from "./shared";

export default function Story({ invitation }: TemplateProps) {
  const sections = getEditorialSections(invitation);
  const stories = [
    { year: invitation.story1_year, title: invitation.story1_title, description: invitation.story1_description },
    { year: invitation.story2_year, title: invitation.story2_title, description: invitation.story2_description },
    { year: invitation.story3_year, title: invitation.story3_title, description: invitation.story3_description },
  ].filter((story) => story.year || story.title || story.description);
  if (!sections.story || !stories.length) return null;

  return (
    <MotionSection>
      <section className="relative z-10 bg-[#f5f2ed] px-5 py-24 text-[#171717] sm:px-8 md:py-32">
        <div className="mx-auto max-w-4xl"><p className="text-[10px] font-bold uppercase tracking-[0.42em] text-[#756d64]">Our story</p><div className="mt-5 grid gap-10 border-t border-[#171717]/20 pt-8 md:grid-cols-[0.8fr_1.2fr]"><h2 className="font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">The moments that led us here.</h2><div className="space-y-10">{stories.map((story, index) => <article key={`${story.year}-${index}`} className="grid grid-cols-[4rem_1fr] gap-5 border-b border-[#171717]/15 pb-8"><p className="font-serif text-2xl text-[#a39280]">{story.year}</p><div><h3 className="font-serif text-2xl">{story.title}</h3><p className="mt-3 text-sm leading-7 text-[#625c55]">{story.description}</p></div></article>)}</div></div></div>
      </section>
    </MotionSection>
  );
}
