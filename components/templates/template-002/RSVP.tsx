import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import MotionSection from "@/components/motion/MotionSection";
import SekarSoganRSVPForm from "./SekarSoganRSVPForm";
import SekarSoganGuestbook from "./SekarSoganGuestbook";

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
      <section className="relative z-10 overflow-hidden px-6 py-24">
        <div className="relative mx-auto max-w-3xl">
<div className="mx-auto mb-14 max-w-3xl rounded-[28px] border border-[#D5B477]/25 bg-[#21170F]/70 px-6 py-8 text-center shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm">
  <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-[#E2B968]">
    Konfirmasi Kehadiran
  </p>

  <div className="mx-auto mb-6 h-px w-16 bg-[#D5A54D]" />

  <h2 className="font-serif text-4xl text-[#FFF6E5] md:text-5xl">
    RSVP
  </h2>

  <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#F3DEC0]/85">
    Kehadiran dan doa restu Anda merupakan kebahagiaan
    yang berarti bagi kami.
  </p>
</div>

          <div className="space-y-8">
            <div className="rounded-[32px] border border-[#D5B477]/60 bg-[#FFF8EA]/95 p-5 shadow-[0_16px_35px_rgba(78,48,24,0.14)] md:p-8">
<SekarSoganRSVPForm invitationId={data.id} guest={guest ?? null} />
            </div>

            <div className="rounded-[32px] border border-[#D5B477]/60 bg-[#FFF8EA]/95 p-5 shadow-[0_16px_35px_rgba(78,48,24,0.14)] md:p-8">
<SekarSoganGuestbook invitationId={data.id} />
            </div>
          </div>
        </div>
      </section>
    </MotionSection>
  );
}
