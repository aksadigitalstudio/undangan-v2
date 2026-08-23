import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import MotionGroup from "@/components/motion/MotionGroup";
import MotionItem from "@/components/motion/MotionItem";
import MotionSection from "@/components/motion/MotionSection";



export default function Story({ invitation }: TemplateProps) {
  const data = invitation;

  const sections = {
    ...defaultSections,
    ...(data.sections ?? {}),
  };

  const stories = [
    {
      year: data.story1_year,
      title: data.story1_title,
      description: data.story1_description,
    },
    {
      year: data.story2_year,
      title: data.story2_title,
      description: data.story2_description,
    },
    {
      year: data.story3_year,
      title: data.story3_title,
      description: data.story3_description,
    },
  ].filter(
    (story) =>
      story.year || story.title || story.description
  );

  if (!sections.story || stories.length === 0) {
    return null;
  }

  return (
    <MotionSection>
      <section className="relative z-10 overflow-hidden px-6 py-24">
        <div className="relative mx-auto max-w-3xl">
<div className="mx-auto mb-14 max-w-3xl rounded-[28px] border border-[#D5B477]/25 bg-[#21170F]/70 px-6 py-8 text-center shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm">
  <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-[#E2B968]">
    Perjalanan Kami
  </p>

  <div className="mx-auto mb-6 h-px w-16 bg-[#D5A54D]" />

  <h2 className="font-serif text-4xl text-[#FFF6E5] md:text-5xl">
    Kisah Cinta
  </h2>

  <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#F3DEC0]/85">
    Sebuah perjalanan sederhana yang akhirnya mempertemukan
    kami dalam satu ikatan penuh makna.
  </p>
</div>

          <MotionGroup>
            <div className="relative space-y-8">
              <div className="absolute bottom-10 left-5 top-10 w-px bg-[#C69A52]/50 md:left-1/2 md:-translate-x-1/2" />

              {stories.map((story, index) => {

                return (
                  <MotionItem
                    key={`${story.year}-${index}`}
                  >
                    <article
className="relative pl-14"
>
  <div className="absolute left-2 top-8 h-7 w-7 rounded-full border-4 border-[#FFF8EA] bg-[#B88A44] shadow-md" />

  <div className="overflow-hidden rounded-[28px] border border-[#D5B477]/60 bg-[#FFF8EA]/95 p-7 shadow-[0_14px_30px_rgba(78,48,24,0.14)]">
    {story.year && (
      <p className="mb-3 font-serif text-3xl text-[#B88A44]">
        {story.year}
      </p>
    )}

    {story.title && (
      <h3 className="font-serif text-2xl text-[#4A2D1D]">
        {story.title}
      </h3>
    )}

    {(story.year || story.title) && (
      <div className="my-5 h-px w-12 bg-[#C69A52]/70" />
    )}

    {story.description && (
      <p className="text-sm leading-7 text-[#755545]">
        {story.description}
      </p>
    )}
  </div>
</article>
                  </MotionItem>
                );
              })}
            </div>
          </MotionGroup>
        </div>
      </section>
    </MotionSection>
  );
}