"use client";

import { 
  TrendingUp, 
  Ticket, 
  Users, 
  CheckCircle, 
  ArrowLeft, 
  ShoppingBag, 
  DollarSign, 
  Calendar, 
  Activity, 
  Loader2,
  AlertCircle,
  RefreshCw,
  Award,
  Clock,
  BarChart3,
  CreditCard,
  MapPin,
  Zap,
  Sparkles
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function EventSalesPage() {
  const params = useParams();
  const eventId = params.id as string;
  const router = useRouter();
  const supabase = createClient();

  const [event, setEvent] = useState<any>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (eventId) {
      loadData();
    }
  }, [eventId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      // 1. Fetch Event and Ticket Types
      const { data: eventData, error: eventErr } = await supabase
        .from("events")
        .select(`
          *,
          ticket_types (*)
        `)
        .eq("id", eventId)
        .single();

      if (eventErr) throw eventErr;
      setEvent(eventData);

      // 2. Fetch Tickets for this event
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
          ticket_types (
            id,
            name,
            price
          ),
          profiles (
            id,
            full_name
          ),
          orders (
            id,
            payment_status,
            payment_method,
            total_amount,
            created_at
          )
        `)
        .eq("event_id", eventId);

      if (ticketsErr) throw ticketsErr;
      setTickets(ticketsData || []);
    } catch (err: any) {
      console.error("Error loading sales metrics:", err);
      setErrorMsg(err.message || "Failed to load sales metrics.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
  };

  // Derive metrics dynamically to avoid state synchronization bugs
  const ticketTypes: any[] = event?.ticket_types || [];
  const totalCapacity = ticketTypes.reduce((sum: number, tt: any) => sum + (tt.quantity || 0), 0);

  // Paid and valid tickets
  const paidTickets = tickets.filter((t: any) => t.orders?.payment_status === "paid" && t.status !== "cancelled");
  const ticketsSold = paidTickets.length;

  // Revenue from paid tickets for this event
  const revenue = paidTickets.reduce((sum: number, t: any) => sum + Number(t.ticket_types?.price || 0), 0);

  // Total admissions/check-ins used
  const checkIns = tickets.reduce((sum: number, t: any) => sum + (t.admissions_used || 0), 0);

  // Unique paid orders
  const uniqueOrderIds = new Set(paidTickets.map((t: any) => t.order_id));
  const ordersCount = uniqueOrderIds.size;

  // Group tickets into orders for display
  const ordersMap: Record<string, {
    id: string;
    buyerName: string;
    ticketsList: { name: string; quantity: number }[];
    qty: number;
    amount: number;
    status: string;
    date: string;
    paymentMethod?: string;
  }> = {};

  tickets.forEach((ticket: any) => {
    const order = ticket.orders;
    if (!order) return;

    const orderId = order.id;
    const buyerName = ticket.profiles?.full_name || "Guest";
    const ticketName = ticket.ticket_types?.name || "Standard Ticket";
    const ticketPrice = Number(ticket.ticket_types?.price || 0);

    if (!ordersMap[orderId]) {
      ordersMap[orderId] = {
        id: orderId,
        buyerName,
        ticketsList: [],
        qty: 0,
        amount: 0,
        status: order.payment_status || "pending",
        date: order.created_at || ticket.purchased_at,
        paymentMethod: order.payment_method,
      };
    }

    ordersMap[orderId].qty += 1;
    ordersMap[orderId].amount += ticketPrice;

    const existingIndex = ordersMap[orderId].ticketsList.findIndex(t => t.name === ticketName);
    if (existingIndex > -1) {
      ordersMap[orderId].ticketsList[existingIndex].quantity += 1;
    } else {
      ordersMap[orderId].ticketsList.push({ name: ticketName, quantity: 1 });
    }
  });

  const ordersList = Object.values(ordersMap).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const soldPercentage = totalCapacity > 0 ? (ticketsSold / totalCapacity) * 100 : 0;
  const checkinPercentage = ticketsSold > 0 ? (checkIns / ticketsSold) * 100 : 0;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ─────────────────────────────────────────────
         Page Header with Gradient Accent
      ───────────────────────────────────────────── */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4">
          <div>
            {/* Breadcrumb back navigation */}
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
                <BarChart3 className="w-3.5 h-3.5 text-blue-500" />
                Sales Dashboard
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent flex items-center gap-3">
              Ticket Sales Analytics
              <span className="text-sm font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Live
              </span>
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              Monitor real-time sales performance, revenue metrics, and attendee check-ins
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={loading || refreshing}
            className="group inline-flex items-center gap-2 px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/80 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 transition-transform group-hover:rotate-180 duration-500 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl shadow-lg">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Ticket className="w-6 h-6 text-blue-500 animate-pulse" />
            </div>
          </div>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-4">
            Loading sales metrics...
          </p>
          <p className="text-xs text-zinc-400 mt-1">Fetching real-time database statistics</p>
        </div>
      )}

      {/* Error State */}
      {errorMsg && !loading && (
        <div className="flex items-start gap-3 p-5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-red-700 dark:text-red-400 shadow-lg">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Unable to load sales data</p>
            <p className="text-sm">{errorMsg}</p>
          </div>
        </div>
      )}

      {!loading && !errorMsg && (
        <>
          {/* ─────────────────────────────────────────────
             Event Summary Card - Enhanced
          ───────────────────────────────────────────── */}
          {event && (
            <section className="relative overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-br from-white to-zinc-50/80 dark:from-zinc-900/90 dark:to-zinc-950/90 p-6 shadow-lg">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                    <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
                      {event.title}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      event.status === 'published' 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50' 
                        : event.status === 'draft'
                        ? 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700'
                        : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-800/50'
                    }`}>
                      {event.status === 'published' ? <Sparkles className="w-3 h-3" /> : null}
                      {event.status === 'published' ? 'Live' : event.status}
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                      <Calendar className="w-3 h-3" />
                      {new Date(event.event_date).toLocaleDateString(undefined, { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>

                    {event.is_location_hidden ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
                        <MapPin className="w-3 h-3" />
                        Hidden Venue
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50">
                        <MapPin className="w-3 h-3" />
                        {event.location?.split(',')[0]}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Total Capacity</p>
                    <p className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{totalCapacity}</p>
                  </div>
                  <div className="w-px h-10 bg-zinc-200 dark:bg-zinc-700" />
                  <div className="text-right">
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Ticket Types</p>
                    <p className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{ticketTypes.length}</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ─────────────────────────────────────────────
             Statistics Cards - Enhanced Grid
          ───────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Revenue Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-br from-white to-emerald-50/30 dark:from-zinc-900/90 dark:to-emerald-950/20 p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-2xl" />
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Total Revenue</p>
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-zinc-900 dark:text-white mb-1">
                ₦{revenue.toLocaleString()}
              </h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                From successful orders
              </p>
            </div>

            {/* Tickets Sold Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-br from-white to-blue-50/30 dark:from-zinc-900/90 dark:to-blue-950/20 p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl" />
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Tickets Sold</p>
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/25">
                  <Ticket className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <h3 className="text-3xl font-black text-zinc-900 dark:text-white">{ticketsSold}</h3>
                <span className="text-sm font-medium text-zinc-400">/ {totalCapacity}</span>
              </div>
              <div className="mt-2">
                <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${soldPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">{Math.round(soldPercentage)}% capacity filled</p>
              </div>
            </div>

            {/* Orders Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-br from-white to-blue-50/30 dark:from-zinc-900/90 dark:to-blue-950/20 p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl" />
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Unique Orders</p>
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25">
                  <ShoppingBag className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-zinc-900 dark:text-white mb-1">{ordersCount}</h3>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
                <CreditCard className="w-3 h-3" />
                Paid transactions
              </p>
            </div>

            {/* Check-ins Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-br from-white to-amber-50/30 dark:from-zinc-900/90 dark:to-amber-950/20 p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-t-2xl" />
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Check-ins</p>
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25">
                  <Users className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <h3 className="text-3xl font-black text-zinc-900 dark:text-white">{checkIns}</h3>
                <span className="text-sm font-medium text-zinc-400">/ {ticketsSold}</span>
              </div>
              <div className="mt-2">
                <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${checkinPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">{Math.round(checkinPercentage)}% attendance rate</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ─────────────────────────────────────────────
               Recent Orders Table - Enhanced
            ───────────────────────────────────────────── */}
            <section className="lg:col-span-2 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-6 shadow-lg">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                    <ShoppingBag className="w-4 h-4 text-white" />
                  </div>
                  Recent Orders
                </h2>
                <span className="text-xs font-medium text-zinc-400">{ordersList.length} total orders</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-zinc-200 dark:border-zinc-800">
                      <th className="text-left py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Order ID</th>
                      <th className="text-left py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Buyer</th>
                      <th className="text-left py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Tickets</th>
                      <th className="text-left py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Qty</th>
                      <th className="text-left py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Amount</th>
                      <th className="text-left py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Status</th>
                      <th className="text-left py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {ordersList.length > 0 ? (
                      ordersList.slice(0, 10).map(order => (
                        <tr key={order.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-colors duration-150">
                          <td className="py-3.5 font-mono text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                            #{order.id.slice(0, 8).toUpperCase()}
                          </td>
                          <td className="py-3.5 font-semibold text-zinc-800 dark:text-zinc-200">
                            {order.buyerName}
                          </td>
                          <td className="py-3.5">
                            <div className="flex flex-wrap gap-1">
                              {order.ticketsList.map((t, i) => (
                                <span key={i} className="inline-flex items-center gap-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] font-medium px-2 py-0.5 rounded-full">
                                  {t.name} ×{t.quantity}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3.5 font-semibold text-zinc-700 dark:text-zinc-300">
                            {order.qty}
                          </td>
                          <td className="py-3.5 font-bold text-emerald-600 dark:text-emerald-400">
                            ₦{order.amount.toLocaleString()}
                          </td>
                          <td className="py-3.5">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              order.status === "paid"
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                                : order.status === "pending"
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                                : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                            }`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${
                                order.status === "paid" ? "bg-emerald-500" : order.status === "pending" ? "bg-amber-500" : "bg-red-500"
                              }`} />
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3.5 text-zinc-500 dark:text-zinc-400 text-xs">
                            {new Date(order.date).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-16 text-center">
                          <div className="flex flex-col items-center justify-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                              <ShoppingBag className="w-8 h-8 text-zinc-300 dark:text-zinc-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-zinc-600 dark:text-zinc-400">No orders yet</p>
                              <p className="text-xs text-zinc-400 mt-1">Sales will appear here once tickets are purchased</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ─────────────────────────────────────────────
               Ticket Breakdown - Enhanced
            ───────────────────────────────────────────── */}
            <section className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-6 shadow-lg">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  Ticket Breakdown
                </h2>
                <span className="text-xs font-medium text-zinc-400">{ticketTypes.length} types</span>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
                {ticketTypes.length > 0 ? (
                  ticketTypes.map((tt: any, idx: number) => {
                    const soldCount = tickets.filter(
                      (t: any) => t.ticket_type_id === tt.id && t.orders?.payment_status === "paid" && t.status !== "cancelled"
                    ).length;
                    const remainingCount = Math.max(0, (tt.quantity || 0) - soldCount);
                    const percentSold = tt.quantity > 0 ? Math.round((soldCount / tt.quantity) * 100) : 0;
                    const ticketRevenue = soldCount * Number(tt.price || 0);

                    return (
                      <div key={tt.id} className="group p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/80 bg-gradient-to-br from-white to-zinc-50/50 dark:from-zinc-900/50 dark:to-zinc-950/30 hover:border-blue-200 dark:hover:border-blue-800/50 transition-all duration-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${
                              idx % 3 === 0 ? 'from-blue-500 to-purple-500' : 
                              idx % 3 === 1 ? 'from-emerald-500 to-teal-500' : 
                              'from-blue-500 to-indigo-500'
                            } flex items-center justify-center text-white text-[10px] font-bold shadow-md`}>
                              {idx + 1}
                            </div>
                            <div>
                              <h3 className="font-bold text-zinc-800 dark:text-zinc-200">
                                {tt.name}
                              </h3>
                              <p className="text-[11px] font-semibold text-zinc-500">
                                ₦{Number(tt.price || 0).toLocaleString()} each
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{soldCount}</span>
                            <span className="text-xs text-zinc-400">/{tt.quantity}</span>
                            <p className="text-[10px] text-zinc-500">{percentSold}% sold</p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1 mb-3">
                          <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${
                                idx % 3 === 0 ? 'from-blue-500 to-purple-500' : 
                                idx % 3 === 1 ? 'from-emerald-500 to-teal-500' : 
                                'from-blue-500 to-indigo-500'
                              }`}
                              style={{ width: `${percentSold}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[10px] text-zinc-400">
                            <span>{remainingCount} remaining</span>
                            <span>{percentSold}% filled</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex justify-between items-center">
                          <span className="text-xs font-medium text-zinc-500 flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            Revenue
                          </span>
                          <span className="font-bold text-lg bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
                            ₦{ticketRevenue.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3">
                      <Ticket className="w-8 h-8 text-zinc-300 dark:text-zinc-600" />
                    </div>
                    <p className="font-semibold text-zinc-600 dark:text-zinc-400">No ticket types</p>
                    <p className="text-xs text-zinc-400 mt-1">Configure ticket categories to view breakdown</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Quick Tips Banner */}
          {ordersList.length === 0 && ticketTypes.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-5 border border-blue-200 dark:border-blue-800/40">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/50">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-800 dark:text-blue-300">Ready to start selling?</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    Share your event link with attendees to start generating ticket sales. 
                    All orders and analytics will appear here in real-time.
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c4b5fd;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a78bfa;
        }
      `}</style>
    </div>
  );
}