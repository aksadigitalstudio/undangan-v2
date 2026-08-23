"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface Guest {
  guest_name: string;
  rsvp_token: string;
}

interface RSVPFormProps {
  invitationId: number;
  guest: Guest | null;
  onSuccess?: () => void;
}

export default function RSVPForm({ invitationId, guest, onSuccess }: RSVPFormProps) {
  const guestName = guest?.guest_name ?? "";
  const [attendance, setAttendance] = useState("Attending");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!guest?.rsvp_token) {
      alert("Gunakan tautan undangan pribadi Anda untuk mengirim RSVP.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.rpc("submit_guest_rsvp", {
      p_invitation_id: invitationId,
      p_rsvp_token: guest.rsvp_token,
      p_rsvp_status: attendance === "Attending" ? "attending" : "declined",
      p_message: message,
    });

    setLoading(false);

    if (error) {
      alert("RSVP tidak dapat dikirim. Pastikan tautan undangan Anda masih valid.");
      return;
    }

    alert("RSVP Anda berhasil dikirim.");
    onSuccess?.();
    setMessage("");
  }

  return (
    <div className="space-y-6">
      <input
        type="text"
        value={guestName}
        readOnly
        aria-readonly="true"
        placeholder="Buka melalui tautan undangan pribadi Anda"
        className="w-full cursor-not-allowed rounded-xl border bg-gray-100 p-4 text-gray-900"
      />

      <select
        value={attendance}
        onChange={(event) => setAttendance(event.target.value)}
        disabled={!guest?.rsvp_token}
        className="w-full rounded-xl border bg-white p-4 text-gray-900 placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <option>Attending</option>
        <option>Unable to Attend</option>
      </select>

      <textarea
        rows={5}
        placeholder="Share your wishes..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        disabled={!guest?.rsvp_token}
        className="w-full rounded-xl border bg-white p-4 text-gray-900 placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !guest?.rsvp_token}
        className="w-full rounded-xl bg-gray-900 py-4 text-white hover:bg-black disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Wishes"}
      </button>
    </div>
  );
}
