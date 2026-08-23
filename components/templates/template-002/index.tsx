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
import LiveStream from "./LiveStream";
import Gallery from "./Gallery";
import RSVP from "./RSVP";
import Gift from "./Gift";

function Template002Cover({ invitation }: TemplateProps) {
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

function Template002Footer({ invitation }: TemplateProps) {
  return (
    <Footer
      groomName={invitation.groom_name ?? ""}
      brideName={invitation.bride_name ?? ""}
      weddingDate={invitation.wedding_date ?? ""}
    />
  );
}

export const template002: InvitationTemplate = {
  id: "template-002",
  name: "Sekar Sogan",
  description:
    "Javanese wedding invitation with warm soga, antique gold, and batik-inspired details.",

  Cover: Template002Cover,
  Hero,
  Couple,
  Story,
  Event,
  LiveStream,
  Gallery,
  RSVP,
  Gift,
  Footer: Template002Footer,
};