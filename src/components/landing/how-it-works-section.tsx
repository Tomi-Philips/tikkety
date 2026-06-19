"use client";

import { CheckCircle2, Megaphone, Rocket, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const STEPS = [
  {
    step: "01",
    icon: Rocket,
    iconColor: "text-blue-600 bg-blue-50 border-blue-100",
    title: "Create & Customize Event",
    description:
      "Enter your venue parameters, configure pricing tiers (VIP, general access), and set up custom rules in less than five minutes.",
  },
  {
    step: "02",
    icon: Megaphone,
    iconColor: "text-indigo-600 bg-indigo-50 border-indigo-100",
    title: "Generate & Sell Secure Tickets",
    description:
      "Tikkety automatically generates secure, trackable tickets with QR codes. Share your event link and start selling instantly with built-in payment processing.",
  },
  {
    step: "03",
    icon: CheckCircle2,
    iconColor: "text-violet-600 bg-violet-50 border-violet-100",
    title: "Scan QR Passes & Gate Check-in",
    description:
      "Use our browser scanner tool to verify attendees dynamically at the gate. Track real-time sales and stats post-event.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background visual cues */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-50/40 blur-[120px] z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-blue-600 font-bold uppercase tracking-wider text-xs"
          >
            How it Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-zinc-950 mt-3 tracking-tight"
          >
            Go from Idea to Live Event in 3 Steps
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-500 text-base md:text-lg font-medium mt-4 max-w-2xl mx-auto"
          >
            An all-in-one experience built specifically to remove complexity. Scale your promotions, sell securely, and manage gates.
          </motion.p>
        </div>

        {/* Steps display */}
        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-0.5 bg-dashed border-t border-dashed border-zinc-200 z-0" />

          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                {/* Step badge / Icon wrapper */}
                <div className="relative">
                  <div
                    className={`w-16 h-16 rounded-2xl border flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 ${step.iconColor}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-950 text-[10px] font-black text-white border-2 border-white shadow">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 mt-6 tracking-tight px-4">
                  {step.title}
                </h3>
                <p className="text-zinc-500 text-sm font-medium mt-3 leading-relaxed px-2">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
