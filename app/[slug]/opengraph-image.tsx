import { ImageResponse } from "next/og";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const alt = "AKSA Digital Studio wedding invitation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 300;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aksadigitalstudio.com";

function formatDate(value: string | null) {
  if (!value) return "A celebration to remember";

  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function imageUrl(value: string | null) {
  if (!value) return null;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${siteUrl}${value.startsWith("/") ? value : `/${value}`}`;
}

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let invitation: {
    groom_name: string | null;
    bride_name: string | null;
    wedding_date: string | null;
    hero_background: string | null;
  } | null = null;

  try {
    const { data } = await createAdminClient()
      .from("invitations")
      .select("groom_name, bride_name, wedding_date, hero_background")
      .eq("slug", slug)
      .eq("status", "Published")
      .single();

    invitation = data;
  } catch {
    invitation = null;
  }

  const groom = invitation?.groom_name || "The Groom";
  const bride = invitation?.bride_name || "The Bride";
  const hero = imageUrl(invitation?.hero_background ?? null);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 36,
          background: "#f8f3ea",
          color: "#182235",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            overflow: "hidden",
            border: "2px solid #c99f5d",
            background: "#182235",
            boxShadow: "0 20px 60px rgba(24, 34, 53, 0.22)",
          }}
        >
          <div style={{ width: 446, height: "100%", display: "flex", position: "relative", background: "#d9c4a5" }}>
            {hero ? (
              // Open Graph images are generated server-side; next/image cannot be rendered by ImageResponse.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={hero} alt="" width="446" height="558" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #e7d6bd, #c99f5d)" }}>
                <span style={{ fontSize: 120, color: "#182235" }}>A</span>
              </div>
            )}
            <div style={{ position: "absolute", inset: 0, display: "flex", background: "linear-gradient(90deg, transparent 48%, rgba(24,34,53,.32))" }} />
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "54px 58px", background: "linear-gradient(135deg, #17233a, #0e1728)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "sans-serif" }}>
              <div style={{ display: "flex", width: 34, height: 34, alignItems: "center", justifyContent: "center", border: "1px solid #d8b36d", borderRadius: 17, color: "#f7ead1", fontSize: 18 }}>A</div>
              <span style={{ color: "#f7ead1", fontSize: 18, letterSpacing: 5 }}>AKSA DIGITAL STUDIO</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#d8b36d", fontFamily: "sans-serif", fontSize: 16, letterSpacing: 5 }}>THE WEDDING OF</span>
              <span style={{ marginTop: 22, color: "#fffaf1", fontSize: 62, lineHeight: 1.05 }}>{groom}</span>
              <span style={{ marginTop: 7, color: "#d8b36d", fontSize: 42, fontStyle: "italic" }}>&amp;</span>
              <span style={{ marginTop: 7, color: "#fffaf1", fontSize: 62, lineHeight: 1.05 }}>{bride}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#f7ead1", fontFamily: "sans-serif", fontSize: 20, letterSpacing: 2 }}>
              <div style={{ width: 42, height: 1, background: "#d8b36d" }} />
              <span>{formatDate(invitation?.wedding_date ?? null)}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
