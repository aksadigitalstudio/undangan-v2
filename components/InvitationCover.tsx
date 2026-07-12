"use client";

import { useEffect, useState } from "react";
interface InvitationCoverProps {
  groomName: string;
  brideName: string;
}

export default function InvitationCover({
  groomName,
  brideName,
}: InvitationCoverProps) {
  const [opened, setOpened] = useState(false);

useEffect(() => {
  const isOpened = sessionStorage.getItem("invitation-opened");

  if (isOpened === "true") {
    setOpened(true);
  }
}, []);
if (opened) return null;
  return (
    <div className="fixed inset-0 z-50 bg-[#0f172a] flex items-center justify-center">

      <div className="text-center text-white px-8">

        <p className="uppercase tracking-[0.35em] text-sm mb-6">
          THE WEDDING OF
        </p>

        <h1 className="text-6xl font-serif leading-tight mb-8">
          {groomName}
          <br />
          &
          <br />
          {brideName}
        </h1>

        <p className="uppercase tracking-[0.3em] text-sm text-gray-300 mb-4">
          Kepada Yth.
        </p>

        <div className="text-2xl font-medium mb-10">
          Bapak / Ibu / Saudara
        </div>

        <button
  onClick={() => {
    sessionStorage.setItem("invitation-opened", "true");
    setOpened(true);
  }}
  className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200"
>
  Buka Undangan
</button>

      </div>

    </div>
  );
}