import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Ticket, Calendar, Clock, MapPin, ArrowRight, Compass, Sparkles } from "lucide-react";

export default async function AttendeeOverviewPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  // Fetch owned tickets with event & type details
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
        slug
      )
    `)
    .eq("user_id", user!.id)
    .order("purchased_at", { ascending: false });

  const now = new Date();
  const listTickets = tickets || [];

  // Categorize
  const upcomingTickets = listTickets.filter(
    (t: any) => new Date(t.events.event_date) > now && t.status !== "cancelled"
  );
  
  const totalTickets = listTickets.length;
  const upcomingCount = upcomingTickets.length;
  const pastCount = listTickets.filter(
    (t: any) => new Date(t.events.event_date) <= now && t.status !== "cancelled"
  ).length;

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "Friend";

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 rounded-3xl p-8 text-white shadow-lg">
        {/* Shimmer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
        
        <div className="relative z-10 space-y-2 max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold tracking-wider uppercase">
            <Sparkles className="w-3 h-3 text-emerald-200" />
            Attendee Hub
          </div>
          <h1 className="text-3xl md:text-4xl font-black">
            Hello, {displayName} 👋
          </h1>
          <p className="text-sm text-white/80 leading-relaxed">
            Welcome back to your dashboard! Here are your active passes and upcoming event schedules.
          </p>
        </div>
      </div>

      {/* Stats Summary Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-3xl p-6 shadow-sm">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
            Total Passes Owned
          </span>
          <div className="text-3xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
            <Ticket className="w-8 h-8 text-emerald-500 stroke-[1.5]" />
            {totalTickets}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-3xl p-6 shadow-sm">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
            Upcoming Events
          </span>
          <div className="text-3xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-8 h-8 text-indigo-500 stroke-[1.5]" />
            {upcomingCount}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-3xl p-6 shadow-sm">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
            Past Events
          </span>
          <div className="text-3xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
            <Clock className="w-8 h-8 text-zinc-400 stroke-[1.5]" />
            {pastCount}
          </div>
        </div>
      </div>

      {/* Upcoming Passes (Apple Wallet layout style) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
            <Ticket className="w-5 h-5 text-indigo-600" />
            Your Event Tickets
          </h2>
          {upcomingCount > 0 && (
            <Link
              href="/dashboard/attendee/tickets"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {upcomingTickets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTickets.map((ticket: any) => {
              const eventDate = new Date(ticket.events.event_date);
              return (
                <Link
                  key={ticket.id}
                  href={`/dashboard/attendee/tickets/${ticket.id}`}
                  className="group relative flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800/80 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  {/* Banner Image / Gradient Fallback */}
                  <div className="relative aspect-[16/7] w-full overflow-hidden bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-zinc-800 dark:to-zinc-800">
                    {ticket.events.banner_url ? (
                      <img
                        src={ticket.events.banner_url}
                        alt={ticket.events.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-indigo-300 dark:text-zinc-600">
                        <Ticket className="w-10 h-10" />
                      </div>
                    )}
                    {/* Badge */}
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold text-indigo-600 dark:text-indigo-400 border border-zinc-200/20 shadow-sm uppercase tracking-wider">
                      {ticket.ticket_types?.name || "Attendee Pass"}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {ticket.events.title}
                      </h4>
                      <p className="text-[10px] text-zinc-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-300" />
                        {ticket.events.location}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-dashed border-zinc-150 dark:border-zinc-800 flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1 font-semibold text-zinc-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {eventDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                        Open Ticket →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-3xl p-6 shadow-sm max-w-md mx-auto space-y-4">
            <Compass className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">No upcoming events found</p>
              <p className="text-xs text-zinc-400">Discover and book tickets for lectures, workshops, or shows around campus.</p>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-xs font-semibold hover:shadow-md transition-all cursor-pointer"
            >
              Explore Campus Events
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
