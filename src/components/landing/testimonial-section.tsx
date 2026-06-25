"use client";

import { Star, Quote, Sparkles, Users, Award, Shield, Heart, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "Tikkety completely changed how I manage campus events. I can create ticket tiers, track sales in real time, and manage attendees without juggling multiple tools.",
    name: "Ayo Martins",
    role: "Campus Event Organizer",
    org: "University Events Team",
    avatar: "A",
    tag: "Organizer",
  },
  {
    quote:
      "As a student ambassador, I needed a simple way to promote events and track attendance. Tikkety makes it effortless to share event links and monitor engagement.",
    name: "Blessing Okoro",
    role: "Community Ambassador",
    org: "Early Access Program",
    avatar: "B",
    tag: "Ambassador",
  },
  {
    quote:
      "Buying tickets was seamless. I stored my pass on my phone and got into the event instantly with a QR scan—no stress, no delays.",
    name: "David Chen",
    role: "Event Attendee",
    org: "Live Event User",
    avatar: "D",
    tag: "Attendee",
  },
];

export default function TestimonialSection() {
  return (
    <section id="testimonials" className="py-20 bg-white border-t border-gray-100">
      <div className="w-full max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Early Validation
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-[1.15] mb-3">
            Built for Organizers.
            <span className="block text-blue-700 mt-1">
              Trusted by Early Users.
            </span>
          </h2>

          <p className="text-gray-500 text-base leading-relaxed max-w-xl mx-auto">
            From campus organizers to early ambassadors and attendees, Tikkety is already shaping 
            how events are created and experienced.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors relative"
            >
              {/* Tag Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-medium mb-3">
                <Users className="w-3 h-3" />
                {test.tag}
              </div>

              {/* Rating */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote Icon */}
              <Quote className="absolute top-5 right-5 w-10 h-10 text-gray-200" />

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed">
                "{test.quote}"
              </p>

              {/* User */}
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-blue-800 flex items-center justify-center text-white font-semibold text-sm">
                  {test.avatar}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {test.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500">
                      {test.role}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-xs text-gray-400">
                      {test.org}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Indicator */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 md:gap-5 px-5 py-3 bg-gray-50 border border-gray-200 rounded-full">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
              <Award className="w-4 h-4 text-gray-500" />
              <span>Trusted by early adopters</span>
            </div>
            <span className="hidden md:block w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
              <Shield className="w-4 h-4 text-gray-500" />
              <span>Verified testimonials</span>
            </div>
            <span className="hidden md:block w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
              <Heart className="w-4 h-4 text-gray-500" />
              <span>Real feedback</span>
            </div>
            <span className="hidden md:block w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
              <CheckCircle className="w-4 h-4 text-gray-500" />
              <span>Verified users</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}