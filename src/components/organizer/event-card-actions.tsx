"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Zap,
  X,
  Pencil,
  DollarSign,
  UserCheck,
  QrCode,
  TrendingUp,
  Users,
  Eye,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";

type EventCardActionsProps = {
  eventId: string;
  eventSlug: string;
};

const ACTIONS = [
  {
    label: "Manage",
    icon: LayoutDashboard,
    gradient: "from-blue-600 to-indigo-600",
    hoverGradient: "hover:from-blue-700 hover:to-indigo-700",
    shadow: "shadow-blue-500/20",
    href: (id: string) => `/dashboard/organizer/events/${id}`,
  },
  {
    label: "Edit",
    icon: Pencil,
    gradient: "from-amber-500 to-orange-500",
    hoverGradient: "hover:from-amber-600 hover:to-orange-600",
    shadow: "shadow-amber-500/20",
    href: (id: string) => `/dashboard/organizer/events/${id}/edit`,
  },
  {
    label: "Sales",
    icon: DollarSign,
    gradient: "from-emerald-500 to-teal-500",
    hoverGradient: "hover:from-emerald-600 hover:to-teal-600",
    shadow: "shadow-emerald-500/20",
    href: (id: string) => `/dashboard/organizer/events/${id}/sales`,
  },
  {
    label: "Attendees",
    icon: UserCheck,
    gradient: "from-sky-500 to-blue-500",
    hoverGradient: "hover:from-sky-600 hover:to-blue-600",
    shadow: "shadow-sky-500/20",
    href: (id: string) => `/dashboard/organizer/events/${id}/attendees`,
  },
  {
    label: "Check-In",
    icon: QrCode,
    gradient: "from-violet-600 to-purple-600",
    hoverGradient: "hover:from-violet-700 hover:to-purple-700",
    shadow: "shadow-violet-500/20",
    href: (id: string) => `/dashboard/organizer/events/${id}/check-in`,
  },
  {
    label: "Analytics",
    icon: TrendingUp,
    gradient: "from-purple-500 to-violet-600",
    hoverGradient: "hover:from-purple-600 hover:to-violet-700",
    shadow: "shadow-purple-500/20",
    href: (id: string) => `/dashboard/organizer/events/${id}/analytics`,
  },
  {
    label: "Staff",
    icon: Users,
    gradient: "from-indigo-500 to-blue-600",
    hoverGradient: "hover:from-indigo-600 hover:to-blue-700",
    shadow: "shadow-indigo-500/20",
    href: (id: string) => `/dashboard/organizer/events/${id}/staff`,
  },
  {
    label: "Preview",
    icon: Eye,
    gradient: "from-zinc-500 to-zinc-600",
    hoverGradient: "hover:from-zinc-600 hover:to-zinc-700",
    shadow: "shadow-zinc-500/10",
    href: (_: string, slug: string) => `/events/${slug}`,
    useSlug: true,
  },
];

export default function EventCardActions({
  eventId,
  eventSlug,
}: EventCardActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  return (
    <>
      {/* ── Toggle Button ─────────────────────────────────────────────────── */}
      <button
        id={`actions-toggle-${eventId}`}
        onClick={() => setIsOpen((v) => !v)}
        className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs transition-all duration-200
          ${isOpen
            ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200"
            : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.98]"
          }`}
      >
        <Zap className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`} />
        <span className="truncate">{isOpen ? "Close" : "Actions"}</span>
      </button>

      {/* ── Action Panel Overlay (inside card, absolute) ───────────────────── */}
      {isOpen && (
        <div
          ref={panelRef}
          className="absolute inset-0 z-20 bg-white/97 dark:bg-zinc-900/97 backdrop-blur-sm rounded-2xl flex flex-col p-3 sm:p-4"
          style={{
            animation: "slideUpFadeIn 0.18s ease-out both",
          }}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-300">
                Event Actions
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-150"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 4-column action grid */}
          <div className="grid gap-1.5 flex-1 content-start" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(58px, 1fr))" }}>
            {ACTIONS.map((action) => {
              const Icon = action.icon;
              const href = action.useSlug
                ? action.href(eventId, eventSlug)
                : action.href(eventId, "");

              return (
                <Link
                  key={action.label}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`flex flex-col items-center justify-center gap-1 py-2.5 px-1 rounded-xl bg-gradient-to-br ${action.gradient} ${action.hoverGradient} text-white shadow-sm ${action.shadow} hover:shadow-md hover:scale-[1.05] active:scale-95 transition-all duration-200 min-w-0`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2.2} />
                  <span className="text-[9px] font-bold leading-none text-center w-full truncate px-0.5">
                    {action.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUpFadeIn {
          from { opacity: 0; transform: translateY(6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
