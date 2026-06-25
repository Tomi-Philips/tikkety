"use client";

import { CheckCircle2, Megaphone, Rocket, Sparkles, Zap, ArrowRight, Calendar, Ticket, Users } from "lucide-react";
import { motion } from "framer-motion";

const STEPS = [
  {
    step: "01",
    icon: Rocket,
    title: "Create & Customize Event",
    description:
      "Enter your venue parameters, configure pricing tiers (VIP, general access), and set up custom rules in less than five minutes.",
    tag: "Setup",
  },
  {
    step: "02",
    icon: Megaphone,
    title: "Generate & Sell Secure Tickets",
    description:
      "Tikkety automatically generates secure, trackable tickets with QR codes. Share your event link and start selling instantly with built-in payment processing.",
    tag: "Launch",
  },
  {
    step: "03",
    icon: CheckCircle2,
    title: "Scan QR Passes & Gate Check-in",
    description:
      "Use our browser scanner tool to verify attendees dynamically at the gate. Track real-time sales and stats post-event.",
    tag: "Execute",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 bg-white">
      <div className="w-full max-w-6xl mx-auto px-6">
        
        {/* Section Header - Clean & Minimal */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium tracking-wider uppercase mb-4">
            <Zap className="w-3.5 h-3.5" />
            How it Works
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-[1.15] mb-4">
            Go from Idea to Live Event
            <span className="block text-gray-700 mt-1">
              in 3 Simple Steps
            </span>
          </h2>

          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            An all-in-one experience built specifically to remove complexity. Scale your promotions, 
            sell securely, and manage gates.
          </p>
        </div>

        {/* Steps - Clean Card Design */}
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex flex-col p-8 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors"
              >
                {/* Step Number - Clean Typography */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
                      <Icon className="w-5 h-5 text-gray-700" />
                    </div>
                    <span className="text-sm font-mono font-medium text-gray-400">
                      {step.step}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2.5 py-1 rounded border border-gray-200">
                    {step.tag}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                
                <p className="text-sm text-gray-500 leading-relaxed flex-grow">
                  {step.description}
                </p>

                {/* Subtle Learn More - No Gradient */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group">
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Stats - Clean & Minimal */}
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
            <Calendar className="w-4 h-4 text-gray-600" />
            <div>
              <p className="text-xs font-medium text-gray-900">Setup</p>
              <p className="text-[11px] text-gray-500">&lt; 5 minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
            <Ticket className="w-4 h-4 text-gray-600" />
            <div>
              <p className="text-xs font-medium text-gray-900">Sell</p>
              <p className="text-[11px] text-gray-500">Instant checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
            <Users className="w-4 h-4 text-gray-600" />
            <div>
              <p className="text-xs font-medium text-gray-900">Check-in</p>
              <p className="text-[11px] text-gray-500">QR scan & go</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}