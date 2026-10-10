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

function formatDate(value: string | null) {
  if (!value) return "";

  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; code: string }> },
) {
  const { slug, code } = await params;

  if (!/^[a-z0-9-]+$/i.test(slug) || !/^[a-z0-9]{10}$/i.test(code)) {
    return new Response("Not found", { status: 404 });
  }

  const { data: previews } = await createPublicClient().rpc("get_guest_short_share_preview", {
    p_slug: slug,
    p_share_code: code,
  });
  const invitation = previews?.[0] ?? null;

  if (!invitation) {
    return new Response("Not found", { status: 404 });
  }

  const groom = getDisplayName(invitation, invitation.sections, "groom");
  const bride = getDisplayName(invitation, invitation.sections, "bride");
  const couple = `${groom} & ${bride}`.trim();
  const date = formatDate(invitation.wedding_date);
  const title = `The Wedding of ${couple}${date ? ` · ${date}` : ""}`;
  const description = "Digital Invitation by AKSA Digital Studio";
  const canonical = `${siteUrl}/${slug}/g/${code}`;
  const destination = `${siteUrl}/${slug}?to=${invitation.rsvp_token}`;
  const redirectScript = JSON.stringify(destination).replace(/</g, "\\u003c");

  return new Response(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="AKSA Digital Studio" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${description}" />
    <script>window.location.replace(${redirectScript});</script>
  </head>
  <body>
    <p>Opening invitation… <a href="${escapeHtml(destination)}">Continue</a></p>
  </body>
</html>`, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
