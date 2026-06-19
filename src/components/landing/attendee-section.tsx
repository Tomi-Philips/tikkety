"use client";

import { Ticket, Compass, ShieldCheck, Share2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const STEPS = [
  {
    title: "Discover Events Instantly",
    desc: "Browse personalized events based on your interests — concerts, parties, seminars, campus events, and more.",
    icon: Compass,
  },
  {
    title: "Secure Ticket Purchase",
    desc: "Buy tickets instantly with secure checkout and receive a verified digital pass tied directly to your identity.",
    icon: Ticket,
  },
  {
    title: "Instant QR Ticket Generation",
    desc: "Your ticket is automatically generated as a secure QR code stored in your mobile wallet.",
    icon: ShieldCheck,
  },
  {
    title: "Seamless Event Entry",
    desc: "Scan your QR code at the gate for instant validation — no printing, no fraud, no delays.",
    icon: CheckCircle,
  },
];

const FEATURES = [
  {
    title: "Personalized Event Discovery",
    desc: "Find events tailored to your interests, location, and activity history.",
    icon: Compass,
  },
  {
    title: "Fraud-Proof Ticketing",
    desc: "Each ticket is cryptographically verified and uniquely tied to the buyer.",
    icon: ShieldCheck,
  },
  {
    title: "Instant Ticket Sharing",
    desc: "Send tickets securely to friends via email or phone number with real-time transfer logs.",
    icon: Share2,
  },
];

export default function AttendeeSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-violet-100/30 blur-[120px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center">

        {/* LEFT: Ticket Mock */}
        <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-[380px] bg-zinc-950 text-white rounded-[32px] p-6 border border-zinc-800 shadow-2xl relative overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute top-[-30%] left-[-30%] w-72 h-72 bg-violet-500/10 blur-[80px]" />

            {/* Header */}
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-bold tracking-widest">
                  TIKKETY PASS
                </span>
              </div>
              <span className="text-[10px] bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full border border-violet-400/20">
                VERIFIED
              </span>
            </div>

            {/* Event Info */}
            <div className="mt-6">
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest">
                Live Event
              </p>
              <h3 className="text-lg font-bold mt-1">
                Midnight Groove Festival
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Campus Events • Lagos, Nigeria
              </p>
            </div>

            {/* Ticket Details */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-zinc-800">
              <div>
                <p className="text-[10px] text-zinc-400">DATE</p>
                <p className="text-xs font-semibold">Dec 12, 2026</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-400">TIME</p>
                <p className="text-xs font-semibold">10:00 PM</p>
              </div>
            </div>

            {/* QR */}
            <div className="mt-6 bg-zinc-900 rounded-2xl p-4 flex justify-center">
              <div className="grid grid-cols-6 gap-1 w-32 h-32 bg-white p-2 rounded-xl">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-sm ${
                      Math.random() > 0.5 ? "bg-black" : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-[10px] text-center text-zinc-500 mt-4">
              Dynamic QR • Auto-refresh security token
            </p>
          </motion.div>
        </div>

        {/* RIGHT: Content */}
        <div className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2">

          <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">
            For Attendees
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 mt-3 tracking-tight">
            From Discovery to Entry — Seamlessly
          </h2>

          <p className="text-zinc-500 mt-4 text-base md:text-lg leading-relaxed">
            Tikkety removes the friction from attending events. No fake tickets, no paper passes, and no entry stress — just a fully digital, verified experience from purchase to entry.
          </p>

          {/* MVP FLOW */}
          <div className="mt-10 space-y-6">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;

              return (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-xl bg-violet-50 text-violet-600 border border-violet-100">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h4 className="font-bold text-zinc-900">
                      {step.title}
                    </h4>
                    <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}