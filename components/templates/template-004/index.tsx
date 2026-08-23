import type {
  InvitationTemplate,
  TemplateProps,
} from "../types";
import { Template004CoverView } from "./Cover";
import Hero from "./Hero";
import Couple from "./Couple";
import Story from "./Story";
import Event from "./Event";
import Gallery from "./Gallery";
import RSVP from "./RSVP";
import Gift from "./Gift";
import LiveStream from "./LiveStream";
import Footer from "./Footer";
import ImperialBlessing from "./ImperialBlessing";
function Template004Cover(props: TemplateProps) {
  return (
    <Template004CoverView
      invitation={props.invitation}
    />
  );
}
function Template004Hero(props: TemplateProps) {
  return (
    <>
      <Hero invitation={props.invitation} />
      <ImperialBlessing invitation={props.invitation} />
    </>
  );
}

export const template004: InvitationTemplate = {
  id: "template-004",
  name: "Chinese Imperial",
  description:
    "Chinese wedding invitation dengan panorama istana merah yang meriah.",

  Cover: Template004Cover,
Hero: Template004Hero,
Couple,
Story,
Event,
LiveStream,
Gallery,
RSVP,
Gift,
Footer,
};
