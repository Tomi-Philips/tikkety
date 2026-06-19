'use server';

import { createClient } from "@/lib/supabase/server";

export async function updateEventStatusAction(
  eventId: string,
  newStatus: "published" | "draft" | "cancelled"
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .update({ status: newStatus })
    .eq("id", eventId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message || "Failed to update event status.");
  }

  return data;
}
