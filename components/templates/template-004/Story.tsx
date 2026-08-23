import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import MotionSection from "@/components/motion/MotionSection";

const floatingFlowers = [
  { symbol: "✿", top: "12%", duration: "16s", delay: "-2s" },
  { symbol: "❀", top: "27%", duration: "19s", delay: "-10s" },
  { symbol: "✿", top: "44%", duration: "18s", delay: "-6s" },
  { symbol: "❀", top: "61%", duration: "21s", delay: "-15s" },
  { symbol: "✿", top: "78%", duration: "17s", delay: "-12s" },
  { symbol: "❀", top: "90%", duration: "20s", delay: "-4s" },
];

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
      position: "left",
    },
    {
      year: data.story2_year,
      title: data.story2_title,
      description: data.story2_description,
      position: "right",
    },
    {
      year: data.story3_year,
      title: data.story3_title,
      description: data.story3_description,
      position: "left",
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
      <section className="relative z-10 overflow-hidden bg-[#F8ECD1] px-6 py-24 md:py-32">
        <style>{`
          @keyframes imperial-story-red-flower {
            0% {
              transform: translate3d(-38vw, 20px, 0) rotate(0deg) scale(0.72);
              opacity: 0;
            }

            8% {
              opacity: 0.86;
            }

            50% {
              transform: translate3d(48vw, -30px, 0) rotate(180deg) scale(1);
              opacity: 0.9;
            }

            92% {
              opacity: 0.86;
            }

            100% {
              transform: translate3d(140vw, 24px, 0) rotate(360deg) scale(0.75);
              opacity: 0;
            }
          }

          .imperial-story-red-flower {
            animation-name: imperial-story-red-flower;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-fill-mode: both;
            color: #C1121F;
            text-shadow:
              0 1px 0 #FFE6A0,
              0 7px 15px rgba(112, 8, 15, 0.22);
          }

          @media (prefers-reduced-motion: reduce) {
            .imperial-story-red-flower {
              animation: none;
              opacity: 0.45;
            }
          }
        `}</style>

        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden="true"
        >
          {floatingFlowers.map((flower, index) => (
            <span
              key={`${flower.symbol}-${index}`}
              style={{
                top: flower.top,
                animationDuration: flower.duration,
                animationDelay: flower.delay,
              }}
              className="imperial-story-red-flower absolute left-0 select-none whitespace-nowrap text-6xl leading-none md:text-8xl"
            >
              {flower.symbol}
            </span>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-24 -translate-x-1/2 font-serif text-[300px] text-[#A30F1B]">
            囍
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-[#D99580]/30 via-[#F8ECD1]/10 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-[620px]">
          <div className="mb-20 text-center">
            <p className="mb-4 text-[10px] uppercase tracking-[0.55em] text-[#A30F1B]">
              Our Journey
            </p>

            <div className="mx-auto mb-6 h-px w-20 bg-[#C89B3C]" />

            <h2 className="font-serif text-4xl italic text-[#A30F1B] md:text-5xl">
              Our Love Story
            </h2>

            <p className="mx-auto mt-5 max-w-md font-serif text-sm italic leading-7 text-[#7A2C27]">
              Every beautiful love story has a beginning, a journey,
              and a forever.
            </p>
          </div>

          <div className="space-y-12">
            {stories.map((story, index) => {
              const isRight = story.position === "right";

              return (
                <article
                  key={`${story.year}-${index}`}
                  className={
                    isRight
                      ? "ml-[14%] md:ml-[26%]"
                      : "mr-[14%] md:mr-[26%]"
                  }
                >
                  <div className="rounded-[24px] border border-[#C89B3C]/35 bg-[#FFF7E2]/85 p-6 shadow-[0_12px_30px_rgba(104,35,32,0.10)] backdrop-blur-sm">
                    {story.year && (
                      <p className="font-serif text-3xl text-[#B20F1C]">
                        {story.year}
                      </p>
                    )}

                    {story.title && (
                      <h3 className="mt-2 font-serif text-2xl italic text-[#7A1E24]">
                        {story.title}
                      </h3>
                    )}

                    {(story.year || story.title) && (
                      <div className="my-4 h-px w-12 bg-[#C89B3C]" />
                    )}

                    {story.description && (
                      <p className="font-serif text-sm leading-7 text-[#7A2C27]">
                        {story.description}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-20 text-center">
            <div className="mx-auto h-px w-28 bg-[#C89B3C]/70" />

            <p className="mt-4 text-2xl text-[#B20F1C]/70">
              ✿ ✦ ✿
            </p>
          </div>
        </div>
      </section>
    </MotionSection>
  );
}