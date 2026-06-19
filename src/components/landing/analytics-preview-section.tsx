"use client";

import { BarChart3, LineChart, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const STATS = [
  {
    title: "Gross Sales",
    value: "$24,850",
    sub: "+12.3% growth",
    icon: TrendingUp,
  },
  {
    title: "Tickets Sold",
    value: "842 / 1000",
    sub: "Live capacity tracking",
    icon: BarChart3,
  },
  {
    title: "Conversion Rate",
    value: "4.2%",
    sub: "From event page views",
    icon: LineChart,
  },
];

export default function AnalyticsPreviewSection() {
  return (
    <section className="relative py-24 bg-zinc-950 text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center">

        {/* LEFT: Dashboard Visualization */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-6 shadow-2xl shadow-black"
          >

            {/* Header */}
            <div className="flex justify-between items-center pb-5 border-b border-zinc-800 mb-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-extrabold">
                  LIVE EVENT PERFORMANCE
                </span>
              </div>

              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-400/20 font-bold">
                REAL-TIME MVP DATA
              </span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {STATS.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
                  >
                    <Icon className="w-4 h-4 text-blue-400 mb-2" />

                    <p className="text-[10px] text-zinc-500 uppercase font-bold">
                      {stat.title}
                    </p>

                    <p className="text-xl font-black mt-1">
                      {stat.value}
                    </p>

                    <p className="text-[10px] text-zinc-400 mt-1">
                      {stat.sub}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* MVP Insight Block */}
            <div className="mt-6 bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
              <p className="text-xs text-zinc-400 font-bold uppercase">
                What This Means
              </p>
              <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
                Every ticket sold is tracked in real-time from creation → payment → entry validation.
                Organizers don’t guess performance — they see it instantly.
              </p>
            </div>

            {/* Simplified chart */}
            <div className="mt-6 flex items-end gap-2 h-24">
              {[30, 45, 38, 55, 68, 85, 90].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-blue-600 to-indigo-500 rounded-md"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Copy */}
        <div className="lg:col-span-5">
          <span className="text-blue-400 font-bold uppercase tracking-wider text-xs">
            MVP Analytics Engine
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold mt-3">
            Know Exactly What Is Happening In Your Event
          </h2>

          <p className="text-zinc-400 mt-4 leading-relaxed">
            Tikkety’s analytics system is built directly into the ticketing engine.
            No delays, no external dashboards — just live performance data tied to real transactions.
          </p>

          <div className="mt-8 space-y-6">

            <div className="flex gap-4">
              <LineChart className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <p className="font-bold">Live Ticket Velocity</p>
                <p className="text-sm text-zinc-400">
                  See exactly when users buy tickets and adjust pricing strategy dynamically.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Users className="w-5 h-5 text-indigo-400 mt-1" />
              <div>
                <p className="font-bold">Attendee Intelligence</p>
                <p className="text-sm text-zinc-400">
                  Understand buyer behavior, geography, and conversion paths per event.
                </p>
              </div>
            </div>

          </div>

          {/* MVP emphasis footer */}
          <p className="text-xs text-zinc-500 mt-10 border-t border-zinc-800 pt-6">
            Built as part of the core MVP: Ticketing → Payment → Analytics in one system.
          </p>
        </div>

      </div>
    </section>
  );
}