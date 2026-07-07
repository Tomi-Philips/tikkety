"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  UserPlus,
  Trash2,
  Users,
  Shield,
  ScanLine,
  Loader2,
  Mail,
  ChevronDown,
} from "lucide-react";

type StaffMember = {
  id: string;
  email: string;
  role: "scanner" | "manager";
  created_at: string;
};

type StaffManagerProps = {
  eventId: string;
  eventTitle: string;
  initialStaff: StaffMember[];
};

const ROLE_CONFIG = {
  scanner: {
    label: "Scanner",
    icon: ScanLine,
    badge:
      "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800",
    description: "Can check-in tickets",
  },
  manager: {
    label: "Manager",
    icon: Shield,
    badge:
      "bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-800",
    description: "Can view dashboard",
  },
};

export default function StaffManager({
  eventId,
  eventTitle,
  initialStaff,
}: StaffManagerProps) {
  const supabase = createClient();

  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"scanner" | "manager">("scanner");
  const [inviting, setInviting] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  // ── Invite staff ────────────────────────────────────────────────────────────
  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      toast.error("Please enter an email address.");
      return;
    }

    // Prevent duplicate entries
    if (staff.some((s) => s.email.toLowerCase() === trimmedEmail)) {
      toast.error("This email is already on the staff list.");
      return;
    }

    setInviting(true);

    const { data, error } = await supabase
      .from("event_staff")
      .insert({ event_id: eventId, email: trimmedEmail, role })
      .select()
      .maybeSingle();

    setInviting(false);

    if (error) {
      toast.error("Failed to invite staff.", { description: error.message });
      return;
    }

    setStaff((prev) => [data as StaffMember, ...prev]);
    setEmail("");
    toast.success(`${trimmedEmail} added as ${role}.`);
  };

  // ── Remove staff ────────────────────────────────────────────────────────────
  const handleRemove = async (staffId: string, staffEmail: string) => {
    setRemovingId(staffId);

    const { error } = await supabase
      .from("event_staff")
      .delete()
      .eq("id", staffId);

    setRemovingId(null);

    if (error) {
      toast.error("Failed to remove staff member.", {
        description: error.message,
      });
      return;
    }

    setStaff((prev) => prev.filter((s) => s.id !== staffId));
    toast.success(`${staffEmail} removed from staff.`);
  };

  return (
    <div className="space-y-8">

      {/* ── Invite Form ─────────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-indigo-500" />
            Invite Staff
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Add team members who can help manage{" "}
            <span className="font-semibold text-zinc-500 dark:text-zinc-300">
              {eventTitle}
            </span>
            .
          </p>
        </div>

        <form onSubmit={handleInvite} className="p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Email input */}
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
              <input
                id="staff-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@example.com"
                required
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition"
              />
            </div>

            {/* Role select */}
            <div className="relative">
              <select
                id="staff-role-select"
                value={role}
                onChange={(e) =>
                  setRole(e.target.value as "scanner" | "manager")
                }
                className="appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition cursor-pointer"
              >
                <option value="scanner">Scanner</option>
                <option value="manager">Manager</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
            </div>

            {/* Submit */}
            <button
              id="invite-staff-btn"
              type="submit"
              disabled={inviting}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-sm font-bold shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 shrink-0"
            >
              {inviting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <UserPlus className="w-4 h-4" />
              )}
              {inviting ? "Inviting..." : "Invite"}
            </button>
          </div>

          {/* Role legend */}
          <div className="flex flex-wrap gap-3 mt-4">
            {(Object.entries(ROLE_CONFIG) as [keyof typeof ROLE_CONFIG, (typeof ROLE_CONFIG)[keyof typeof ROLE_CONFIG]][]).map(([key, cfg]) => {
              const Icon = cfg.icon;
              return (
                <div
                  key={key}
                  className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400"
                >
                  <Icon className="w-3 h-3" />
                  <span className="font-semibold capitalize">{cfg.label}:</span>
                  <span>{cfg.description}</span>
                </div>
              );
            })}
          </div>
        </form>
      </div>

      {/* ── Staff List ──────────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <h3 className="font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-500" />
            Staff Members
          </h3>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
            {staff.length} {staff.length === 1 ? "member" : "members"}
          </span>
        </div>

        {staff.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-950/40 dark:to-blue-950/40 flex items-center justify-center mb-4 shadow-inner">
              <Users className="w-6 h-6 text-indigo-500" />
            </div>
            <p className="font-semibold text-zinc-700 dark:text-zinc-200 mb-1">
              No staff yet
            </p>
            <p className="text-sm text-zinc-400 max-w-xs">
              Invite team members above to help you manage check-ins and
              operations for this event.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {staff.map((member) => {
              const cfg = ROLE_CONFIG[member.role];
              const Icon = cfg.icon;
              return (
                <div
                  key={member.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors group"
                >
                  {/* Avatar + Info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md shadow-indigo-500/20">
                      {member.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate">
                        {member.email}
                      </p>
                      <p className="text-[10px] text-zinc-400">
                        Added{" "}
                        {new Date(member.created_at).toLocaleDateString(
                          "en-NG",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Role + Remove */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${cfg.badge}`}
                    >
                      <Icon className="w-3 h-3" />
                      {cfg.label}
                    </span>

                    <button
                      id={`remove-staff-${member.id}`}
                      onClick={() => handleRemove(member.id, member.email)}
                      disabled={removingId === member.id}
                      className="flex items-center justify-center w-8 h-8 rounded-xl text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Remove staff member"
                    >
                      {removingId === member.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
