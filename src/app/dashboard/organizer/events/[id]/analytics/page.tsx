  "use client";

  import { useEffect, useState } from "react";
  import { useParams, useRouter } from "next/navigation";
  import { createClient } from "@/lib/supabase/client";
  import {
    ArrowLeft,
    TrendingUp,
    DollarSign,
    Ticket,
    Users,
    CheckCircle,
    Activity,
    Award,
    Sparkles,
    BarChart3,
    Calendar,
    Percent,
    Clock,
    Flame,
    Info,
    TrendingDown
  } from "lucide-react";

  export default function EventAnalyticsPage() {
    const params = useParams();
    const eventId = params.id as string;
    const router = useRouter();
    const supabase = createClient();

    const [event, setEvent] = useState<any>(null);
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Chart and UI interaction states
    const [activeTab, setActiveTab] = useState<"revenue" | "sales">("revenue");
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [hoveredHeatmap, setHoveredHeatmap] = useState<{ dayIndex: number; rangeIndex: number } | null>(null);

    useEffect(() => {
      if (eventId) {
        loadAnalytics();
      }
    }, [eventId]);

    const loadAnalytics = async () => {
      try {
        setLoading(true);

        // Step 1: fetch event + flat tickets in parallel (tickets has event_id)
        const [{ data: eventData }, { data: rawTickets }] = await Promise.all([
          supabase
            .from("events")
            .select("*, ticket_types (*)")
            .eq("id", eventId)
            .single(),

          supabase
            .from("tickets")
            .select("id, status, event_id, ticket_type_id, admissions_used, purchased_at, user_id, order_id")
            .eq("event_id", eventId),
        ]);

        const tickets = rawTickets || [];

        // Step 2: extract unique order IDs and user IDs from tickets
        const orderIds = [...new Set(tickets.map((t: any) => t.order_id).filter(Boolean))];
        const userIds = [...new Set(tickets.map((t: any) => t.user_id).filter(Boolean))];

        // Step 3: fetch orders and profiles scoped to what we actually need
        const [{ data: ordersData }, { data: profilesData }] = await Promise.all([
          orderIds.length > 0
            ? supabase.from("orders").select("id, payment_status, created_at").in("id", orderIds)
            : Promise.resolve({ data: [] }),
          userIds.length > 0
            ? supabase.from("profiles").select("id, full_name, avatar_url").in("id", userIds)
            : Promise.resolve({ data: [] }),
        ]);

        // Build lookup Maps for O(1) joins in JS
        const ordersMap = new Map((ordersData || []).map((o: any) => [o.id, o]));
        const profilesMap = new Map((profilesData || []).map((p: any) => [p.id, p]));
        const ticketTypesMap = new Map(
          (eventData?.ticket_types || []).map((tt: any) => [tt.id, tt])
        );

        // Merge into the shape the rest of the page expects
        const ticketsData = tickets.map((t: any) => ({
          ...t,
          ticket_types: ticketTypesMap.get(t.ticket_type_id) || null,
          orders: ordersMap.get(t.order_id) || null,
          profiles: profilesMap.get(t.user_id) || null,
        }));

        setEvent(eventData);
        setTickets(ticketsData);
      } catch (err) {
        console.error("Analytics load error:", err);
      } finally {
        setLoading(false);
      }
    };

    // -----------------------------
    // DERIVED ANALYTICS METRICS
    // -----------------------------
    const paidTickets = tickets.filter(
      (t) => t.orders?.payment_status === "paid" && t.status !== "cancelled"
    );

    const totalTicketsSold = paidTickets.length;

    const revenue = paidTickets.reduce(
      (sum, t) => sum + Number(t.ticket_types?.price || 0),
      0
    );

    const checkIns = tickets.reduce(
      (sum, t) => sum + (t.admissions_used || 0),
      0
    );

    // Payment Success Rate: paid tickets / all generated tickets
    // NOTE: This is NOT a true conversion rate (which would need page views).
    // It reflects what share of ticket records resulted in a completed payment.
    const paymentSuccessRate =
      tickets.length > 0
        ? Math.round((paidTickets.length / tickets.length) * 100)
        : 0;

    // Average Order Value (AOV)
    const uniqueOrderIds = new Set(paidTickets.map((t) => t.orders?.id).filter(Boolean));
    const totalOrdersCount = uniqueOrderIds.size;
    const avgOrderValue = totalOrdersCount > 0 ? Math.round(revenue / totalOrdersCount) : 0;

    // Attendance Rate (checked-in tickets / total tickets sold)
    const attendanceRate = totalTicketsSold > 0 ? Math.round((checkIns / totalTicketsSold) * 100) : 0;

    // Remaining Capacity (total seats across all ticket types minus paid tickets sold)
    const totalCapacity = (event?.ticket_types || []).reduce(
      (sum: number, tt: any) => sum + (tt.quantity || 0),
      0
    );
    const remainingCapacity = Math.max(0, totalCapacity - totalTicketsSold);
    const capacityFilledRate = totalCapacity > 0 ? Math.round((totalTicketsSold / totalCapacity) * 100) : 0;

    // -----------------------------
    // DAILY SALES & REVENUE TIMELINE
    // -----------------------------
    const getLast14Days = () => {
      const days = [];
      for (let i = 13; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        days.push(`${year}-${month}-${day}`);
      }
      return days;
    };
    const last14Days = getLast14Days();

    const dailyData = last14Days.map((dateStr) => {
      const dayTickets = paidTickets.filter((t) => {
        if (!t.purchased_at) return false;
        const purchasedDate = new Date(t.purchased_at);
        const year = purchasedDate.getFullYear();
        const month = String(purchasedDate.getMonth() + 1).padStart(2, '0');
        const day = String(purchasedDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}` === dateStr;
      });

      const dayRevenue = dayTickets.reduce((sum, t) => sum + Number(t.ticket_types?.price || 0), 0);
      const daySalesCount = dayTickets.length;

      // Localized formatted date label like "Jun 4"
      const dateParts = dateStr.split("-");
      const dateObj = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
      const label = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });

      return {
        date: dateStr,
        label,
        revenue: dayRevenue,
        sales: daySalesCount,
      };
    });

    // SVG Chart Dimensions & Scale Helpers
    const chartWidth = 600;
    const chartHeight = 220;
    const paddingLeft = 55;
    const paddingRight = 15;
    const paddingTop = 20;
    const paddingBottom = 35;

    const maxRevenue = Math.max(...dailyData.map((d) => d.revenue), 1000);
    const maxSales = Math.max(...dailyData.map((d) => d.sales), 5);

    const getX = (index: number) => {
      return paddingLeft + (index * (chartWidth - paddingLeft - paddingRight)) / 13;
    };

    const getYRevenue = (val: number) => {
      const scaleHeight = chartHeight - paddingTop - paddingBottom;
      return chartHeight - paddingBottom - (val * scaleHeight) / maxRevenue;
    };

    const getYSales = (val: number) => {
      const scaleHeight = chartHeight - paddingTop - paddingBottom;
      return chartHeight - paddingBottom - (val * scaleHeight) / maxSales;
    };

    // Generate SVG paths
    const revenuePoints = dailyData.map((d, i) => ({ x: getX(i), y: getYRevenue(d.revenue) }));
    const salesPoints = dailyData.map((d, i) => ({ x: getX(i), y: getYSales(d.sales) }));

    const activePoints = activeTab === "revenue" ? revenuePoints : salesPoints;
    const activeMax = activeTab === "revenue" ? maxRevenue : maxSales;

    const linePath = activePoints.length > 0
      ? activePoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")
      : "";

    const areaPath = activePoints.length > 0
      ? `${linePath} L ${activePoints[activePoints.length - 1].x} ${chartHeight - paddingBottom} L ${activePoints[0].x} ${chartHeight - paddingBottom} Z`
      : "";

    // Y-axis labels format
    const formatYLabel = (val: number) => {
      if (activeTab === "revenue") {
        if (val >= 1000000) return `₦${(val / 1000000).toFixed(1)}M`;
        if (val >= 1000) return `₦${(val / 1000).toFixed(0)}k`;
        return `₦${val}`;
      } else {
        return `${Math.round(val)}`;
      }
    };

    // -----------------------------
    // TICKET TYPE PERFORMANCE BREAKDOWN
    // -----------------------------
    const ticketTypesPerformance = (event?.ticket_types || []).map((tt: any) => {
      const ttTickets = paidTickets.filter((t) => t.ticket_type_id === tt.id);
      const sold = ttTickets.length;
      const capacity = tt.quantity || 0;
      const price = Number(tt.price || 0);
      const ttRevenue = sold * price;
      const percentageSold = capacity > 0 ? Math.round((sold / capacity) * 100) : 0;

      return {
        id: tt.id,
        name: tt.name,
        price,
        sold,
        capacity,
        revenue: ttRevenue,
        percentageSold,
      };
    }).sort((a: any, b: any) => b.revenue - a.revenue || b.sold - a.sold);

    // Best Selling Ticket spotlight card
    const bestSellingTicket = ticketTypesPerformance.length > 0 ? ticketTypesPerformance[0] : null;

    // -----------------------------
    // TOP BUYERS LEADERBOARD
    // -----------------------------
    const buyersMap: Record<string, {
      id: string;
      name: string;
      avatarUrl: string;
      ticketsCount: number;
      totalSpend: number;
    }> = {};

    paidTickets.forEach((t) => {
      const userId = t.user_id;
      if (!userId) return;

      const name = t.profiles?.full_name || "Guest Attendee";
      const avatarUrl = t.profiles?.avatar_url || "";
      const price = Number(t.ticket_types?.price || 0);

      if (!buyersMap[userId]) {
        buyersMap[userId] = {
          id: userId,
          name,
          avatarUrl,
          ticketsCount: 0,
          totalSpend: 0,
        };
      }

      buyersMap[userId].ticketsCount += 1;
      buyersMap[userId].totalSpend += price;
    });

    const topBuyers = Object.values(buyersMap)
      .sort((a, b) => b.totalSpend - a.totalSpend || b.ticketsCount - a.ticketsCount)
      .slice(0, 5);

    // -----------------------------
    // WEEKDAY & TIMEFRAME HEATMAP DATA
    // -----------------------------
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const timeRanges = [
      { label: "12am-4am", hours: [0, 1, 2, 3] },
      { label: "4am-8am", hours: [4, 5, 6, 7] },
      { label: "8am-12pm", hours: [8, 9, 10, 11] },
      { label: "12pm-4pm", hours: [12, 13, 14, 15] },
      { label: "4pm-8pm", hours: [16, 17, 18, 19] },
      { label: "8pm-12am", hours: [20, 21, 22, 23] }
    ];

    const heatmapGrid = daysOfWeek.map((dayName, dayIndex) => {
      return timeRanges.map((range, rangeIndex) => {
        const matchingTickets = paidTickets.filter((t) => {
          if (!t.purchased_at) return false;
          const d = new Date(t.purchased_at);
          const day = d.getDay();
          const hour = d.getHours();
          return day === dayIndex && range.hours.includes(hour);
        });
        return {
          day: dayName,
          time: range.label,
          count: matchingTickets.length,
        };
      });
    });

    // Calculate heatmap color opacity based on cell ticket count
    const getHeatmapColorClass = (count: number) => {
      if (count === 0) return "bg-zinc-100 dark:bg-zinc-800/40 text-zinc-400";
      if (count === 1) return "bg-indigo-100 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border border-indigo-200/40 dark:border-indigo-900/30";
      if (count <= 3) return "bg-indigo-300 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-200 border border-indigo-400/30 dark:border-indigo-800/50";
      return "bg-indigo-600 dark:bg-indigo-600 text-white font-bold shadow-sm";
    };

    // Helper to resolve buyer's initials
    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    };

    // Dynamic colors for buyer avatar background
    const getAvatarGradient = (idx: number) => {
      const grads = [
        "from-blue-500 to-indigo-500",
        "from-emerald-500 to-teal-500",
        "from-purple-500 to-pink-500",
        "from-amber-500 to-orange-500",
        "from-cyan-500 to-blue-500"
      ];
      return grads[idx % grads.length];
    };

    return (
      <div className="space-y-8 animate-in fade-in duration-500 pb-12">
        
        {/* ─────────────────────────────────────────────
          HEADER SECTION
        ───────────────────────────────────────────── */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4">
            <div>
              <button
                onClick={() => router.push(`/dashboard/organizer/events/${eventId}`)}
                className="group flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                Back to Event Details
              </button>

              <h1 className="text-3xl font-black mt-2 bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent flex items-center gap-3">
                Event Analytics
                {!loading && event && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                    Smart Insights
                  </span>
                )}
              </h1>

              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Real-time monitoring of registrations, ticket performance, and sales timeline.
              </p>
            </div>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl shadow-lg">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-indigo-200 dark:border-indigo-950 border-t-indigo-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Activity className="w-5 h-5 text-indigo-500" />
              </div>
            </div>
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-4">
              Compiling ticket intelligence...
            </p>
            <p className="text-xs text-zinc-400 mt-1">Aggregating checkout metrics</p>
          </div>
        )}

        {/* CONTENT */}
        {!loading && event && (
          <>
            {/* EVENT SUMMARY METRIC HEADER */}
            <section className="relative overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-br from-white to-zinc-50/50 dark:from-zinc-900/80 dark:to-zinc-950/80 p-6 shadow-md">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl" />
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">{event.title}</h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60">
                      {event.category || "General Event"}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                      event.status === "published"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/40 dark:border-emerald-800/40"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/40 dark:border-amber-800/40"
                    }`}>
                      {event.status}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/40 dark:border-blue-800/40">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(event.event_date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex gap-6 text-right sm:border-l sm:border-zinc-200 dark:sm:border-zinc-800 sm:pl-6">
                  <div>
                    <p className="text-xs text-zinc-400 font-medium">Ticket Types</p>
                    <p className="text-2xl font-black text-zinc-800 dark:text-zinc-100">
                      {event.ticket_types?.length || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 font-medium">Unique Buyers</p>
                    <p className="text-2xl font-black text-zinc-800 dark:text-zinc-100">
                      {Object.keys(buyersMap).length}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ─────────────────────────────────────────────
              PREMIUM STATS GRID
            ───────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Revenue */}
              <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-br from-white to-emerald-50/20 dark:from-zinc-900/90 dark:to-emerald-950/10 p-5 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Total Revenue</p>
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-zinc-950 dark:text-white mb-1">
                  ₦{revenue.toLocaleString()}
                </h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  From {totalOrdersCount} successful orders
                </p>
              </div>

              {/* Tickets Sold */}
              <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-br from-white to-blue-50/20 dark:from-zinc-900/90 dark:to-blue-950/10 p-5 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Tickets Sold</p>
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-500/20">
                    <Ticket className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <h3 className="text-3xl font-black text-zinc-950 dark:text-white">{totalTicketsSold}</h3>
                  <span className="text-xs text-zinc-400 font-semibold">tickets</span>
                </div>
                <div className="mt-2.5">
                  <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(paymentSuccessRate, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-1 text-[10px] text-zinc-400 font-semibold">
                    <span>Payment success rate</span>
                    <span>{paymentSuccessRate}%</span>
                  </div>
                </div>
              </div>

              {/* Average Order Value (AOV) */}
              <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-br from-white to-purple-50/20 dark:from-zinc-900/90 dark:to-purple-950/10 p-5 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Avg Order Value</p>
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/20">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-zinc-950 dark:text-white mb-1">
                  ₦{avgOrderValue.toLocaleString()}
                </h3>
                <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" />
                  Spend per registration
                </p>
              </div>

              {/* Remaining Capacity */}
              <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-br from-white to-amber-50/20 dark:from-zinc-900/90 dark:to-amber-950/10 p-5 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Remaining Capacity</p>
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <h3 className="text-3xl font-black text-zinc-950 dark:text-white">{remainingCapacity}</h3>
                  <span className="text-xs text-zinc-400 font-semibold">seats left</span>
                </div>
                <div className="mt-2.5">
                  <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${capacityFilledRate}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-1 text-[10px] text-zinc-400 font-semibold">
                    <span>Capacity filled</span>
                    <span>{capacityFilledRate}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ─────────────────────────────────────────────
              CHARTS LAYOUT (DAILY SALES & BEST-SELLER)
            ───────────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* DAILY SALES CHART (2/3 width) */}
              <section className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-6 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-indigo-500" />
                      Daily Performance Timeline
                    </h3>
                    <p className="text-xs text-zinc-400">14-day trailing timeline of registrations and earnings.</p>
                  </div>
                  <div className="flex rounded-xl bg-zinc-100 dark:bg-zinc-800/60 p-1 border border-zinc-200/40 dark:border-zinc-700/40 self-start">
                    <button
                      onClick={() => {
                        setActiveTab("revenue");
                        setHoveredIndex(null);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeTab === "revenue"
                          ? "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white shadow-sm"
                          : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                      }`}
                    >
                      Revenue (₦)
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("sales");
                        setHoveredIndex(null);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeTab === "sales"
                          ? "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white shadow-sm"
                          : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                      }`}
                    >
                      Volume (Qty)
                    </button>
                  </div>
                </div>

                {/* Chart Visualization Area */}
                <div className="relative pt-2 h-[220px] w-full select-none">
                  {/* SVG Chart */}
                  <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines */}
                    {[0, 0.33, 0.66, 1].map((ratio, i) => {
                      const val = activeMax * ratio;
                      const y = activeTab === "revenue" ? getYRevenue(val) : getYSales(val);
                      return (
                        <g key={i}>
                          <line
                            x1={paddingLeft}
                            y1={y}
                            x2={chartWidth - paddingRight}
                            y2={y}
                            stroke="currentColor"
                            className="text-zinc-100 dark:text-zinc-800/80"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                          />
                          <text
                            x={paddingLeft - 8}
                            y={y + 4}
                            textAnchor="end"
                            className="fill-zinc-400 text-[10px] font-semibold"
                          >
                            {formatYLabel(val)}
                          </text>
                        </g>
                      );
                    })}

                    {/* Filled Area path */}
                    {areaPath && (
                      <path
                        d={areaPath}
                        fill="url(#chart-glow)"
                      />
                    )}

                    {/* Stroke Line path */}
                    {linePath && (
                      <path
                        d={linePath}
                        fill="none"
                        stroke="#4f46e5"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}

                    {/* X-axis labels and tick points */}
                    {dailyData.map((d, i) => {
                      const x = getX(i);
                      const isEven = i % 2 === 0;
                      return (
                        <g key={i}>
                          {isEven && (
                            <text
                              x={x}
                              y={chartHeight - 12}
                              textAnchor="middle"
                              className="fill-zinc-400 text-[10px] font-semibold"
                            >
                              {d.label}
                            </text>
                          )}
                          <line
                            x1={x}
                            y1={chartHeight - paddingBottom}
                            x2={x}
                            y2={chartHeight - paddingBottom + 4}
                            stroke="currentColor"
                            className="text-zinc-200 dark:text-zinc-800"
                            strokeWidth="1"
                          />
                          {/* Interactive overlay points */}
                          <circle
                            cx={x}
                            cy={activePoints[i]?.y}
                            r={hoveredIndex === i ? 6 : 4}
                            fill={hoveredIndex === i ? "#4f46e5" : "white"}
                            stroke="#4f46e5"
                            strokeWidth={hoveredIndex === i ? 2.5 : 1.5}
                            className="cursor-pointer transition-all duration-150 shadow-sm"
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {/* Interactive Tooltip Overlay */}
                  {hoveredIndex !== null && dailyData[hoveredIndex] && (
                    <div
                      className="absolute bg-zinc-950/95 text-white px-3 py-2.5 rounded-xl border border-zinc-800 text-[11px] shadow-xl pointer-events-none transition-all duration-150 z-20"
                      style={{
                        left: `${hoveredIndex > 6 ? getX(hoveredIndex) - 170 : getX(hoveredIndex) + 15}px`,
                        top: `${Math.min(
                          activeTab === "revenue"
                            ? getYRevenue(dailyData[hoveredIndex].revenue)
                            : getYSales(dailyData[hoveredIndex].sales),
                          chartHeight - paddingBottom - 60
                        )}px`,
                      }}
                    >
                      <p className="font-extrabold text-zinc-400 border-b border-zinc-800 pb-1 mb-1">
                        {dailyData[hoveredIndex].label}
                      </p>
                      <div className="space-y-0.5">
                        <p className="flex justify-between gap-5">
                          <span className="text-zinc-500">Revenue:</span>
                          <span className="font-bold text-emerald-400">
                            ₦{dailyData[hoveredIndex].revenue.toLocaleString()}
                          </span>
                        </p>
                        <p className="flex justify-between gap-5">
                          <span className="text-zinc-500">Tickets sold:</span>
                          <span className="font-bold text-blue-400">
                            {dailyData[hoveredIndex].sales} qty
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* BEST SELLING TICKET spotlight card (1/3 width) */}
              <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white p-6 shadow-md flex flex-col justify-between">
                {/* Background Accent Graphics */}
                <div className="absolute top-[-30px] right-[-30px] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute bottom-[-20px] left-[-20px] w-28 h-28 bg-indigo-500/20 rounded-full blur-xl" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                      <Award className="w-3 h-3 text-amber-300" />
                      Best Seller
                    </span>
                    <Sparkles className="w-5 h-5 text-indigo-200" />
                  </div>

                  {bestSellingTicket ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs text-indigo-200 font-semibold uppercase tracking-wide">Top Ticket Category</h4>
                        <h3 className="text-2xl font-black truncate">{bestSellingTicket.name}</h3>
                        <p className="text-xs text-indigo-100/80 mt-0.5">
                          ₦{bestSellingTicket.price.toLocaleString()} each
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-3.5 my-1">
                        <div>
                          <p className="text-[10px] text-indigo-200 font-semibold uppercase">Tickets Sold</p>
                          <p className="text-lg font-bold">
                            {bestSellingTicket.sold}{" "}
                            <span className="text-xs text-indigo-300 font-medium">/ {bestSellingTicket.capacity}</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-indigo-200 font-semibold uppercase">Gross Revenue</p>
                          <p className="text-lg font-bold">₦{bestSellingTicket.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-indigo-200">
                      <Ticket className="w-10 h-10 mx-auto opacity-40 mb-2" />
                      <p className="font-semibold text-sm">No ticket activity</p>
                      <p className="text-xs opacity-60">Sales breakdown will appear here.</p>
                    </div>
                  )}
                </div>

                {bestSellingTicket && (
                  <div className="relative pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Visual Pie Ring */}
                      <div className="relative w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center">
                        <span className="text-[9px] font-black">{bestSellingTicket.percentageSold}%</span>
                      </div>
                      <span className="text-[11px] text-indigo-200 font-semibold">Capacity filled</span>
                    </div>
                    <span className="text-[11px] font-bold bg-white/20 px-2 py-1 rounded-lg">
                      {revenue > 0 ? Math.round((bestSellingTicket.revenue / revenue) * 100) : 0}% of revenue
                    </span>
                  </div>
                )}
              </section>
            </div>

            {/* ─────────────────────────────────────────────
              TICKET BREAKDOWN & TOP BUYERS ROW
            ───────────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* TICKET PERFORMANCE CHART */}
              <section className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-6 shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-indigo-500" />
                      Ticket Type Performance
                    </h3>
                    <p className="text-xs text-zinc-400">Fill rate, prices, and gross earnings breakdown.</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                    {ticketTypesPerformance.length} Categories
                  </span>
                </div>

                <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
                  {ticketTypesPerformance.length > 0 ? (
                    ticketTypesPerformance.map((tt: any, idx: number) => {
                      const remaining = Math.max(0, tt.capacity - tt.sold);
                      return (
                        <div
                          key={tt.id}
                          className="group p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-gradient-to-br from-white to-zinc-50/40 dark:from-zinc-900/50 dark:to-zinc-950/20 hover:border-indigo-200 dark:hover:border-indigo-900/40 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2.5">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-bold text-zinc-800 dark:text-zinc-200">{tt.name}</h4>
                                <span className="text-[10px] text-zinc-400 font-semibold">
                                  • ₦{tt.price.toLocaleString()} each
                                </span>
                              </div>
                              <p className="text-[10px] text-zinc-400 font-medium mt-0.5">
                                {remaining} remaining of {tt.capacity} total
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-black text-zinc-800 dark:text-zinc-200">
                                {tt.sold}
                              </span>
                              <span className="text-[10px] text-zinc-400"> sold</span>
                              <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">
                                {tt.percentageSold}% filled
                              </p>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mb-3">
                            <div
                              className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${
                                idx % 3 === 0
                                  ? "from-indigo-500 to-purple-500"
                                  : idx % 3 === 1
                                  ? "from-blue-500 to-indigo-500"
                                  : "from-emerald-500 to-teal-500"
                              }`}
                              style={{ width: `${tt.percentageSold}%` }}
                            />
                          </div>

                          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex justify-between items-center text-xs">
                            <span className="text-zinc-400 font-medium">Category Revenue</span>
                            <span className="font-bold text-zinc-800 dark:text-zinc-100">
                              ₦{tt.revenue.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-12 text-center text-zinc-400">
                      <Ticket className="w-8 h-8 mx-auto opacity-30 mb-2" />
                      <p className="font-semibold text-sm">No categories configured</p>
                      <p className="text-xs opacity-60">Add ticket types to enable breakdown</p>
                    </div>
                  )}
                </div>
              </section>

              {/* TOP BUYERS LEADERBOARD */}
              <section className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-6 shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                      <Award className="w-4 h-4 text-indigo-500" />
                      Top Attendees & Buyers
                    </h3>
                    <p className="text-xs text-zinc-400">Leaderboard of patrons by tickets volume and investment.</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                    Top 5
                  </span>
                </div>

                <div className="space-y-3.5">
                  {topBuyers.length > 0 ? (
                    topBuyers.map((buyer, idx) => (
                      <div
                        key={buyer.id}
                        className="group flex items-center justify-between p-3.5 rounded-xl border border-zinc-100/60 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {/* Avatar initials with designer gradients */}
                          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${getAvatarGradient(idx)} flex items-center justify-center text-white text-[11px] font-extrabold shadow-sm`}>
                            {getInitials(buyer.name)}
                          </div>
                          <div>
                            <h4 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm">{buyer.name}</h4>
                            <div className="flex items-center gap-2 mt-0.5 text-xs text-zinc-400 font-semibold">
                              <span>{buyer.ticketsCount} {buyer.ticketsCount === 1 ? "ticket" : "tickets"}</span>
                              <span>•</span>
                              <span className="inline-flex items-center gap-0.5 text-indigo-600 dark:text-indigo-400">
                                Rank #{idx + 1}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-zinc-400 font-semibold uppercase">Total Contribution</p>
                          <p className="font-black text-sm text-zinc-800 dark:text-zinc-100">
                            ₦{buyer.totalSpend.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-16 text-center text-zinc-400">
                      <Users className="w-8 h-8 mx-auto opacity-30 mb-2" />
                      <p className="font-semibold text-sm">No ticket buyers yet</p>
                      <p className="text-xs opacity-60">Supporters will appear once sales commence</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* ─────────────────────────────────────────────
              SALES HEATMAP SECTION
            ───────────────────────────────────────────── */}
            <section className="relative overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-6 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-zinc-100 dark:border-zinc-800/60 pb-4">
                <div className="space-y-0.5">
                  <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    Sales Velocity Heatmap
                  </h3>
                  <p className="text-xs text-zinc-400">Identify peak checkout hours and days of the week.</p>
                </div>

                {/* Heatmap Legend */}
                <div className="flex items-center gap-2 self-start text-[10px] font-bold text-zinc-400 uppercase">
                  <span>Low</span>
                  <div className="w-3.5 h-3.5 rounded bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60" />
                  <div className="w-3.5 h-3.5 rounded bg-indigo-100 dark:bg-indigo-950/30 border border-indigo-200/40" />
                  <div className="w-3.5 h-3.5 rounded bg-indigo-300 dark:bg-indigo-900/60 border border-indigo-400/30" />
                  <div className="w-3.5 h-3.5 rounded bg-indigo-600 dark:bg-indigo-600" />
                  <span>High</span>
                </div>
              </div>

              {/* Heatmap Grid Layout */}
              <div className="relative overflow-x-auto pb-2">
                <div className="min-w-[500px]">
                  {/* Column Headers (Time blocks) */}
                  <div className="grid grid-cols-[50px_repeat(6,1fr)] gap-2 mb-2">
                    <div />
                    {timeRanges.map((range, idx) => (
                      <div key={idx} className="text-center text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                        {range.label}
                      </div>
                    ))}
                  </div>

                  {/* Day Rows */}
                  <div className="space-y-2">
                    {heatmapGrid.map((dayRow, dayIdx) => (
                      <div key={dayIdx} className="grid grid-cols-[50px_repeat(6,1fr)] gap-2 items-center">
                        {/* Row Header (Day Name) */}
                        <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                          {daysOfWeek[dayIdx]}
                        </div>

                        {/* Heatmap Cells */}
                        {dayRow.map((cell, rangeIdx) => {
                          const isHovered = hoveredHeatmap?.dayIndex === dayIdx && hoveredHeatmap?.rangeIndex === rangeIdx;
                          return (
                            <div
                              key={rangeIdx}
                              onMouseEnter={() => setHoveredHeatmap({ dayIndex: dayIdx, rangeIndex: rangeIdx })}
                              onMouseLeave={() => setHoveredHeatmap(null)}
                              className={`h-11 rounded-lg flex items-center justify-center text-xs transition-all relative cursor-help ${getHeatmapColorClass(cell.count)}`}
                            >
                              <span>{cell.count > 0 ? cell.count : ""}</span>

                              {/* Floating Cell Tooltip */}
                              {isHovered && (
                                <div className="absolute bottom-full mb-1.5 bg-zinc-950 text-white text-[10px] px-2 py-1.5 rounded-lg shadow-xl z-20 pointer-events-none whitespace-nowrap border border-zinc-800">
                                  <p className="font-extrabold text-zinc-400">
                                    {cell.day} • {cell.time}
                                  </p>
                                  <p className="mt-0.5">
                                    {cell.count} {cell.count === 1 ? "ticket" : "tickets"} sold
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    );
  }