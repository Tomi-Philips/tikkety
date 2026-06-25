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
    <section id="faq" className="py-20 bg-white border-t border-gray-100">
      <div className="w-full max-w-3xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium tracking-wider uppercase mb-4">
            <MessageCircle className="w-3.5 h-3.5" />
            FAQ
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-[1.15] mb-3">
            Everything You Need
            <span className="block text-blue-700 mt-1">
              to Know Before Launch
            </span>
          </h2>

          <p className="text-gray-500 text-base leading-relaxed max-w-xl mx-auto">
            Built around the core MVP: create events, sell tickets, manage entry, and receive payouts seamlessly.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-2.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className={`bg-white border rounded-lg overflow-hidden transition-colors ${
                  isOpen 
                    ? "border-blue-400" 
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-4 text-left gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded border ${
                      isOpen 
                        ? "bg-blue-600 text-white border-blue-600" 
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    } transition-colors shrink-0`}>
                      {faq.tag}
                    </span>
                    
                    <span className={`text-sm font-medium leading-tight transition-colors ${
                      isOpen ? "text-blue-700" : "text-gray-700"
                    }`}>
                      {faq.question}
                    </span>
                  </div>

                  <div className="shrink-0">
                    <ChevronDown
                      className={`w-4 h-4 text-blue-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 text-sm text-gray-500 leading-relaxed border-t border-gray-100">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        {/* <div className="mt-10 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-3 bg-blue-50 border border-blue-200 rounded-full">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">
              Still have questions?
            </span>
            <span className="w-px h-4 bg-blue-200" />
            <button className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors group">
              <span>Contact support</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}