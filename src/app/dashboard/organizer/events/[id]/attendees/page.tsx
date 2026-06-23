"use client";

import {
  Users,
  UserCheck,
  Clock,
  DollarSign,
  Search,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  Loader2,
  ChevronDown,
  X,
  Ticket,
  Mail,
  Phone,
  Calendar,
  QrCode,
  CheckCircle2,
  CircleDot,
  MoreVertical,
  Eye,
  Send,
  Download,
  ScanLine,
  Filter,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// ─── Types ───────────────────────────────────────────────────────────────────
type TicketRow = {
  id: string;
  order_id: string;
  user_id: string;
  ticket_type_id: string;
  status: string;
  admissions_used: number;
  admission_limit: number;
  purchased_at: string;
  checked_in_at: string | null;
  checkin_method: string | null;
  ticket_types: {
    id: string;
    name: string;
    price: number;
  } | null;
  profiles: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  } | null;
  orders: {
    id: string;
    payment_status: string;
    payment_method: string | null;
    total_amount: number;
    created_at: string;
  } | null;
};

type Attendee = {
  buyerName: string;
  avatarUrl: string;
  userId: string;
  tickets: TicketRow[];
  totalQty: number;
  totalAmount: number;
  ticketTypeName: string;
  ticketTypeId: string;
  checkedIn: boolean;
  purchaseDate: string;
  orderId: string;
  paymentStatus: string;
};

type FilterType = "All" | string;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const AVATAR_COLORS = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-sky-500 to-cyan-600",
];

