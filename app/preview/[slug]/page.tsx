import { redirect } from "next/navigation";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import DecorLayer from "@/components/DecorLayer";
import { defaultSections } from "@/lib/defaultSections";
import { themes } from "@/lib/themes";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function TemplatePreviewPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();

  if (!claims?.claims?.sub) {
    redirect(`/login?next=${encodeURIComponent(`/preview/${slug}`)}`);
  }

  const { data, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Undangan tidak ditemukan</h1>
      </main>
    );
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
          : { background: currentTheme.background };

  const overlayStyle =
    data.template_id === "template-003"
      ? { background: "transparent" }
      : data.template_id === "template-002"
        ? {
            background:
              data.theme === "luxury-black"
                ? "rgba(0,0,0,0.45)"
                : "rgba(0,0,0,0.25)",
          }
        : { background: "transparent" };

  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-fixed"
      style={{ ...backgroundStyle, color: "var(--inv-text)" }}
    >
      <div className="fixed inset-0 -z-10" style={backgroundStyle} />
      <div className="pointer-events-none fixed inset-0 -z-10" style={overlayStyle} />

      <DecorLayer theme={data.theme} templateId={data.template_id} />

      <TemplateRenderer
        templateId={data.template_id ?? "template-001"}
        invitation={data}
        sections={sections}
      />
    </main>
  );
}
