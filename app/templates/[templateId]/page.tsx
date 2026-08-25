import { notFound } from "next/navigation";
import DecorLayer from "@/components/DecorLayer";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import { defaultSections } from "@/lib/defaultSections";
import { themes } from "@/lib/themes";
import { templateCatalog } from "@/components/TemplateGallery";

type Props = { params: Promise<{ templateId: string }> };

const previewData = {
  groom_name: "Ferren",
  bride_name: "James",
  guest_name: "Bapak / Ibu / Saudara",
  wedding_date: "12 Agustus 2026",
  wedding_time: "10.00 WIB",
  venue: "The Imperial Garden",
  address: "Jakarta Selatan",
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
  account_name: "Ferren & James",
  gift_address: "Jl. Kebahagiaan No. 8, Jakarta",
  gallery: "/decor/chinese-imperial/background/chinese-imperial-cover-v1.png,/decor/elegant-gold/background/luxury-paper.webp",
  live_stream_title: "Saksikan secara online",
  live_stream_url: "",
};

export default async function TemplatePreviewPage({ params }: Props) {
  const { templateId } = await params;
  const template = templateCatalog.find((item) => item.id === templateId);

  if (!template) notFound();

  const theme = templateId === "template-003" ? "forest-green" : templateId === "template-004" ? "luxury-black" : "elegant-gold";
  const invitation = {
    ...previewData,
    id: 0,
    template_id: templateId,
    theme,
    hero_background: templateId === "template-002" ? "/decor/sekar-sogan/background/sekar-sogan-background-v1.png" : "",
    sections: { ...defaultSections, live_stream: false },
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
