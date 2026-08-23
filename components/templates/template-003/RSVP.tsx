import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import MotionSection from "@/components/motion/MotionSection";
import RSVPForm from "@/components/RSVPForm";
import Guestbook from "@/components/Guestbook";
import SundaSectionOrnament from "./SundaSectionOrnament";

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
      <section className="relative z-10 overflow-hidden bg-[#FCF8ED] px-5 py-24 md:py-32">
        <style>{`
          .sunda-rsvp input,
          .sunda-rsvp select,
          .sunda-rsvp textarea {
            border-color: rgba(92, 126, 91, 0.55) !important;
            background: rgba(255, 253, 245, 0.94) !important;
            color: #214D3C !important;
          }

          .sunda-rsvp button {
            background: #5F805D !important;
            color: #FFFFFF !important;
          }

          .sunda-rsvp button:hover {
            background: #214D3C !important;
          }
        `}</style>

        <SundaSectionOrnament />

        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-[#9C7A38]">
              Konfirmasi Kehadiran
            </p>

            <div className="mx-auto mb-6 h-px w-20 bg-[#B89B5E]" />

            <h2 className="font-serif text-4xl text-[#214D3C] md:text-5xl">
              RSVP
            </h2>

            <p className="mx-auto mt-5 max-w-md font-serif text-sm italic leading-7 text-[#52705A]">
              Kehadiran dan doa restu Anda merupakan kebahagiaan yang
              sangat berarti bagi kami.
            </p>
          </div>

          <div className="sunda-rsvp space-y-14">
            <div>
              <div className="mb-6 border-y border-[#B7C9AF]/70 py-4 text-center">
                <p className="text-[10px] uppercase tracking-[0.42em] text-[#71916E]">
                  Konfirmasi Tamu
                </p>
              </div>

              <RSVPForm
                invitationId={data.id}
                guest={guest ?? null}
              />
            </div>

            <div>
              <div className="mb-6 border-y border-[#B7C9AF]/70 py-4 text-center">
                <p className="text-[10px] uppercase tracking-[0.42em] text-[#71916E]">
                  Ucapan dan Doa
                </p>
              </div>

              <Guestbook invitationId={data.id} />
            </div>
          </div>
        </div>
      </section>
    </MotionSection>
  );
}