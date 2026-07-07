import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ChevronLeft, Users } from "lucide-react";
import StaffManager from "@/components/organizer/staff-manager";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase
    .from("events")
    .select("title")
    .eq("id", id)
    .maybeSingle();

  return {
    title: event ? `Staff — ${event.title} | Tikkety` : "Staff Management | Tikkety",
    description: "Manage staff members for your event.",
  };
}

export default async function EventStaffPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // ── Fetch event (verify ownership) ──────────────────────────────────────────
  const { data: event } = await supabase
    .from("events")
    .select("id, title, status")
    .eq("id", id)
    .eq("organizer_id", user.id)
    .maybeSingle();

  if (!event) notFound();

  // ── Fetch existing staff ─────────────────────────────────────────────────────
  const { data: staffData } = await supabase
    .from("event_staff")
    .select("id, email, role, created_at")
    .eq("event_id", id)
    .order("created_at", { ascending: false });

  type StaffMember = {
    id: string;
    email: string;
    role: "scanner" | "manager";
    created_at: string;
  };

  const staff: StaffMember[] = staffData ?? [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div>
        {/* Breadcrumb */}
        <Link
          href={`/dashboard/organizer/events/${id}`}
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-4 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to event
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Users className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-950 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
                Staff Management
              </h2>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-zinc-700 dark:text-zinc-200">
                {event.title}
              </span>{" "}
              — add team members who can help manage this event.
            </p>
          </div>

          {/* Staff count badge */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 shrink-0">
            <Users className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
              {staff.length} {staff.length === 1 ? "Member" : "Members"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Staff Manager (interactive client component) ─────────────────────── */}
      <StaffManager
        eventId={id}
        eventTitle={event.title}
        initialStaff={staff}
      />
    </div>
  );
}
