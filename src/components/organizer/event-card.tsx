// event-card.tsx
import Link from "next/link";
import { Calendar, MapPin, Clock, Eye, TrendingUp, Users, Sparkles, ChevronRight, Ticket, DollarSign, Shield, Award, Pencil, UserCheck, QrCode } from "lucide-react";
import EventCardActions from "./event-card-actions";

type EventCardProps = {
  event: any;
};

export default function EventCard({ event }: EventCardProps) {
  const ticket = event.ticket_types?.[0];
  const sold = ticket?.sold || 0;
  const cap = ticket?.quantity || 0;
  const price = ticket?.price || 0;
  const soldPercentage = cap > 0 ? (sold / cap) * 100 : 0;
  const isSoldOut = sold >= cap;
  const isLowStock = soldPercentage > 70 && !isSoldOut;

  const prices = event.ticket_types?.map(
    (t: any) => Number(t.price)
  ) || [];

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Get status badge configuration
  const getStatusBadge = () => {
    switch (event.status) {
      case "published":
        return { label: "Live", color: "emerald", icon: Sparkles };
      case "cancelled":
        return { label: "Cancelled", color: "rose", icon: Shield };
      default:
        return { label: "Draft", color: "amber", icon: Clock };
    }
  };

  const statusBadge = getStatusBadge();
  const StatusIcon = statusBadge.icon;

  return (
    <div className="group relative overflow-hidden bg-gradient-to-br from-white to-zinc-50/80 dark:from-zinc-900/90 dark:to-zinc-950/90 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/40 hover:-translate-y-1.5">

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/0 to-indigo-100/0 group-hover:from-blue-100/5 group-hover:to-indigo-100/5 transition-all duration-500 rounded-2xl pointer-events-none" />

      {/* Banner image section */}
      <div className="relative h-48 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 overflow-hidden rounded-t-2xl">
        {event.banner_url ? (
          <img
            src={event.banner_url}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 via-indigo-100 to-pink-100 dark:from-zinc-800 dark:via-zinc-800 dark:to-zinc-900 flex items-center justify-center">
            <Ticket className="w-16 h-16 text-zinc-400 dark:text-zinc-600 opacity-40 group-hover:scale-110 transition-transform duration-300" />
          </div>
        )}

        {/* Gradient overlay for better badge visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Status badges container */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {/* Event Status Badge */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-lg backdrop-blur-md ${event.status === "published"
            ? "bg-emerald-500/95 text-white"
            : event.status === "cancelled"
              ? "bg-rose-500/95 text-white"
              : "bg-amber-500/95 text-white"
            }`}>
            <StatusIcon className="w-2.5 h-2.5" />
            <span className="text-[10px] font-extrabold tracking-wider uppercase">
              {statusBadge.label}
            </span>
          </div>

          {/* Stock Status Badge */}
          {isSoldOut ? (
            <div className="bg-red-500/95 backdrop-blur-md text-white text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              SOLD OUT
            </div>
          ) : isLowStock && event.status === "published" && (
            <div className="bg-amber-500/95 backdrop-blur-md text-white text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
              <Sparkles className="w-2.5 h-2.5" />
              LOW STOCK
            </div>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-800/50 font-bold text-[11px] px-2.5 py-1 rounded-full text-zinc-700 dark:text-zinc-300 shadow-md transition-all group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50 group-hover:border-blue-200 dark:group-hover:border-blue-800">
          {event.category || 'General'}
        </div>

        {/* Price tag overlay for free events */}
        {Number(price) === 0 && (
          <div className="absolute bottom-3 left-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
            <Award className="w-2.5 h-2.5" />
            FREE EVENT
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Title with hover effect */}
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-extrabold text-lg text-zinc-800 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight flex-1">
              {event.title}
            </h4>
            {/* Sales indicator */}
            {sold > 0 && event.status === "published" && (
              <div className="flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-full shrink-0">
                <TrendingUp className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400">{sold} sold</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {event.description || "No description provided"}
          </p>
        </div>

        {/* Location and Date Info */}
        <div className="flex justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-xs text-zinc-500 group/location">
            <div className="p-0.5 rounded-md bg-blue-100 dark:bg-blue-950/50">
              <MapPin className="w-3 h-3 text-blue-500" strokeWidth={1.8} />
            </div>
            <span className="truncate group-hover/location:text-blue-600 dark:group-hover/location:text-blue-400 transition-colors">
              {event.is_location_hidden ? "📍 Location revealed on ticket" : event.location}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <div className="p-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/50">
              <Clock className="w-3 h-3 text-indigo-500" strokeWidth={1.8} />
            </div>
            <span>{new Date(event.event_date).toLocaleDateString("en-US", {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}</span>
          </div>
        </div>

        {/* Ticket Progress Section - Only show if event is published and not cancelled */}
        {event.status === "published" && !isSoldOut && cap > 0 && (
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-[11px] font-semibold">
              <span className="text-zinc-500 flex items-center gap-1">
                <Users className="w-3 h-3" />
                Tickets sold
              </span>
              <span className={`font-bold ${isLowStock ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {sold} / {cap}
              </span>
            </div>
            <div className="relative w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${isSoldOut ? 'bg-gradient-to-r from-red-500 to-rose-500' :
                  isLowStock ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                    'bg-gradient-to-r from-blue-500 to-indigo-500'
                  }`}
                style={{ width: `${soldPercentage}%` }}
              />
              {/* Shimmer effect on progress bar */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>{Math.round(soldPercentage)}% capacity filled</span>
              <span>{cap - sold} spots left</span>
            </div>
          </div>
        )}

        {/* Bottom Action Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800 gap-4 mt-auto">
          {/* Price */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-0.5">
              <span className="text-md font-black bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
                {minPrice === 0 && maxPrice === 0
                  ? "FREE"
                  : minPrice === maxPrice
                  ? `₦${minPrice.toLocaleString()}`
                  : `₦${minPrice.toLocaleString()} - ₦${maxPrice.toLocaleString()}`
                }
              </span>
            </div>

            {minPrice > 0 && (
              <p className="text-[9px] text-zinc-400">
                {minPrice === maxPrice ? "per ticket" : "starting price"}
              </p>
            )}
          </div>

          {/* Quick Actions Toggle Trigger */}
          <div className="flex-1 max-w-[150px]">
            <EventCardActions eventId={event.id} eventSlug={event.slug} />
          </div>
        </div>

      </div>
    </div>
  );
}