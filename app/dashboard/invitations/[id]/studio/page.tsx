"use client";

import { use } from "react";
import InvitationStudio from "@/components/studio/InvitationStudio";

export default function InvitationStudioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <InvitationStudio invitationId={id} />;
}
