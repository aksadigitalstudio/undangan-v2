import type { TemplateProps } from "../types";
import Guestbook from "@/components/Guestbook";
import MotionSection from "@/components/motion/MotionSection";
import RSVPForm from "@/components/RSVPForm";
import { getEditorialSections } from "./shared";

export default function RSVP({ invitation, guest }: TemplateProps) {
  const sections = getEditorialSections(invitation);
  if (!sections.rsvp) return null;
  const isDemo = invitation.is_demo === true;
  return (
    <MotionSection>
      <section className="relative z-10 bg-[#e8e4de] px-5 py-24 text-[#171717] sm:px-8 md:py-32"><style>{`.the-edit-rsvp input,.the-edit-rsvp select,.the-edit-rsvp textarea{border-color:rgba(23,23,23,.32)!important;background:#f7f4ee!important;color:#171717!important;border-radius:0!important}.the-edit-rsvp button{background:#171717!important;color:#fff!important;border-radius:0!important}`}</style><div className="mx-auto max-w-4xl"><div className="mb-14 border-b border-[#171717]/20 pb-6 text-center"><p className="text-[10px] font-bold uppercase tracking-[0.42em] text-[#756d64]">Your reply</p><h2 className="mt-4 font-serif text-5xl sm:text-6xl">RSVP</h2><p className="mx-auto mt-5 max-w-md text-sm leading-6 text-[#625c55]">Your presence means more to us than we can say.</p></div>{isDemo ? <p className="border border-[#171717]/20 bg-[#f7f4ee] px-6 py-5 text-center text-sm leading-6 text-[#625c55]">This is a live design preview. RSVP and guestbook will be active on each client invitation.</p> : <div className="the-edit-rsvp grid gap-14 md:grid-cols-2"><RSVPForm invitationId={invitation.id} guest={guest ?? null} /><Guestbook invitationId={invitation.id} /></div>}</div></section>
    </MotionSection>
  );
}
