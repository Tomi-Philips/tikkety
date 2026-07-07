"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { createPendingOrderAction } from "@/app/actions/order-actions";
import { Ticket, User, Mail, Lock, Loader2, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";
import { toast } from "sonner";

type CheckoutFormProps = {
  event: any;
  ticketType: any;
  initialUser: any;
  initialProfile: any;
};

export default function CheckoutForm({ event, ticketType, initialUser, initialProfile }: CheckoutFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState(initialUser);
  const [profile, setProfile] = useState(initialProfile);

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // Guest Auth State
  const [authTab, setAuthTab] = useState<"register" | "login">("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(initialProfile?.full_name || "");
  const [authLoading, setAuthLoading] = useState(false);

  const maxQty = Math.min(ticketType.max_per_order || 10, ticketType.quantity - (ticketType.sold || 0));

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    try {
      if (authTab === "register") {
        if (!fullName.trim()) {
          throw new Error("Please enter your full name.");
        }
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: "user",
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });

        if (error) throw error;

        if (data.user) {
          toast.success("Account created successfully!");
          // Check if session exists immediately (e.g. if auto-confirm is enabled)
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            setUser(session.user);
            const { data: prof } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
            setProfile(prof);
          } else {
            // Email verification is required
            toast.info("A verification link was sent to your email. Please verify and then log in here.");
            setAuthTab("login");
          }
        }
      } else {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          toast.success("Signed in successfully!");
          setUser(data.user);
          const { data: prof } = await supabase.from("profiles").select("*").eq("id", data.user.id).single();
          setProfile(prof);
          if (prof) setFullName(prof.full_name || "");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please register or log in first.");
      return;
    }
    if (!fullName.trim()) {
      toast.error("Please provide your full name for the tickets.");
      return;
    }

    setLoading(true);
    try {
      const orderId = await createPendingOrderAction(ticketType.id, quantity, fullName);
      toast.success("Order created! Redirecting to payment...");
      router.push(`/payment/${orderId}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to create order.");
    } finally {
      setLoading(false);
    }
  };

  // Pricing calculations
  const ticketPrice = ticketType.price;
  const subtotal = ticketPrice * quantity;
  const total = subtotal; // 0 service fee

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Checkout Form Area */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Ticket Quantity Selector */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
            <Ticket className="w-5 h-5 text-indigo-600" />
            1. Select Quantity
          </h2>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{ticketType.name}</p>
              <p className="text-xs text-zinc-500">₦{ticketPrice.toLocaleString()} per ticket</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-10 h-10 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-center font-bold text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
              >
                -
              </button>
              <span className="w-8 text-center text-sm font-extrabold text-zinc-800 dark:text-zinc-100">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
                disabled={quantity >= maxQty}
                className="w-10 h-10 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-center font-bold text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
          <p className="text-[10px] text-zinc-400 mt-2">
            Max {ticketType.max_per_order || 10} tickets per order.
          </p>
        </div>

        {/* Guest Auth Tabs or Logged-in Form */}
        {!user ? (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm">
            <div className="flex border-b border-zinc-100 dark:border-zinc-800 mb-6">
              <button
                onClick={() => setAuthTab("register")}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 cursor-pointer transition-all ${
                  authTab === "register"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-zinc-400 hover:text-zinc-600"
                }`}
              >
                Quick Register
              </button>
              <button
                onClick={() => setAuthTab("login")}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 cursor-pointer transition-all ${
                  authTab === "login"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-zinc-400 hover:text-zinc-600"
                }`}
              >
                Sign In
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {authTab === "register" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-zinc-800 dark:text-zinc-100"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-zinc-800 dark:text-zinc-100"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-zinc-800 dark:text-zinc-100"
                    required
                  />
                </div>
              </div>

              {authTab === "register" && (
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 rounded-xl p-3 flex gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-amber-800 dark:text-amber-400 leading-normal">
                    Note: If email verification is enabled, you will need to click the verification link sent to your email inbox before checking out.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 hover:shadow-md cursor-pointer"
              >
                {authLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : authTab === "register" ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-1 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                2. Billing Details
              </h2>
              <p className="text-xs text-zinc-400">Review your ticket owner contact details.</p>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full pl-10 pr-4 py-3 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl text-sm text-zinc-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Attendee Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-zinc-800 dark:text-zinc-100"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl text-sm font-extrabold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Order...
                  </>
                ) : (
                  <>
                    Proceed to Payment
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Order Summary sidebar */}
      <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Order Summary</h3>
        
        {/* Short event info */}
        <div className="flex gap-4">
          <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden shrink-0">
            {event.banner_url ? (
              <img src={event.banner_url} alt={event.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-400">
                <Ticket className="w-8 h-8" />
              </div>
            )}
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white line-clamp-2">{event.title}</h4>
            <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
              {new Date(event.event_date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="text-[10px] text-zinc-400 line-clamp-1">{event.location}</p>
          </div>
        </div>

        {/* Pricing list */}
        <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex justify-between text-xs text-zinc-500">
            <span>{ticketType.name} Ticket x {quantity}</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              ₦{subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-xs text-zinc-500">
            <span>Service Fee</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">₦0.00</span>
          </div>

          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
            <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Total Price</span>
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
              ₦{total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Security badge */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2 text-[10px] text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Guaranteed secure booking & verified QR ticket delivery.</span>
        </div>
      </div>
    </div>
  );
}
