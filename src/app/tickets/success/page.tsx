import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { CheckCircle2, Ticket, LayoutDashboard, Search, ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  if (!orderId) {
    redirect("/events");
  }

  const supabase = await createClient();

  // Retrieve user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // Fetch the order
  const { data: order } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", orderId)
    .single();

  if (!order || order.payment_status !== "paid") {
    redirect("/events");
  }

  // Fetch first generated ticket id
  const { data: tickets } = await supabase
    .from("tickets")
    .select("id")
    .eq("order_id", orderId)
    .limit(1);

  const ticketId = tickets?.[0]?.id;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950">
      <Navbar />

      {/* Decorative Blur Backgrounds */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-indigo-200/30 dark:bg-indigo-900/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-violet-200/30 dark:bg-violet-900/10 rounded-full blur-3xl" />
      </div>

      <main className="flex-grow pt-28 pb-16 px-4 max-w-4xl mx-auto w-full flex flex-col items-center justify-center relative z-10 text-center space-y-8">
        
        {/* Animated Check */}
        <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-full flex items-center justify-center shadow-lg text-emerald-500 scale-100 animate-bounce">
          <CheckCircle2 className="w-12 h-12 stroke-[1.5]" />
        </div>

        {/* Messaging */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
            Order Complete!
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
            Congratulations, your payment of <span className="font-extrabold text-indigo-600">₦{Number(order.total_amount).toLocaleString()}</span> was verified successfully and your tickets have been generated!
          </p>
        </div>

        {/* Big Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl pt-6">
          
          {/* Card 1: View Ticket */}
          <Link
            href={ticketId ? `/dashboard/attendee/tickets/${ticketId}` : "/dashboard/attendee/tickets"}
            className="group flex flex-col items-center justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/65 rounded-3xl hover:shadow-xl hover:border-indigo-500/30 dark:hover:border-indigo-500/20 transition-all duration-300 hover:-translate-y-1 text-center space-y-4 cursor-pointer"
          >
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100/50 dark:border-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-650 group-hover:text-white transition-all">
              <Ticket className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">View Ticket</h3>
              <p className="text-[10px] text-zinc-400">View or download your QR codes for entry check-in.</p>
            </div>
            <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase group-hover:underline">
              Access Passes →
            </span>
          </Link>

          {/* Card 2: Go to Dashboard */}
          <Link
            href="/dashboard/attendee"
            className="group flex flex-col items-center justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/65 rounded-3xl hover:shadow-xl hover:border-violet-500/30 dark:hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-1 text-center space-y-4 cursor-pointer"
          >
            <div className="w-12 h-12 bg-violet-50 dark:bg-violet-950/30 border border-violet-100/50 dark:border-violet-900/30 rounded-2xl flex items-center justify-center text-violet-600 dark:text-violet-400 group-hover:bg-violet-650 group-hover:text-white transition-all">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Dashboard</h3>
              <p className="text-[10px] text-zinc-400">Access purchases, update your profile or edit account settings.</p>
            </div>
            <span className="text-[10px] font-extrabold text-violet-600 dark:text-violet-400 tracking-wider uppercase group-hover:underline">
              Go to Overview →
            </span>
          </Link>

          {/* Card 3: Browse More Events */}
          <Link
            href="/events"
            className="group flex flex-col items-center justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/65 rounded-3xl hover:shadow-xl hover:border-emerald-500/30 dark:hover:border-emerald-500/20 transition-all duration-300 hover:-translate-y-1 text-center space-y-4 cursor-pointer"
          >
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100/50 dark:border-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-650 group-hover:text-white transition-all">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Explore Events</h3>
              <p className="text-[10px] text-zinc-400">Find other exciting lectures, summits and shows on campus.</p>
            </div>
            <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase group-hover:underline">
              Search Events →
            </span>
          </Link>

        </div>

        {/* Bottom verification metadata */}
        <div className="pt-8 border-t border-zinc-200/50 dark:border-zinc-800/50 flex items-center gap-2 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Receipt ID: {order.id.slice(0, 8).toUpperCase()} • Confirmed via Tikkety Secure Gateway</span>
        </div>
      </main>

      <Footer />
    </div>
  );
}
