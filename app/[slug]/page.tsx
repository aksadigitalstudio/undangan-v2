import TemplateRenderer from "@/components/templates/TemplateRenderer";
import DecorLayer from "@/components/DecorLayer";
import { defaultSections } from "@/lib/defaultSections";
import { themes } from "@/lib/themes";
import { createClient } from "@/lib/supabase/server";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string }>;
}

export default async function InvitationPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const query = await searchParams;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("slug", slug)
    .eq("status", "Published")
    .single();

  if (error || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Undangan tidak ditemukan</h1>
      </main>
    );
  }

  let guest = null;

  if (query.to) {
    const { data: guestData } = await supabase.rpc("get_guest_rsvp", {
      p_invitation_id: data.id,
      p_rsvp_token: query.to,
    });

    const matchedGuest = guestData?.[0];

    if (matchedGuest) {
      guest = { ...matchedGuest, rsvp_token: query.to };
    }
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
        guest={guest}
        sections={sections}
      />
    </main>
  );
}
