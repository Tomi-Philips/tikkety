import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  DollarSign,
  Wallet,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Building2,
} from "lucide-react";
import WithdrawButton from "@/components/organizer/withdraw-button";

// ─── Mock payout history (demo data) ─────────────────────────────────────────
const MOCK_PAYOUTS = [
  {
    id: "pay_001",
    date: "Jul 2, 2026",
    event: "Lagos Tech Summit",
    amount: 45000,
    status: "completed",
  },
  {
    id: "pay_002",
    date: "Jun 18, 2026",
    event: "Naija Music Fest",
    amount: 120000,
    status: "completed",
  },
  {
    id: "pay_003",
    date: "Jun 5, 2026",
    event: "StartUp Nigeria 2026",
    amount: 32000,
    status: "completed",
  },
];

export const metadata = {
  title: "Payouts | Tikkety Organizer",
  description: "Track your revenue and manage payout requests.",
};

export default async function PayoutsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // ── Fetch all events + ticket types for this organizer ──────────────────────
  const { data: events } = await supabase
    .from("events")
    .select(`
      id,
      title,
      status,
      event_date,
      ticket_types (
        id,
        name,
        price,
        sold
      )
    `)
    .eq("organizer_id", user.id)
    .order("created_at", { ascending: false });

  // ── Revenue calculations ─────────────────────────────────────────────────────
  const totalRevenue =
    events?.reduce((sum, event) => {
      const eventRevenue =
        event.ticket_types?.reduce(
          (s: number, t: any) => s + Number(t.price || 0) * (t.sold || 0),
          0
        ) ?? 0;
      return sum + eventRevenue;
    }, 0) ?? 0;

  const PLATFORM_FEE_RATE = 0.1;
  const platformFee = totalRevenue * PLATFORM_FEE_RATE;
  const availableBalance = totalRevenue - platformFee;

  // ── Per-event revenue breakdown ──────────────────────────────────────────────
  const eventBreakdown =
    events?.map((event) => {
      const revenue =
        event.ticket_types?.reduce(
          (s: number, t: any) => s + Number(t.price || 0) * (t.sold || 0),
          0
        ) ?? 0;
      const ticketsSold =
        event.ticket_types?.reduce((s: number, t: any) => s + (t.sold || 0), 0) ??
        0;
      return { ...event, revenue, ticketsSold };
    }) ?? [];

  const formatNGN = (amount: number) =>
    `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-950 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
            Payouts
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Track your earnings and request withdrawals.
          </p>
        </div>

        {/* Withdraw CTA */}
        <WithdrawButton />
      </div>

      {/* ── Balance Cards ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        {/* Total Revenue */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-2xl p-5 border border-emerald-100 dark:border-emerald-900/50 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl ring-1 ring-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Total Revenue
              </p>
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white mt-1">
                {formatNGN(totalRevenue)}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="w-3 h-3" />
            <span>Lifetime gross earnings</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Platform Fee */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 rounded-2xl p-5 border border-orange-100 dark:border-orange-900/50 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl ring-1 ring-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
                Platform Fee
              </p>
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white mt-1">
                {formatNGN(platformFee)}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Building2 className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-orange-600 dark:text-orange-400">
            <span className="px-1.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300">
              10%
            </span>
            <span>of total revenue</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Available Balance */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 rounded-2xl p-5 border border-violet-100 dark:border-violet-900/50 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl ring-1 ring-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                Available Balance
              </p>
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white mt-1">
                {formatNGN(availableBalance)}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Wallet className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-violet-600 dark:text-violet-400">
            <span>Ready to withdraw</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* ── Revenue by Event ─────────────────────────────────────────────────── */}
      {eventBreakdown.length > 0 && (
        <div className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <h3 className="font-bold text-zinc-800 dark:text-zinc-100">
              Revenue by Event
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
              {eventBreakdown.length} {eventBreakdown.length === 1 ? "event" : "events"}
            </span>
          </div>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {eventBreakdown.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    event.status === "published"
                      ? "bg-emerald-500"
                      : event.status === "cancelled"
                      ? "bg-rose-500"
                      : "bg-amber-500"
                  }`} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate">
                      {event.title}
                    </p>
                    <p className="text-[11px] text-zinc-400">
                      {event.ticketsSold} ticket{event.ticketsSold !== 1 ? "s" : ""} sold ·{" "}
                      {new Date(event.event_date).toLocaleDateString("en-NG", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">
                    {formatNGN(event.revenue)}
                  </p>
                  <p className="text-[10px] text-zinc-400">
                    {formatNGN(event.revenue * (1 - PLATFORM_FEE_RATE))} after fee
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Payout History ───────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-zinc-800 dark:text-zinc-100">
              Payout History
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">Previous withdrawals</p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            DEMO DATA
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/60">
                <th className="text-left px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Date
                </th>
                <th className="text-left px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Event
                </th>
                <th className="text-right px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Amount
                </th>
                <th className="text-right px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {MOCK_PAYOUTS.map((payout) => (
                <tr
                  key={payout.id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                >
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300 font-medium">
                    {payout.date}
                  </td>
                  <td className="px-6 py-4 text-zinc-700 dark:text-zinc-200">
                    {payout.event}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-zinc-900 dark:text-white">
                    {formatNGN(payout.amount)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      Completed
                    </span>
                  </td>
                </tr>
              ))}

              {/* Pending row — most recent request */}
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300 font-medium">
                  Today
                </td>
                <td className="px-6 py-4 text-zinc-700 dark:text-zinc-200">
                  Latest events
                </td>
                <td className="px-6 py-4 text-right font-bold text-zinc-900 dark:text-white">
                  {formatNGN(availableBalance)}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400">
                    <Clock className="w-3 h-3" />
                    Pending
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Empty history hint */}
        <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2 text-xs text-zinc-400">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>
            Payout history will reflect real transactions once banking
            integration is enabled.
          </span>
        </div>
      </div>

    </div>
  );
}
