import { notFound } from "next/navigation";
import DecorLayer from "@/components/DecorLayer";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import { defaultSections } from "@/lib/defaultSections";
import { themes } from "@/lib/themes";
import { templateCatalog } from "@/components/TemplateGallery";
import { createClient } from "@/lib/supabase/server";
import { template005Demo, template006Demo, template007Demo } from "@/lib/templateDemoData";

type Props = { params: Promise<{ templateId: string }> };

// Use the published invitation selected for each template as the public demo.
// Dashboard media changes then appear here without a separate, stale copy.
export const dynamic = "force-dynamic";

export default async function TemplatePreviewPage({ params }: Props) {
  const { templateId } = await params;

  if (!templateCatalog.some((template) => template.id === templateId)) {
    notFound();
  }

  const supabase = await createClient();
  const { data: publishedInvitation, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("template_id", templateId)
    .eq("status", "Published")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const data = publishedInvitation ?? (templateId === "template-005" ? template005Demo : templateId === "template-006" ? template006Demo : templateId === "template-007" ? template007Demo : null);

  if (error || !data) {
    notFound();
  }

  const sections = {
    ...defaultSections,
    ...(data.sections ?? {}),
  };

  const currentTheme =
    themes[data.theme as keyof typeof themes] ?? themes["elegant-gold"];

  const backgroundStyle =
    data.template_id === "template-003"
      ? {
          backgroundImage:
            "url('/decor/puspa-priangan/background/puspa-priangan-canvas.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }
      : data.template_id === "template-002"
        ? {
            backgroundImage: `url(${data.hero_background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }
        : data.template_id === "template-005"
          ? { background: "#f5f2ed" }
          : data.template_id === "template-006"
            ? { background: "#fff9eb" }
            : data.template_id === "template-007"
              ? { background: "#f9f7f0" }
          : { background: currentTheme.background };

  const overlayStyle =
    data.template_id === "template-003"
      ? { background: "transparent" }
      : data.template_id === "template-002"
        ? {
            background:
              data.theme === "luxury-black"
                ? "rgba(0,0,0,0.45)"
                : data.theme === "elegant-gold"
                  ? "rgba(245,241,232,0.18)"
                  : data.theme === "sakura-pink"
                    ? "rgba(255,220,230,0.15)"
                    : data.theme === "forest-green"
                      ? "rgba(25,60,35,0.25)"
                      : data.theme === "royal-blue"
                        ? "rgba(30,60,120,0.22)"
                        : "rgba(0,0,0,0.30)",
          }
        : { background: "transparent" };

  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-fixed"
      style={{ ...backgroundStyle, color: "var(--inv-text)" }}
    >
      <div className="pointer-events-none fixed inset-0 -z-10" style={backgroundStyle} />
      <div className="pointer-events-none fixed inset-0 -z-10" style={overlayStyle} />
      <DecorLayer theme={data.theme} templateId={data.template_id} />
      <TemplateRenderer
        templateId={data.template_id ?? "template-001"}
        invitation={data}
        guest={null}
        sections={sections}
      />
    </main>
  );
}
