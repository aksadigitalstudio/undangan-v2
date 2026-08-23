import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import MotionSection from "@/components/motion/MotionSection";
import RSVPForm from "@/components/RSVPForm";
import Guestbook from "@/components/Guestbook";

export default function RSVP({
  invitation,
  guest,
}: TemplateProps) {
  const data = invitation;

  const sections = {
    ...defaultSections,
    ...(data.sections ?? {}),
  };

  if (!sections.rsvp) {
    return null;
  }

  return (
    <MotionSection>
      <section className="relative z-10 overflow-hidden bg-[#7A0711] px-5 py-24 md:py-32">
        <style>{`
          .imperial-rsvp input,
          .imperial-rsvp select,
          .imperial-rsvp textarea {
            border-color: rgba(181, 39, 44, 0.38) !important;
            background: rgba(255, 249, 231, 0.96) !important;
            color: #651018 !important;
          }

          .imperial-rsvp button {
            background: #B71925 !important;
            color: #FFF8E5 !important;
          }

          .imperial-rsvp button:hover {
            background: #D12A35 !important;
          }

          @keyframes imperial-rsvp-petal-left {
            0% {
              transform: translate3d(-110px, 35px, 0) rotate(0deg) scale(0.7);
              opacity: 0;
            }

            16% {
              opacity: 0.7;
            }

            70% {
              opacity: 0.55;
            }

            100% {
              transform: translate3d(330px, -95px, 0) rotate(300deg) scale(1.1);
              opacity: 0;
            }
          }

          @keyframes imperial-rsvp-petal-right {
            0% {
              transform: translate3d(110px, -20px, 0) rotate(0deg) scale(0.7);
              opacity: 0;
            }

            16% {
              opacity: 0.7;
            }

            70% {
              opacity: 0.55;
            }

            100% {
              transform: translate3d(-330px, 95px, 0) rotate(-300deg) scale(1.1);
              opacity: 0;
            }
          }

          .imperial-rsvp-petal-left {
            animation: imperial-rsvp-petal-left 8s linear infinite;
          }

          .imperial-rsvp-petal-right {
            animation: imperial-rsvp-petal-right 9s linear infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .imperial-rsvp-petal-left,
            .imperial-rsvp-petal-right {
              animation: none;
            }
          }
        `}</style>

        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#9E1320]/80 via-[#750811]/90 to-[#3F0308]/95" />

        <div
          className="pointer-events-none absolute left-[4%] top-[24%] z-[2] text-5xl text-[#F7C85D]/70"
          aria-hidden="true"
        >
          <span className="imperial-rsvp-petal-left block">❀</span>
        </div>

        <div
          className="pointer-events-none absolute left-[9%] top-[74%] z-[2] text-4xl text-[#FFB9A9]/55"
          aria-hidden="true"
        >
          <span
            className="imperial-rsvp-petal-left block"
            style={{ animationDelay: "-4s" }}
          >
            ✦
          </span>
        </div>

        <div
          className="pointer-events-none absolute right-[4%] top-[38%] z-[2] text-5xl text-[#F7C85D]/70"
          aria-hidden="true"
        >
          <span className="imperial-rsvp-petal-right block">❀</span>
        </div>

        <div
          className="pointer-events-none absolute right-[9%] top-[82%] z-[2] text-4xl text-[#FFB9A9]/55"
          aria-hidden="true"
        >
          <span
            className="imperial-rsvp-petal-right block"
            style={{ animationDelay: "-5s" }}
          >
            ✦
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.6em] text-[#FFE19A]">
              敬候佳音
            </p>

            <div className="mx-auto my-6 h-px w-20 bg-[#F7C85D]" />

            <h2 className="font-serif text-5xl italic text-[#FFF4D8] md:text-6xl">
              RSVP
            </h2>

            <p className="mx-auto mt-5 max-w-md font-serif text-sm italic leading-7 text-[#FFE8BD]">
              Your presence and heartfelt blessings would mean the
              world to us.
            </p>
          </div>

          <div className="imperial-rsvp space-y-12">
            <div className="relative overflow-hidden rounded-t-[120px] border-4 border-[#E9BC55] bg-[#FFF3D2] px-5 pb-7 pt-14 shadow-[0_22px_52px_rgba(35,0,4,0.45)] md:px-10 md:pb-10">
              <div className="pointer-events-none absolute inset-x-5 top-4 h-20 rounded-t-[100px] border-x border-t border-[#B71925]/25 md:inset-x-8" />

              <div className="relative mb-8 text-center">
                <p className="text-[10px] uppercase tracking-[0.45em] text-[#A30F1B]">
                  Attendance Confirmation
                </p>

                <div className="mx-auto mt-4 h-px w-12 bg-[#C89B3C]" />
              </div>

              <RSVPForm invitationId={data.id} guest={guest ?? null} />
            </div>

            <div className="relative overflow-hidden rounded-b-[120px] border-4 border-[#E9BC55] bg-[#FFF3D2] px-5 pb-14 pt-7 shadow-[0_22px_52px_rgba(35,0,4,0.45)] md:px-10 md:pb-20">
              <div className="pointer-events-none absolute inset-x-5 bottom-4 h-20 rounded-b-[100px] border-b border-x border-[#B71925]/25 md:inset-x-8" />

              <div className="relative mb-8 text-center">
                <p className="text-[10px] uppercase tracking-[0.45em] text-[#A30F1B]">
                  Wishes for the Couple
                </p>

                <div className="mx-auto mt-4 h-px w-12 bg-[#C89B3C]" />
              </div>

              <Guestbook invitationId={data.id} />
            </div>
          </div>
        </div>
      </section>
    </MotionSection>
  );
}