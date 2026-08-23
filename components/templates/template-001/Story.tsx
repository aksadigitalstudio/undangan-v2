import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import { themes } from "@/lib/themes";
import MotionGroup from "@/components/motion/MotionGroup";
import MotionItem from "@/components/motion/MotionItem";
import MotionSection from "@/components/motion/MotionSection";

export default function Story({ invitation }: TemplateProps) {
  const data = invitation;

  const sections = {
    ...defaultSections,
    ...(data.sections ?? {}),
  };

  const currentTheme =
    themes[data.theme as keyof typeof themes] ??
    themes["elegant-gold"];

  if (!sections.story) {
    return null;
  }

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
  ];

  return (
    <MotionSection>
      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div
            className="rounded-[40px] p-12 md:p-16"
            style={{
              background:
                data.theme === "luxury-black"
                  ? "rgba(15,15,16,0.55)"
                  : "rgba(255,255,255,0.20)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <div className="mb-20 text-center">
              <p
                className="mb-6 text-5xl"
                style={{ color: currentTheme.accent }}
              >
                囍
              </p>

              <div
                className="mx-auto mb-8 h-px w-20"
                style={{ background: currentTheme.accent }}
              />

              <p
                className="mb-3 text-sm uppercase tracking-[0.45em]"
                style={{
                  color: "#FFFFFF",
                  textShadow: "0 2px 8px rgba(0,0,0,0.45)",
                }}
              >
                Our Journey
              </p>

              <h2
                className="mb-16 font-serif text-5xl text-white md:text-6xl"
                style={{
                  WebkitTextStroke: "1px rgba(0,0,0,0.45)",
                  textShadow: "0 4px 18px rgba(0,0,0,0.35)",
                }}
              >
                Love Story
              </h2>
            </div>

            <MotionGroup>
              <div className="space-y-16">
                {stories.map((story, index) => (
                  <MotionItem key={`story-${index}`}>
                    <div
                      className={
                        index === 0 ? "relative pt-6" : "relative"
                      }
                    >
                      <div
                        className="absolute bottom-8 left-3 top-8 w-px"
                        style={{ background: currentTheme.divider }}
                      />

                      <div
                        className="absolute left-2 top-8 h-3 w-3 rounded-full"
                        style={{ background: currentTheme.accent }}
                      />

                      <div
                        className="ml-10 rounded-3xl border p-8 shadow-xl"
                        style={{
                          background: currentTheme.card,
                          borderColor: currentTheme.divider,
                        }}
                      >
                        <h3
                          className="mb-2 font-serif text-3xl"
                          style={{ color: currentTheme.text }}
                        >
                          {story.year}
                        </h3>

                        <h4
                          className="mb-3 text-2xl font-semibold"
                          style={{ color: currentTheme.text }}
                        >
                          {story.title}
                        </h4>

                        <p
                          className="leading-8"
                          style={{
                            color: currentTheme.text,
                            opacity: 0.75,
                          }}
                        >
                          {story.description}
                        </p>
                      </div>
                    </div>
                  </MotionItem>
                ))}
              </div>
            </MotionGroup>
          </div>
        </div>
      </section>
    </MotionSection>
  );
}