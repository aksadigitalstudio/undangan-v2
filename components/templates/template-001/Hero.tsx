import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import { themes } from "@/lib/themes";
import MotionGroup from "@/components/motion/MotionGroup";
import MotionItem from "@/components/motion/MotionItem";
import MotionSection from "@/components/motion/MotionSection";
import SectionDivider from "@/components/SectionDivider";
import WeddingCountdown from "@/components/WeddingCountdown";

export default function Hero({ invitation }: TemplateProps) {
  const data = invitation;

  const sections = {
    ...defaultSections,
    ...(data.sections ?? {}),
  };

  const currentTheme =
    themes[data.theme as keyof typeof themes] ??
    themes["elegant-gold"];

  if (!sections.hero && !sections.countdown) {
    return null;
  }

  const groomName = data.groom_name?.split(" ")[0] ?? "";
  const brideName = data.bride_name?.split(" ")[0] ?? "";

  return (
    <>
      {sections.hero && (
        <MotionSection>
          <section className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
            <div
              className="relative z-10 mx-auto max-w-3xl rounded-[32px] border px-8 py-12 text-center shadow-[0_18px_46px_rgba(27,36,55,0.14)] backdrop-blur-md md:px-14 md:py-16"
              style={{
                background: `${currentTheme.card}E8`,
                borderColor: currentTheme.divider,
              }}
            >
              <MotionGroup>
                <MotionItem>
                  <p
                    className="mb-8 text-6xl md:text-7xl"
                    style={{ color: currentTheme.accent }}
                  >
                    囍
                  </p>
                </MotionItem>

                <MotionItem>
                  <div
                    className="mx-auto mb-10 h-px w-28"
                    style={{ background: currentTheme.accent }}
                  />
                </MotionItem>

                <MotionItem>
                  <p
                    className="mb-8 text-xs uppercase tracking-[0.55em] md:text-sm"
                    style={{ color: currentTheme.text, opacity: 0.72 }}
                  >
                    The Wedding Of
                  </p>
                </MotionItem>

                <MotionItem>
                  <h1
                    className="font-serif text-5xl leading-tight md:text-6xl"
                    style={{ color: currentTheme.text }}
                  >
                    {groomName}
                    <br />
                    &
                    <br />
                    {brideName}
                  </h1>
                </MotionItem>

                <MotionItem>
                  <div
                    className="mx-auto my-8 h-px w-24"
                    style={{ background: currentTheme.accent }}
                  />
                </MotionItem>

                <MotionItem>
                  <p
                    className="text-xs uppercase tracking-[0.55em] md:text-sm"
                    style={{ color: currentTheme.text, opacity: 0.72 }}
                  >
                    Save The Date
                  </p>
                </MotionItem>

                <MotionItem>
                  <p
                    className="mt-3 font-serif text-2xl"
                    style={{ color: currentTheme.text }}
                  >
                    {data.wedding_date}
                  </p>
                </MotionItem>

                <MotionItem>
                  <p
                    className="mt-2"
                    style={{ color: currentTheme.text, opacity: 0.78 }}
                  >
                    {data.reception_venue}
                  </p>
                </MotionItem>
              </MotionGroup>
            </div>
          </section>
        </MotionSection>
      )}

      {sections.countdown && (
        <MotionSection>
          <SectionDivider />

          <section className="relative z-10 px-6 py-24">
            <div className="mx-auto max-w-5xl">
              <div
                className="rounded-3xl border px-8 py-12 text-center shadow-2xl backdrop-blur-md"
                style={{
                  background: currentTheme.card,
                  borderColor: currentTheme.divider,
                }}
              >
                <MotionGroup>
                  <MotionItem>
                    <p
                      className="mb-3 uppercase tracking-[0.25em]"
                      style={{ color: currentTheme.text }}
                    >
                      Save The Date
                    </p>
                  </MotionItem>

                  <MotionItem>
                    <h2
                      className="mb-10 font-serif text-4xl"
                      style={{ color: currentTheme.text }}
                    >
                      {data.wedding_date}
                    </h2>
                  </MotionItem>

                  <MotionItem>
                    <WeddingCountdown
                      targetDate={data.wedding_date}
                      theme={currentTheme}
                    />
                  </MotionItem>
                </MotionGroup>
              </div>
            </div>
          </section>
        </MotionSection>
      )}
    </>
  );
}