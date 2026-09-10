import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const packageCodes = ["digital-invitation", "original-love-song", "ai-love-film"] as const;
type PackageCode = (typeof packageCodes)[number];

type OrderBriefRequest = {
  packageCode?: string;
  eventType?: string;
  templateId?: string;
  eventDate?: string;
  city?: string;
  guestCount?: string;
  contactName?: string;
  whatsapp?: string;
  email?: string;
  hosts?: string;
  story?: string;
  feeling?: string;
  song?: boolean;
  film?: boolean;
  livestream?: boolean;
  deadline?: string;
  references?: string;
  notes?: string;
};

function cleanText(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function cleanDate(value: unknown) {
  const date = cleanText(value, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null;
}

function cleanPackage(value: unknown): PackageCode {
  return packageCodes.includes(value as PackageCode) ? (value as PackageCode) : "digital-invitation";
}

export async function POST(request: Request) {
  let body: OrderBriefRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid order brief." }, { status: 400 });
  }

  const contactName = cleanText(body.contactName, 120);
  const whatsapp = cleanText(body.whatsapp, 32);
  const eventType = cleanText(body.eventType, 80);
  const email = cleanText(body.email, 160).toLowerCase();

  if (contactName.length < 2 || whatsapp.length < 7 || !eventType || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Please provide your name, WhatsApp number, event type, and AKSA account email." }, { status: 400 });
  }

  const addOns = [body.song && "original_love_song", body.film && "ai_love_film", body.livestream && "livestream_setup"].filter(Boolean);

  try {
    const admin = createAdminClient();
    const { data, error } = await admin.from("order_briefs").insert({
      package_code: cleanPackage(body.packageCode),
      event_type: eventType,
      template_id: cleanText(body.templateId, 80) || null,
      event_date: cleanDate(body.eventDate),
      city: cleanText(body.city, 120) || null,
      guest_count: cleanText(body.guestCount, 40) || null,
      contact_name: contactName,
      whatsapp,
      email,
      hosts: cleanText(body.hosts, 180) || null,
      story: cleanText(body.story, 1000) || null,
      feeling: cleanText(body.feeling, 240) || null,
      add_ons: addOns,
      desired_delivery: cleanDate(body.deadline),
      reference_url: cleanText(body.references, 500) || null,
      notes: cleanText(body.notes, 1000) || null,
    }).select("id").single();

    if (error) {
      console.error("Unable to save order brief", error);
      return NextResponse.json({ message: "We could not save your brief. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ id: data.id }, { status: 201 });
  } catch (error) {
    console.error("Order brief service is unavailable", error);
    return NextResponse.json({ message: "The order service is not configured yet. Please try again shortly." }, { status: 503 });
  }
}