function getAvatarColor(userId: string) {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// ─── Row-action dropdown ──────────────────────────────────────────────────────
function ActionMenu({
  onView,
  onMarkCheckedIn,
  isCheckedIn,
}: {
  onView: () => void;
  onMarkCheckedIn: () => void;
  isCheckedIn: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        aria-label="Actions"
      >
        <MoreVertical className="w-4 h-4 text-zinc-500" />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-1 w-44 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl py-1 animate-in fade-in slide-in-from-top-1 duration-150">
          <button
            onClick={() => { setOpen(false); onView(); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-zinc-400" />
            View Details
          </button>
          <button
            onClick={() => { setOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-zinc-400" />
            Resend Ticket
          </button>
          <button
            onClick={() => { setOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            Download Ticket
          </button>
          {!isCheckedIn && (
            <>
              <div className="my-1 border-t border-zinc-100 dark:border-zinc-800" />
              <button
                onClick={() => { setOpen(false); onMarkCheckedIn(); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5" />
                Mark Checked In
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Attendee Drawer ──────────────────────────────────────────────────────────
function AttendeeDrawer({
  attendee,
  onClose,
}: {
  attendee: Attendee | null;
  onClose: () => void;
}) {
  const visible = !!attendee;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="relative px-6 pt-6 pb-5 border-b border-zinc-100 dark:border-zinc-800">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-blue-500 to-indigo-500 rounded-t-none" />
          <div className="flex items-center justify-between mt-2">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Attendee Details</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Full ticket information</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5 text-zinc-500" />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        {attendee && (
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {/* Avatar + Name */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800">
              {attendee.avatarUrl ? (
                <img
                  src={attendee.avatarUrl}
                  alt={attendee.buyerName}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-violet-200 dark:ring-violet-800"
                />
              ) : (
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${getAvatarColor(attendee.userId)} flex items-center justify-center text-white text-xl font-bold shadow-lg`}
                >
                  {getInitials(attendee.buyerName)}
                </div>
              )}
              <div>
                <p className="text-lg font-bold text-zinc-900 dark:text-white">{attendee.buyerName}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                  ID: {attendee.userId.slice(0, 12)}...
                </p>
                <div className="mt-2">
                  {attendee.checkedIn ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
                      <CheckCircle2 className="w-3 h-3" />
                      Checked In
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      <CircleDot className="w-3 h-3" />
                      Pending
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Ticket Information
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <InfoCell
                  icon={<Ticket className="w-3.5 h-3.5 text-indigo-500" />}
                  label="Ticket Type"
                  value={attendee.ticketTypeName}
                />
                <InfoCell
                  icon={<Users className="w-3.5 h-3.5 text-blue-500" />}
                  label="Quantity"
                  value={`${attendee.totalQty} ticket${attendee.totalQty !== 1 ? "s" : ""}`}
                />
                <InfoCell
                  icon={<DollarSign className="w-3.5 h-3.5 text-emerald-500" />}
                  label="Amount Paid"
                  value={`₦${attendee.totalAmount.toLocaleString()}`}
                  accent="emerald"
                />
                <InfoCell
                  icon={<Calendar className="w-3.5 h-3.5 text-violet-500" />}
                  label="Purchase Date"
                  value={new Date(attendee.purchaseDate).toLocaleDateString("en-NG", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                />
              </div>
            </div>

            {/* Order Info */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Order Details
              </h3>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-500">Order ID</span>
                  <span className="font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    #{attendee.orderId.slice(0, 10).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-500">Payment Status</span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      attendee.paymentStatus === "paid"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        attendee.paymentStatus === "paid" ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                    />
                    {attendee.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Check-in Progress */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Check-in Status
              </h3>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800">
                {attendee.tickets.map((t) => {
                  const used = t.admissions_used || 0;
                  const limit = t.admission_limit || 1;
                  const pct = limit > 0 ? (used / limit) * 100 : 0;
                  return (
                    <div key={t.id} className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-500">Admissions used</span>
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                          {used} / {limit}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            used > 0 ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-zinc-300 dark:bg-zinc-600"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* QR Ticket Visual */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                QR Ticket
              </h3>
              <div className="p-5 rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900/60 dark:to-zinc-900/30 border border-zinc-200 dark:border-zinc-700 flex flex-col items-center gap-3">
                <div className="w-24 h-24 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shadow-md">
                  <QrCode className="w-14 h-14 text-zinc-800 dark:text-zinc-200" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                    {attendee.tickets[0]?.id.slice(0, 16).toUpperCase()}
                  </p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Unique ticket code</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Drawer Footer */}
        {attendee && (
          <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-colors">
              <Send className="w-3.5 h-3.5" />
              Resend
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-sm font-semibold shadow-lg shadow-violet-500/20 transition-all">
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function InfoCell({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800">
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p
        className={`text-sm font-bold truncate ${
          accent === "emerald"
            ? "text-emerald-700 dark:text-emerald-400"
            : "text-zinc-800 dark:text-zinc-200"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function EventAttendeesPage() {
  const params = useParams();
  const eventId = params.id as string;
  const router = useRouter();
  const supabase = createClient();
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [event, setEvent] = useState<any>(null);
  const [tickets, setTickets] = useState<TicketRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);
  const [openRowMenu, setOpenRowMenu] = useState<string | null>(null);

  useEffect(() => {
    if (eventId) {
      loadData();
      const getUser = async () => {
        const res = await supabase.auth.getUser();
        if (res.data?.user) {
          setCurrentUser(res.data.user);
        }
      };
      getUser();
    }
  }, [eventId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      // Fetch event + ticket types
      const { data: eventData, error: eventErr } = await supabase
        .from("events")
        .select("*, ticket_types(*)")
        .eq("id", eventId)
        .single();

      if (eventErr) throw eventErr;
      setEvent(eventData);

      // Fetch all tickets for this event
      const { data: ticketsData, error: ticketsErr } = await supabase
        .from("tickets")
        .select(`
          id,
          order_id,
          user_id,
          ticket_type_id,
          status,
          admission_limit,
          admissions_used,
          purchased_at,
          checked_in_at,
          checkin_method,
          ticket_types (
            id,
            name,
            price
          ),
          profiles (
            id,
            full_name,
            avatar_url
          ),
          orders (
            id,
            payment_status,
            payment_method,
            total_amount,
            created_at
          )
        `)
        .eq("event_id", eventId)
        .order("purchased_at", { ascending: false });

      if (ticketsErr) throw ticketsErr;
      setTickets((ticketsData as TicketRow[]) || []);
    } catch (err: any) {
      console.error("Error loading attendees:", err);
      setErrorMsg(err.message || "Failed to load attendee data.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
  };

  // Build attendees grouped by buyer (user_id + ticket_type_id per order)
  const paidTickets = tickets.filter(
    (t) => t.orders?.payment_status === "paid" && t.status !== "cancelled"
  );

  // Group by order_id + ticket_type_id to create attendee rows
  const attendeeMap: Record<string, Attendee> = {};
  paidTickets.forEach((ticket) => {
    const key = `${ticket.order_id}-${ticket.ticket_type_id}`;
    const name = ticket.profiles?.full_name || "Guest Attendee";
    const checkedIn = (ticket.admissions_used || 0) > 0;

    if (!attendeeMap[key]) {
      attendeeMap[key] = {
        buyerName: name,
        avatarUrl: ticket.profiles?.avatar_url || "",
        userId: ticket.user_id,
        tickets: [],
        totalQty: 0,
        totalAmount: 0,
        ticketTypeName: ticket.ticket_types?.name || "Standard",
        ticketTypeId: ticket.ticket_type_id,
        checkedIn,
        purchaseDate: ticket.purchased_at || ticket.orders?.created_at || "",
        orderId: ticket.order_id,
        paymentStatus: ticket.orders?.payment_status || "unknown",
      };
    }
    attendeeMap[key].tickets.push(ticket);
    attendeeMap[key].totalQty += 1;
    attendeeMap[key].totalAmount += Number(ticket.ticket_types?.price || 0);
    // If any ticket is checked in, mark whole group as checked in
    if (checkedIn) attendeeMap[key].checkedIn = true;
  });

  const allAttendees = Object.values(attendeeMap);

  // Stats
  const totalAttendees = allAttendees.length;
  const checkedInCount = allAttendees.filter((a) => a.checkedIn).length;
  const pendingCount = totalAttendees - checkedInCount;
  const totalRevenue = paidTickets.reduce(
    (sum, t) => sum + Number(t.ticket_types?.price || 0),
    0
  );

  // Ticket type filters
  const ticketTypes: string[] = [
    "All",
    ...Array.from(new Set(allAttendees.map((a) => a.ticketTypeName))),
  ];

  // Filter + search
  const filtered = allAttendees.filter((a) => {
    const matchesSearch =
      search === "" ||
      a.buyerName.toLowerCase().includes(search.toLowerCase()) ||
      a.userId.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || a.ticketTypeName === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleMarkCheckedIn = async (attendee: Attendee) => {
    const now = new Date().toISOString();
    // Optimistically update
    setTickets((prev) =>
      prev.map((t) =>
        attendee.tickets.some((at) => at.id === t.id)
          ? {
              ...t,
              admissions_used: t.admission_limit || 1,
              checked_in_at: now,
              checkin_method: "manual",
            }
          : t
      )
    );
    // Persist to DB with full audit fields
    for (const t of attendee.tickets) {
      await supabase
        .from("tickets")
        .update({
          admissions_used: t.admission_limit || 1,
          checked_in_at: now,
          checked_in_by: currentUser?.id ?? null,
          checkin_method: "manual",
        })
        .eq("id", t.id);
    }
  };

  const checkinPct = totalAttendees > 0 ? Math.round((checkedInCount / totalAttendees) * 100) : 0;

  const STATS = [
    {
      label: "Total Attendees",
      value: totalAttendees,
      sub: "Ticket holders",
      icon: <Users className="w-4 h-4 text-white" />,
      gradient: "from-blue-500 to-indigo-600",
      bg: "from-white to-blue-50/30 dark:from-zinc-900/90 dark:to-blue-950/20",
      bar: "from-blue-500 to-indigo-500",
      accent: "text-blue-600 dark:text-blue-400",
      border: "border-zinc-200/60 dark:border-zinc-800/60",
      topBar: "from-blue-500 to-indigo-500",
    },
    {
      label: "Checked In",
      value: checkedInCount,
      sub: `${checkinPct}% attendance rate`,
      icon: <UserCheck className="w-4 h-4 text-white" />,
      gradient: "from-emerald-500 to-teal-600",
      bg: "from-white to-emerald-50/30 dark:from-zinc-900/90 dark:to-emerald-950/20",
      bar: "from-emerald-500 to-teal-500",
      accent: "text-emerald-600 dark:text-emerald-400",
      border: "border-zinc-200/60 dark:border-zinc-800/60",
      topBar: "from-emerald-500 to-teal-500",
      showBar: true,
      barValue: checkinPct,
    },
    {
      label: "Pending",
      value: pendingCount,
      sub: "Not checked in yet",
      icon: <Clock className="w-4 h-4 text-white" />,
      gradient: "from-amber-500 to-orange-600",
      bg: "from-white to-amber-50/30 dark:from-zinc-900/90 dark:to-amber-950/20",
      bar: "from-amber-500 to-orange-500",
      accent: "text-amber-600 dark:text-amber-400",
      border: "border-zinc-200/60 dark:border-zinc-800/60",
      topBar: "from-amber-500 to-orange-500",
    },
    {
      label: "Revenue",
      value: `₦${totalRevenue.toLocaleString()}`,
      sub: "From paid tickets",
      icon: <DollarSign className="w-4 h-4 text-white" />,
      gradient: "from-violet-500 to-purple-600",
      bg: "from-white to-violet-50/30 dark:from-zinc-900/90 dark:to-violet-950/20",
      bar: "from-violet-500 to-purple-500",
      accent: "text-violet-600 dark:text-violet-400",
      border: "border-zinc-200/60 dark:border-zinc-800/60",
      topBar: "from-violet-500 to-purple-500",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* ── Page Header ── */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-blue-500 to-indigo-500 rounded-full" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-3">
              <button
                onClick={() => router.push(`/dashboard/organizer/events/${eventId}`)}
                className="group flex items-center gap-1.5 hover:text-zinc-700 dark:hover:text-zinc-200 transition-all duration-200"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                <span>Event Details</span>
              </button>
              <span className="text-zinc-400">/</span>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-500" />
                Attendee Roster
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
              Event Attendees
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5">
              <ScanLine className="w-3.5 h-3.5" />
              Manage buyers, track check-ins, and contact attendees
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push(`/dashboard/organizer/events/${eventId}/check-in`)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-sm font-semibold shadow-lg shadow-violet-500/20 transition-all duration-200"
            >
              <ScanLine className="w-4 h-4" />
              QR Scanner
            </button>
            <button
              onClick={handleRefresh}
              disabled={loading || refreshing}
              className="group inline-flex items-center gap-2 px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/80 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 transition-transform group-hover:rotate-180 duration-500 ${
                  refreshing ? "animate-spin" : ""
                }`}
              />
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl shadow-lg">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500 animate-pulse" />
            </div>
          </div>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-4">Loading attendees...</p>
        </div>
      )}

      {/* ── Error ── */}
      {errorMsg && !loading && (
        <div className="flex items-start gap-3 p-5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-red-700 dark:text-red-400 shadow-lg">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Unable to load attendees</p>
            <p className="text-sm">{errorMsg}</p>
          </div>
        </div>
      )}

      {!loading && !errorMsg && (
        <>
          {/* ── Stats Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl border ${stat.border} bg-gradient-to-br ${stat.bg} p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5`}
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.topBar} rounded-t-2xl`}
                />
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <div
                    className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
                  >
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-zinc-900 dark:text-white mb-1">
                  {stat.value}
                </h3>
                {stat.showBar && (
                  <div className="my-2">
                    <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${stat.bar} rounded-full transition-all duration-700`}
                        style={{ width: `${stat.barValue}%` }}
                      />
                    </div>
                  </div>
                )}
                <p className={`text-xs font-medium ${stat.accent} flex items-center gap-1`}>
                  <TrendingUp className="w-3 h-3" />
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>

          {/* ── Search + Filter Bar ── */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                id="attendees-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or user ID..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-600 transition-all shadow-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Ticket Type Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              {ticketTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    activeFilter === type
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* ── Attendees Table ── */}
          <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-base font-bold text-zinc-800 dark:text-zinc-100">
                  Attendees
                </h2>
              </div>
              <span className="text-xs font-medium text-zinc-400">
                {filtered.length} of {totalAttendees} shown
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40">
                    <th className="text-left px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider hidden md:table-cell">
                      Ticket Type
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider hidden sm:table-cell">
                      Qty
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider hidden lg:table-cell">
                      Amount
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider hidden lg:table-cell">
                      Purchase Date
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/60">
                  {filtered.length > 0 ? (
                    filtered.map((attendee, idx) => (
                      <tr
                        key={`${attendee.orderId}-${attendee.ticketTypeId}`}
                        className="group hover:bg-blue-50/40 dark:hover:bg-blue-950/10 transition-colors duration-100"
                      >
                        {/* Name */}
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-3">
                            {attendee.avatarUrl ? (
                              <img
                                src={attendee.avatarUrl}
                                alt={attendee.buyerName}
                                className="w-9 h-9 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-700 shrink-0"
                              />
                            ) : (
                              <div
                                className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarColor(attendee.userId)} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm`}
                              >
                                {getInitials(attendee.buyerName)}
                              </div>
                            )}
                            <div>
                              <p className="font-semibold text-zinc-800 dark:text-zinc-200 leading-tight">
                                {attendee.buyerName}
                              </p>
                              <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                                #{attendee.orderId.slice(0, 8).toUpperCase()}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Ticket Type */}
                        <td className="px-4 py-3.5 hidden md:table-cell">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
                            <Ticket className="w-3 h-3" />
                            {attendee.ticketTypeName}
                          </span>
                        </td>

                        {/* Qty */}
                        <td className="px-4 py-3.5 hidden sm:table-cell">
                          <span className="font-bold text-zinc-700 dark:text-zinc-300">
                            {attendee.totalQty}
                          </span>
                        </td>

                        {/* Amount */}
                        <td className="px-4 py-3.5 hidden lg:table-cell">
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">
                            ₦{attendee.totalAmount.toLocaleString()}
                          </span>
                        </td>

                        {/* Purchase Date */}
                        <td className="px-4 py-3.5 hidden lg:table-cell">
                          <span className="text-zinc-500 dark:text-zinc-400 text-xs">
                            {new Date(attendee.purchaseDate).toLocaleDateString("en-NG", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3.5">
                          {attendee.checkedIn ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                              <CheckCircle2 className="w-3 h-3" />
                              Checked In
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                              <CircleDot className="w-3 h-3" />
                              Pending
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3.5">
                          <ActionMenu
                            onView={() => setSelectedAttendee(attendee)}
                            onMarkCheckedIn={() => handleMarkCheckedIn(attendee)}
                            isCheckedIn={attendee.checkedIn}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-20 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                            <Users className="w-10 h-10 text-zinc-300 dark:text-zinc-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-zinc-600 dark:text-zinc-400">
                              {search || activeFilter !== "All"
                                ? "No attendees match your search"
                                : "No attendees yet"}
                            </p>
                            <p className="text-xs text-zinc-400 mt-1">
                              {search || activeFilter !== "All"
                                ? "Try adjusting your filters"
                                : "Attendees will appear here once tickets are purchased"}
                            </p>
                          </div>
                          {(search || activeFilter !== "All") && (
                            <button
                              onClick={() => { setSearch(""); setActiveFilter("All"); }}
                              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              Clear filters
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Empty state tip when no tickets at all ── */}
          {allAttendees.length === 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-5 border border-blue-200 dark:border-blue-800/40">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/50">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-800 dark:text-blue-300">No attendees yet</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    Once attendees purchase tickets, they will appear here with their check-in status,
                    ticket type, and order details.
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Attendee Detail Drawer ── */}
      <AttendeeDrawer
        attendee={selectedAttendee}
        onClose={() => setSelectedAttendee(null)}
      />
    </div>
  );
}
