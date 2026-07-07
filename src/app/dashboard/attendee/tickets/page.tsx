import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Ticket, Calendar, MapPin, ArrowRight } from "lucide-react";

export default async function MyTicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch all user's tickets
  const { data: tickets } = await supabase
    .from("tickets")
    .select(`
      *,
      ticket_types (
        name
      ),
      events (
        id,
        title,
        banner_url,
        event_date,
        location,
        category
      )
    `)
    .eq("user_id", user!.id)
    .order("purchased_at", { ascending: false });

  const now = new Date();
  const listTickets = tickets || [];

  // Filter based on filter parameter
  const filteredTickets = listTickets.filter((t: any) => {
    if (filter === "upcoming") {
      return new Date(t.events.event_date) > now && t.status !== "cancelled";
    }
    if (filter === "past") {
      return new Date(t.events.event_date) <= now && t.status !== "cancelled";
    }
    return true; // "all"
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valid":
        return "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30";
      case "used":
        return "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30";
      case "partial":
        return "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30";
      default:
        return "bg-zinc-50 text-zinc-700 border-zinc-150";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "valid": return "Active Pass";
      case "used": return "Checked In";
      case "partial": return "Partially Used";
      case "cancelled": return "Cancelled";
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
          <Ticket className="w-6 h-6 text-indigo-600" />
          My Tickets
        </h1>
        <p className="text-xs text-zinc-400">View and manage all your purchased campus passes.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 gap-6">
        <Link
          href="/dashboard/attendee/tickets"
          className={`pb-3 text-xs font-bold border-b-2 cursor-pointer transition-all ${
            !filter
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-zinc-400 hover:text-zinc-600"
          }`}
        >
          All Passes ({listTickets.length})
        </Link>
        <Link
          href="/dashboard/attendee/tickets?filter=upcoming"
          className={`pb-3 text-xs font-bold border-b-2 cursor-pointer transition-all ${
            filter === "upcoming"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-zinc-400 hover:text-zinc-600"
          }`}
        >
          Upcoming ({listTickets.filter((t: any) => new Date(t.events.event_date) > now && t.status !== "cancelled").length})
        </Link>
        <Link
          href="/dashboard/attendee/tickets?filter=past"
          className={`pb-3 text-xs font-bold border-b-2 cursor-pointer transition-all ${
            filter === "past"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-zinc-400 hover:text-zinc-600"
          }`}
        >
          Past / Checked In ({listTickets.filter((t: any) => new Date(t.events.event_date) <= now || t.status === "used").length})
        </Link>
      </div>

      {/* Tickets List */}
      {filteredTickets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map((ticket: any) => {
            const eventDate = new Date(ticket.events.event_date);
            return (
              <div
                key={ticket.id}
                className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800/80 rounded-3xl overflow-hidden hover:shadow-md transition-all duration-200"
              >
                {/* Banner image preview */}
                <div className="relative aspect-[16/7] w-full overflow-hidden bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-zinc-800 dark:to-zinc-800">
                  {ticket.events.banner_url ? (
                    <img src={ticket.events.banner_url} alt={ticket.events.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-300">
                      <Ticket className="w-8 h-8" />
                    </div>
                  )}
                  {/* Status Overlay */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold border backdrop-blur-md uppercase tracking-wider ${getStatusBadge(ticket.status)}`}>
                      {getStatusText(ticket.status)}
                    </span>
                  </div>
                </div>

                {/* Body details */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                      {ticket.ticket_types?.name || "Attendee Pass"}
                    </span>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-1">
                      {ticket.events.title}
                    </h3>
                    <p className="text-[10px] text-zinc-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {ticket.events.location}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1 font-semibold text-zinc-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {eventDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>

                    <Link
                      href={`/dashboard/attendee/tickets/${ticket.id}`}
                      className="flex items-center justify-center gap-1 px-3 py-1.5 bg-zinc-50 hover:bg-indigo-50 dark:bg-zinc-800 dark:hover:bg-indigo-950/20 border border-zinc-200 dark:border-zinc-700/60 hover:border-indigo-200 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 rounded-xl font-bold transition-all cursor-pointer"
                    >
                      Details
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-3xl p-6 max-w-sm mx-auto shadow-sm space-y-3">
          <Ticket className="w-10 h-10 text-zinc-300 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">No tickets found</h3>
            <p className="text-xs text-zinc-400">You don't have any tickets in this category.</p>
          </div>
        </div>
      )}
    </div>
  );
}
