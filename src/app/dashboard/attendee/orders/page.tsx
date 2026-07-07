import { createClient } from "@/lib/supabase/server";
import { CreditCard, Calendar, ShoppingBag, ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";

export default async function AttendeeOrdersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch all orders with details
  const { data: orders, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        id,
        quantity,
        unit_price,
        subtotal,
        ticket_types (
          name,
          events (
            title
          )
        )
      )
    `)
    .eq("buyer_id", user.id)
    .order("created_at", { ascending: false });

  const listOrders = orders || [];

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30";
      case "failed":
        return "bg-red-50 text-red-700 border-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30";
      default:
        return "bg-zinc-50 text-zinc-600 border-zinc-250";
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-indigo-600" />
          Purchase History
        </h1>
        <p className="text-xs text-zinc-400">Review all orders, payment status, and order details.</p>
      </div>

      {/* Orders List */}
      {listOrders.length > 0 ? (
        <div className="space-y-4">
          {listOrders.map((order: any) => {
            const dateStr = new Date(order.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            });

            return (
              <div
                key={order.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">Order ID</span>
                    <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">
                      {order.id.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {dateStr}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold border uppercase tracking-wider ${getStatusBadge(order.payment_status)}`}>
                      {order.payment_status}
                    </span>
                  </div>
                </div>

                {/* Items details list */}
                <div className="space-y-3">
                  {order.order_items?.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-start gap-4 text-xs">
                      <div>
                        <p className="font-bold text-zinc-900 dark:text-white">
                          {item.ticket_types?.events?.title || "Event Tickets"}
                        </p>
                        <p className="text-[10px] text-zinc-400">
                          {item.ticket_types?.name || "Pass"} • ₦{Number(item.unit_price).toLocaleString()} each
                        </p>
                      </div>
                      <span className="font-extrabold text-zinc-800 dark:text-zinc-200 shrink-0">
                        Qty {item.quantity} • ₦{Number(item.subtotal).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer totals */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Payment Method: {order.payment_method?.toUpperCase() || "N/A"}</span>
                    {order.payment_reference && (
                      <>
                        <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                        <span className="truncate max-w-[150px]">Ref: {order.payment_reference}</span>
                      </>
                    )}
                  </div>

                  <div className="text-sm font-bold text-zinc-950 dark:text-zinc-100 self-end sm:self-auto">
                    Total: <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">₦{Number(order.total_amount).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-3xl p-6 max-w-sm mx-auto shadow-sm space-y-3">
          <ShoppingBag className="w-10 h-10 text-zinc-300 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">No orders found</h3>
            <p className="text-xs text-zinc-400">Your transaction logs will appear here once you place an order.</p>
          </div>
        </div>
      )}
    </div>
  );
}
