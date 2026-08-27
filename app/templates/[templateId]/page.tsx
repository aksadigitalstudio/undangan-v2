import { notFound } from "next/navigation";
import DecorLayer from "@/components/DecorLayer";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import { defaultSections } from "@/lib/defaultSections";
import { themes } from "@/lib/themes";
import { templateCatalog } from "@/components/TemplateGallery";

type Props = { params: Promise<{ templateId: string }> };

export const dynamic = "force-static";

export function generateStaticParams() {
  return [
    { templateId: "template-001" },
    { templateId: "template-002" },
    { templateId: "template-003" },
    { templateId: "template-004" },
  ];
}

const previewData = {
  groom_name: "Aditya",
  bride_name: "Nara",
  guest_name: "Bapak / Ibu / Saudara",
  wedding_date: "2026-12-12",
  wedding_time: "10.00 WIB",
  venue: "The Imperial Garden",
  address: "Jakarta Selatan",
  akad_date: "2026-12-12",
  akad_time: "08.00 WIB",
  akad_venue: "The Garden Chapel",
  akad_address: "Jl. Kemang Raya No. 12, Jakarta Selatan",
  akad_maps: "https://maps.google.com/?q=Jakarta+Selatan",
  reception_date: "2026-12-12",
  reception_time: "18.30 WIB",
  reception_venue: "The Imperial Garden",
  reception_address: "Jl. Kemang Raya No. 12, Jakarta Selatan",
  reception_maps: "https://maps.google.com/?q=Jakarta+Selatan",
  // Media is deliberately empty here. A catalog card must never borrow the
  // photos/music of another template; those values come from its own
  // published invitation below.
  groom_photo: "",
  bride_photo: "",
  groom_cutout: "",
  bride_cutout: "",
  hero_background: "",
  story: "Dua hati, satu cerita, dan perjalanan yang ingin kami rayakan bersama.",
  story1_year: "2020",
  story1_title: "First chapter",
  story1_description: "Sebuah pertemuan sederhana yang menjadi awal dari cerita panjang.",
  story2_year: "2024",
  story2_title: "The promise",
  story2_description: "Kami memilih untuk berjalan bersama dalam setiap musim.",
  story3_year: "2026",
  story3_title: "Our forever",
  story3_description: "Kini saatnya merayakan hari yang kami impikan.",
  bank_name: "Bank AKSA",
  bank_account: "1234567890",
  account_name: "Aditya & Nara",
  gift_address: "Jl. Kebahagiaan No. 8, Jakarta",
  gallery: "",
  live_stream_title: "",
  live_stream_url: "",
  music: "__aksa_demo_music__",
};

const demoByTemplate: Record<string, Partial<typeof previewData>> = {
  "template-001": { groom_name: "Aditya", bride_name: "Nara", wedding_date: "2026-11-14", akad_date: "2026-11-14", reception_date: "2026-11-14", account_name: "Aditya & Nara" },
  "template-002": { groom_name: "Agus", bride_name: "Jenny", wedding_date: "2026-10-24", akad_date: "2026-10-24", reception_date: "2026-10-24", account_name: "Agus & Jenny" },
  "template-003": { groom_name: "Rendra", bride_name: "Puspa", wedding_date: "2026-09-19", akad_date: "2026-09-19", reception_date: "2026-09-19", account_name: "Rendra & Puspa" },
  "template-004": { groom_name: "James Lou", bride_name: "Ferren Cung", wedding_date: "2026-10-31", akad_date: "2026-10-31", reception_date: "2026-10-31", account_name: "James Lou & Ferren Cung" },
};

// Curated marketing examples. They are deliberately separate from customer
// invitation records so no template can borrow media from another one.
const demoMediaByTemplate: Record<string, Partial<typeof previewData>> = {
  "template-001": {
    groom_photo: "/template-demos/template-001/groom.png",
    bride_photo: "/template-demos/template-001/bride.png",
    hero_background: "/template-demos/template-001/bride.png",
    gallery: "/template-demos/template-001/groom.png,/template-demos/template-001/bride.png",
  },
  "template-002": {
    groom_photo: "/template-demos/template-002/groom-portrait.png",
    bride_photo: "/template-demos/template-002/bride-portrait.png",
    groom_cutout: "/template-demos/template-002/groom-cutout.png",
    bride_cutout: "/template-demos/template-002/bride-cutout.png",
    hero_background: "/decor/sekar-sogan/background/sekar-sogan-background-v1.png",
    gallery: "/template-demos/template-002/gallery-1.png,/template-demos/template-002/gallery-2.png,/template-demos/template-002/gallery-3.png,/template-demos/template-002/gallery-4.png,/template-demos/template-002/gallery-5.png",
  },
  "template-003": {
    groom_photo: "/template-demos/template-003/groom-portrait.png",
    bride_photo: "/template-demos/template-003/bride-portrait.png",
    groom_cutout: "/template-demos/template-003/groom-cutout.png",
    bride_cutout: "/template-demos/template-003/bride-cutout.png",
    hero_background: "/template-demos/template-003/hero.png",
    gallery: "/template-demos/template-003/gallery-1.png,/template-demos/template-003/gallery-2.png,/template-demos/template-003/gallery-3.png,/template-demos/template-003/gallery-4.png,/template-demos/template-003/gallery-5.png,/template-demos/template-003/gallery-6.png",
  },
  "template-004": {
    groom_photo: "/template-demos/template-004/groom.png",
    bride_photo: "/template-demos/template-004/bride.png",
    hero_background: "/template-demos/template-004/hero.png",
    gallery: "/template-demos/template-004/gallery-1.png,/template-demos/template-004/gallery-2.png,/template-demos/template-004/gallery-3.png",
    live_stream_title: "Live Wedding James & Ferren",
    live_stream_url: "https://youtu.be/nI_8bXgKNWM?si=AC6ZG1Ak1xpWPcv1",
  },
};

export default async function TemplatePreviewPage({ params }: Props) {
  const { templateId } = await params;
  const template = templateCatalog.find((item) => item.id === templateId);

  if (!template) notFound();

  const theme = templateId === "template-003" ? "forest-green" : templateId === "template-004" ? "luxury-black" : "elegant-gold";
  const invitation = {
    ...previewData,
    ...demoByTemplate[templateId],
    ...demoMediaByTemplate[templateId],
    id: 0,
    template_id: templateId,
    theme,
    sections: { ...defaultSections, live_stream: templateId === "template-004" },
  };
  const currentTheme = themes[theme as keyof typeof themes] ?? themes["elegant-gold"];
  const backgroundStyle = templateId === "template-003"
    ? { backgroundImage: "url('/decor/puspa-priangan/background/puspa-priangan-canvas.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "repeat" }
    : templateId === "template-002"
      ? { backgroundImage: `url(${invitation.hero_background})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }
      : { background: currentTheme.background };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-fixed" style={{ ...backgroundStyle, color: "var(--inv-text)" }}>
      <div className="pointer-events-none fixed inset-0 -z-10" style={backgroundStyle} />
      <DecorLayer theme={theme} templateId={templateId} />
      <div className="relative z-10"><TemplateRenderer templateId={templateId} invitation={invitation} guest={null} sections={invitation.sections} /></div>
    </main>
  );
}
