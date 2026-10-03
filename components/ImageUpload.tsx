"use client";
import { ChangeEvent } from "react";
import Image from "next/image";
import { uploadImage } from "@/lib/storage";

const MAX_IMAGE_DIMENSION = 1920;
const WEBP_QUALITY = 0.82;

async function optimizeImageForUpload(file: File) {
  if (
    !file.type.startsWith("image/") ||
    file.type === "image/svg+xml" ||
    (file.type === "image/webp" && file.size <= 800 * 1024)
  ) {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);

    const context = canvas.getContext("2d");
    if (!context) return file;

    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/webp", WEBP_QUALITY);
    });

    if (!blob || blob.size >= file.size) return file;

    const baseName = file.name.replace(/\.[^.]+$/, "") || "photo";
    return new File([blob], `${baseName}.webp`, {
      type: "image/webp",
      lastModified: Date.now(),
    });
  } catch {
    // Keep the original file if a browser cannot safely convert it.
    return file;
  }
}

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
    const optimizedFile = await optimizeImageForUpload(file);
    const fileName = `${Date.now()}-${optimizedFile.name}`;

const url = await uploadImage(
  "photos2",
  optimizedFile,
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
<p className="mt-3 text-center text-xs leading-5 text-gray-500">
  Foto akan dioptimalkan otomatis sebelum diunggah agar undangan lebih cepat dibuka.
</p>

    </div>
  );
}
