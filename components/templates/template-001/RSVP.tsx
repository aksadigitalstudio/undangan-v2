import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import MotionGroup from "@/components/motion/MotionGroup";
import MotionItem from "@/components/motion/MotionItem";
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
      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <MotionGroup>
              <MotionItem>
                <p
                  className="mb-3 text-sm uppercase tracking-[0.45em]"
                  style={{
                    color: "#FFFFFF",
                    textShadow: "0 2px 8px rgba(0,0,0,0.45)",
                  }}
                >
                  RSVP
                </p>
              </MotionItem>

              <MotionItem>
                <h2
                  className="whitespace-nowrap font-serif text-4xl text-white md:text-5xl"
                  style={{
                    WebkitTextStroke: "1px rgba(0,0,0,0.45)",
                    textShadow: "0 4px 18px rgba(0,0,0,0.35)",
                  }}
                >
                  Will You Attend?
                </h2>
              </MotionItem>
            </MotionGroup>
          </div>

          <MotionGroup>
            <MotionItem>
              <RSVPForm
                invitationId={data.id}
                guest={guest ?? null}
              />
            </MotionItem>

            <MotionItem>
              <Guestbook invitationId={data.id} />
            </MotionItem>
          </MotionGroup>
        </div>
      </section>
    </MotionSection>
  );
}