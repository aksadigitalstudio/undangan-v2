export const CHECK_IN_QR_PREFIX = "AKSA-CHECKIN";

export function createCheckInPayload(invitationId: number, token: string) {
  return `${CHECK_IN_QR_PREFIX}:${invitationId}:${token}`;
}

export function parseCheckInPayload(value: string) {
  const [prefix, invitationId, token, ...rest] = value.trim().split(":");
  const parsedInvitationId = Number(invitationId);

  if (
    prefix !== CHECK_IN_QR_PREFIX ||
    rest.length > 0 ||
    !Number.isInteger(parsedInvitationId) ||
    parsedInvitationId <= 0 ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(token ?? "")
  ) {
    return null;
  }

  return {
    invitationId: parsedInvitationId,
    token,
  };
}
