"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "What fees does Tikkety charge per ticket?",
    answer:
      "Tikkety uses a low, transparent flat percentage fee (under 3%) per ticket sold. There are no hidden service charges at checkout—what organizers set is what buyers see, ensuring full pricing clarity.",
  },
  {
    question: "How do payouts work for event organizers?",
    answer:
      "Once your event is live and tickets start selling, payouts are automatically processed and transferred directly to your connected bank account. No waiting weeks after your event—funds are released as sales are confirmed.",
  },
  {
    question: "How do I create and manage an event on Tikkety?",
    answer:
      "Organizers can create events in minutes by setting event details, ticket tiers (VIP, General, Early Bird), capacity limits, and pricing rules—all from a single streamlined dashboard designed for fast launch.",
  },
  {
    question: "How are tickets verified at the event gate?",
    answer:
      "Every ticket is issued as a secure, dynamic QR pass linked to the buyer. At entry, gate staff use a mobile browser scanner to instantly validate and check-in attendees in real time.",
  },
  {
    question: "Can I control ticket types and availability?",
    answer:
      "Yes. Organizers can fully configure ticket tiers, set quantity limits, schedule releases, and apply discount codes to manage demand and event access strategically.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative py-24 bg-zinc-50 border-t border-zinc-200 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[40%] right-[-15%] w-[400px] h-[400px] rounded-full bg-blue-100/20 blur-[130px] z-0" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-blue-600 font-bold uppercase tracking-wider text-xl"
          >
            FAQ
          </motion.span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 mt-3 tracking-tight">
            Everything You Need to Know Before Launch
          </h2>

          <p className="text-zinc-500 text-base font-medium mt-4">
            Built around the core MVP: create events, sell tickets, manage entry, and receive payouts seamlessly.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-zinc-300 transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4 font-bold text-zinc-900"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-zinc-400 shrink-0" />
                    <span className="text-sm md:text-base leading-tight">
                      {faq.question}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-sm text-zinc-500 font-medium leading-relaxed border-t border-zinc-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}