import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TicketTypesManager from "./tickets/page";
import EventActions from "@/components/organizer/event-actions";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Eye,
  ImagePlus,
  Send,
  Sparkles,
  Ticket,
  Trash2,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Clock,
  Tag,
  Info,
  TrendingUp,
  Shield
} from "lucide-react";

export default async function EventOrganizerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch event with ticket types
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
        is_active,
        sale_start,
        sale_end
      )
    `)
    .eq("id", id)
    .single();

  if (error || !event) {
    notFound();
  }

  // Ensure ticket_types is always an array
  const ticketTypes = event.ticket_types ?? [];

  // Calculate summary stats
  const totalTicketsSold = ticketTypes.reduce((sum: number, tt: any) => sum + (tt.sold || 0), 0);
  const totalCapacity = ticketTypes.reduce((sum: number, tt: any) => sum + tt.quantity, 0);
  const totalRevenue = ticketTypes.reduce((sum: number, tt: any) => sum + tt.price * (tt.sold || 0), 0);
  const fillPercentage = totalCapacity > 0 ? Math.round((totalTicketsSold / totalCapacity) * 100) : 0;

  const getStatusBadge = () => {
    switch (event.status) {
      case "published":
        return { label: "Live", color: "emerald", icon: Eye };
      case "draft":
        return { label: "Draft", color: "zinc", icon: AlertCircle };
      case "cancelled":
        return { label: "Cancelled", color: "red", icon: AlertCircle };
      default:
        return { label: event.status, color: "zinc", icon: Info };
    }
  };

  const statusBadge = getStatusBadge();
  const StatusIcon = statusBadge.icon;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Page Header with breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span>Organizer Studio</span>
            <span className="text-zinc-400">/</span>
            <span className="text-zinc-700 dark:text-zinc-300 font-medium">Event Details</span>
          </div>
        </div>

        {/* Quick stats pills */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800">
            <Ticket className="w-3 h-3 text-zinc-500" />
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              {totalTicketsSold}/{totalCapacity} sold
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30">
            <Tag className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
              ₦{totalRevenue.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <EventActions
        eventId={event.id}
        initialStatus={event.status}
        eventTitle={event.title}
        eventSlug={event.slug}
      />

      {/* Event Banner Section */}
      {event.banner_url ? (
        <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <img
            src={event.banner_url}
            alt={`${event.title} banner`}
            className="w-full h-72 object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Status ribbon */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg ${event.status === "published"
              ? "bg-emerald-500/90 text-white"
              : event.status === "cancelled"
                ? "bg-red-500/90 text-white"
                : "bg-zinc-800/90 text-white"
              }`}>
              <StatusIcon className="w-3.5 h-3.5" />
              <span className="text-xs font-bold uppercase tracking-wider">{statusBadge.label}</span>
            </div>
          </div>

          {/* Event title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(event.event_date).toLocaleDateString("en-US", {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{new Date(event.event_date).toLocaleTimeString("en-US", {
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900/50 dark:to-zinc-900/30 h-56 flex items-center justify-center group transition-all duration-300 hover:border-violet-400">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-violet-100 dark:group-hover:bg-violet-950/30 transition-colors">
              <ImagePlus className="w-7 h-7 text-zinc-400 group-hover:text-violet-500 transition-colors" />
            </div>
            <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
              No banner uploaded yet
            </p>
            <p className="text-xs text-zinc-400">
              Click "Edit Event" to add a banner image
            </p>
          </div>
        </div>
      )}

      {/* Event Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Content - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Description Card */}
          <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-4 h-4 text-violet-500" />
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                About This Event
              </h3>
            </div>
            {event.description ? (
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            ) : (
              <p className="text-zinc-400 italic">No description provided yet.</p>
            )}
          </div>

          {/* Ticket Types Overview */}
          <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-indigo-500" />
                <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                  Ticket Types
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400">
                {ticketTypes.length} types
              </span>
            </div>

            {ticketTypes.length > 0 ? (
              <div className="space-y-3">
                {ticketTypes.map((tt: any, idx: number) => {
                  const soldPercentage = tt.quantity > 0 ? (tt.sold / tt.quantity) * 100 : 0;
                  return (
                    <div key={tt.id} className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 border border-zinc-100 dark:border-zinc-700/50 hover:border-indigo-200 dark:hover:border-indigo-800/50 transition-all">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                            {idx + 1}
                          </div>
                          <h4 className="font-bold text-zinc-800 dark:text-zinc-200">
                            {tt.name}
                          </h4>
                          {tt.is_active ? (
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                              Active
                            </span>
                          ) : (
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-500">
                              Inactive
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-black text-zinc-900 dark:text-white">
                            ${tt.price.toFixed(2)}
                          </p>
                          <p className="text-[10px] text-zinc-400">per ticket</p>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="space-y-1.5 mt-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-500">Sales progress</span>
                          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                            {tt.sold} / {tt.quantity}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full transition-all duration-500"
                            style={{ width: `${soldPercentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Additional info */}
                      <div className="flex flex-wrap gap-3 mt-3 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                        <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                          <Users className="w-2.5 h-2.5" />
                          <span>Max per order: {tt.max_per_order}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                          <Shield className="w-2.5 h-2.5" />
                          <span>Admits {tt.admission_limit} per QR</span>
                        </div>
                      </div>

                      {tt.description && (
                        <p className="text-[11px] text-zinc-500 mt-2 italic">
                          "{tt.description}"
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-zinc-500 text-center py-6">
                No ticket types configured yet. Add ticket types below.
              </p>
            )}
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Event Info Card */}
          <div className="bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-950/20 dark:to-blue-950/20 rounded-2xl border border-violet-200/50 dark:border-violet-800/30 p-5 shadow-lg">
            <h3 className="text-xs font-bold text-violet-700 dark:text-violet-400 uppercase tracking-wider mb-4">
              Event Information
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">Date</p>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {new Date(event.event_date).toLocaleDateString("en-US", {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">Time</p>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {new Date(event.event_date).toLocaleTimeString("en-US", {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">Venue</p>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {event.location}
                  </p>
                  {event.is_location_hidden && (
                    <p className="text-[10px] text-amber-600 dark:text-amber-400 flex items-center gap-1 mt-1">
                      <Shield className="w-2.5 h-2.5" />
                      Hidden until purchase
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Tag className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">Category</p>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {event.category || "Uncategorized"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                Performance Stats
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-500">Fill Rate</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">{fillPercentage}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                    style={{ width: `${fillPercentage}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="text-center p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/20">
                  <p className="text-[10px] text-zinc-500">Sold</p>
                  <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">{totalTicketsSold}</p>
                </div>
                <div className="text-center p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/20">
                  <p className="text-[10px] text-zinc-500">Available</p>
                  <p className="text-lg font-bold text-indigo-700 dark:text-indigo-400">{totalCapacity - totalTicketsSold}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-500">Total Revenue</span>
                  <span className="text-xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                    ${totalRevenue.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Type Management Section */}
      <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 p-6 shadow-lg mt-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-md">
            <Ticket className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-100">
              Ticket Management
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Configure pricing tiers, availability, and sales limits
            </p>
          </div>
        </div>

        <TicketTypesManager
          eventId={event.id}
          initialTypes={ticketTypes}
          eventSlug={event.slug}
          initialBannerUrl={event.banner_url}
          embedded={true}
        />
      </div>

    </div>
  );
}