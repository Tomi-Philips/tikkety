import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PaymentSimulator from "@/components/events/payment-simulator";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const supabase = await createClient();

  // Retrieve user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/login?redirectTo=/payment/${orderId}`);
  }

  // Fetch the order
  const { data: order, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", orderId)
    .single();

  if (error || !order) {
    notFound();
  }

  // Redirect if status is already settled
  if (order.payment_status === "paid") {
    redirect(`/tickets/success?orderId=${order.id}`);
  }

  if (order.payment_status === "failed") {
    redirect(`/tickets/failed?orderId=${order.id}`);
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950">
      <Navbar />

      {/* Decorative blurs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-indigo-200/30 dark:bg-indigo-900/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-violet-200/30 dark:bg-violet-900/10 rounded-full blur-3xl" />
      </div>

      <main className="flex-grow pt-28 pb-16 px-4 flex items-center justify-center relative z-10">
        <PaymentSimulator order={order} userEmail={user.email!} />
      </main>

      <Footer />
    </div>
  );
}
