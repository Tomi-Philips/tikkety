"use client";

import { useState } from "react";
import Link from "next/link";
import { Camera, Music, Palette, Utensils, Sparkles, Star, Users, Clock, Award, CheckCircle, ArrowRight, Zap, Shield, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { id: "music", label: "DJs & Music", icon: Music, color: "from-blue-500 to-blue-500" },
  { id: "photo", label: "Photography", icon: Camera, color: "from-blue-500 to-cyan-500" },
  { id: "decor", label: "Decor & Lighting", icon: Palette, color: "from-emerald-500 to-teal-500" },
  { id: "catering", label: "Catering", icon: Utensils, color: "from-amber-500 to-orange-500" },
];

const VENDORS: Record<
  string,
  {
    name: string;
    rating: number;
    reviews: number;
    price: string;
    specialty: string;
    description: string;
    tags: string[];
    location: string;
    experience: string;
    bookings: number;
  }
> = {
  music: {
    name: "DJ Pulse Collective",
    rating: 4.9,
    reviews: 42,
    price: "₦150,000/hr",
    specialty: "Afrobeats • Hip-Hop • House Sets",
    description:
      "Professional DJ network for high-energy events. Fully equipped sound systems, live mixing, and event-ready setups.",
    tags: ["Sound Ready", "Event Tested", "High Energy"],
    location: "Lagos, Nigeria",
    experience: "8+ years",
    bookings: 58,
  },
  photo: {
    name: "Aura Media Studio",
    rating: 4.8,
    reviews: 29,
    price: "₦200,000/hr",
    specialty: "Event Photography & Cinematic Coverage",
    description:
      "Capture your event moments with professional-grade photography and fast turnaround highlight reels.",
    tags: ["4K Capture", "Fast Delivery", "Pro Editing"],
    location: "Lagos, Nigeria",
    experience: "6+ years",
    bookings: 42,
  },
  decor: {
    name: "Luxe Event Designs",
    rating: 5.0,
    reviews: 18,
    price: "₦500,000+",
    specialty: "Stage & Ambient Design",
    description:
      "Transform event spaces with premium lighting, stage design, and immersive decorations tailored to your theme.",
    tags: ["Custom Themes", "Lighting FX", "Stage Design"],
    location: "Lagos, Nigeria",
    experience: "10+ years",
    bookings: 24,
  },
  catering: {
    name: "Savory Table Co.",
    rating: 4.7,
    reviews: 35,
    price: "₦25,000/plate",
    specialty: "Full Event Catering Services",
    description:
      "Premium catering solutions for private and public events with flexible menu options and professional service staff.",
    tags: ["Full Service", "Custom Menu", "On-site Staff"],
    location: "Lagos, Nigeria",
    experience: "12+ years",
    bookings: 85,
  },
};

export default function VendorSection() {
  const [activeCat, setActiveCat] = useState("music");
  const current = VENDORS[activeCat];

  return (
    <section className="relative py-28 bg-gradient-to-b from-slate-50 via-white to-blue-50/40 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-200/20 to-blue-200/20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[20%] left-[5%] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-blue-200/15 to-indigo-200/15 blur-[140px] animate-pulse delay-1000" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-200/5 blur-[150px]" />
        
        {/* Subtle grid pattern */}
        <div className={`absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(0,0,0,0.02)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")] opacity-50`} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* LEFT SIDE - Enhanced */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-blue-500/30 mb-6"
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </div>
            <Zap className="w-3.5 h-3.5" />
            Profiles Live • Booking Coming Soon
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]"
          >
            Build Your Vendor
            <span className="block bg-gradient-to-r from-blue-600 via-blue-600 to-rose-600 bg-clip-text text-transparent">
              Profile & Presence
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-500 text-base md:text-lg font-medium mt-4 leading-relaxed"
          >
            Establish your professional digital presence on Tikkety today. Create an account, build your public profile, 
            showcase your services, and share your unique profile link with potential clients.
          </motion.p>

          {/* Category Grid - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 gap-3 mt-8"
          >
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const active = activeCat === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`group relative flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 ${
                    active
                      ? `bg-gradient-to-r ${cat.color} border-transparent text-white shadow-lg`
                      : "bg-white/80 backdrop-blur-sm border-zinc-200/80 text-zinc-600 hover:border-zinc-300 hover:shadow-md"
                  }`}
                >
                  <div className={`p-1.5 rounded-lg transition-all ${
                    active ? "bg-white/20" : "bg-zinc-100 group-hover:bg-zinc-200"
                  }`}>
                    <Icon className={`w-4 h-4 ${active ? "text-white" : "text-zinc-600"}`} />
                  </div>
                  <span className={`text-sm font-semibold ${active ? "text-white" : "text-zinc-700"}`}>
                    {cat.label}
                  </span>
                  {active && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-md">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* MVP Context Note - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex items-start gap-2 p-3 rounded-xl bg-amber-50/80 border border-amber-200/50"
          >
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-relaxed">
              <span className="font-bold">Note:</span> Vendor profiles are live for online presence and sharing. 
              Direct booking and search marketplace integrations are coming soon.
            </p>
          </motion.div>
        </div>

        {/* RIGHT SIDE - Enhanced Vendor Card */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
              className="bg-white/90 backdrop-blur-sm border border-zinc-200/60 rounded-3xl p-6 shadow-2xl shadow-zinc-200/50 relative overflow-hidden"
            >
              {/* Decorative gradient top */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${CATEGORIES.find(c => c.id === activeCat)?.color || 'from-blue-500 to-blue-500'}`} />
              
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 px-3 py-1 rounded-full font-bold border border-indigo-200/50">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                    Featured Listing
                  </span>
                  <h3 className="text-2xl font-bold mt-3 text-zinc-900">
                    {current.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-bold text-zinc-800">{current.rating}</span>
                      <span className="text-xs text-zinc-400">({current.reviews} reviews)</span>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-zinc-300" />
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="text-xs text-zinc-500">{current.experience}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-400 font-medium">Starting From</p>
                  <p className="text-lg font-black bg-gradient-to-r from-zinc-800 to-zinc-600 bg-clip-text text-transparent">
                    {current.price}
                  </p>
                </div>
              </div>

              {/* Specialty */}
              <div className="mt-3 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-sm font-medium text-blue-700">{current.specialty}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
                {current.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {current.tags.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-gradient-to-r from-zinc-100 to-zinc-50 px-3 py-1.5 rounded-full font-semibold text-zinc-600 border border-zinc-200/50 flex items-center gap-1"
                  >
                    <CheckCircle className="w-2.5 h-2.5 text-emerald-500" />
                    {t}
                  </span>
                ))}
              </div>

              {/* Location */}
              <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500">
                <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>{current.location}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-5 pt-4 border-t border-zinc-100">
                <Link
                  href="/waitlist"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-700 hover:to-blue-700 transition-all duration-200 group"
                >
                  <span>Join Waitlist</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="px-4 py-2.5 rounded-xl border-2 border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-200 flex items-center gap-1.5 text-sm font-semibold">
                  <Shield className="w-4 h-4" />
                  View Profile
                </button>
              </div>

              {/* Trust indicator */}
              <div className="mt-4 flex items-center justify-center gap-3 text-[10px] text-zinc-400">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  Verified
                </span>
                <span className="w-px h-3 bg-zinc-200" />
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-blue-500" />
                  {current.bookings}+ bookings
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}