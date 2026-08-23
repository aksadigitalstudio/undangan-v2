import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import { themes } from "@/lib/themes";
import MotionGroup from "@/components/motion/MotionGroup";
import MotionItem from "@/components/motion/MotionItem";
import MotionSection from "@/components/motion/MotionSection";

export default function Event({ invitation }: TemplateProps) {
  const data = invitation;

  const sections = {
    ...defaultSections,
    ...(data.sections ?? {}),
  };

  const currentTheme =
    themes[data.theme as keyof typeof themes] ??
    themes["elegant-gold"];

  if (!sections.event) {
    return null;
  }

  const events = [
    {
      title: "Holy Matrimony",
      date: data.akad_date,
      time: data.akad_time,
      venue: data.akad_venue,
      address: data.akad_address,
      maps: data.akad_maps,
    },
    {
      title: "Wedding Reception",
      date: data.reception_date,
      time: data.reception_time,
      venue: data.reception_venue,
      address: data.reception_address,
      maps: data.reception_maps,
    },
  ];

  return (
    <MotionSection>
      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-20 text-center">
            <p
              className="mb-3 text-sm uppercase tracking-[0.45em]"
              style={{
                color: "#FFFFFF",
                textShadow: "0 2px 8px rgba(0,0,0,0.45)",
              }}
            >
              Celebration
            </p>

            <h2
              className="font-serif text-5xl text-white md:text-6xl"
              style={{
                WebkitTextStroke: "1px rgba(0,0,0,0.45)",
                textShadow: "0 4px 18px rgba(0,0,0,0.35)",
              }}
            >
              Wedding Events
            </h2>
          </div>

          <MotionGroup>
            <div className="grid gap-10 md:grid-cols-2">
              {events.map((event) => (
                <MotionItem key={event.title}>
                  <div
                    className="rounded-[40px] border p-12 text-center shadow-xl"
                    style={{
                      background: currentTheme.card,
                      borderColor: currentTheme.divider,
                    }}
                  >
                    <h3
                      className="mb-6 font-serif text-3xl"
                      style={{ color: currentTheme.text }}
                    >
                      {event.title}
                    </h3>

                    <div
                      className="mx-auto mb-8 h-px w-14"
                      style={{ background: currentTheme.accent }}
                    />

                    <p
                      className="mb-3 font-serif text-2xl"
                      style={{ color: currentTheme.text }}
                    >
                      {event.date}
                    </p>

                    <p
                      className="mb-10 text-sm uppercase tracking-[0.35em]"
                      style={{
                        color: currentTheme.text,
                        opacity: 0.75,
                      }}
                    >
                      {event.time}
                    </p>

                    <p
                      className="mt-2 font-serif text-2xl"
                      style={{ color: currentTheme.text }}
                    >
                      {event.venue}
                    </p>

                    <div
                      className="mx-auto my-6 h-px w-12"
                      style={{ background: currentTheme.accent }}
                    />

                    <p
                      className="whitespace-pre-wrap leading-8"
                      style={{
                        color: currentTheme.text,
                        opacity: 0.75,
                      }}
                    >
                      {event.address}
                    </p>

                    <div className="mt-10">
                      <a
                        href={event.maps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-full bg-[#1B2437] px-10 py-4 text-white shadow-lg transition hover:bg-black"
                      >
                        📍 View Location
                      </a>
                    </div>
                  </div>
                </MotionItem>
              ))}
            </div>
          </MotionGroup>
        </div>
      </section>
    </MotionSection>
  );
}