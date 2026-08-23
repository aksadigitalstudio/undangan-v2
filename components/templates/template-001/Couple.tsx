import Image from "next/image";
import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import { themes } from "@/lib/themes";
import MotionGroup from "@/components/motion/MotionGroup";
import MotionItem from "@/components/motion/MotionItem";
import MotionSection from "@/components/motion/MotionSection";

export default function Couple({ invitation }: TemplateProps) {
  const data = invitation;

  const sections = {
    ...defaultSections,
    ...(data.sections ?? {}),
  };

  const currentTheme =
    themes[data.theme as keyof typeof themes] ??
    themes["elegant-gold"];

  if (!sections.couple) {
    return null;
  }

  return (
    <MotionSection>
      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-6xl text-center">
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
            Bride & Groom
          </p>

          <h2
            className="mb-20 font-serif text-5xl text-white md:text-6xl"
            style={{
              WebkitTextStroke: "1px rgba(0,0,0,0.45)",
              textShadow: "0 4px 18px rgba(0,0,0,0.35)",
            }}
          >
            The Happy Couple
          </h2>

          <MotionGroup>
            <div className="grid items-center gap-16 md:grid-cols-[1fr_140px_1fr]">
              <MotionItem>
                <div
                  className="rounded-3xl border px-8 py-12 shadow-2xl"
                  style={{
                    background: currentTheme.card,
                    borderColor: currentTheme.divider,
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div className="relative mb-10">
                      <div
                        className="absolute inset-0 scale-110 rounded-full border"
                        style={{ borderColor: currentTheme.divider }}
                      />

                      <Image
                        src={data.groom_photo}
                        alt={data.groom_name}
                        width={260}
                        height={260}
                        quality={85}
                        sizes="240px"
                        className="relative h-60 w-60 rounded-full border-[6px] border-white object-cover object-center shadow-2xl"
                      />
                    </div>

                    <h3
                      className="text-center font-serif text-4xl"
                      style={{ color: currentTheme.text }}
                    >
                      {data.groom_name}
                    </h3>

                    <div
                      className="my-6 h-px w-20"
                      style={{ background: currentTheme.accent }}
                    />

                    <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                      Son of
                    </p>

                    <p
                      className="mt-5 text-center text-base leading-8"
                      style={{ color: currentTheme.text }}
                    >
                      {data.groom_father}
                    </p>

                    <p
                      className="text-center text-base leading-8"
                      style={{ color: currentTheme.text }}
                    >
                      {data.groom_mother}
                    </p>
                  </div>
                </div>
              </MotionItem>

              <div className="hidden items-center justify-center md:flex">
                <div className="flex flex-col items-center">
                  <div
                    className="h-20 w-px"
                    style={{ background: currentTheme.accent }}
                  />

                  <p
                    className="my-6 text-6xl"
                    style={{ color: currentTheme.accent }}
                  >
                    囍
                  </p>

                  <div
                    className="h-20 w-px"
                    style={{ background: currentTheme.accent }}
                  />
                </div>
              </div>

              <MotionItem>
                <div
                  className="rounded-3xl border px-8 py-12 shadow-2xl"
                  style={{
                    background: currentTheme.card,
                    borderColor: currentTheme.divider,
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div className="relative mb-10">
                      <div
                        className="absolute inset-0 scale-110 rounded-full border"
                        style={{ borderColor: currentTheme.divider }}
                      />

                      <Image
                        src={data.bride_photo}
                        alt={data.bride_name}
                        width={260}
                        height={260}
                        quality={85}
                        sizes="240px"
                        className="relative h-60 w-60 rounded-full border-[6px] border-white object-cover object-center shadow-2xl"
                      />
                    </div>

                    <h3
                      className="text-center font-serif text-4xl"
                      style={{ color: currentTheme.text }}
                    >
                      {data.bride_name}
                    </h3>

                    <div
                      className="my-6 h-px w-20"
                      style={{ background: currentTheme.accent }}
                    />

                    <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                      Daughter of
                    </p>

                    <p
                      className="mt-5 text-center text-base leading-8"
                      style={{ color: currentTheme.text }}
                    >
                      {data.bride_father}
                    </p>

                    <p
                      className="text-center text-base leading-8"
                      style={{ color: currentTheme.text }}
                    >
                      {data.bride_mother}
                    </p>
                  </div>
                </div>
              </MotionItem>
            </div>
          </MotionGroup>
        </div>
      </section>
    </MotionSection>
  );
}