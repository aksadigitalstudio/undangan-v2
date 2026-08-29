import type { InvitationTemplate } from "../types";
import Cover from "./Cover";
import Couple from "./Couple";
import Event from "./Event";
import Footer from "./Footer";
import Gallery from "./Gallery";
import Gift from "./Gift";
import Hero from "./Hero";
import LiveStream from "./LiveStream";
import RSVP from "./RSVP";
import Story from "./Story";

export const template005: InvitationTemplate = {
  id: "template-005",
  name: "The Edit",
  description: "A monochrome editorial invitation for a modern, black-tie celebration.",
  Cover,
  Hero,
  Couple,
  Story,
  Event,
  LiveStream,
  Gallery,
  RSVP,
  Gift,
  Footer,
};
