import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { XCircle, ArrowLeft, RefreshCw, AlertTriangle } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default async function FailurePage({
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

  // Fetch the order to ensure it belongs to the user
  const { data: order } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", orderId)
    .single();

  if (!order) {
    redirect("/events");
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950">
      <Navbar />

      {/* Decorative Blur Backgrounds */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-red-200/20 dark:bg-red-950/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-orange-200/20 dark:bg-orange-950/10 rounded-full blur-3xl" />
      </div>

      <main className="flex-grow pt-28 pb-16 px-4 max-w-lg mx-auto w-full flex flex-col items-center justify-center relative z-10 text-center space-y-6">
        
        {/* Animated Cross */}
        <div className="w-20 h-20 bg-red-50 dark:bg-red-950/20 border border-red-150 dark:border-red-900/40 rounded-full flex items-center justify-center shadow-lg text-red-500 animate-pulse">
          <XCircle className="w-12 h-12 stroke-[1.5]" />
        </div>

        {/* Messaging */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white">
            Payment Unsuccessful
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            The transaction was declined, cancelled, or failed to complete. Don't worry, no funds were deducted from your account.
          </p>
        </div>

        {/* Action Blocks */}
        <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-start gap-2.5 text-left text-xs bg-amber-50 dark:bg-amber-950/20 border border-amber-255 dark:border-amber-900/30 rounded-2xl p-3">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-800 dark:text-amber-400">Order is still Pending</p>
              <p className="text-[10px] text-amber-700/80 dark:text-amber-500/80 leading-normal">
                Your order remains active. You can retry the payment immediately without re-entering checkout details.
              </p>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <Link
              href={`/payment/${orderId}`}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Retry Payment Simulation
            </Link>

            <Link
              href="/events"
              className="w-full py-3 border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-850 dark:hover:bg-zinc-800/40 text-zinc-600 dark:text-zinc-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Browse Events
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
