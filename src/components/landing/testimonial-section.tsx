"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "Tikkety completely changed how I manage campus events. I can create ticket tiers, track sales in real time, and manage attendees without juggling multiple tools.",
    name: "Ayo Martins",
    role: "Campus Event Organizer",
    org: "University Events Team",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-100",
    avatar: "A",
    avatarBg: "bg-blue-600",
  },
  {
    quote:
      "As a student ambassador, I needed a simple way to promote events and track attendance. Tikkety makes it effortless to share event links and monitor engagement.",
    name: "Blessing Okoro",
    role: "Community Ambassador",
    org: "Early Access Program",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-100",
    avatar: "B",
    avatarBg: "bg-indigo-600",
  },
  {
    quote:
      "Buying tickets was seamless. I stored my pass on my phone and got into the event instantly with a QR scan—no stress, no delays.",
    name: "David Chen",
    role: "Event Attendee",
    org: "Live Event User",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
    avatar: "D",
    avatarBg: "bg-emerald-600",
  },
];

export default function TestimonialSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[20%] left-[-15%] w-[450px] h-[450px] rounded-full bg-blue-50/40 blur-[130px]" />
      <div className="absolute bottom-[20%] right-[-15%] w-[450px] h-[450px] rounded-full bg-indigo-50/40 blur-[130px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-blue-600 font-bold uppercase tracking-wider text-xs"
          >
            Early Validation
          </motion.span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 mt-3 tracking-tight">
            Built for Organizers. Trusted by Early Users.
          </h2>

          <p className="text-zinc-500 text-base md:text-lg font-medium mt-4 max-w-2xl mx-auto">
            From campus organizers to early ambassadors and attendees, Tikkety is already shaping how events are created and experienced.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative bg-white border border-zinc-200/80 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-14 h-14 text-zinc-900 opacity-5 group-hover:opacity-10 transition-opacity" />

              {/* Rating */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-zinc-700 text-sm md:text-base font-medium leading-relaxed italic">
                “{test.quote}”
              </p>

              {/* User */}
              <div className="flex gap-3 items-center mt-8 pt-6 border-t border-zinc-100">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black ${test.avatarBg}`}
                >
                  {test.avatar}
                </div>

                <div>
                  <h4 className="font-bold text-zinc-900 text-sm">
                    {test.name}
                  </h4>

                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${test.badgeColor}`}
                    >
                      {test.role.toUpperCase()}
                    </span>

                    <span className="text-[10px] text-zinc-400">
                      {test.org}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}