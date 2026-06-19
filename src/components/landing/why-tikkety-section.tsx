"use client";

import { Ticket,Layers, Lock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const VALUES = [
  {
    icon: Ticket,
    iconColor: "text-blue-600 bg-blue-50 border-blue-100",
    title: "End-to-End Ticketing System",
    description:
      "Create events, define ticket types, set pricing, and instantly generate secure digital tickets — all from one unified workflow.",
  },
  {
    icon: Layers,
    iconColor: "text-blue-600 bg-blue-50 border-blue-100",
    title: "Unified Ecosystem",
    description:
      "Go from creating tickets to booking vetted local service vendors (DJs, sound systems, MCs, catering) in a single workflow.",
  },
  {
    icon: Lock,
    iconColor: "text-indigo-600 bg-indigo-50 border-indigo-100",
    title: "Vetted Security & QR Check-ins",
    description:
      "Stop ticket scalping. Enjoy fully dynamic, cryptographically secure QR tickets scan-ready through the mobile-friendly check-in.",
  },
  {
    icon: Lock,
    iconColor: "text-rose-600 bg-rose-50 border-rose-100",
    title: "Secure QR Ticket Validation",
    description:
      "Every ticket is cryptographically secured and ready for fast QR-based check-ins, reducing fraud and manual verification delays.",
  },
  {
    icon: Sparkles,
    iconColor: "text-violet-600 bg-violet-50 border-violet-100",
    title: "Fast Payout Processing",
    description:
      "Event revenue is processed efficiently so organizers can access earnings quickly after ticket sales complete.",
  },
  {
    icon: Layers,
    iconColor: "text-zinc-600 bg-zinc-50 border-zinc-200",
    title: "Future: Vendor Marketplace",
    description:
      "Soon, organizers will be able to hire DJs, photographers, MCs, and vendors directly inside the platform — extending the ecosystem beyond ticketing.",
  },
];

export default function WhyTikketySection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] rounded-full bg-blue-50/40 blur-[120px]" />
      <div className="absolute bottom-[10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-indigo-50/50 blur-[100px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-blue-600 font-bold uppercase tracking-wider text-xs"
          >
            The Solution
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-zinc-950 mt-3 tracking-tight"
          >
            Introducing Tikkety Ecosystem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-500 text-base md:text-lg font-medium mt-4 max-w-2xl mx-auto"
          >
            We've designed a unified platform catering to organizers, attendees, and service providers alike, removing administrative overhead entirely.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div
                  className={`flex items-center justify-center p-3 rounded-2xl border shrink-0 ${val.iconColor}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
                    {val.title}
                  </h3>
                  <p className="text-zinc-500 text-sm font-medium mt-2 leading-relaxed">
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
