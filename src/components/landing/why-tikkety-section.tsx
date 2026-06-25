"use client";

import { Ticket, Layers, Lock, Sparkles, Shield, Users, DollarSign, CheckCircle, ArrowRight, Zap, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const VALUES = [
  {
    icon: Ticket,
    gradient: "from-blue-500 to-cyan-500",
    iconColor: "text-blue-500",
    title: "End-to-End Ticketing System",
    description:
      "Create events, define ticket types, set pricing, and instantly generate secure digital tickets — all from one unified workflow.",
    tag: "Core Feature",
  },
  {
    icon: Layers,
    gradient: "from-indigo-500 to-purple-500",
    iconColor: "text-indigo-500",
    title: "Unified Ecosystem",
    description:
      "Connect event organizers with vetted local service vendors who showcase their services and portfolios on Tikkety.",
    tag: "Ecosystem",
  },
  {
    icon: Shield,
    gradient: "from-emerald-500 to-teal-500",
    iconColor: "text-emerald-500",
    title: "Vetted Security & QR Check-ins",
    description:
      "Stop ticket scalping. Enjoy fully dynamic, cryptographically secure QR tickets scan-ready through the mobile-friendly check-in.",
    tag: "Security",
  },
  {
    icon: Lock,
    gradient: "from-rose-500 to-pink-500",
    iconColor: "text-rose-500",
    title: "Secure QR Ticket Validation",
    description:
      "Every ticket is cryptographically secured and ready for fast QR-based check-ins, reducing fraud and manual verification delays.",
    tag: "Validation",
  },
  {
    icon: DollarSign,
    gradient: "from-amber-500 to-orange-500",
    iconColor: "text-amber-500",
    title: "Fast Payout Processing",
    description:
      "Event revenue is processed efficiently so organizers can access earnings quickly after ticket sales complete.",
    tag: "Payments",
  },
  {
    icon: Users,
    gradient: "from-violet-500 to-purple-500",
    iconColor: "text-violet-500",
    title: "Future: Direct Vendor Hiring",
    description:
      "Soon, organizers will be able to hire and book DJs, photographers, MCs, and vendors directly inside the platform — extending beyond online profiles.",
    tag: "Coming Soon",
  },
];

export default function WhyTikketySection() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-slate-50 via-white to-indigo-50/30 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-200/20 to-indigo-200/20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] rounded-full bg-gradient-to-tl from-purple-200/15 to-pink-200/15 blur-[140px] animate-pulse delay-1000" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-200/5 blur-[150px]" />
        
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
            <Sparkles className="w-3.5 h-3.5" />
            The Solution
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]"
          >
            Introducing
            <span className="block text-blue-700">
              Tikkety Ecosystem
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-500 text-base md:text-lg font-medium mt-5 max-w-2xl mx-auto leading-relaxed"
          >
            We've designed a unified platform catering to organizers, attendees, and service providers alike, 
            removing administrative overhead entirely.
          </motion.p>
        </div>

        {/* Feature Grid - Enhanced with 3-column layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative bg-white/80 backdrop-blur-sm border border-zinc-200/60 rounded-2xl p-7 hover:shadow-2xl hover:border-indigo-200/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient hover overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-50/0 to-purple-50/0 group-hover:from-indigo-50/30 group-hover:to-purple-50/30 transition-all duration-500 pointer-events-none" />
                
                {/* Icon Container - Enhanced with gradient */}
                <div className="relative">
                  
                  {/* Tag badge */}
                  <span className={`absolute -top-1 -right-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold border bg-white/90 shadow-sm ${
                    val.tag === "Coming Soon" 
                      ? "text-amber-600 border-amber-200" 
                      : "text-blue-600 border-blue-200"
                  }`}>
                    {val.tag}
                  </span>
                </div>

                <div className="mt-5">
                  <h3 className="text-lg font-bold text-zinc-900 tracking-tight group-hover:text-blue-700 transition-colors duration-300">
                    {val.title}
                  </h3>

                  <p className="text-zinc-500 text-sm font-medium mt-2.5 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}