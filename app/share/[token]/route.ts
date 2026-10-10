import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getDisplayName } from "@/lib/displayNames";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aksadigitalstudio.com";

function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) throw new Error("Supabase public credentials are not configured.");

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getSocialImage(value: string | null | undefined, fallback: string, version: string, nonce: string | null) {
  const source = value?.trim();
  if (!source || !/^https?:\/\//i.test(source)) return fallback;

  const image = new URL(source);
  image.searchParams.set("og", version);
  if (nonce) image.searchParams.set("share", nonce);
  return image.toString();
}

function page(title: string, description: string, image: string, destination: string, canonical: string) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safeImage = escapeHtml(image);
  const safeDestination = escapeHtml(destination);
  const safeCanonical = escapeHtml(canonical);

  return `<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDescription}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="AKSA Digital Studio" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:url" content="${safeCanonical}" />
    <meta property="og:image" content="${safeImage}" />
    <meta property="og:image:secure_url" content="${safeImage}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${safeTitle}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="${safeImage}" />
    <script>window.location.replace(${JSON.stringify(destination).replace(/</g, "\\u003c")});</script>
  </head>
  <body>
    <p>Opening invitation… <a href="${safeDestination}">Continue</a></p>
  </body>
</html>`;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const nonce = request.nextUrl.searchParams.get("share");
  const version = request.nextUrl.searchParams.get("v");

  if (!/^[0-9a-f-]{36}$/i.test(token)) {
    return new Response("Not found", { status: 404 });
  }

  const { data: previews } = await createPublicClient()
    .rpc("get_share_preview_v2", { p_rsvp_token: token });
  const invitation = previews?.[0] ?? null;

  if (!invitation) {
    return new Response("Not found", { status: 404 });
  }

  const groom = getDisplayName(invitation, invitation.sections, "groom");
  const bride = getDisplayName(invitation, invitation.sections, "bride");
  const couple = `${groom} & ${bride}`.trim();
  const title = `The Wedding of ${couple} | AKSA Digital Studio`;
  const description = `With joy, we invite you to celebrate ${couple}. Open the invitation for event details and RSVP.`;
  const imageVersion = version && /^\d{1,16}$/.test(version) ? version : "1";
  const imageParams = new URLSearchParams({ v: imageVersion });
  if (nonce && /^[a-z0-9_-]{8,}$/i.test(nonce)) imageParams.set("nonce", nonce);

  const shareParams = new URLSearchParams({ v: imageVersion });
  if (nonce && /^[a-z0-9_-]{8,}$/i.test(nonce)) shareParams.set("share", nonce);

  const canonical = `${siteUrl}/share/${token}?${shareParams.toString()}`;
  const destination = `${siteUrl}/${invitation.slug}?to=${token}&${shareParams.toString()}`;
  const imageFallback = `${siteUrl}/${invitation.slug}/opengraph-image?${imageParams.toString()}`;
  const image = getSocialImage(invitation.hero_background, imageFallback, imageVersion, nonce);

  return new Response(page(title, description, image, destination, canonical), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
