"use client";

import { Ticket, Compass, ShieldCheck, Share2, CheckCircle, Calendar, Clock, MapPin, Smartphone, Sparkles, Zap, Eye, Users } from "lucide-react";
import { motion } from "framer-motion";

const STEPS = [
  {
    title: "Discover Events Instantly",
    desc: "Browse personalized events based on your interests — concerts, parties, seminars, campus events, and more.",
    icon: Compass,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Secure Ticket Purchase",
    desc: "Buy tickets instantly with secure checkout and receive a verified digital pass tied directly to your identity.",
    icon: Ticket,
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "Instant QR Ticket Generation",
    desc: "Your ticket is automatically generated as a secure QR code stored in your mobile wallet.",
    icon: ShieldCheck,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Seamless Event Entry",
    desc: "Scan your QR code at the gate for instant validation — no printing, no fraud, no delays.",
    icon: CheckCircle,
    color: "from-violet-500 to-pink-500",
  },
];

const FEATURES = [
  {
    title: "Personalized Event Discovery",
    desc: "Find events tailored to your interests, location, and activity history.",
    icon: Compass,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Fraud-Proof Ticketing",
    desc: "Each ticket is cryptographically verified and uniquely tied to the buyer.",
    icon: ShieldCheck,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Instant Ticket Sharing",
    desc: "Send tickets securely to friends via email or phone number with real-time transfer logs.",
    icon: Share2,
    color: "from-purple-500 to-pink-500",
  },
];

const QR_PATTERN = [
  true, false, true, true, false, true,
  false, true, false, false, true, false,
  true, true, true, false, false, true,
  false, false, true, true, true, false,
  true, false, false, true, false, true,
  true, true, false, false, true, false
];

export default function AttendeeSection() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50/20 overflow-hidden">

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-violet-200/20 to-purple-200/20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[20%] left-[5%] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-indigo-200/15 to-blue-200/15 blur-[140px] animate-pulse delay-1000" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-200/5 blur-[150px]" />
        
        {/* Subtle grid pattern */}
        <div className={`absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(0,0,0,0.02)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")] opacity-50`} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* LEFT: Ticket Mock - Enhanced */}
        <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            whileHover={{ y: -8, rotate: 1 }}
            className="w-full max-w-[400px]"
          >
            <div className="relative bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-950 text-white rounded-[32px] p-6 border border-white/10 shadow-2xl shadow-violet-950/40 overflow-hidden">
              
              {/* Animated gradient border glow */}
              <div className="absolute inset-0 rounded-[32px] p-[1px] bg-gradient-to-r from-violet-500/30 via-purple-500/30 to-pink-500/30 opacity-50" />
              
              {/* Background glow */}
              <div className="absolute -top-[30%] -left-[30%] w-72 h-72 bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-[100px] animate-pulse" />
              <div className="absolute -bottom-[30%] -right-[30%] w-72 h-72 bg-gradient-to-l from-indigo-500/20 to-blue-500/20 blur-[100px] animate-pulse delay-1000" />
              
              {/* Decorative dots */}
              <div className="absolute top-4 right-4 flex gap-1 opacity-30">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-violet-400" />
                ))}
              </div>

              {/* Header */}
              <div className="flex justify-between items-center border-b border-white/5 pb-4 relative">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                    <Ticket className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-violet-200">
                    TIKKETY PASS
                  </span>
                </div>
                <span className="flex items-center gap-1 text-[10px] bg-gradient-to-r from-emerald-500/30 to-teal-500/30 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
                  <Sparkles className="w-2.5 h-2.5" />
                  VERIFIED
                </span>
              </div>

              {/* Event Info */}
              <div className="mt-5 relative">
                <p className="text-[10px] text-violet-300/60 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  Live Event
                </p>
                <h3 className="text-xl font-bold mt-1.5 text-white">
                  Midnight Groove Festival
                </h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <p className="text-xs text-zinc-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-violet-400" />
                    Lagos, Nigeria
                  </p>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <p className="text-xs text-zinc-400 flex items-center gap-1">
                    <Users className="w-3 h-3 text-violet-400" />
                    2,300 attending
                  </p>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-white/5 relative">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-violet-400/60" />
                  <div>
                    <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Date</p>
                    <p className="text-xs font-semibold text-zinc-200">Dec 12, 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-violet-400/60" />
                  <div>
                    <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Time</p>
                    <p className="text-xs font-semibold text-zinc-200">10:00 PM</p>
                  </div>
                </div>
              </div>

              {/* QR Code - Enhanced */}
              <div className="mt-5 bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 rounded-2xl p-4 flex justify-center border border-white/5 backdrop-blur-sm relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 to-purple-500/5" />
                <div className="relative">
                  <div className="grid grid-cols-6 gap-1.5 w-36 h-36 bg-white p-2.5 rounded-xl shadow-xl">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm transition-all duration-300 ${
                          QR_PATTERN[i] ? "bg-zinc-900" : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>
                  {/* QR corner accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-violet-500 rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-violet-500 rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-violet-500 rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-violet-500 rounded-br-lg" />
                </div>
              </div>

              <p className="text-[10px] text-center text-zinc-500 mt-3 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-violet-400" />
                Dynamic QR • Auto-refresh security token
              </p>

              {/* Bottom status */}
              <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
                <span className="text-[8px] text-zinc-500 font-mono">#TKT-2026-001</span>
                <span className="flex items-center gap-1 text-[8px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  active
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Content - Enhanced */}
        <div className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200/50 text-violet-700 font-bold uppercase tracking-wider text-[11px] w-fit mb-5"
          >
            <Smartphone className="w-3.5 h-3.5" />
            For Attendees
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]"
          >
            From Discovery to Entry —
            <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Seamlessly
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-500 text-base md:text-lg font-medium mt-4 leading-relaxed"
          >
            Tikkety removes the friction from attending events. No fake tickets, no paper passes, 
            and no entry stress — just a fully digital, verified experience from purchase to entry.
          </motion.p>

          {/* MVP FLOW - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 space-y-5"
          >
            {STEPS.map((step, idx) => {
              const Icon = step.icon;

              return (
                <div key={idx} className="group flex gap-4 items-start p-3 rounded-2xl hover:bg-white/60 hover:shadow-md transition-all duration-300 border border-transparent hover:border-violet-100/50">
                  <div className={`flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${step.color} shadow-lg shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-zinc-900 group-hover:text-violet-700 transition-colors">
                        {step.title}
                      </h4>
                      <span className="text-[9px] font-bold text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded">
                        0{idx + 1}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 mt-0.5 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200/50">
              <Zap className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-700">Instant Check-in</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-200/50">
              <ShieldCheck className="w-3.5 h-3.5 text-violet-500" />
              <span className="text-xs font-semibold text-violet-700">Fraud-Proof</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200/50">
              <Share2 className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-xs font-semibold text-blue-700">Share with Friends</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}