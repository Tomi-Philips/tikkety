"use client";

import { BarChart3, LineChart, Users, TrendingUp, Eye, Zap, Clock, Activity, ArrowUp, ArrowDown, DollarSign, Ticket, Percent, Calendar, Brain } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const STATS = [
  {
    title: "Gross Sales",
    value: "₦2,485,000",
    sub: "+12.3% growth",
    icon: TrendingUp,
    trend: "up",
  },
  {
    title: "Tickets Sold",
    value: "842 / 1000",
    sub: "Live capacity tracking",
    icon: BarChart3,
    trend: "up",
  },
  {
    title: "Conversion Rate",
    value: "4.2%",
    sub: "From event page views",
    icon: Percent,
    trend: "up",
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
    <section className="py-20 bg-gray-950 border-t border-gray-800">
      <div className="w-full max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* LEFT: Dashboard Visualization */}
        <div className="lg:col-span-7 rounded-md">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-zinc-200 overflow-hidden shadow-lg rounded-md"
          >
            {/* Image Container with proper structure */}
            <div className="relative w-full">
              <Image
                src="/Analytics Screenshot.png"
                alt="Tikkety Analytics Dashboard - Overview"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            
            {/* Divider between images */}
            <div className="border-t-6 border-zinc-300 hidden lg:block" />
            
            {/* Second Image Container */}
            <div className="relative w-full hidden lg:block">
              <Image
                src="/Analytics Screenshot-2.png"
                alt="Tikkety Analytics Dashboard - Detailed View"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            
            {/* Optional: Image caption/footer */}
            <div className="bg-zinc-50 border-t border-zinc-200 px-6 py-3 flex items-center justify-between">
              <span className="text-[10px] text-zinc-400">Analytics Dashboard • Real-time metrics</span>
              <span className="text-[10px] font-semibold text-blue-600">Updated live</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Copy */}
        <div className="lg:col-span-5">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-400 text-xs font-medium tracking-wider uppercase mb-5">
            <Zap className="w-3.5 h-3.5" />
            Analytics Engine
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-[1.15] mb-3">
            Know Exactly What Is
            <span className="block text-gray-300 mt-1">
              Happening In Your Event
            </span>
          </h2>

          <p className="text-gray-400 text-base leading-relaxed max-w-md">
            Tikkety's analytics system is built directly into the ticketing engine.
            No delays, no external dashboards — just live performance data tied to real transactions.
          </p>

          {/* Feature List - Clean */}
          <div className="mt-6 space-y-3">
            <div className="flex gap-3 p-3 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors">
              <div className="p-2 bg-gray-800 rounded-lg shrink-0">
                <LineChart className="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Live Ticket Velocity</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  See exactly when users buy tickets and adjust pricing strategy dynamically.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors">
              <div className="p-2 bg-gray-800 rounded-lg shrink-0">
                <Users className="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Attendee Intelligence</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  Understand buyer behavior, geography, and conversion paths per event.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors">
              <div className="p-2 bg-gray-800 rounded-lg shrink-0">
                <Eye className="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Real-Time Visibility</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  Monitor attendance, sales velocity, and revenue trends as they happen.
                </p>
              </div>
            </div>
          </div>

          {/* MVP emphasis footer */}
          <div className="mt-6 pt-4 border-t border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Zap className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-gray-400">Built into core MVP:</span>
              <span className="text-gray-600">Ticketing → Payment → Analytics</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}