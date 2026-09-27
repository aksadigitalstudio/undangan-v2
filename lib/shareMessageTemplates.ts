export const SHARE_TEMPLATE_IDS = [
  "aksa-signature",
  "warm-intimate",
  "indonesian-elegant",
  "modern-premium",
  "formal-family",
] as const;

export type ShareTemplateId = (typeof SHARE_TEMPLATE_IDS)[number];

export const RSVP_FOLLOW_UP_TEMPLATE_IDS = [
  "gentle-reminder",
  "warm-follow-up",
  "formal-reminder",
  "graceful-english",
] as const;

export type RsvpFollowUpTemplateId = (typeof RSVP_FOLLOW_UP_TEMPLATE_IDS)[number];

export type ShareMessageVariables = {
  guestName: string;
  groomName: string;
  brideName: string;
  weddingDate: string | null;
  invitationLink: string;
};

export const shareMessageTemplates: ReadonlyArray<{
  id: ShareTemplateId;
  label: string;
  meta: string;
  message: string;
}> = [
  {
    id: "aksa-signature",
    label: "AKSA Signature",
    meta: "Refined · English",
    message: `Dear {guestName},

With love, we invite you to celebrate the wedding of
{groomName} & {brideName}

{weddingDate}

Your personal invitation is here:
{invitationLink}

We would be honoured by your presence.`,
  },
  {
    id: "warm-intimate",
    label: "Warm & Intimate",
    meta: "Personal · English",
    message: `Hi {guestName},

A beautiful new chapter is about to begin.

{groomName} & {brideName} would love for you to be part of their day on {weddingDate}.

Open your personal invitation here:
{invitationLink}

With love,
{groomName} & {brideName}`,
  },
  {
    id: "indonesian-elegant",
    label: "Indonesian Elegant",
    meta: "Hangat · Bahasa Indonesia",
    message: `Yth. Bapak/Ibu/Saudara/i {guestName},

Dengan penuh sukacita, kami mengundang Anda untuk hadir dalam pernikahan
{groomName} & {brideName}

{weddingDate}

Silakan buka undangan personal Anda:
{invitationLink}

Merupakan kebahagiaan bagi kami apabila Anda berkenan hadir.`,
  },
  {
    id: "modern-premium",
    label: "Modern Premium",
    meta: "Clean · English",
    message: `{guestName},

You are invited to celebrate
{groomName} & {brideName}

{weddingDate}

Your invitation:
{invitationLink}

Save the date. We cannot wait to celebrate with you.`,
  },
  {
    id: "formal-family",
    label: "Formal Family",
    meta: "Sopan · Bahasa Indonesia",
    message: `Assalamu'alaikum Warahmatullahi Wabarakatuh.

Yth. {guestName},

Dengan memohon rahmat dan ridho Tuhan Yang Maha Esa, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan:

{groomName} & {brideName}

Detail acara dan RSVP:
{invitationLink}

Terima kasih atas doa dan kehadirannya.`,
  },
];

export const rsvpFollowUpTemplates: ReadonlyArray<{
  id: RsvpFollowUpTemplateId;
  label: string;
  meta: string;
  message: string;
}> = [
  {
    id: "gentle-reminder",
    label: "Gentle Reminder",
    meta: "Hangat · Bahasa Indonesia",
    message: `Halo {guestName},

Kami ingin mengingatkan dengan hangat mengenai undangan pernikahan {groomName} & {brideName}.

Mohon kesediaannya untuk mengisi konfirmasi kehadiran melalui tautan berikut:
{invitationLink}

Konfirmasi Anda sangat membantu kami menyiapkan hari istimewa ini.

Terima kasih.`,
  },
  {
    id: "warm-follow-up",
    label: "Warm & Personal",
    meta: "Akrab · Bahasa Indonesia",
    message: `Hai {guestName},

Kami berharap Anda berkenan menjadi bagian dari hari bahagia {groomName} & {brideName}.

Jika belum sempat, silakan isi RSVP melalui undangan personal ini:
{invitationLink}

Terima kasih banyak. Kami menantikan kabar baik dari Anda.`,
  },
  {
    id: "formal-reminder",
    label: "Formal Keluarga",
    meta: "Sopan · Bahasa Indonesia",
    message: `Yth. Bapak/Ibu/Saudara/i {guestName},

Dengan hormat, kami ingin mengingatkan kembali mengenai konfirmasi kehadiran untuk pernikahan {groomName} & {brideName}.

Mohon mengisi RSVP melalui tautan undangan berikut:
{invitationLink}

Atas perhatian dan konfirmasinya, kami ucapkan terima kasih.`,
  },
  {
    id: "graceful-english",
    label: "Graceful English",
    meta: "Refined · English",
    message: `Dear {guestName},

We would be grateful if you could kindly confirm your attendance for the wedding of {groomName} & {brideName}.

Please respond through your personal invitation:
{invitationLink}

Your reply will help us prepare a beautiful celebration. Thank you.`,
  },
];

export function isShareTemplateId(value: unknown): value is ShareTemplateId {
  return typeof value === "string" && SHARE_TEMPLATE_IDS.includes(value as ShareTemplateId);
}

export function isRsvpFollowUpTemplateId(value: unknown): value is RsvpFollowUpTemplateId {
  return typeof value === "string" && RSVP_FOLLOW_UP_TEMPLATE_IDS.includes(value as RsvpFollowUpTemplateId);
}

function formatWeddingDate(value: string | null) {
  if (!value) return "the celebration day";

  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function buildWhatsAppShareMessage(
  templateId: ShareTemplateId,
  variables: ShareMessageVariables
) {
  const template =
    shareMessageTemplates.find((item) => item.id === templateId) ?? shareMessageTemplates[0];

  return template.message
    .replaceAll("{guestName}", variables.guestName || "Dear Guest")
    .replaceAll("{groomName}", variables.groomName || "")
    .replaceAll("{brideName}", variables.brideName || "")
    .replaceAll("{weddingDate}", formatWeddingDate(variables.weddingDate))
    .replaceAll("{invitationLink}", variables.invitationLink);
}

export function buildWhatsAppRsvpFollowUpMessage(
  templateId: RsvpFollowUpTemplateId,
  variables: ShareMessageVariables
) {
  const template =
    rsvpFollowUpTemplates.find((item) => item.id === templateId) ?? rsvpFollowUpTemplates[0];

  return template.message
    .replaceAll("{guestName}", variables.guestName || "Tamu Undangan")
    .replaceAll("{groomName}", variables.groomName || "")
    .replaceAll("{brideName}", variables.brideName || "")
    .replaceAll("{weddingDate}", formatWeddingDate(variables.weddingDate))
    .replaceAll("{invitationLink}", variables.invitationLink);
}
