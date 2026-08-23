import { templateRegistry } from "./registry";
import { TemplateProps } from "./types";
import MusicPlayer from "@/components/MusicPlayer";
interface TemplateRendererProps extends TemplateProps {
  templateId: string;
}

export default function TemplateRenderer({
  templateId,
  invitation,
  guest,
  sections,
}: TemplateRendererProps) {
  const template = templateRegistry[templateId];

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
    <template.Cover invitation={invitation} />

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

    {sections?.gift !== false && (
      <template.Gift invitation={invitation} />
    )}

    <template.Footer invitation={invitation} />
     {sections?.music !== false && invitation.music && (
      <MusicPlayer musicUrl={invitation.music} />
    )}   
  </>
);
}