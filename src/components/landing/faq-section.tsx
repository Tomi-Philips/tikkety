"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles, Zap, MessageCircle, CheckCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "What fees does Tikkety charge per ticket?",
    answer:
      "Tikkety uses a low, transparent flat percentage fee (under 3%) per ticket sold. There are no hidden service charges at checkout—what organizers set is what buyers see, ensuring full pricing clarity.",
    tag: "Pricing",
  },
  {
    question: "How do payouts work for event organizers?",
    answer:
      "Once your event is live and tickets start selling, payouts are automatically processed and transferred directly to your connected bank account. No waiting weeks after your event—funds are released as sales are confirmed.",
    tag: "Payments",
  },
  {
    question: "How do I create and manage an event on Tikkety?",
    answer:
      "Organizers can create events in minutes by setting event details, ticket tiers (VIP, General, Early Bird), capacity limits, and pricing rules—all from a single streamlined dashboard designed for fast launch.",
    tag: "Setup",
  },
  {
    question: "How are tickets verified at the event gate?",
    answer:
      "Every ticket is issued as a secure, dynamic QR pass linked to the buyer. At entry, gate staff use a mobile browser scanner to instantly validate and check-in attendees in real time.",
    tag: "Security",
  },
  {
    question: "Can I control ticket types and availability?",
    answer:
      "Yes. Organizers can fully configure ticket tiers, set quantity limits, schedule releases, and apply discount codes to manage demand and event access strategically.",
    tag: "Management",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-28 bg-gradient-to-b from-slate-50 via-white to-indigo-50/30 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-200/20 to-indigo-200/20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[20%] left-[5%] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-purple-200/15 to-pink-200/15 blur-[140px] animate-pulse delay-1000" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-200/5 blur-[150px]" />
        
        {/* Subtle grid pattern */}
        <div className={`absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(0,0,0,0.02)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")] opacity-50`} />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        
        {/* Section Header - Enhanced */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 text-blue-700 font-bold uppercase tracking-wider text-[11px] mb-5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            FAQ
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]"
          >
            Everything You Need
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              to Know Before Launch
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-500 text-base font-medium mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            Built around the core MVP: create events, sell tickets, manage entry, and receive payouts seamlessly.
          </motion.p>
        </div>

        {/* Accordion - Enhanced */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`group bg-white/80 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? "border-blue-300/50 shadow-xl shadow-blue-500/10" 
                    : "border-zinc-200/60 hover:border-zinc-300/80 hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Question number */}
                    <span className="hidden sm:flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600 text-[10px] font-bold shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isOpen 
                            ? "bg-blue-100 text-blue-700" 
                            : "bg-zinc-100 text-zinc-500"
                        } transition-colors`}>
                          {faq.tag}
                        </span>
                      </div>
                      <span className={`text-sm md:text-base font-semibold leading-tight transition-colors ${
                        isOpen ? "text-blue-700" : "text-zinc-900 group-hover:text-zinc-800"
                      }`}>
                        {faq.question}
                      </span>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 shrink-0 transition-all duration-300 ${
                    isOpen ? "text-blue-500" : "text-zinc-400"
                  }`}>
                    <span className="text-[10px] font-medium hidden sm:inline">
                      {isOpen ? "Close" : "Open"}
                    </span>
                    <div className={`p-1 rounded-full transition-all duration-300 ${
                      isOpen ? "bg-blue-100" : "group-hover:bg-zinc-100"
                    }`}>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-2 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100/80">
                        <div className="flex gap-3">
                          <div className="hidden sm:block w-7 shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                              <p>{faq.answer}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-zinc-700">
              Still have questions?
            </span>
            <span className="w-px h-5 bg-blue-200" />
            <button className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group">
              <span>Contact support</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}