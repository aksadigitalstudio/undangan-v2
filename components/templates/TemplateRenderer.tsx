"use client";

import { templateRegistry } from "./registry";
import type { TemplateProps } from "./types";
import MusicPlayer from "@/components/MusicPlayer";
import InvitationCanvasCover from "@/components/studio/InvitationCanvasCover";
import { isCanvasDocument } from "@/components/studio/canvasTypes";
import GuestCheckInQr from "@/components/check-in/GuestCheckInQr";
interface TemplateRendererProps extends TemplateProps {
  templateId: string;
  showCover?: boolean;
  showMusic?: boolean;
}

export default function TemplateRenderer({
  templateId,
  invitation,
  guest,
  sections,
  showCover = true,
  showMusic = true,
}: TemplateRendererProps) {
  const template = templateRegistry[templateId];
  const canvasDocument = isCanvasDocument(sections?.studio_canvas) ? sections.studio_canvas : null;

  if (!template) {
    return (
      <div className="flex min-h-screen items-center justify-center">
<p className="text-gray-500">
  Template &quot;{templateId}&quot; not found.
</p>
      </div>
    );
  }

return (
  <>
    {showCover && (canvasDocument ? <InvitationCanvasCover document={canvasDocument} /> : <template.Cover invitation={invitation} />)}

{sections?.hero !== false && (
  <template.Hero invitation={invitation} />
)}

{sections?.couple !== false && (
  <template.Couple invitation={invitation} />
)}

    {sections?.story !== false && (
      <template.Story invitation={invitation} />
    )}

    {sections?.event !== false && (
      <template.Event invitation={invitation} />
    )}
    {sections?.live_stream === true && template.LiveStream && (
      <template.LiveStream
        invitation={invitation}
      />
    )}
    {sections?.gallery !== false && (
      <template.Gallery invitation={invitation} />
    )}

    {sections?.rsvp !== false && (
      <template.RSVP
        invitation={invitation}
        guest={guest}
      />
    )}

    {guest?.check_in_token && !invitation.is_demo && (
      <div className="relative z-10 border-y border-[#182235]/10 bg-[#fffdf8] px-5 py-12 text-center text-[#182235] sm:px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#e65d51]">AKSA event pass</p>
        <h2 className="mt-3 font-serif text-3xl">Your arrival, beautifully simple.</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#657087]">Show your personal QR pass to the welcome team when you arrive.</p>
        <div className="mt-6"><GuestCheckInQr invitationId={Number(invitation.id)} guestName={guest.guest_name} token={guest.check_in_token} triggerLabel="Open my event pass" triggerClassName="rounded-full bg-[#182235] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#2a3b5b]" /></div>
      </div>
    )}

    {sections?.gift !== false && (
      <template.Gift invitation={invitation} />
    )}

    <template.Footer invitation={invitation} />
     {showMusic && sections?.music !== false && invitation.music && (
      <MusicPlayer musicUrl={invitation.music} />
    )}   
  </>
);
}
