"use client";

import { useState } from "react";
import { Check, Plus, Ticket, Users, Wallet, Zap, ArrowRight, Sparkles, Shield, Clock, BarChart3, Smartphone, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ORGANIZER_FEATURES = [
  {
    icon: Ticket,
    title: "Complete Ticket Creation Engine",
    desc: "Create events and instantly generate structured ticket tiers like Early Bird, General, and VIP with full pricing control.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Sales & Revenue Control",
    desc: "Track ticket sales as they happen with live updates on revenue, demand, and remaining capacity.",
  },
  {
    icon: Smartphone,
    title: "Fast QR-Based Check-In System",
    desc: "Each ticket comes with a secure QR code for instant verification at entry points with zero friction.",
  },
];

export default function OrganizerSection() {
  const [activeTier, setActiveTier] = useState("VIP");
  const [ticketPrice, setTicketPrice] = useState(50000);
  const [quantity, setQuantity] = useState(1);

  const selectTier = (tier: string, price: number) => {
    setActiveTier(tier);
    setTicketPrice(price);
  };

  const getTierPerks = (tier: string) => {
    switch(tier) {
      case "VIP":
        return "Free drinks, front row + backstage access";
      case "General":
        return "General entry access + lounge area";
      default:
        return "Standard entry access";
    }
  };

  const getTierColor = (tier: string) => {
    switch(tier) {
      case "VIP":
        return "bg-blue-700";
      case "General":
        return "bg-blue-600";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Side: Detail & Features */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="inline-flex items-center gap-2 px-3 py-1 w-[30%] rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium tracking-wider uppercase mb-5">
            <Users className="w-3.5 h-3.5" />
            For Organizers
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-[1.15] mb-3">
            The Organizer Studio:
            <span className="block text-blue-700 mt-1">
              Streamlined Ticket Hosting
            </span>
          </h2>

          <p className="text-gray-500 text-base leading-relaxed max-w-md">
            Build events, define ticket tiers, and manage sales in real time; all from a single unified 
            dashboard designed for speed and clarity.
          </p>

          <div className="mt-6 space-y-3">
            {ORGANIZER_FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="flex gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-center w-9 h-9 bg-blue-50 rounded-lg shrink-0">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Button - No Gradient */}
          <div className="mt-8">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors border border-blue-700">
              <span>Start Creating Events</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side: Interactive Tier Mockup */}
        <div className="lg:col-span-6 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-[480px]"
          >
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              
              {/* Header */}
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-600 rounded">
                    <Zap className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    Tier Configurator
                  </span>
                </div>
                <span className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-700 font-medium px-2.5 py-0.5 rounded border border-blue-200">
                  <Eye className="w-2.5 h-2.5" />
                  Live Preview
                </span>
              </div>

              {/* Quick selector buttons */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { tier: "Early Bird", price: 5000 },
                  { tier: "General", price: 15000 },
                  { tier: "VIP", price: 50000 },
                ].map(({ tier, price }) => (
                  <button
                    key={tier}
                    onClick={() => selectTier(tier, price)}
                    className={`py-2 px-3 text-xs font-semibold border rounded-lg transition-colors ${
                      activeTier === tier
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>

              {/* Dynamic Ticket Display Card */}
              <div className={`${getTierColor(activeTier)} p-6 rounded-lg text-white min-h-[180px] flex flex-col justify-between`}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-white/70 font-semibold uppercase tracking-wider">
                      Tikkety Ticket Tier
                    </span>
                    <h4 className="text-xl font-bold mt-1 text-white flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-white/80" />
                      {activeTier}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-white/70 block font-semibold uppercase">Price</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={ticketPrice}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                        className="text-2xl font-bold block mt-0.5 text-white"
                      >
                        ₦{ticketPrice.toLocaleString()}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-white/70" />
                    <span className="text-xs font-medium text-white/90">
                      {getTierPerks(activeTier)}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-white/70" />
                      <span className="text-xs font-medium text-white/90">
                        Qty: Unlimited
                      </span>
                    </div>
                  </div>
                  <span className="text-[8px] bg-white/20 text-white font-semibold px-2.5 py-0.5 rounded">
                    {activeTier.toUpperCase()} ACCESS
                  </span>
                </div>
              </div>

              {/* Custom pricing slider */}
              <div className="mt-5 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5" />
                    Adjust Ticket Price
                  </label>
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
                    ₦{ticketPrice.toLocaleString()}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="1000"
                    max="150000"
                    step="500"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                    style={{
                      background: `linear-gradient(to right, #2563eb 0%, #2563eb ${(ticketPrice / 150000) * 100}%, #e5e7eb ${(ticketPrice / 150000) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="flex justify-between text-[9px] text-gray-400 mt-1">
                    <span>₦1,000</span>
                    <span>₦150,000</span>
                  </div>
                </div>
              </div>

              {/* Quick actions - No Gradient */}
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors border border-blue-700">
                  Purchase Ticket
                </button>
                <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}