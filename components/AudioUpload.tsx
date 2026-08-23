"use client";

import { ChangeEvent } from "react";
import { uploadImage } from "@/lib/storage";

interface AudioUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export default function AudioUpload({
  label,
  value,
  onChange,
}: AudioUploadProps) {
  async function handleSelectFile(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const fileName = `${Date.now()}-${file.name}`;

      const url = await uploadImage(
        "Music",
        file,
        fileName
      );

      onChange(url);
} catch (err: unknown) {
  console.error(err);

  if (err instanceof Error) {
    alert(err.message);
  } else {
    alert("Terjadi kesalahan saat mengunggah audio.");
  }
}
  }

  return (
    <div className="mb-6">
      <label className="block text-black font-semibold mb-2">
        {label}
      </label>

      {value && (
        <audio
          controls
          className="mb-4 w-full"
          src={value}
        />
      )}

      <label className="cursor-pointer rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition">
        Upload MP3

        <input
          type="file"
          accept="audio/*"
          onChange={handleSelectFile}
          className="hidden"
        />
      </label>
    </div>
  );
}