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
        return "from-indigo-500 to-blue-500";
      case "General":
        return "from-blue-500 to-indigo-500";
      default:
        return "from-emerald-500 to-teal-500";
    }
  };

  return (
    <section className="relative py-28 bg-gradient-to-b from-slate-50 via-white to-blue-50/40 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-200/20 to-indigo-200/20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-cyan-200/15 to-blue-200/15 blur-[140px] animate-pulse delay-1000" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-200/5 blur-[150px]" />
        
        {/* Subtle grid pattern */}
        <div className={`absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(0,0,0,0.02)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")] opacity-50`} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Detail & Features - Enhanced */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 text-blue-700 font-bold uppercase tracking-wider text-[11px] w-fit mb-5"
          >
            <Users className="w-3.5 h-3.5" />
            For Organizers
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]"
          >
            The Organizer Studio:
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Streamlined Ticket Hosting
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-500 text-base md:text-lg font-medium mt-4 leading-relaxed"
          >
            Build events, define ticket tiers, and manage sales in real time — all from a single unified 
            dashboard designed for speed and clarity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 space-y-5"
          >
            {ORGANIZER_FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="group flex gap-4 items-start p-4 rounded-2xl hover:bg-white/60 hover:shadow-md transition-all duration-300 border border-transparent hover:border-blue-100/50">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 group-hover:text-blue-700 transition-colors">
                      {feat.title}
                    </h4>
                    <p className="text-zinc-500 text-sm font-medium mt-0.5 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <button className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
              <span>Start Creating Events</span>
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Right Side: Interactive Tier Mockup - Enhanced */}
        <div className="lg:col-span-6 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-[480px]"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-zinc-200/60 p-6 shadow-2xl shadow-zinc-200/50 relative overflow-hidden">
              
              {/* Decorative gradient top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
              
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500">
                    <Zap className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                    Tier Configurator
                  </span>
                </div>
                <span className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full border border-emerald-100">
                  <Eye className="w-2.5 h-2.5" />
                  Live Preview
                </span>
              </div>

              {/* Quick selector buttons - Enhanced */}
              <div className="grid grid-cols-3 gap-2.5 mb-6">
                {[
                  { tier: "Early Bird", price: 5000, color: "emerald" },
                  { tier: "General", price: 15000, color: "blue" },
                  { tier: "VIP", price: 50000, color: "indigo" },
                ].map(({ tier, price, color }) => (
                  <button
                    key={tier}
                    onClick={() => selectTier(tier, price)}
                    className={`group relative py-2.5 px-3 rounded-xl text-xs font-bold border-2 transition-all duration-200 ${
                      activeTier === tier
                        ? `border-${color}-500 bg-gradient-to-r from-${color}-50 to-${color}-100 text-${color}-700 shadow-lg shadow-${color}-500/20`
                        : "border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:border-zinc-300"
                    }`}
                  >
                    {tier}
                    {activeTier === tier && (
                      <motion.div
                        layoutId="active-pill"
                        className={`absolute inset-0 rounded-xl bg-gradient-to-r from-${color}-500/10 to-${color}-500/20`}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Dynamic Ticket Display Card - Enhanced */}
              <div className={`relative bg-gradient-to-br ${getTierColor(activeTier)} rounded-2xl p-6 text-white shadow-xl shadow-blue-800/20 min-h-[200px] flex flex-col justify-between overflow-hidden`}>
                
                {/* Animated background glow */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
                
                {/* Decorative dots */}
                <div className="absolute top-4 right-4 flex gap-1 opacity-20">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-white" />
                  ))}
                </div>

                <div className="relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-white/70 font-bold uppercase tracking-wider">
                        Tikkety Ticket Tier
                      </span>
                      <h4 className="text-2xl font-bold mt-1 text-white flex items-center gap-2">
                        <Ticket className="w-5 h-5 text-white/80" />
                        {activeTier}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-white/70 block font-bold uppercase">Price</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={ticketPrice}
                          initial={{ opacity: 0, y: -10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          transition={{ duration: 0.25, type: "spring" }}
                          className="text-3xl font-black block mt-0.5 text-white"
                        >
                          ₦{ticketPrice.toLocaleString()}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-white/70" />
                      <span className="text-xs font-medium text-white/90">
                        {getTierPerks(activeTier)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-white/70" />
                      <span className="text-xs font-medium text-white/90">
                        Qty: Unlimited
                      </span>
                    </div>
                  </div>
                  <span className="text-[8px] bg-white/20 text-white font-bold px-2.5 py-0.5 rounded-full">
                    {activeTier.toUpperCase()} ACCESS
                  </span>
                </div>
              </div>

              {/* Custom pricing slider - Enhanced */}
              <div className="mt-6 border-t border-zinc-100 pt-5">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-bold text-zinc-500 flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5" />
                    Adjust Ticket Price
                  </label>
                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-0.5 rounded-full">
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
                    className="w-full h-2 bg-zinc-100 rounded-full appearance-none cursor-pointer accent-blue-600 transition-all"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(ticketPrice / 150000) * 100}%, #e5e7eb ${(ticketPrice / 150000) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="flex justify-between text-[9px] text-zinc-400 mt-1.5">
                    <span>₦1,000</span>
                    <span>₦150,000</span>
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all">
                  Purchase Ticket
                </button>
                <button className="px-4 py-2.5 rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-all">
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