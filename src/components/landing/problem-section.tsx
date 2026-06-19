"use client";

import { AlertTriangle, HelpCircle, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

const PROBLEMS = [
  {
    icon: AlertTriangle,
    badgeColor: "bg-red-50 text-red-700 border-red-200/60",
    iconColor: "text-red-500",
    title: "Fragmented Ticketing Systems",
    description:
      "Most organizers still rely on manual transfers, WhatsApp confirmations, or disconnected tools to manage ticket sales, making the process slow and unreliable.",
  },
  {
    icon: HelpCircle,
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200/60",
    iconColor: "text-amber-500",
    title: "No Unified Event-to-Ticket Workflow",
    description:
      "Creating events, defining ticket types, processing payments, and tracking attendees are often handled in separate platforms with no central system.",
  },
  {
    icon: AlertTriangle,
    badgeColor: "bg-red-50 text-red-700 border-red-200/60",
    iconColor: "text-red-500",
    title: "High Ticketing Costs Eat Into Profit",
    description:
      "Many organizers—especially student and small event creators—lose a significant portion of revenue to platform fees and fragmented payment systems.",
  },
  {
    icon: ShieldAlert,
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200/60",
    iconColor: "text-rose-500",
    title: "Zero Real-Time Sales Visibility",
    description:
      "Organizers rarely have accurate, real-time insights into ticket sales, revenue flow, or attendance until after the event ends.",
  },
  {
    icon: ShieldAlert,
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200/60",
    iconColor: "text-rose-500",
    title: "Limited Visibility Into Event Performance",
    description:
      "Organizers often rely on guesswork when tracking attendance, sales performance, and engagement instead of having real-time insights in one place.",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative py-20 bg-zinc-50 border-y border-zinc-100 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-red-100/30 blur-[100px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-blue-600 font-bold uppercase tracking-wider text-xs"
          >
            The Problem
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-zinc-950 mt-3 tracking-tight"
          >
            Running Events Today Is Still Too Fragmented
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-500 text-base md:text-lg font-medium mt-4 max-w-2xl mx-auto"
          >
            From ticket sales to attendee tracking, most organizers still juggle disconnected tools that slow down execution and reduce profitability.
          </motion.p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {PROBLEMS.map((prob, idx) => {
            const Icon = prob.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white border border-zinc-200/80 rounded-3xl p-8 hover:shadow-xl hover:border-zinc-300 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`inline-flex items-center justify-center p-3.5 rounded-2xl border ${prob.badgeColor}`}
                  >
                    <Icon className={`w-6 h-6 ${prob.iconColor}`} />
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 mt-6 tracking-tight">
                    {prob.title}
                  </h3>

                  <p className="text-zinc-500 text-sm font-medium mt-3 leading-relaxed">
                    {prob.description}
                  </p>
                </div>

                <div className="mt-8 text-xs font-semibold text-zinc-400 group-hover:text-zinc-500 transition-colors">
                  0{idx + 1} · PROBLEM
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}