import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function EventLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  // Verify event belongs to this organizer
  const { data: event, error } = await supabase
    .from("events")
    .select("id, organizer_id")
    .eq("id", id)
    .single();

  if (error || !event || event.organizer_id !== user.id) {
    notFound();
  }

  return <>{children}</>;
}
