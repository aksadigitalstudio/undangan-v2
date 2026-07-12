import { supabase } from "./supabase";

export async function getInvitationBySlug(slug: string) {
  const { data, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("slug", slug)
    .single();

  return { data, error };
}

export async function getInvitationById(id: number) {
  const { data, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
}

export async function getAllInvitations() {
  const { data, error } = await supabase
    .from("invitations")
    .select("*")
    .order("created_at", { ascending: false });

  return { data, error };
}