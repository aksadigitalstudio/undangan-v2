"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface SekarSoganGuestbookProps {
  invitationId: number;
}

interface RSVP {
  id: number;
  guest_name: string;
  rsvp_status: string;
  message: string;
  responded_at: string;
}

export default function SekarSoganGuestbook({
  invitationId,
}: SekarSoganGuestbookProps) {
  const [messages, setMessages] = useState<RSVP[]>([]);

  useEffect(() => {
    async function loadGuestbook() {
      const { data, error } = await supabase.rpc("get_guestbook", {
        p_invitation_id: invitationId,
      });

      if (!error && data) {
        setMessages(data);
      }
    }

    loadGuestbook();
  }, [invitationId]);

  return (
    <section className="bg-[#f8f5f2] px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="mb-3 uppercase tracking-[0.25em] text-gray-500">Buku Tamu</p>
          <h2 className="font-serif text-4xl text-gray-800">Ucapan & Doa</h2>
        </div>

        <div className="max-h-[460px] space-y-6 overflow-y-auto pr-2">
          {messages.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border p-8 shadow-xl"
              style={{ background: "#FFFFFF", borderColor: "#ECECEC" }}
            >
              <h3 className="text-xl font-semibold text-gray-800">{item.guest_name}</h3>
              <p className="mb-3 text-sm text-gray-500">
                {item.rsvp_status === "attending"
                  ? "Hadir"
                  : item.rsvp_status === "declined"
                    ? "Berhalangan Hadir"
                    : "Menunggu Konfirmasi"}
              </p>
              <p className="text-gray-700">{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
