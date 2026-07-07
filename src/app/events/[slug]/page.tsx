import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Users,
  Tag,
  Eye,
  Zap,
  AlertCircle,
  Trash2,
  Loader2,
  ArrowLeft,
  Shield,
  Sparkles,
  Heart,
  Share2,
  CheckCircle,
  Award,
  Building2,
  Music,
  Coffee,
  Camera,
  Gift
} from "lucide-react";

export default async function EventPublicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: event, error } = await supabase
    .from("events")
    .select(`
      *,
      ticket_types (
        id,
        name,
        description,
        price,
        quantity,
        sold,
        admission_limit,
        max_per_order,
        is_active
      )
    `)
    .eq("slug", slug)
    .single();

  if (error || !event) {
    notFound();
  }

  // Check if published or if the user is the organizer (for preview mode)
  let isPreview = false;
  if (event.status !== "published") {
    const { data: { user } } = await supabase.auth.getUser();
    if (user && user.id === event.organizer_id) {
      isPreview = true;
    } else {
      notFound();
    }
  }

  // Filter to only active ticket types with remaining quantity
  const availableTickets = (event.ticket_types ?? []).filter(
    (tt: any) => tt.is_active && (tt.quantity - (tt.sold || 0)) > 0
  );

  // Calculate event date/time strings
  const eventDate = new Date(event.event_date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Check if event is upcoming, ongoing, or passed
  const now = new Date();
  const isUpcoming = eventDate > now;
  const isOngoing = Math.abs(eventDate.getTime() - now.getTime()) < 3 * 60 * 60 * 1000; // Within 3 hours
  const isPassed = eventDate < now;

  // Calculate total tickets and revenue
  const totalTickets = availableTickets.reduce((sum: number, tt: any) => sum + (tt.quantity - (tt.sold || 0)), 0);
  const lowestPrice = Math.min(...availableTickets.map((tt: any) => tt.price), Infinity);
  const highestPrice = Math.max(...availableTickets.map((tt: any) => tt.price), -Infinity);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-300/20 dark:bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Preview Mode Alert Banner */}
      {isPreview && (
        <div className="relative z-50 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 dark:from-amber-600 dark:via-orange-600 dark:to-red-600 text-white px-6 py-4 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white/20 rounded-full animate-pulse">
                <AlertCircle className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">
                Preview Mode: This event is currently in Draft status. Only you (the organizer) can see this page.
              </span>
            </div>
            <Link
              href={`/dashboard/organizer/events/${event.id}`}
              className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-bold transition-all duration-200"
            >
              Manage & Publish Event
              <ArrowLeft className="w-3.5 h-3.5 rotate-180 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section with Banner */}
      <div className="relative">
        {event.banner_url ? (
          <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
            <img
              src={event.banner_url}
              alt={`${event.title} banner`}
              className="w-full h-full object-cover"
            />
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

            {/* Status badge */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg ${event.status === "published"
                ? "bg-emerald-500/90 text-white"
                : event.status === "cancelled"
                  ? "bg-red-500/90 text-white"
                  : "bg-amber-500/90 text-white"
                }`}>
                {event.status === "published" ? (
                  <Eye className="w-3.5 h-3.5" />
                ) : event.status === "cancelled" ? (
                  <AlertCircle className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
                <span className="text-xs font-bold uppercase tracking-wider">
                  {event.status === "published" ? "Live Now" : event.status === "cancelled" ? "Cancelled" : "Draft Preview"}
                </span>
              </div>

              {isUpcoming && event.status === "published" && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium">
                  <Sparkles className="w-3 h-3" />
                  <span>Upcoming Event</span>
                </div>
              )}
            </div>

            {/* Event title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white">
                    {event.category || "Event"}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {event.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-white/90 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{formattedTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.is_location_hidden ? "Location revealed after purchase" : event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative h-[300px] md:h-[400px] w-full bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 flex items-center justify-center">
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
            </div>

            <div className="text-center relative z-10">
              <div className="w-20 h-20 mx-auto bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                <Ticket className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {event.title}
              </h1>
              <div className="flex flex-wrap justify-center gap-4 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{formattedTime}</span>
                </div>
              </div>
            </div>

            {/* Status badge for no banner case */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg ${event.status === "published"
                ? "bg-emerald-500/90 text-white"
                : event.status === "cancelled"
                  ? "bg-red-500/90 text-white"
                  : "bg-amber-500/90 text-white"
                }`}>
                {event.status === "published" ? (
                  <Eye className="w-3.5 h-3.5" />
                ) : event.status === "cancelled" ? (
                  <AlertCircle className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
                <span className="text-xs font-bold uppercase tracking-wider">
                  {event.status === "published" ? "Live Now" : event.status === "cancelled" ? "Cancelled" : "Draft Preview"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column - Event Details */}
          <div className="lg:col-span-2 space-y-8">

            {/* Event Description */}
            {event.description && (
              <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
                    About This Event
                  </h2>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
            )}

            {/* Highlights Section */}
            <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
                  Event Highlights
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/30">
                  <Calendar className="w-4 h-4 text-violet-500" />
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">Date: {formattedDate}</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/30">
                  <Clock className="w-4 h-4 text-violet-500" />
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">Time: {formattedTime}</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/30">
                  <MapPin className="w-4 h-4 text-violet-500" />
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    {event.is_location_hidden ? "Location upon purchase" : event.location.split(",")[0]}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/30">
                  <Ticket className="w-4 h-4 text-violet-500" />
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">{totalTickets} tickets left</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/30">
                  <Users className="w-4 h-4 text-violet-500" />
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    {availableTickets.reduce((sum: number, tt: any) => sum + (tt.sold || 0), 0)} attendees
                  </span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/30">
                  <Tag className="w-4 h-4 text-violet-500" />
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    From ₦{lowestPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Venue Details (if not hidden) */}
            {!event.is_location_hidden && (
              <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-500 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
                    Venue Information
                  </h2>
                </div>
                <div className="space-y-2">
                  <p className="text-zinc-700 dark:text-zinc-300 font-medium">{event.location}</p>
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Full address will be shared on your ticket</span>
                  </div>
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="flex items-center justify-end gap-2">
              <button className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <Heart className="w-4 h-4 text-zinc-400 hover:text-red-500 transition-colors" />
              </button>
              <button className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <Share2 className="w-4 h-4 text-zinc-400 hover:text-blue-500 transition-colors" />
              </button>
            </div>
          </div>

          {/* Right Column - Ticket Selection */}
          <div className="lg:col-span-1">
            {availableTickets.length > 0 ? (
              <div className="sticky top-6 space-y-4">
                <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 p-6 shadow-2xl">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-200 dark:border-zinc-700">
                    <Ticket className="w-5 h-5 text-violet-500" />
                    <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
                      Select Your Ticket
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {availableTickets.map((tt: any, idx: number) => {
                      const remaining = tt.quantity - (tt.sold || 0);
                      const isLowStock = remaining <= 10 && remaining > 0;
                      const soldPercentage = (tt.sold / tt.quantity) * 100;

                      return (
                        <div
                          key={tt.id}
                          className="group relative rounded-xl border-2 border-zinc-200 dark:border-zinc-700 hover:border-violet-500 dark:hover:border-violet-500 transition-all duration-200 overflow-hidden"
                        >
                          {isLowStock && (
                            <div className="absolute top-0 right-0">
                              <div className="flex items-center gap-1 px-2 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded-bl-lg">
                                <Zap className="w-2 h-2" />
                                LOW STOCK
                              </div>
                            </div>
                          )}

                          <div className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-[9px] font-bold">
                                    {idx + 1}
                                  </span>
                                  <h3 className="font-bold text-zinc-800 dark:text-zinc-200">
                                    {tt.name}
                                  </h3>
                                </div>
                                {tt.description && (
                                  <p className="text-[10px] text-zinc-500 italic">
                                    {tt.description}
                                  </p>
                                )}
                              </div>
                              <div className="text-right">
                                <p className="text-xl font-black text-zinc-900 dark:text-white">
                                  ₦{tt.price.toFixed(2)}
                                </p>
                                <p className="text-[9px] text-zinc-400">per ticket</p>
                              </div>
                            </div>

                            {/* Progress bar */}
                            <div className="mb-3">
                              <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
                                <span>Available</span>
                                <span className={isLowStock ? "text-red-500 font-bold" : ""}>
                                  {remaining} left
                                </span>
                              </div>
                              <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${isLowStock ? "bg-red-500" : "bg-gradient-to-r from-violet-500 to-indigo-500"
                                    }`}
                                  style={{ width: `${100 - soldPercentage}%` }}
                                />
                              </div>
                            </div>

                            <Link
                              href={`/events/${event.slug}/checkout?ticketTypeId=${tt.id}`}
                              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 group"
                            >
                              <Ticket className="w-4 h-4" />
                              Select Ticket
                              <ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-700">
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span>Total tickets available</span>
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">{totalTickets}</span>
                    </div>
                    {lowestPrice !== highestPrice && (
                      <div className="flex items-center justify-between text-xs text-zinc-500 mt-1">
                        <span>Price range</span>
                        <span className="font-medium">
                          ₦{lowestPrice.toFixed(2)} - ₦{highestPrice.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Safety info */}
                <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-3 border border-emerald-200 dark:border-emerald-800/30">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                        Secure Checkout
                      </p>
                      <p className="text-[10px] text-emerald-700 dark:text-emerald-500">
                        Your tickets will be emailed instantly after purchase
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 p-8 text-center shadow-2xl">
                <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-950/30 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-2">
                  Tickets Sold Out
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                  All tickets for this event have been sold. Check back later or explore other events.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold hover:shadow-lg transition-all"
                >
                  Browse More Events
                  <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <span>Organized by Tikkety</span>
              <span className="w-1 h-1 rounded-full bg-zinc-400" />
              <span>{event.category || "Event"}</span>
            </div>
            <div className="font-mono text-[10px]">
              Event ID: {event.id.slice(0, 8)}...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}