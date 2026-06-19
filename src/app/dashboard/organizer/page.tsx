import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Plus } from "lucide-react";
import OrganizerStats from "@/components/organizer/organizer-stats";
import AnalyticsBanner from "@/components/organizer/analytics-banner";
import EmptyEvents from "@/components/organizer/empty-events";
import EventCard from "@/components/organizer/event-card";

export default async function OrganizerDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch organizer's events with their associated ticket types
  const { data: events, error } = await supabase
    .from("events")
    .select(`
      *,
      ticket_types (*)
    `)
    .eq("organizer_id", user.id)
    .order("created_at", { ascending: false });

  // Calculate stats parameters
  const totalEvents = events?.length || 0;

  let totalTicketsSold = 0;
  let totalRevenue = 0;
  let maxCapacity = 0;

  events?.forEach(event => {
    event.ticket_types?.forEach((ticket: any) => {
      totalTicketsSold += ticket.sold || 0;
      totalRevenue += (ticket.sold || 0) * Number(ticket.price || 0);
      maxCapacity += ticket.quantity || 0;
    });
  });

  const salePercentage = maxCapacity > 0 ? Math.round((totalTicketsSold / maxCapacity) * 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* Header section with welcoming and action button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-950 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
            Organizer Studio
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Analyze your ticket sales, manage your event portfolios, and create brand-new experiences.
          </p>
        </div>

        <Link
          href="/dashboard/organizer/create-event"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-violet-700 hover:to-indigo-700 text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-violet-500/25 transition-all duration-200 hover:shadow-violet-500/35 hover:scale-[1.02]"
        >
          <Plus className="w-5 h-5" />
          <span>Create Event</span>
        </Link>
      </div>

      {/* Metrics Dashboard Grid (Extracted) */}
      <OrganizerStats
        totalRevenue={totalRevenue}
        totalTicketsSold={totalTicketsSold}
        maxCapacity={maxCapacity}
        totalEvents={totalEvents}
        salePercentage={salePercentage}
      />

      {/* Landscape AI Promotional Banner */}
      <AnalyticsBanner />

      {/* Main content grid (Events list vs Empty State) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/60 pb-3">
          <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">Your Active Events Portfolio</h3>
          {totalEvents > 0 && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400">
              {totalEvents} {totalEvents === 1 ? 'Event' : 'Events'}
            </span>
          )}
        </div>

        {totalEvents === 0 ? (
          /* Premium Empty State (Extracted) */
          <EmptyEvents />
        ) : (
          /* Premium Active Events Grid (Extracted Card Mapping) */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {events?.map((event: any) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
