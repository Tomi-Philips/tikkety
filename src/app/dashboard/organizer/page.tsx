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
    <div className="space-y-6">

      {/* Header section with welcoming and action button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Organizer Studio
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Analyze your ticket sales, manage your event portfolios, and create brand-new experiences.
          </p>
        </div>

        <Link
          href="/dashboard/organizer/create-event"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
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
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <h3 className="text-base font-semibold text-gray-800">Your Active Events Portfolio</h3>
          {totalEvents > 0 && (
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
              {totalEvents} {totalEvents === 1 ? 'Event' : 'Events'}
            </span>
          )}
        </div>

        {totalEvents === 0 ? (
          /* Premium Empty State (Extracted) */
          <EmptyEvents />
        ) : (
          /* Premium Active Events Grid (Extracted Card Mapping) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {events?.map((event: any) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}