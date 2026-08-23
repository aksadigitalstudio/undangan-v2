"use client";
import { ChangeEvent } from "react";
import Image from "next/image";
import { uploadImage } from "@/lib/storage";
interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({
  label,
  value,
  onChange,
}: ImageUploadProps) {
async function handleSelectFile(
  e: ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0];

  if (!file) return;

  try {
    const fileName = `${Date.now()}-${file.name}`;

const url = await uploadImage(
  "photos2",
  file,
  fileName
);

    onChange(url);
} catch (err: unknown) {
  console.error("UPLOAD ERROR:", err);

  if (err instanceof Error) {
    alert(err.message);
  } else {
    alert("Terjadi kesalahan saat mengunggah gambar.");
  }
}
}
    return (
    <div className="mb-6">

      <label className="block text-black font-semibold mb-2">
        {label}
      </label>

      <div className="border-2 border-dashed rounded-xl p-10 text-center">

        {value ? (
  <Image
    src={value}
    alt={label}
    width={192}
    height={192}
    sizes="192px"
    className="mx-auto h-48 w-48 rounded-xl object-cover shadow-md"
  />
) : (
  <p className="text-gray-500">
    Belum ada gambar.
  </p>
)}
<div className="mt-6 flex justify-center">
  <label className="cursor-pointer rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition">
    Pilih Foto

    <input
      type="file"
      accept="image/*"
      onChange={handleSelectFile}
      className="hidden"
    />
  </label>
</div>
      </div>

    </div>
  );
}
