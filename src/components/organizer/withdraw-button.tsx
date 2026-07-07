"use client";

import { toast } from "sonner";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useState } from "react";

export default function WithdrawButton() {
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    setLoading(true);
    // Simulate a brief network call for realism
    await new Promise((resolve) => setTimeout(resolve, 900));
    setLoading(false);
    toast.success("Withdrawal request submitted (demo)", {
      description: "Your request has been queued. Real payouts coming soon.",
      duration: 5000,
    });
  };

  return (
    <button
      id="withdraw-btn"
      onClick={handleWithdraw}
      disabled={loading}
      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <ArrowUpRight className="w-4 h-4" />
          <span>Request Withdrawal</span>
        </>
      )}
    </button>
  );
}
