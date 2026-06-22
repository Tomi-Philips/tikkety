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
        
        {/* Section Header - Enhanced */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 text-blue-700 font-bold uppercase tracking-wider text-[11px] mb-5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            The Problem
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]"
          >
            Running Events Today Is Still
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Too Fragmented
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-500 text-base md:text-lg font-medium mt-5 max-w-2xl mx-auto leading-relaxed"
          >
            From ticket sales to attendee tracking, most organizers still juggle disconnected tools 
            that slow down execution and blueuce profitability.
          </motion.p>
        </div>

        {/* Problems Grid - Enhanced with 3-2 layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {PROBLEMS.map((prob, idx) => {
            const Icon = prob.icon;
            const isLastTwo = idx >= 3;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative bg-white/80 backdrop-blur-sm border border-zinc-200/60 rounded-3xl p-8 hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-200/50 transition-all duration-300 flex flex-col justify-between ${
                  isLastTwo ? 'md:col-span-1.5' : ''
                }`}
              >
                {/* Gradient hover overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50/30 group-hover:to-indigo-50/30 transition-all duration-500 pointer-events-none" />
                
                {/* Icon Container - Enhanced */}
                <div className="relative">
                  <div className={`inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${prob.badgeColor} shadow-lg`}>
                    <Icon className={`w-6 h-6 text-white`} />
                  </div>
                  
                  {/* Tag badge */}
                  <span className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[9px] font-bold text-zinc-500 border border-zinc-200/50">
                    {prob.tag}
                  </span>
                </div>

                <div className="mt-5 flex-1">
                  <h3 className="text-xl font-bold text-zinc-900 tracking-tight group-hover:text-blue-700 transition-colors duration-300">
                    {prob.title}
                  </h3>

                  <p className="text-zinc-500 text-sm font-medium mt-3 leading-relaxed">
                    {prob.description}
                  </p>
                </div>

                {/* Footer with problem number and icon */}
                <div className="mt-6 pt-4 border-t border-zinc-100/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-400 group-hover:text-blue-500 transition-colors">
                    0{idx + 1} · PROBLEM
                  </span>
                  <div className="flex items-center gap-1 text-xs font-medium text-zinc-400 group-hover:text-blue-500 transition-colors">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-zinc-900 to-zinc-800 text-white shadow-xl shadow-zinc-900/20">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium">Tiblue of these problems?</span>
            <span className="w-px h-5 bg-white/20" />
            <span className="text-sm font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Tikkety fixes them all
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}