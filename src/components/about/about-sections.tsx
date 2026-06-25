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
    <section className="relative pt-36 pb-20 overflow-hidden bg-white">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium tracking-wider uppercase mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Who We Are
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]"
        >
          Connecting the Entire{" "}
          <span className="block sm:inline text-blue-700">
            Event Ecosystem
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-5 text-base sm:text-lg md:text-xl text-gray-500 leading-relaxed max-w-3xl mx-auto"
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
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { label: "Anti-Scalp", value: "100%", desc: "Secure cryptographed QR tickets" },
            { label: "Organizers Served", value: "Seamless", desc: "Fast payouts & tools" },
            { label: "Event Vendors", value: "Verified", desc: "Direct gig booking" },
            { label: "Community", value: "Unified", desc: "Attendees & creators link" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-blue-300 transition-colors"
            >
              <div className="text-2xl font-bold text-blue-700">
                {item.value}
              </div>
              <div className="text-xs font-semibold text-gray-800 mt-1 uppercase tracking-wide">
                {item.label}
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5 leading-tight">
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
    <section className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 hover:border-blue-300 transition-colors"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 mb-5">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Our Mission
            </h2>
            <p className="mt-4 text-gray-500 text-sm md:text-base leading-relaxed">
              To empower event organizers, delight attendees, and uplift service vendors by providing a secure, 
              scalable, and high-fidelity ecosystem. We are eliminating the administrative overhead, booking friction, 
              and ticketing fraud that hold back African creative entrepreneurship and cultural community building.
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 hover:border-blue-300 transition-colors"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 mb-5">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Our Vision
            </h2>
            <p className="mt-4 text-gray-500 text-sm md:text-base leading-relaxed">
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
    title: "Security & Trust First",
    desc: "We stand against scalpers. By designing dynamic QR codes and secure check-ins, we build an environment of absolute trust.",
  },
  {
    icon: Layers,
    title: "Ecosystem Integrity",
    desc: "We don't just sell tickets. We connect event planners directly to local vendors (DJs, sound engineers, MCs) to foster full ecosystem growth.",
  },
  {
    icon: Zap,
    title: "Radical Simplicity",
    desc: "High technology shouldn't feel complex. Tikkety is built with visual elegance, smooth workflows, and lightning-fast operations.",
  },
  {
    icon: Users,
    title: "Community Growth",
    desc: "We believe in shared value. Our Ambassador network and vendor portfolios ensure event budgets directly enrich local creators.",
  },
];

export function CoreValues() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-blue-600 font-semibold uppercase tracking-wider text-xs">
            What Drives Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
            Our Core Values
          </h2>
          <p className="text-gray-500 mt-3 text-base leading-relaxed">
            These guiding principles shape how we build, interact, and envision the future of ticketing.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">
                  {val.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
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
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-blue-600 font-semibold uppercase tracking-wider text-xs">
            Who We Serve
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
            The Three Pillars of Tikkety
          </h2>
          <p className="text-gray-500 mt-3 text-base leading-relaxed">
            By connecting these three key segments, we create a circular event economy that builds trust and drives growth.
          </p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {GROUPS.map((group, idx) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-blue-600 text-white mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {group.title}
                </h3>
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mt-0.5">
                  {group.subtitle}
                </p>
                
                {/* Perks list */}
                <ul className="mt-4 space-y-2.5">
                  {group.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="flex gap-2.5 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
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
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
          Ready to Experience the{" "}
          <span className="block sm:inline text-blue-700">
            Future of Events?
          </span>
        </h2>
        <p className="text-gray-500 mt-4 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Whether you want to launch your next big concert, attend a local showcase, 
          or offer your professional vendor services — Tikkety is built for you.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/waitlist"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            <span>Join the Waitlist</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/ambassadors"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-gray-200 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            Become an Ambassador
          </Link>
        </div>
      </div>
    </section>
  );
}