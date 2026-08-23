import type {
  InvitationTemplate,
  TemplateProps,
} from "../types";
import Cover from "./Cover";
import Footer from "./Footer";
import Hero from "./Hero";
import Couple from "./Couple";
import Story from "./Story";
import Event from "./Event";
import Gallery from "./Gallery";
import RSVP from "./RSVP";
import Gift from "./Gift";
import LiveStream from "./LiveStream";

function Template001Cover({ invitation }: TemplateProps) {
  const galleryImages =
    invitation.gallery
      ?.split(",")
      .map((image: string) => image.trim())
      .filter(Boolean) ?? [];

  return (
    <Cover
      groomName={invitation.groom_name ?? ""}
      brideName={invitation.bride_name ?? ""}
      guestName={invitation.guest_name ?? ""}
      galleryImages={galleryImages}
    />
  );
}

function Template001Footer({ invitation }: TemplateProps) {
  return (
    <Footer
      groomName={invitation.groom_name ?? ""}
      brideName={invitation.bride_name ?? ""}
      weddingDate={invitation.wedding_date ?? ""}
    />
  );
}

export const template001: InvitationTemplate = {
  id: "template-001",
  name: "Template 001",
  description:
    "Template dasar yang sedang dimigrasikan dari halaman undangan utama.",

Cover: Template001Cover,
Hero,
Couple,
Story,
Event,
LiveStream,
Gallery,
RSVP,
Gift,
Footer: Template001Footer,
};
