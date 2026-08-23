import Image from "next/image";
import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import MotionGroup from "@/components/motion/MotionGroup";
import MotionItem from "@/components/motion/MotionItem";
import MotionSection from "@/components/motion/MotionSection";
import SekarSoganCountdown from "./SekarSoganCountdown";
import SekarSoganAtmosphere from "./SekarSoganAtmosphere";
import FloatingCoupleDecor from "./FloatingCoupleDecor";
const sekarSoganTheme = {
  background: "#F7EEDB",
  card: "#FFF9ED",
  text: "#3B2417",
  accent: "#9C6A24",
  divider: "rgba(156, 106, 36, 0.35)",
};

export default function Hero({ invitation }: TemplateProps) {
  const data = invitation;

  const sections = {
    ...defaultSections,
    ...(data.sections ?? {}),
  };

  if (!sections.hero && !sections.countdown) {
    return null;
  }

  const groomName = data.groom_name?.split(" ")[0] ?? "";
  const brideName = data.bride_name?.split(" ")[0] ?? "";

return (
  <>
    <style>{`
      body:has([data-sekar-sogan="true"]) [data-global-decor="true"] {
        display: none !important;
      }

      @keyframes sekar-sogan-float {
        0%, 100% {
          transform: translateX(-50%) translateY(0);
        }
50% { transform: translateX(-50%) translateY(-38px); }
      }

      @keyframes sekar-sogan-sway-left {
        0%, 100% {
          transform: translate3d(0, 0, 0) rotate(-2deg);
        }
        50% {
          transform: translate3d(12px, 16px, 0) rotate(2deg);
        }
      }

      @keyframes sekar-sogan-sway-right {
        0%, 100% {
          transform: translate3d(0, 0, 0) scaleX(-1) rotate(-2deg);
        }
        50% {
          transform: translate3d(-12px, 16px, 0) scaleX(-1) rotate(2deg);
        }
      }

      @keyframes sekar-sogan-glow {
        0%, 100% {
          opacity: 0.22;
        }
        50% {
          opacity: 0.48;
        }
      }

.sekar-sogan-bottom-ornament { animation: sekar-sogan-float 7s ease-in-out infinite; }

      .sekar-sogan-top-left {
        animation: sekar-sogan-sway-left 15s ease-in-out infinite;
      }

      .sekar-sogan-top-right {
        animation: sekar-sogan-sway-right 17s ease-in-out infinite;
      }

      .sekar-sogan-glow {
        animation: sekar-sogan-glow 8s ease-in-out infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .sekar-sogan-bottom-ornament,
        .sekar-sogan-top-left,
        .sekar-sogan-top-right,
        .sekar-sogan-glow {
          animation: none;
        }
      }
    `}</style>

    <div
      data-sekar-sogan="true"
      className="hidden"
      aria-hidden="true"
    />

<div
  className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
  aria-hidden="true"
>
  <div className="sekar-sogan-glow absolute -left-24 top-[25%] h-72 w-72 rounded-full bg-[#D99A3C]/20 blur-3xl" />

  <div className="sekar-sogan-glow absolute -right-24 top-[55%] h-80 w-80 rounded-full bg-[#7A3E22]/15 blur-3xl" />

  <div className="sekar-sogan-bottom-ornament absolute -bottom-44 left-1/2 w-[min(120vw,820px)] opacity-[0.16]">
    <Image
      src="/decor/sekar-sogan/foreground/sekar-sogan-ornament.png"
      alt=""
      width={900}
      height={1350}
      className="h-auto w-full"
    />
  </div>
</div>
<SekarSoganAtmosphere />
<FloatingCoupleDecor
  groomCutout={data.groom_cutout}
  brideCutout={data.bride_cutout}
/>
      {sections.hero && (
        <MotionSection>
          <section className="relative z-10 overflow-hidden px-6 py-24">
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[36px] border border-[#C99747]/60 bg-[#F8EEDC]/95 px-8 py-20 text-center shadow-[0_24px_70px_rgba(59,36,23,0.28)] md:px-16">
              <Image
                src="/decor/sekar-sogan/foreground/sekar-sogan-ornament.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="pointer-events-none object-contain object-bottom opacity-15"
              />

              <div className="relative z-10">
                <MotionGroup>
                  <MotionItem>
                    <p className="mb-5 text-xs uppercase tracking-[0.5em] text-[#7A4A2A]">
                      Pawiwahan
                    </p>
                  </MotionItem>

                  <MotionItem>
                    <div className="mx-auto mb-8 h-px w-24 bg-[#B98637]" />
                  </MotionItem>

                  <MotionItem>
                    <p className="mb-5 font-serif text-2xl text-[#6B3A23] md:text-3xl">
                      Dengan penuh sukacita
                    </p>
                  </MotionItem>

                  <MotionItem>
                    <h1 className="font-serif text-5xl leading-tight text-[#3B2417] md:text-7xl">
                      {groomName}
                      <br />
                      <span className="text-[#A66C26]">&amp;</span>
                      <br />
                      {brideName}
                    </h1>
                  </MotionItem>

                  <MotionItem>
                    <div className="mx-auto my-8 h-px w-24 bg-[#B98637]" />
                  </MotionItem>

                  <MotionItem>
                    <p className="mx-auto max-w-lg text-base leading-8 text-[#5D3A27] md:text-lg">
                      Kami mengundang Bapak, Ibu, Saudara, dan Sahabat
                      untuk berbagi kebahagiaan di hari istimewa kami.
                    </p>
                  </MotionItem>

                  <MotionItem>
                    <p className="mt-8 text-sm uppercase tracking-[0.3em] text-[#7A4A2A]">
                      {data.wedding_date}
                    </p>
                  </MotionItem>
                </MotionGroup>
              </div>
            </div>
          </section>
        </MotionSection>
      )}

      {sections.countdown && (
        <MotionSection>
          <section className="relative z-10 px-6 pb-24">
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[32px] border border-[#C99747]/60 bg-[#F8EEDC]/95 px-8 py-14 text-center shadow-[0_20px_60px_rgba(59,36,23,0.22)]">
              <Image
                src="/decor/sekar-sogan/foreground/sekar-sogan-ornament.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="pointer-events-none object-contain object-bottom opacity-10"
              />

              <div className="relative z-10">
                <MotionGroup>
                  <MotionItem>
                    <p className="mb-3 text-xs uppercase tracking-[0.45em] text-[#7A4A2A]">
                      Menuju Hari Bahagia
                    </p>
                  </MotionItem>

                  <MotionItem>
<h2 className="mb-8 font-serif text-4xl text-[#3B2417] md:text-5xl">
  Hitung Mundur
</h2>
                  </MotionItem>

<MotionItem>
  <SekarSoganCountdown
    targetDate={data.wedding_date}
    theme={sekarSoganTheme}
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
