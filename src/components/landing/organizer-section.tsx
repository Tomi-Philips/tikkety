"use client";

import { useState } from "react";
import { Check, Plus, Ticket, Users, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ORGANIZER_FEATURES = [
  {
    title: "Complete Ticket Creation Engine",
    desc: "Create events and instantly generate structured ticket tiers like Early Bird, General, and VIP with full pricing control.",
  },
  {
    title: "Real-Time Sales & Revenue Control",
    desc: "Track ticket sales as they happen with live updates on revenue, demand, and remaining capacity.",
  },
  {
    title: "Fast QR-Based Check-In System",
    desc: "Each ticket comes with a secure QR code for instant verification at entry points with zero friction.",
  },
];

export default function OrganizerSection() {
  const [activeTier, setActiveTier] = useState("VIP");
  const [ticketPrice, setTicketPrice] = useState(150);

  const selectTier = (tier: string, price: number) => {
    setActiveTier(tier);
    setTicketPrice(price);
  };

  return (
    <section className="relative py-24 bg-zinc-50 border-y border-zinc-100 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-[40%] right-[-15%] w-[450px] h-[450px] rounded-full bg-blue-100/40 blur-[130px] z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center">
        {/* Left Side: Detail & Features */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">
            For Organizers
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 mt-3 tracking-tight">
            The Organizer Studio: Streamlined Ticket Hosting
          </h2>
          <p className="text-zinc-500 font-medium text-base md:text-lg mt-4 leading-relaxed">
            Build events, define ticket tiers, and manage sales in real time — all from a single unified dashboard designed for speed and clarity.
          </p>

          <div className="mt-8 space-y-6">
            {ORGANIZER_FEATURES.map((feat, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 mt-1 shrink-0">
                  <Check className="w-3.5 h-3.5 font-bold" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900">{feat.title}</h4>
                  <p className="text-zinc-500 text-sm font-medium mt-1 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Interactive Tier Mockup */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[460px] bg-white rounded-3xl border border-zinc-200/80 p-6 shadow-2xl shadow-zinc-200 relative">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                Tier Configurator Simulation
              </span>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                Live Preview
              </span>
            </div>

            {/* Quick selector buttons */}
            <div className="grid grid-cols-3 gap-2.5 mb-6">
              <button
                onClick={() => selectTier("Early Bird", 45)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  activeTier === "Early Bird"
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:border-zinc-300"
                }`}
              >
                Early Bird
              </button>
              <button
                onClick={() => selectTier("General", 75)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  activeTier === "General"
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:border-zinc-300"
                }`}
              >
                General Pass
              </button>
              <button
                onClick={() => selectTier("VIP", 150)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  activeTier === "VIP"
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:border-zinc-300"
                }`}
              >
                VIP Access
              </button>
            </div>

            {/* Dynamic Ticket Display Card */}
            <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-2xl p-5 text-white shadow-xl shadow-blue-800/20 relative overflow-hidden min-h-[170px] flex flex-col justify-between">
              {/* Backglow element */}
              <div className="absolute right-[-10%] top-[-10%] w-32 h-32 bg-white/10 rounded-full blur-xl" />

              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">
                    Tikkety Ticket Tier
                  </span>
                  <h4 className="text-xl font-bold mt-1 text-white flex items-center gap-1.5">
                    <Ticket className="w-5 h-5 text-blue-300" />
                    {activeTier}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-blue-200 block font-bold uppercase">Price</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={ticketPrice}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="text-2xl font-black block mt-0.5 text-white"
                    >
                      ${ticketPrice}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-6">
                <div>
                  <span className="text-[9px] text-blue-200 block font-bold">INCLUDED PERKS</span>
                  <span className="text-xs font-semibold mt-0.5 block text-zinc-100">
                    {activeTier === "VIP"
                      ? "Free drinks, front row + backstage"
                      : activeTier === "General"
                      ? "General entry access + lounge area"
                      : "Standard entry access"}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[8px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full">
                    Qty: Unlimited
                  </span>
                </div>
              </div>
            </div>

            {/* Custom pricing slider simulation */}
            <div className="mt-6 border-t border-zinc-100 pt-5">
              <label className="flex justify-between text-xs font-bold text-zinc-500 mb-2">
                <span>ADJUST TICKET PRICE (MOCK)</span>
                <span className="text-blue-600">${ticketPrice}</span>
              </label>
              <input
                type="range"
                min="10"
                max="300"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
