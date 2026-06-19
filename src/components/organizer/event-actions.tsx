"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { updateEventStatusAction } from "@/app/actions/event-actions";
import {
  ArrowLeft,
  ChevronDown,
  Eye,
  Loader2,
  Send,
  XCircle,
  Archive,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

type EventActionsProps = {
  eventId: string;
  initialStatus: string;
  eventTitle: string;
  eventSlug: string;
};

export default function EventActions({
  eventId,
  initialStatus,
  eventTitle,
  eventSlug,
}: EventActionsProps) {
  const router = useRouter();
  const supabase = createClient();
  const [status, setStatus] = useState<string>(initialStatus);
  const [loading, setLoading] = useState(false);

  const updateStatus = async (newStatus: "published" | "draft" | "cancelled") => {
    setLoading(true);
    try {
      await updateEventStatusAction(eventId, newStatus);

      setStatus(newStatus);
      toast.success(
        newStatus === "published"
          ? "Event published successfully! It is now live on the public feed."
          : newStatus === "draft"
          ? "Event reverted to draft."
          : "Event cancelled."
      );
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to update event status.");
      console.error("[EventActions] updateStatus error:", err);
    } finally {
      setLoading(false);
    }
  };

  const statusBadgeClass = (s: string) => {
    switch (s) {
      case "published":
        return "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-500/20";
      case "cancelled":
        return "bg-rose-500/10 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 border border-rose-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-600 dark:bg-zinc-800/20 dark:text-zinc-400 border border-zinc-500/15";
    }
  };

  const statusLabel = (s: string) => {
    switch (s) {
      case "published":
        return "Published";
      case "cancelled":
        return "Cancelled";
      default:
        return "Draft";
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 w-full">
        {/* Navigation & Breadcrumb */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard/organizer")}
            className="group flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-all duration-200"
          >
            <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Back to Dashboard</span>
          </button>
          <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span>Organizer Studio</span>
            <ChevronDown className="w-3 h-3 rotate-270" />
            <span className="text-zinc-700 dark:text-zinc-300 font-medium">
              Manage Event
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Actions */}
      <div className="flex flex-wrap items-center gap-3 justify-end">
        {/* Status Badge */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all capitalize ${statusBadgeClass(
            status
          )}`}
        >
          {status === "published" && <CheckCircle className="w-3.5 h-3.5" />}
          {status === "cancelled" && <XCircle className="w-3.5 h-3.5" />}
          {status === "draft" && <Archive className="w-3.5 h-3.5" />}
          <span>{statusLabel(status)}</span>
        </div>

        {/* Action Controls */}
        {loading ? (
          <button
            disabled
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-zinc-200 dark:border-zinc-800 text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            Updating status...
          </button>
        ) : (
          <>
            {/* 1. View Public Link (if published) */}
            {status === "published" && (
              <a
                href={`/events/${eventSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-violet-500/30 hover:text-violet-600 dark:hover:text-violet-400 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Eye className="w-4 h-4 text-violet-500 group-hover:scale-110 transition-transform" />
                <span>View Public Page</span>
              </a>
            )}

            {/* 2. Publish Button (if draft) */}
            {status === "draft" && (
              <button
                onClick={() => updateStatus("published")}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200"
              >
                <Send className="w-4 h-4" />
                <span>Publish Event</span>
              </button>
            )}

            {/* 3. Revert to Draft (if published or cancelled) */}
            {status !== "draft" && (
              <button
                onClick={() => updateStatus("draft")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200"
              >
                <Archive className="w-4 h-4" />
                <span>Revert to Draft</span>
              </button>
            )}

            {/* 4. Cancel Event (if draft or published) */}
            {status !== "cancelled" && (
              <button
                onClick={() => {
                  const confirmCancel = confirm(
                    "Are you sure you want to cancel this event? This will let buyers know the event is no longer active."
                  );
                  if (confirmCancel) updateStatus("cancelled");
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-950/30 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-200"
              >
                <XCircle className="w-4 h-4" />
                <span>Cancel Event</span>
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
