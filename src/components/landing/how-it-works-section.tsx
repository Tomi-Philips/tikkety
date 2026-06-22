"use client";

import { CheckCircle2, Megaphone, Rocket, Sparkles, Zap, ArrowRight, Calendar, Ticket, Users } from "lucide-react";
import { motion } from "framer-motion";

const STEPS = [
  {
    step: "01",
    icon: Rocket,
    iconColor: "from-blue-500 to-cyan-500",
    title: "Create & Customize Event",
    description:
      "Enter your venue parameters, configure pricing tiers (VIP, general access), and set up custom rules in less than five minutes.",
    tag: "Setup",
  },
  {
    step: "02",
    icon: Megaphone,
    iconColor: "from-indigo-500 to-purple-500",
    title: "Generate & Sell Secure Tickets",
    description:
      "Tikkety automatically generates secure, trackable tickets with QR codes. Share your event link and start selling instantly with built-in payment processing.",
    tag: "Launch",
  },
  {
    step: "03",
    icon: CheckCircle2,
    iconColor: "from-emerald-500 to-teal-500",
    title: "Scan QR Passes & Gate Check-in",
    description:
      "Use our browser scanner tool to verify attendees dynamically at the gate. Track real-time sales and stats post-event.",
    tag: "Execute",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-28 bg-gradient-to-b from-slate-50 via-white to-indigo-50/30 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-200/20 to-indigo-200/20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[20%] left-[5%] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-purple-200/15 to-pink-200/15 blur-[140px] animate-pulse delay-1000" />
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
            <Zap className="w-3.5 h-3.5" />
            How it Works
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]"
          >
            Go from Idea to Live Event
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              in 3 Simple Steps
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-500 text-base md:text-lg font-medium mt-5 max-w-2xl mx-auto leading-relaxed"
          >
            An all-in-one experience built specifically to remove complexity. Scale your promotions, 
            sell securely, and manage gates.
          </motion.p>
        </div>

        {/* Steps display - Enhanced */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          
          {/* Connecting line with animated gradient */}
          <div className="hidden md:block absolute top-[50px] left-[12%] right-[12%] h-[2px] z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-purple-500/30 rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-indigo-500/50 to-purple-500/0 animate-pulse" />
          </div>

          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -8 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                {/* Step badge / Icon wrapper - Enhanced */}
                <div className="relative">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.iconColor} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  
                  <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.iconColor} flex items-center justify-center shadow-xl shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Step number badge */}
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-black text-white border-2 border-white shadow-lg shadow-zinc-900/20">
                    {step.step}
                  </span>

                  {/* Tag badge */}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[8px] font-bold text-zinc-600 border border-zinc-200/50 shadow-sm whitespace-nowrap">
                    {step.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mt-8 tracking-tight px-4 group-hover:text-indigo-700 transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-zinc-500 text-sm font-medium mt-3 leading-relaxed px-2">
                  {step.description}
                </p>

                {/* Bottom indicator */}
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-indigo-400 opacity-0 group-hover:opacity-100 transition-all">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Stats - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 grid grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-zinc-200/50 shadow-sm">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-800">Setup</p>
              <p className="text-[10px] text-zinc-500">&lt; 5 minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-zinc-200/50 shadow-sm">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-800">Sell</p>
              <p className="text-[10px] text-zinc-500">Instant checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-zinc-200/50 shadow-sm">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-800">Check-in</p>
              <p className="text-[10px] text-zinc-500">QR scan & go</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}