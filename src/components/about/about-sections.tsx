"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Shield,
  Users,
  Ticket,
  Store,
  ArrowRight,
  Target,
  Eye,
  Lock,
  Layers,
  Zap,
  CheckCircle2,
} from "lucide-react";

// ── HERO SECTION ──
export function AboutHero() {
  return (
    <section className="relative pt-36 pb-20 overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-slate-50">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-200/30 blur-[130px] animate-pulse" />
        <div className="absolute bottom-[5%] right-[-5%] w-[450px] h-[450px] rounded-full bg-blue-200/20 blur-[120px] animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200/50 text-indigo-700 font-extrabold uppercase tracking-widest text-[11px] mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-spin-slow" />
          Who We Are
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]"
        >
          Connecting the Entire{" "}
          <span className="block sm:inline bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Event Ecosystem
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-zinc-500 font-medium leading-relaxed max-w-3xl mx-auto"
        >
          Tikkety is redefining how experiences are discovered, tickets are sold,
          and events are serviced in Africa. We are building the first unified platform 
          where event organizers, attendees, and local service vendors seamlessly connect 
          without the friction of scaling, scalping, or administrative silos.
        </motion.p>

        {/* Quick Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { label: "Anti-Scalp", value: "100%", desc: "Secure cryptographed QR tickets" },
            { label: "Organizers Served", value: "Seamless", desc: "Fast payouts & tools" },
            { label: "Event Vendors", value: "Verified", desc: "Direct gig booking" },
            { label: "Community", value: "Unified", desc: "Attendees & creators link" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/70 backdrop-blur-sm border border-zinc-200/50 rounded-2xl p-5 text-center shadow-md shadow-zinc-100/50 hover:border-indigo-200/50 hover:shadow-indigo-50/50 transition-all duration-300 group"
            >
              <div className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                {item.value}
              </div>
              <div className="text-xs font-bold text-zinc-800 mt-1 uppercase tracking-wider">
                {item.label}
              </div>
              <div className="text-[11px] text-zinc-400 mt-0.5 leading-tight font-medium">
                {item.desc}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── MISSION & VISION SECTION ──
export function MissionVision() {
  return (
    <section className="py-20 bg-slate-50/50 border-y border-zinc-100/80 relative overflow-hidden">
      {/* Light side glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-indigo-100/30 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group bg-white border border-zinc-200/60 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-zinc-100/50 hover:border-indigo-200/50 hover:shadow-2xl hover:shadow-indigo-50/30 transition-all duration-300"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-7 h-7" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight">
              Our Mission
            </h2>
            <p className="mt-4 text-zinc-500 text-sm md:text-base font-medium leading-relaxed">
              To empower event organizers, delight attendees, and uplift service vendors by providing a secure, 
              scalable, and high-fidelity ecosystem. We are eliminating the administrative overhead, booking friction, 
              and ticketing fraud that hold back African creative entrepreneurship and cultural community building.
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group bg-white border border-zinc-200/60 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-zinc-100/50 hover:border-blue-200/50 hover:shadow-2xl hover:shadow-blue-50/30 transition-all duration-300"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-7 h-7" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight">
              Our Vision
            </h2>
            <p className="mt-4 text-zinc-500 text-sm md:text-base font-medium leading-relaxed">
              To be the default infrastructure for live experiences across Africa. We envision a continent where event planning is 
              completely fluid, tickets are strictly fraudless, local talent and micro-vendors gain continuous employment, 
              and every attendee enjoys absolute ease of entry to the moments that connect them.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── CORE VALUES SECTION ──
const VALUES = [
  {
    icon: Shield,
    color: "text-indigo-600 bg-indigo-50/80 border-indigo-100",
    title: "Security & Trust First",
    desc: "We stand against scalpers. By designing dynamic QR codes and secure check-ins, we build an environment of absolute trust.",
  },
  {
    icon: Layers,
    color: "text-purple-600 bg-purple-50/80 border-purple-100",
    title: "Ecosystem Integrity",
    desc: "We don't just sell tickets. We connect event planners directly to local vendors (DJs, sound engineers, MCs) to foster full ecosystem growth.",
  },
  {
    icon: Zap,
    color: "text-amber-600 bg-amber-50/80 border-amber-100",
    title: "Radical Simplicity",
    desc: "High technology shouldn't feel complex. Tikkety is built with visual elegance, smooth workflows, and lightning-fast operations.",
  },
  {
    icon: Users,
    color: "text-emerald-600 bg-emerald-50/80 border-emerald-100",
    title: "Community Growth",
    desc: "We believe in shared value. Our Ambassador network and vendor portfolios ensure event budgets directly enrich local creators.",
  },
];

export function CoreValues() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-purple-50 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-indigo-600 font-extrabold uppercase tracking-wider text-xs">
            What Drives Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 mt-3 tracking-tight">
            Our Core Values
          </h2>
          <p className="text-zinc-500 mt-4 text-base font-medium leading-relaxed">
            These guiding principles shape how we build, interact, and envision the future of ticketing.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white border border-zinc-200/60 rounded-3xl p-7 hover:shadow-xl hover:border-indigo-200/50 hover:-translate-y-0.5 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Subtle gradient hover card highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-indigo-50/20 group-hover:from-indigo-50/20 group-hover:to-indigo-50/40 transition-all duration-500 pointer-events-none" />
                
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl border ${val.color} mb-5 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 tracking-tight group-hover:text-indigo-700 transition-colors">
                  {val.title}
                </h3>
                <p className="text-zinc-500 text-sm font-medium mt-3 leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── ECOSYSTEM SECTION (WHO WE SERVE) ──
const GROUPS = [
  {
    icon: Users,
    gradient: "from-indigo-500 to-indigo-700 shadow-indigo-500/20",
    title: "Event Organizers",
    subtitle: "Absolute control, zero stress.",
    perks: [
      "Define tier pricing and instant ticket generation.",
      "Track live ticket sales dashboard in real-time.",
      "Access fast, secure payout structures.",
      "Direct search & booking of verified service vendors.",
    ],
  },
  {
    icon: Ticket,
    gradient: "from-blue-500 to-blue-700 shadow-blue-500/20",
    title: "Event Attendees",
    subtitle: "Safe, fraudless access to experiences.",
    perks: [
      "Dynamic, non-scalpable QR tickets.",
      "Instant checkout and verification via email.",
      "Effortless ticket retrieval on our web platform.",
      "Discover related event vendors (DJs, hosts).",
    ],
  },
  {
    icon: Store,
    gradient: "from-purple-500 to-purple-700 shadow-purple-500/20",
    title: "Service Vendors",
    subtitle: "Showcase portfolio & claim gigs.",
    perks: [
      "Premium portfolio profile to list event services.",
      "Reach targeted local event organizers.",
      "Direct gig booking workflow and secure payments.",
      "Expand rating and references in the event market.",
    ],
  },
];

export function Ecosystem() {
  return (
    <section className="py-24 bg-zinc-50 border-t border-zinc-100 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-blue-100/20 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-indigo-600 font-extrabold uppercase tracking-wider text-xs">
            Who We Serve
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 mt-3 tracking-tight">
            The Three Pillars of Tikkety
          </h2>
          <p className="text-zinc-500 mt-4 text-base font-medium leading-relaxed">
            By connecting these three key segments, we create a circular event economy that builds trust and drives growth.
          </p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {GROUPS.map((group, idx) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-zinc-200/60 rounded-[2rem] p-8 shadow-xl shadow-zinc-100/50 hover:shadow-2xl hover:border-indigo-200/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`inline-flex items-center justify-center p-3.5 rounded-2xl bg-gradient-to-br ${group.gradient} shadow-lg text-white mb-6`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-zinc-900 tracking-tight">
                    {group.title}
                  </h3>
                  <p className="text-indigo-600 text-xs font-bold uppercase mt-1 tracking-wider">
                    {group.subtitle}
                  </p>
                  
                  {/* Perks list */}
                  <ul className="mt-6 space-y-3">
                    {group.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex gap-3 text-sm text-zinc-600 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── CTA SECTION ──
export function AboutCTA() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-50/70 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
          Ready to Experience the{" "}
          <span className="block sm:inline bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Future of Events?
          </span>
        </h2>
        <p className="text-zinc-500 mt-4 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          Whether you want to launch your next big concert, attend a local showcase, 
          or offer your professional vendor services — Tikkety is built for you.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/waitlist"
            className="group relative inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-4 text-white font-bold shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/35 hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 overflow-hidden"
          >
            {/* Shimmer animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative z-10">Join the Waitlist</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/ambassadors"
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-zinc-200 bg-white px-8 py-4 font-bold text-zinc-800 hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-200"
          >
            Become an Ambassador
          </Link>
        </div>
      </div>
    </section>
  );
}
