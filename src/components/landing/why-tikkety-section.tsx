"use client";

import { Ticket, Layers, Lock, Sparkles, Shield, Users, DollarSign, CheckCircle, ArrowRight, Zap, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const VALUES = [
  {
    icon: Ticket,
    title: "End-to-End Ticketing System",
    description:
      "Create events, define ticket types, set pricing, and instantly generate secure digital tickets — all from one unified workflow.",
    tag: "Core Feature",
  },
  {
    icon: Layers,
    title: "Unified Ecosystem",
    description:
      "Connect event organizers with vetted local service vendors who showcase their services and portfolios on Tikkety.",
    tag: "Ecosystem",
  },
  {
    icon: Shield,
    title: "Vetted Security & QR Check-ins",
    description:
      "Stop ticket scalping. Enjoy fully dynamic, cryptographically secure QR tickets scan-ready through the mobile-friendly check-in.",
    tag: "Security",
  },
  {
    icon: Lock,
    title: "Secure QR Ticket Validation",
    description:
      "Every ticket is cryptographically secured and ready for fast QR-based check-ins, reducing fraud and manual verification delays.",
    tag: "Validation",
  },
  {
    icon: DollarSign,
    title: "Fast Payout Processing",
    description:
      "Event revenue is processed efficiently so organizers can access earnings quickly after ticket sales complete.",
    tag: "Payments",
  },
  {
    icon: Users,
    title: "Future: Direct Vendor Hiring",
    description:
      "Soon, organizers will be able to hire and book DJs, photographers, MCs, and vendors directly inside the platform — extending beyond online profiles.",
    tag: "Coming Soon",
  },
];

export default function WhyTikketySection() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            The Solution
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-[1.15] mb-3">
            Introducing
            <span className="block text-blue-700 mt-1">
              Tikkety Ecosystem
            </span>
          </h2>

          <p className="text-gray-500 text-base leading-relaxed max-w-xl mx-auto">
            We've designed a unified platform catering to organizers, attendees, and service providers alike, 
            removing administrative overhead entirely.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            const isComingSoon = val.tag === "Coming Soon";
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors"
              >
                {/* Icon */}
                <div className="flex items-start justify-between">
                  <div className="p-2.5 bg-blue-50 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-semibold border ${
                    isComingSoon 
                      ? "bg-amber-50 text-amber-600 border-amber-200" 
                      : "bg-blue-50 text-blue-600 border-blue-200"
                  }`}>
                    {val.tag}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-base font-semibold text-gray-900">
                    {val.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
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