import Image from "next/image";

export default function SundaSectionOrnament() {
  return (
    <>
      <style>{`
        @keyframes sunda-ornament-breeze-left {
          0%, 100% {
            transform: translate3d(-8px, 8px, 0) rotate(-1deg);
            opacity: 0.16;
          }

          50% {
            transform: translate3d(10px, -10px, 0) rotate(1deg);
            opacity: 0.28;
          }
        }

        @keyframes sunda-ornament-breeze-right {
          0%, 100% {
            transform: translate3d(8px, -6px, 0) scaleX(-1) rotate(-1deg);
            opacity: 0.14;
          }

          50% {
            transform: translate3d(-10px, 10px, 0) scaleX(-1) rotate(1deg);
            opacity: 0.26;
          }
        }

        @keyframes sunda-ornament-glow {
          0%, 100% {
            opacity: 0.10;
          }

          50% {
            opacity: 0.20;
          }
        }

        .sunda-ornament-left {
          animation: sunda-ornament-breeze-left 10s ease-in-out infinite;
          transform-origin: bottom left;
        }

        .sunda-ornament-right {
          animation: sunda-ornament-breeze-right 12s ease-in-out infinite;
          transform-origin: bottom right;
        }

        .sunda-section-glow {
          animation: sunda-ornament-glow 7s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .sunda-ornament-left,
          .sunda-ornament-right,
          .sunda-section-glow {
            animation: none;
          }
        }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="sunda-section-glow absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-[#AFC8A9]/35 blur-3xl" />

        <div className="sunda-section-glow absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-[#E6CF8D]/25 blur-3xl" />

        <div className="absolute -bottom-24 -left-52 w-[420px] md:-left-40 md:w-[520px]">
          <Image
            src="/decor/puspa-priangan/foreground/puspa-priangan-rsvp-gift-ornament.png"
            alt=""
            width={720}
            height={720}
            className="sunda-ornament-left h-auto w-full"
          />
        </div>

        <div className="absolute -right-52 top-16 w-[380px] md:-right-40 md:w-[480px]">
          <Image
            src="/decor/puspa-priangan/foreground/puspa-priangan-rsvp-gift-ornament.png"
            alt=""
            width={720}
            height={720}
            className="sunda-ornament-right h-auto w-full"
          />
        </div>
      </div>
    </>
  );
}