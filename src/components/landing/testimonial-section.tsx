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
    badgeColor: "from-blue-500 to-cyan-500",
    avatar: "A",
    avatarBg: "from-blue-500 to-cyan-500",
    tag: "Organizer",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    quote:
      "As a student ambassador, I needed a simple way to promote events and track attendance. Tikkety makes it effortless to share event links and monitor engagement.",
    name: "Blessing Okoro",
    role: "Community Ambassador",
    org: "Early Access Program",
    badgeColor: "from-indigo-500 to-purple-500",
    avatar: "B",
    avatarBg: "from-indigo-500 to-purple-500",
    tag: "Ambassador",
    tagColor: "bg-indigo-100 text-indigo-700",
  },
  {
    quote:
      "Buying tickets was seamless. I stored my pass on my phone and got into the event instantly with a QR scan—no stress, no delays.",
    name: "David Chen",
    role: "Event Attendee",
    org: "Live Event User",
    badgeColor: "from-emerald-500 to-teal-500",
    avatar: "D",
    avatarBg: "from-emerald-500 to-teal-500",
    tag: "Attendee",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
];

export default function TestimonialSection() {
  return (
    <section id="testimonials" className="relative py-28 bg-gradient-to-b from-white via-slate-50/50 to-indigo-50/30 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-200/20 to-indigo-200/20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-purple-200/15 to-pink-200/15 blur-[140px] animate-pulse delay-1000" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-200/5 blur-[150px]" />
        
        {/* Subtle grid pattern */}
        <div className={`absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(0,0,0,0.02)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")] opacity-50`} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        
        {/* Header - Enhanced */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 text-amber-700 font-bold uppercase tracking-wider text-[11px] mb-5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Early Validation
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]"
          >
            Built for Organizers.
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Trusted by Early Users.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-500 text-base md:text-lg font-medium mt-5 max-w-2xl mx-auto leading-relaxed"
          >
            From campus organizers to early ambassadors and attendees, Tikkety is already shaping 
            how events are created and experienced.
          </motion.p>
        </div>

        {/* Testimonials Grid - Enhanced */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white/80 backdrop-blur-sm border border-zinc-200/60 rounded-3xl p-8 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-200/50 transition-all duration-300"
            >
              {/* Decorative gradient top */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${test.badgeColor} rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-50/0 to-purple-50/0 group-hover:from-indigo-50/30 group-hover:to-purple-50/30 transition-all duration-500 pointer-events-none" />

              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-14 h-14 text-indigo-200 opacity-30 group-hover:opacity-50 transition-opacity" />

              {/* Tag Badge */}
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${test.tagColor} border shadow-sm mb-4 relative z-10`}>
                <Users className="w-2.5 h-2.5" />
                {test.tag}
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 relative z-10">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 + idx * 0.12 }}
                  >
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <p className="text-zinc-700 text-sm md:text-base font-medium leading-relaxed italic relative z-10">
                "{test.quote}"
              </p>

              {/* User - Enhanced */}
              <div className="flex gap-3 items-center mt-6 pt-5 border-t border-zinc-100/80 relative z-10">
                <div className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${test.avatarBg} flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform`}>
                  {test.avatar}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
                </div>

                <div className="flex-1">
                  <h4 className="font-bold text-zinc-900 text-sm group-hover:text-indigo-700 transition-colors">
                    {test.name}
                  </h4>

                  <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    <span className="text-[9px] font-semibold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">
                      {test.role}
                    </span>
                    <span className="text-[9px] text-zinc-400">•</span>
                    <span className="text-[9px] text-zinc-500 font-medium">
                      {test.org}
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500/5 to-purple-500/5 blur-2xl" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Indicator - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-4 md:gap-6 px-6 py-3.5 rounded-full bg-white/80 backdrop-blur-sm border border-zinc-200/50 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Trusted by early adopters</span>
            </div>
            <span className="hidden md:block w-px h-5 bg-zinc-200" />
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Verified testimonials</span>
            </div>
            <span className="hidden md:block w-px h-5 bg-zinc-200" />
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>100% real feedback</span>
            </div>
            <span className="hidden md:block w-px h-5 bg-zinc-200" />
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600">
              <CheckCircle className="w-4 h-4 text-indigo-500" />
              <span>Verified users</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}