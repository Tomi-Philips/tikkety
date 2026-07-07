"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { processPaymentAction } from "@/app/actions/order-actions";
import { CreditCard, Wallet, Landmark, AlertTriangle, ShieldCheck, ArrowRight, Loader2, XCircle } from "lucide-react";
import { toast } from "sonner";

type PaymentSimulatorProps = {
  order: any;
  userEmail: string;
};

export default function PaymentSimulator({ order, userEmail }: PaymentSimulatorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"card" | "transfer">("card");

  // Mock Form Inputs
  const [cardNumber, setCardNumber] = useState("4000 1234 5678 9010");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("123");

  const handlePaySuccess = async () => {
    setLoading(true);
    try {
      const mockRef = `TK-REF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      await processPaymentAction(order.id, "paystack", mockRef);
      toast.success("Payment simulated successfully!");
      router.push(`/tickets/success?orderId=${order.id}`);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to complete payment.");
      router.push(`/tickets/failed?orderId=${order.id}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePayCancel = () => {
    toast.error("Payment cancelled by user.");
    router.push(`/tickets/failed?orderId=${order.id}`);
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl shadow-xl overflow-hidden relative z-10">
      
      {/* Simulation Banner */}
      <div className="bg-amber-500 text-white px-6 py-2.5 text-center text-[10px] font-extrabold uppercase tracking-widest flex items-center justify-center gap-2">
        <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
        Mock Payment Gateway Sandbox
      </div>

      {/* Merchant Header */}
      <div className="p-6 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 text-center space-y-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-black text-sm mx-auto shadow-md">
          TK
        </div>
        <div>
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Tikkety Checkout</h3>
          <p className="text-[10px] text-zinc-400">{userEmail}</p>
        </div>
        <div className="text-2xl font-black text-zinc-900 dark:text-white pt-2">
          ₦{Number(order.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900">
        <button
          onClick={() => setActiveTab("card")}
          className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 cursor-pointer transition-all ${
            activeTab === "card"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-zinc-400 hover:text-zinc-600"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          Pay with Card
        </button>
        <button
          onClick={() => setActiveTab("transfer")}
          className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 cursor-pointer transition-all ${
            activeTab === "transfer"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-zinc-400 hover:text-zinc-600"
          }`}
        >
          <Landmark className="w-4 h-4" />
          Bank Transfer
        </button>
      </div>

      <div className="p-6 space-y-6">
        {activeTab === "card" ? (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="4000 1234 5678 9010"
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-semibold tracking-widest text-zinc-850 dark:text-zinc-100 focus:outline-none"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Expiry</label>
                <input
                  type="text"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  placeholder="MM/YY"
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-semibold text-center text-zinc-850 dark:text-zinc-100 focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">CVV</label>
                <input
                  type="text"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  placeholder="123"
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-semibold text-center text-zinc-850 dark:text-zinc-100 focus:outline-none"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 border border-zinc-200/50 dark:border-zinc-800/60 rounded-2xl text-center space-y-2">
            <Landmark className="w-8 h-8 text-zinc-400 mx-auto" />
            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Simulated Bank Transfer Account</p>
            <p className="text-xs font-black text-indigo-600">Wema Bank • 9928374829</p>
            <p className="text-[10px] text-zinc-400">Transfer funds to this account, and click the confirmation button below.</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handlePaySuccess}
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Simulating Payment Verification...
              </>
            ) : (
              <>
                Simulate Successful Payment
                <ShieldCheck className="w-4 h-4" />
              </>
            )}
          </button>

          <button
            onClick={handlePayCancel}
            disabled={loading}
            className="w-full py-3 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/30 text-red-600 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <XCircle className="w-4 h-4" />
            Decline / Cancel Transaction
          </button>
        </div>

        {/* Security Info */}
        <div className="flex items-center justify-center gap-2 text-[9px] text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          Secured by Tikkety Sandbox Gateway.
        </div>
      </div>
    </div>
  );
}
