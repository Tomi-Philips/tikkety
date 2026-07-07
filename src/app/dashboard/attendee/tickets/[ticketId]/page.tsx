import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TicketPass from "@/components/events/ticket-pass";

export default async function TicketDetailsPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch the ticket with details
  const { data: ticket, error } = await supabase
    .from("tickets")
    .select(`
      *,
      ticket_types (
        name,
        admission_limit
      ),
      events (
        title,
        banner_url,
        event_date,
        location,
        category
      )
    `)
    .eq("id", ticketId)
    .single();

  if (error || !ticket) {
    notFound();
  }

  // Security guard: ensure ticket belongs to user
  if (ticket.user_id !== user.id) {
    redirect("/dashboard/attendee/tickets");
  }

  // Fetch current user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return <TicketPass ticket={ticket} profile={profile} />;
}
