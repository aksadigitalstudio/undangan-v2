import { supabase } from "./supabase";

const uploadRules = {
  photos2: { maxBytes: 5 * 1024 * 1024, mimePrefix: "image/" },
  Music: { maxBytes: 10 * 1024 * 1024, mimePrefix: "audio/" },
} as const;

export async function getPublicUrl(bucket: string, path: string) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadImage(bucket: string, file: File, fileName: string) {
  const rule = uploadRules[bucket as keyof typeof uploadRules];

  if (!rule || !file.type.startsWith(rule.mimePrefix) || file.size > rule.maxBytes) {
    throw new Error("Format atau ukuran file tidak diizinkan.");
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Sesi admin diperlukan untuk mengunggah file.");
  }

  const safeFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
  const objectPath = `${user.id}/${safeFileName}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(objectPath, file, { upsert: false });

  if (error) {
    throw error;
  }

  return getPublicUrl(bucket, objectPath);
}
