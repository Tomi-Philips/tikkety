"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Calendar,
  Search,
  Plus,
  Filter,
  Sparkles,
  Loader2,
  AlertCircle,
  X,
  SlidersHorizontal,
} from "lucide-react";
import EventCard from "@/components/organizer/event-card";

type EventWithTickets = {
  id: string;
  organizer_id: string;
  title: string;
  slug: string;
  description: string | null;
  location: string;
  banner_url: string | null;
  category: string | null;
  event_date: string;
  ticket_sale_start: string | null;
  ticket_sale_end: string | null;
  status: string;
  is_location_hidden: boolean;
  created_at: string;
  updated_at: string;
  ticket_types: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    sold: number;
  }[];
};

type StatusFilter = "all" | "published" | "draft" | "cancelled" | "completed";

export default function EventsPortfolioPage() {
  const router = useRouter();
  const supabase = createClient();

  const [events, setEvents] = useState<EventWithTickets[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("events")
        .select(`
          *,
          ticket_types (*)
        `)
        .eq("organizer_id", user.id)
        .order("event_date", { ascending: true });

      if (error) throw error;
      setEvents((data as EventWithTickets[]) || []);
    } catch (err: any) {
      console.error("Error loading events:", err);
      setErrorMsg(err.message || "Failed to load events portfolio.");
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories for filtering
  const categories = ["all", ...Array.from(new Set(events.map((e) => e.category || "General").filter(Boolean)))];

  // Filtering logic
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || (event.category || "General") === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ── Page Header ── */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 rounded-full" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
              Events Portfolio
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-500" />
              Manage, search, and monitor your entire list of organized events
            </p>
          </div>

          <Link
            href="/dashboard/organizer/create-event"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>Create Event</span>
          </Link>
        </div>
      </div>

      {/* ── Loading State ── */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-32 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl shadow-lg">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-500 animate-pulse" />
            </div>
          </div>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-4">Loading your events...</p>
        </div>
      )}

      {/* ── Error State ── */}
      {errorMsg && !loading && (
        <div className="flex items-start gap-3 p-5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-red-700 dark:text-red-400 shadow-lg">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Unable to load events</p>
            <p className="text-sm">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* ── Filters & Search Controls ── */}
      {!loading && !errorMsg && (
        <>
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                id="events-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, location, desc..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-600 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Selector Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters:</span>
              </div>

              {/* Category Filter */}
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="appearance-none px-3.5 py-2 pr-8 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all cursor-pointer shadow-sm"
                >
                  <option value="all">All Categories</option>
                  {categories.filter(c => c !== "all").map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                  <Filter className="w-3 h-3" />
                </div>
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                  className="appearance-none px-3.5 py-2 pr-8 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all cursor-pointer shadow-sm"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Live</option>
                  <option value="draft">Draft</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                  <Sparkles className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Events Grid Display ── */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 pt-2">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 bg-white/40 dark:bg-zinc-900/40 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-center p-6 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4 shadow-inner">
                <Calendar className="w-8 h-8 text-zinc-400 dark:text-zinc-600" />
              </div>
              <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">
                {searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                  ? "No matching events found"
                  : "No events in your portfolio"}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm">
                {searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                  ? "Try checking your spelling, clear filter values, or create a brand new event."
                  : "Create your very first ticketed experience to get started selling and managing attendees!"}
              </p>
              {(searchQuery || statusFilter !== "all" || categoryFilter !== "all") ? (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                    setCategoryFilter("all");
                  }}
                  className="mt-4 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-xs font-semibold rounded-lg text-zinc-700 dark:text-zinc-300 transition-all"
                >
                  Clear all filters
                </button>
              ) : (
                <Link
                  href="/dashboard/organizer/create-event"
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-xs font-semibold rounded-lg text-white transition-all shadow-md"
                >
                  Create Event
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
