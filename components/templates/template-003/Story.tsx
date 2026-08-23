import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import MotionGroup from "@/components/motion/MotionGroup";
import MotionItem from "@/components/motion/MotionItem";
import MotionSection from "@/components/motion/MotionSection";
import SundaSectionOrnament from "./SundaSectionOrnament";

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
      <section className="relative z-10 overflow-hidden bg-[#FCF8ED] px-6 py-24 md:py-32">
        {/* Ornamen bergerak, selalu berada di belakang konten */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
        >
          <SundaSectionOrnament />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-[#A37C32]">
              Perjalanan Kami
            </p>

            <div className="mx-auto mb-6 h-px w-16 bg-[#C8A65B]" />

            <h2 className="font-serif text-4xl text-[#173D2E] md:text-5xl">
              Kisah Cinta
            </h2>

            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#506758]">
              Sebuah perjalanan yang perlahan menuntun kami menuju
              hari bahagia ini.
            </p>
          </div>

          <MotionGroup>
            <div className="relative">
              <div className="absolute bottom-12 left-5 top-10 w-px bg-[#C8A65B]/70" />

              <div className="space-y-14">
                {stories.map((story, index) => (
                  <MotionItem key={`${story.year}-${index}`}>
                    <article className="relative pl-16">
                      <div className="absolute left-0 top-7 h-10 w-10 rounded-full border-4 border-[#FFFBEF] bg-[#C8A65B] shadow-[0_5px_12px_rgba(70,87,57,0.18)]" />

                      {story.year && (
                        <p className="font-serif text-3xl text-[#A37C32]">
                          {story.year}
                        </p>
                      )}

                      {story.title && (
                        <h3 className="mt-2 font-serif text-2xl text-[#173D2E]">
                          {story.title}
                        </h3>
                      )}

                      {(story.year || story.title) && (
                        <div className="my-4 h-px w-12 bg-[#C8A65B]" />
                      )}

                      {story.description && (
                        <p className="max-w-xl text-sm leading-7 text-[#506758]">
                          {story.description}
                        </p>
                      )}
                    </article>
                  </MotionItem>
                ))}
              </div>
            </div>
          </MotionGroup>
        </div>
      </section>
    </MotionSection>
  );
}