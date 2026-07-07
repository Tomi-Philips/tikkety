import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CheckoutForm from "@/components/events/checkout-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ ticketTypeId?: string }>;
}) {
  const { slug } = await params;
  const { ticketTypeId } = await searchParams;

  if (!ticketTypeId) {
    notFound();
  }

  const supabase = await createClient();

  // 1. Fetch Event and Ticket Type details
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select(`
      *,
      ticket_types (
        id,
        name,
        description,
        price,
        quantity,
        sold,
        max_per_order,
        is_active
      )
    `)
    .eq("slug", slug)
    .single();

  if (eventError || !event) {
    notFound();
  }

  // Find the selected ticket type
  const ticketType = (event.ticket_types ?? []).find(
    (tt: any) => tt.id === ticketTypeId
  );

  if (!ticketType || !ticketType.is_active || (ticketType.quantity - (ticketType.sold || 0)) <= 0) {
    notFound();
  }

  // 2. Retrieve user and profile if authenticated
  const { data: { user } } = await supabase.auth.getUser();
  let profile = null;

  if (user) {
    const { data: prof } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    profile = prof;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950">
      <Navbar />

      {/* Decorative Blur Backgrounds */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-indigo-200/30 dark:bg-indigo-900/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-violet-200/30 dark:bg-violet-900/10 rounded-full blur-3xl" />
      </div>

      <main className="flex-grow pt-28 pb-16 px-4 max-w-6xl mx-auto w-full relative z-10">
        
        {/* Back Link */}
        <Link
          href={`/events/${slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 mb-6 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Event Details
        </Link>

        {/* Title */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white">
            Secure Checkout
          </h1>
          <p className="text-xs text-zinc-500">
            Configure your order and attendee information below.
          </p>
        </div>

        {/* Form Container */}
        <CheckoutForm
          event={event}
          ticketType={ticketType}
          initialUser={user}
          initialProfile={profile}
        />
      </main>

      <Footer />
    </div>
  );
}
