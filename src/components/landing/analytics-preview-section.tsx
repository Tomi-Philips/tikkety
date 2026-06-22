"use client";

import { BarChart3, LineChart, Users, TrendingUp, Eye, Zap, Clock, Activity, ArrowUp, ArrowDown, DollarSign, Ticket, Percent, Calendar, Brain } from "lucide-react";
import { motion } from "framer-motion";

const STATS = [
  {
    title: "Gross Sales",
    value: "₦2,485,000",
    sub: "+12.3% growth",
    icon: TrendingUp,
    trend: "up",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Tickets Sold",
    value: "842 / 1000",
    sub: "Live capacity tracking",
    icon: BarChart3,
    trend: "up",
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Conversion Rate",
    value: "4.2%",
    sub: "From event page views",
    icon: Percent,
    trend: "up",
    color: "from-purple-500 to-pink-500",
  },
];

const CHART_DATA = [
  { day: "Mon", value: 30 },
  { day: "Tue", value: 45 },
  { day: "Wed", value: 38 },
  { day: "Thu", value: 55 },
  { day: "Fri", value: 68 },
  { day: "Sat", value: 85 },
  { day: "Sun", value: 90 },
];

export default function AnalyticsPreviewSection() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white overflow-hidden">

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-600/10 to-indigo-600/10 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-purple-600/10 to-pink-600/10 blur-[140px] animate-pulse delay-1000" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[150px]" />
        
        {/* Subtle grid pattern */}
        <div className={`absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255,255,255,0.02)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")] opacity-50`} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* LEFT: Dashboard Visualization - Enhanced */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-sm border border-zinc-800/60 rounded-3xl p-6 shadow-2xl shadow-black/50 relative overflow-hidden"
          >
            {/* Decorative gradient glow */}
            <div className="absolute -top-[30%] -right-[30%] w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-[30%] -left-[30%] w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

            {/* Header */}
            <div className="flex justify-between items-center pb-5 border-b border-zinc-800/60 mb-6 relative">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-extrabold tracking-wider text-zinc-200">
                  LIVE EVENT PERFORMANCE
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-400/20 font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  REAL-TIME
                </span>
              </div>
            </div>

            {/* Stats Grid - Enhanced */}
            <div className="grid grid-cols-3 gap-4 relative">
              {STATS.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="relative bg-zinc-950/80 border border-zinc-800/60 rounded-2xl p-4 hover:border-zinc-700 transition-all duration-300 group"
                  >
                    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.color} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <div className={`inline-flex p-1.5 rounded-lg bg-gradient-to-br ${stat.color}/20 mb-3`}>
                      <Icon className={`w-4 h-4 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                    </div>

                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                      {stat.title}
                    </p>

                    <p className="text-xl font-black mt-1 text-white">
                      {stat.value}
                    </p>

                    <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-0.5">
                      <ArrowUp className="w-3 h-3" />
                      {stat.sub}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* MVP Insight Block - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-6 bg-gradient-to-br from-blue-950/30 to-indigo-950/30 border border-blue-800/30 rounded-2xl p-5 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl" />
              <div className="flex items-start gap-3 relative">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 shrink-0">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-blue-400 font-bold uppercase tracking-wider">
                    What This Means
                  </p>
                  <p className="text-sm text-zinc-300 mt-1.5 leading-relaxed">
                    Every ticket sold is tracked in real-time from creation → payment → entry validation.
                    Organizers don't guess performance — they see it instantly.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Simplified Chart - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-6"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  Weekly Sales Trend
                </span>
                <span className="text-[9px] text-emerald-400 font-semibold flex items-center gap-0.5">
                  <ArrowUp className="w-3 h-3" />
                  +12.5% this week
                </span>
              </div>
              <div className="flex items-end gap-2 h-28 bg-zinc-950/50 rounded-xl p-4 border border-zinc-800/30">
                {CHART_DATA.map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${item.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                      className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-md relative hover:from-blue-500 hover:to-indigo-400 transition-all cursor-pointer"
                      style={{ height: `${item.value}%`, minHeight: '8px' }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {item.value}
                      </div>
                    </motion.div>
                    <span className="text-[8px] text-zinc-500 font-medium">{item.day}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bottom status */}
            <div className="mt-4 flex justify-between items-center pt-3 border-t border-zinc-800/60">
              <span className="text-[8px] text-zinc-600 font-mono">ANALYTICS_ENGINE_v1.0</span>
              <span className="flex items-center gap-1.5 text-[8px] text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                live feed active
              </span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Copy - Enhanced */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/20 text-blue-400 font-bold uppercase tracking-wider text-[11px] mb-5"
          >
            <Zap className="w-3.5 h-3.5" />
            MVP Analytics Engine
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1]"
          >
            Know Exactly What Is
            <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Happening In Your Event
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 text-base md:text-lg font-medium mt-4 leading-relaxed"
          >
            Tikkety's analytics system is built directly into the ticketing engine.
            No delays, no external dashboards — just live performance data tied to real transactions.
          </motion.p>

          {/* Feature List - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 space-y-5"
          >
            <div className="group flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-500/20 group-hover:from-blue-600/30 group-hover:to-blue-500/30 transition-all shrink-0">
                <LineChart className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="font-bold text-zinc-200 group-hover:text-blue-400 transition-colors">Live Ticket Velocity</p>
                <p className="text-sm text-zinc-400 mt-0.5 leading-relaxed">
                  See exactly when users buy tickets and adjust pricing strategy dynamically.
                </p>
              </div>
            </div>

            <div className="group flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-600/20 to-indigo-500/20 group-hover:from-indigo-600/30 group-hover:to-indigo-500/30 transition-all shrink-0">
                <Users className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="font-bold text-zinc-200 group-hover:text-indigo-400 transition-colors">Attendee Intelligence</p>
                <p className="text-sm text-zinc-400 mt-0.5 leading-relaxed">
                  Understand buyer behavior, geography, and conversion paths per event.
                </p>
              </div>
            </div>

            <div className="group flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-600/20 to-purple-500/20 group-hover:from-purple-600/30 group-hover:to-purple-500/30 transition-all shrink-0">
                <Eye className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="font-bold text-zinc-200 group-hover:text-purple-400 transition-colors">Real-Time Visibility</p>
                <p className="text-sm text-zinc-400 mt-0.5 leading-relaxed">
                  Monitor attendance, sales velocity, and revenue trends as they happen.
                </p>
              </div>
            </div>
          </motion.div>

          {/* MVP emphasis footer - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 pt-4 border-t border-zinc-800/60"
          >
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-medium text-zinc-400">Built as part of the core MVP:</span>
              </div>
              <span className="text-zinc-600">Ticketing → Payment → Analytics</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}