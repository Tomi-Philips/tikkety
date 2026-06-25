"use client";

import { AlertTriangle, HelpCircle, ShieldAlert, XCircle, BarChart3, CreditCard, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const PROBLEMS = [
  {
    icon: AlertTriangle,
    badgeColor: "from-blue-500 to-indigo-500",
    iconColor: "text-blue-500",
    title: "Fragmented Ticketing Systems",
    description:
      "Most organizers still rely on manual transfers, WhatsApp confirmations, or disconnected tools to manage ticket sales, making the process slow and unreliable.",
    tag: "Inefficiency",
  },
  {
    icon: XCircle,
    badgeColor: "from-amber-500 to-orange-500",
    iconColor: "text-amber-500",
    title: "No Unified Event-to-Ticket Workflow",
    description:
      "Creating events, defining ticket types, processing payments, and tracking attendees are often handled in separate platforms with no central system.",
    tag: "Fragmentation",
  },
  {
    icon: CreditCard,
    badgeColor: "from-blue-500 to-indigo-500",
    iconColor: "text-blue-500",
    title: "High Ticketing Costs Eat Into Profit",
    description:
      "Many organizers—especially student and small event creators—lose a significant portion of revenue to platform fees and fragmented payment systems.",
    tag: "Cost",
  },
  {
    icon: BarChart3,
    badgeColor: "from-indigo-500 to-pink-500",
    iconColor: "text-indigo-500",
    title: "Zero Real-Time Sales Visibility",
    description:
      "Organizers rarely have accurate, real-time insights into ticket sales, revenue flow, or attendance until after the event ends.",
    tag: "Analytics",
  },
  {
    icon: ShieldAlert,
    badgeColor: "from-indigo-500 to-pink-500",
    iconColor: "text-indigo-500",
    title: "Limited Visibility Into Event Performance",
    description:
      "Organizers often rely on guesswork when tracking attendance, sales performance, and engagement instead of having real-time insights in one place.",
    tag: "Tracking",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-white via-slate-50/80 to-indigo-50/40 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[5%] right-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-200/20 to-indigo-200/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-amber-200/15 to-orange-200/15 blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-200/5 blur-[150px]" />
        
        {/* Subtle grid pattern */}
        <div className={`absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(0,0,0,0.02)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")] opacity-50`} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium tracking-wider uppercase mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            The Problem
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-[1.15] mb-3">
            Running Events Today Is Still
            <span className="block text-blue-700 mt-1">
              Too Fragmented
            </span>
          </h2>

          <p className="text-gray-500 text-base leading-relaxed max-w-xl mx-auto">
            From ticket sales to attendee tracking, most organizers still juggle disconnected tools 
            that slow down execution and reduce profitability.
          </p>
        </div>

        {/* Problems Grid - Enhanced with 3-2 layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {PROBLEMS.map((prob, idx) => {
            const Icon = prob.icon;
            const isLastTwo = idx >= 3;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className={`group relative bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors flex flex-col ${
                  isLastTwo ? 'md:col-span-1.5' : ''
                }`}
              >
                {/* Icon and Tag */}
                <div className="flex items-start justify-between">
                  <div className="p-2.5 bg-blue-50 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-[9px] font-semibold text-gray-500 border border-gray-200">
                    {prob.tag}
                  </span>
                </div>

                <div className="mt-4 flex-1">
                  <h3 className="text-base font-semibold text-gray-900">
                    {prob.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    {prob.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] font-medium text-gray-400">
                    0{idx + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA - Enhanced */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gray-900 text-white rounded-full border border-gray-800 shadow-sm">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium">Tired of these problems?</span>
            <span className="w-px h-4 bg-gray-700" />
            <span className="text-sm font-semibold text-blue-400">
              Tikkety fixes them all
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}