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
  groom_photo: "/decor/puspa-priangan/background/puspa-priangan-couple-landscape-v2.png",
  bride_photo: "/decor/puspa-priangan/background/puspa-priangan-couple-scene.png",
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
  gallery: "/decor/puspa-priangan/background/puspa-priangan-couple-landscape-v2.png,/decor/puspa-priangan/background/puspa-priangan-couple-scene.png",
  live_stream_title: "Saksikan secara online",
  live_stream_url: "",
  music: "__aksa_demo_music__",
};

const demoByTemplate: Record<string, Partial<typeof previewData>> = {
  "template-001": { groom_name: "Raka", bride_name: "Alya", wedding_date: "2026-11-14", akad_date: "2026-11-14", reception_date: "2026-11-14", account_name: "Raka & Alya" },
  "template-002": { groom_name: "Bima", bride_name: "Sekar", wedding_date: "2026-10-24", akad_date: "2026-10-24", reception_date: "2026-10-24", account_name: "Bima & Sekar" },
  "template-003": { groom_name: "Rendra", bride_name: "Puspa", wedding_date: "2026-09-19", akad_date: "2026-09-19", reception_date: "2026-09-19", account_name: "Rendra & Puspa" },
  "template-004": { groom_name: "Ferren", bride_name: "James", wedding_date: "2026-12-12", akad_date: "2026-12-12", reception_date: "2026-12-12", account_name: "Ferren & James" },
};

const galleryByTemplate: Record<string, string> = {
  "template-001": "/decor/puspa-priangan/background/puspa-priangan-couple-landscape-v2.png,/decor/elegant-gold/background/luxury-paper.webp",
  "template-002": "/decor/sekar-sogan/background/sekar-sogan-background-v1.png,/decor/sekar-sogan/foreground/sekar-sogan-ornament.png",
  "template-003": "/decor/puspa-priangan/background/puspa-priangan-couple-landscape-v2.png,/decor/puspa-priangan/background/puspa-priangan-couple-scene.png",
  "template-004": "/decor/chinese-imperial/background/chinese-imperial-cover-v1.png,/decor/chinese-imperial/background/chinese-imperial-opening-v2.png",
};

export default async function TemplatePreviewPage({ params }: Props) {
  const { templateId } = await params;
  const template = templateCatalog.find((item) => item.id === templateId);

  if (!template) notFound();

  const theme = templateId === "template-003" ? "forest-green" : templateId === "template-004" ? "luxury-black" : "elegant-gold";
  const invitation = {
    ...previewData,
    ...demoByTemplate[templateId],
    id: 0,
    template_id: templateId,
    theme,
    hero_background: templateId === "template-003"
      ? "/decor/puspa-priangan/background/puspa-priangan-couple-landscape-v2.png"
      : templateId === "template-004"
        ? "/decor/chinese-imperial/background/chinese-imperial-cover-v1.webp"
        : templateId === "template-002"
          ? "/decor/sekar-sogan/background/sekar-sogan-background-v1.png"
          : "/decor/elegant-gold/background/luxury-paper.webp",
    sections: { ...defaultSections, live_stream: false },
    gallery: galleryByTemplate[templateId] ?? previewData.gallery,
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
