import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Calendar, MapPin, Ticket, ArrowRight, Laptop, Music, Paintbrush, Briefcase, Coffee, Tag } from "lucide-react";
import EventsFilterBar from "@/components/events/events-filter-bar";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const CATEGORIES = ["All", "Tech", "Music", "Business", "Art", "Food"];

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("events")
    .select(`
      *,
      ticket_types (
        id,
        price,
        quantity,
        sold,
        is_active
      )
    `)
    .eq("status", "published");

  if (q) {
    query = query.ilike("title", `%${q}%`);
  }

  if (category && category !== "All") {
    query = query.eq("category", category);
  }

  const { data: events, error } = await query.order("event_date", { ascending: true });

  const getCategoryIcon = (cat: string) => {
    switch (cat?.toLowerCase()) {
      case "tech":
        return <Laptop className="w-3.5 h-3.5" />;
      case "music":
        return <Music className="w-3.5 h-3.5" />;
      case "art":
        return <Paintbrush className="w-3.5 h-3.5" />;
      case "business":
        return <Briefcase className="w-3.5 h-3.5" />;
      case "food":
        return <Coffee className="w-3.5 h-3.5" />;
      default:
        return <Tag className="w-3.5 h-3.5" />;
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat?.toLowerCase()) {
      case "tech":
        return "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30";
      case "music":
        return "bg-pink-50 text-pink-700 border-pink-100 dark:bg-pink-950/20 dark:text-pink-400 dark:border-pink-900/30";
      case "art":
        return "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30";
      case "business":
        return "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30";
      case "food":
        return "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30";
      default:
        return "bg-zinc-50 text-zinc-700 border-zinc-100 dark:bg-zinc-800/50 dark:text-zinc-400 dark:border-zinc-700/50";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950">
      <Navbar />

      {/* Decorative Blur Backgrounds */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-indigo-200/30 dark:bg-indigo-900/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-violet-200/30 dark:bg-violet-900/10 rounded-full blur-3xl" />
      </div>

      <main className="flex-grow pt-28 pb-16 px-4 max-w-7xl mx-auto w-full relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-150 dark:border-indigo-900/40 rounded-full text-[10px] font-bold text-indigo-700 dark:text-indigo-400 tracking-wider uppercase">
            <Ticket className="w-3 h-3" />
            Discover what's happening
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Explore Campus <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Events</span>
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
            Book tickets to guest talks, technical summits, live concert sessions, and dynamic arts events on campus.
          </p>
        </div>

        {/* Search & Filter Component */}
        <div className="mb-12">
          <Suspense>
            <EventsFilterBar
              initialSearch={q}
              initialCategory={category}
              categories={CATEGORIES}
            />
          </Suspense>
        </div>

        {/* Events Grid */}
        {events && events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {events.map((event) => {
              // Calculate date formatting
              const dateObj = new Date(event.event_date);
              const formattedDate = dateObj.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
              const formattedTime = dateObj.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });

              // Ticket pricing calculation
              const tickets = event.ticket_types || [];
              const activeTickets = tickets.filter((t: any) => t.is_active);
              const isSoldOut = activeTickets.length === 0 || activeTickets.every((t: any) => (t.quantity - t.sold) <= 0);

              let priceString = "Free";
              if (activeTickets.length > 0 && !isSoldOut) {
                const prices = activeTickets.map((t: any) => Number(t.price));
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);
                
                if (minPrice === 0 && maxPrice === 0) {
                  priceString = "Free";
                } else if (minPrice === maxPrice) {
                  priceString = `₦${minPrice.toLocaleString()}`;
                } else {
                  priceString = `₦${minPrice.toLocaleString()} - ₦${maxPrice.toLocaleString()}`;
                }
              }

              return (
                <div
                  key={event.id}
                  className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800/80 rounded-3xl overflow-hidden hover:shadow-xl dark:hover:shadow-zinc-950/40 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image/Banner */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-zinc-800 dark:to-zinc-800">
                    {event.banner_url ? (
                      <img
                        src={event.banner_url}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-indigo-400 dark:text-zinc-600">
                        <Calendar className="w-12 h-12 stroke-[1.5]" />
                      </div>
                    )}
                    
                    {/* Category Badge overlay */}
                    <div className="absolute top-4 left-4">
                      <div className={`flex items-center gap-1 px-3 py-1.5 border backdrop-blur-md rounded-full text-[10px] font-bold tracking-wide uppercase ${getCategoryColor(event.category)}`}>
                        {getCategoryIcon(event.category)}
                        {event.category || "Event"}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex-grow p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-4 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formattedDate}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                        <span>{formattedTime}</span>
                      </div>

                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {event.title}
                      </h3>
                      
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {event.description || "No description provided."}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">
                          Ticket Price
                        </div>
                        <div className={`text-base font-extrabold ${isSoldOut ? "text-zinc-400 line-through" : "text-zinc-900 dark:text-white"}`}>
                          {priceString}
                        </div>
                      </div>

                      {isSoldOut ? (
                        <span className="px-4 py-2 rounded-xl bg-zinc-100 text-zinc-400 dark:bg-zinc-850 dark:text-zinc-500 text-xs font-bold border border-zinc-200/50 dark:border-zinc-800/50 cursor-not-allowed">
                          Sold Out
                        </span>
                      ) : (
                        <Link
                          href={`/events/${event.slug}`}
                          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold hover:shadow-lg transition-all duration-200 group/btn cursor-pointer"
                        >
                          Get Tickets
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 p-8 max-w-md mx-auto shadow-sm">
            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Ticket className="w-8 h-8 text-indigo-500" />
            </div>
            <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-1">
              No Events Found
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              We couldn't find any active events matching your filter/search criteria. Check back soon or try adjusting your query!
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
