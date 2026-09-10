function configuredAdminEmails() {
  return (process.env.AKSA_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAksaAdmin(email?: string | null) {
  if (!email) return false;
  return configuredAdminEmails().includes(email.trim().toLowerCase());
}
