type ParentTitleStyle = "none" | "bapak-ibu" | "tuan-nyonya" | "mr-mrs";

type ParentTitleSections = {
  parent_title_style?: unknown;
};

type ParentTitlePair = {
  father: string;
  mother: string;
};

export const parentTitleOptions: Array<{
  value: ParentTitleStyle;
  label: string;
  description: string;
}> = [
  { value: "bapak-ibu", label: "Bapak / Ibu", description: "Sapaan formal Bahasa Indonesia" },
  { value: "tuan-nyonya", label: "Tuan / Nyonya", description: "Sapaan formal klasik" },
  { value: "mr-mrs", label: "Mr. / Mrs.", description: "Sapaan formal Bahasa Inggris" },
  { value: "none", label: "Tanpa sapaan", description: "Tampilkan nama persis seperti data" },
];

const titles: Record<ParentTitleStyle, ParentTitlePair> = {
  none: { father: "", mother: "" },
  "bapak-ibu": { father: "Bapak", mother: "Ibu" },
  "tuan-nyonya": { father: "Tuan", mother: "Nyonya" },
  "mr-mrs": { father: "Mr.", mother: "Mrs." },
};

function styleFrom(sections: ParentTitleSections | null | undefined): ParentTitleStyle {
  const value = sections?.parent_title_style;
  return value === "bapak-ibu" || value === "tuan-nyonya" || value === "mr-mrs" || value === "none"
    ? value
    : "bapak-ibu";
}

function formatParentName(value: unknown, title: string) {
  const name = typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
  if (!name || !title) return name;

  // Do not add a second title when the client has already typed one.
  if (/^(?:(?:alm|almh)\.?\s+)?(?:bapak|bpk\.?|ibu|tuan|tn\.?|nyonya|ny\.?|mr\.?|mrs\.?)\b/i.test(name)) {
    return name;
  }

  // Keep an existing deceased marker before the selected formal title.
  const deceased = name.match(/^((?:alm|almh)\.?)\s+(.+)$/i);
  return deceased ? `${deceased[1]} ${title} ${deceased[2]}` : `${title} ${name}`;
}

export function withParentTitles<T extends object>(
  invitation: T,
  sections: ParentTitleSections | null | undefined,
) {
  const pair = titles[styleFrom(sections)];
  const values = invitation as Record<string, unknown>;

  return {
    ...invitation,
    groom_father: formatParentName(values.groom_father, pair.father),
    groom_mother: formatParentName(values.groom_mother, pair.mother),
    bride_father: formatParentName(values.bride_father, pair.father),
    bride_mother: formatParentName(values.bride_mother, pair.mother),
  };
}
