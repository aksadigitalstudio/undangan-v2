type NameRole = "groom" | "bride";

type DisplayNameSections = {
  display_names?: unknown;
};

function cleanName(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function getDisplayName(
  invitation: object,
  sections: DisplayNameSections | null | undefined,
  role: NameRole,
) {
  const displayNames = sections?.display_names;
  const preferred =
    displayNames && typeof displayNames === "object"
      ? cleanName((displayNames as Record<string, unknown>)[role])
      : "";

  const names = invitation as Record<string, unknown>;
  return preferred || cleanName(names[`${role}_name`]);
}

export function withDisplayNames<T extends object>(
  invitation: T,
  sections: DisplayNameSections | null | undefined,
) {
  return {
    ...invitation,
    groom_name: getDisplayName(invitation, sections, "groom"),
    bride_name: getDisplayName(invitation, sections, "bride"),
  };
}
