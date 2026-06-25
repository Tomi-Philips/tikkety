"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Ticket, Calendar, Users, MapPin, Clock, CheckCircle, Zap, Rocket, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#fcfcfc] via-[#fefefe] to-[#ffffff] pt-12">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 md:py-20 lg:py-24 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Copy, Audience Grid & Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Early Stage Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 self-start rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 mb-6"
          >
            <div className="bg-blue-200 rounded-full p-1">
              <Zap className="w-3 h-3 text-blue-500 animate-pulse" />
            </div>
            <span className="text-zinc-700">Tikkety &bull; Launching Soon 🚀</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
            <span className="text-xs font-medium text-zinc-700">Early Access Open</span>
            <ArrowRight className="w-3 h-3 text-zinc-400" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08]"
          >
            <span className="text-gray-900">Create Events.</span>
            <br />
            <span className="text-gray-900">Sell Tickets.</span>
            <br />
            <span className="text-blue-700">
              Manage Seamlessly.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl"
          >
            Tikkety is the modern event platform designed to simplify event creation and ticketing for organizers, 
            discovery for attendees, and portfolio visibility for local service providers.
          </motion.p>

          {/* Target Audience Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-gray-200 py-5"
          >
            <div>
              <h4 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                For Organizers
              </h4>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                Create events easily, customize pricing tiers, and monitor live sales.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                For Attendees
              </h4>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                Discover happenings, buy secure passes, and enjoy fast gate entry.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                For Vendors
              </h4>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                Create a professional profile, establish online presence, and share your profile link.
              </p>
            </div>
          </motion.div>

          {/* Waitlist Calls to Action - NO GRADIENTS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-7 flex flex-wrap items-center gap-4 text-sm"
          >
            <Link
              href="/waitlist"
              className="inline-flex items-center gap-2 bg-blue-600 px-6 py-3 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Rocket className="w-4 h-4" />
              <span>Join Waitlist</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Become an Organizer
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Safe Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-gray-500"
          >
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Early Access Open</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3 h-3 text-emerald-500" />
              <span>Founding Users Welcome</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1.5">
              <Star className="w-3 h-3 text-amber-500" />
              <span>Built for Modern Event Creators</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Visual Preview Ticket Mockup */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          {/* Decorative glowing elements */}
          <div className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-indigo-400 to-blue-500 opacity-20 blur-3xl animate-pulse" />
          <div className="absolute w-64 h-64 rounded-full bg-gradient-to-bl from-blue-400 to-cyan-400 opacity-10 blur-2xl animate-pulse delay-1000" />
          
          {/* Floating decorative dots */}
          <div className="absolute top-10 right-10 w-3 h-3 rounded-full bg-indigo-400/30 animate-bounce" />
          <div className="absolute bottom-20 left-10 w-2 h-2 rounded-full bg-blue-400/30 animate-bounce delay-300" />
          <div className="absolute top-1/3 left-5 w-1.5 h-1.5 rounded-full bg-blue-400/30 animate-pulse delay-500" />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            whileHover={{ y: -12, rotate: 0, scale: 1.02 }}
            className="relative w-full max-w-[400px]"
          >
            {/* Glow behind ticket */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/20 to-slate-500/20 rounded-[36px] blur-2xl" />
            
            {/* Main Ticket Card */}
            <div className="relative bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white rounded-[32px] p-7 shadow-2xl shadow-zinc-950/50 border border-white/10 overflow-hidden">
              
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-[32px] p-[1px] bg-gradient-to-r from-zinc-500/30 via-blue-500/30 to-pink-500/30 opacity-50" />
              
              {/* Decorative pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl" />
              
              {/* Header branding */}
              <div className="flex justify-between items-center mb-6 relative">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <Ticket className="w-4.5 h-4.5 text-white rotate-12" />
                  </div>
                  <div>
                    <span className="font-extrabold tracking-tight text-sm text-indigo-200 block leading-tight">TIKKETY</span>
                    <span className="text-[9px] text-indigo-300/60 font-medium">FOUNDING PASS</span>
                  </div>
                </div>
                <span className="text-[10px] bg-gradient-to-r from-indigo-500/30 to-blue-500/30 text-indigo-300 font-bold px-3 py-1 rounded-full border border-indigo-400/20 backdrop-blur-sm">
                  EARLY STAGE
                </span>
              </div>

              {/* Event Name */}
              <div className="relative">
                <span className="text-[9px] text-indigo-300/60 font-bold tracking-widest uppercase">Platform Premiere</span>
                <h3 className="text-2xl font-bold mt-1.5 text-white leading-tight">
                  Tikkety Early Adopters Mixer
                </h3>
              </div>

              {/* Event details - Enhanced */}
              <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-white/5 relative">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-indigo-400/60" />
                  <div>
                    <span className="text-[9px] text-indigo-300/50 block font-bold uppercase tracking-wider">Launch Target</span>
                    <span className="text-xs font-semibold mt-0.5 block text-indigo-100">Fall 2026</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-indigo-400/60" />
                  <div>
                    <span className="text-[9px] text-indigo-300/50 block font-bold uppercase tracking-wider">Community</span>
                    <span className="text-xs font-semibold mt-0.5 block text-indigo-100">Founding Member</span>
                  </div>
                </div>
              </div>

              {/* Ticket Scannable Mockup with QR Barcode - Enhanced */}
              <div className="mt-5 bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-full blur-xl" />
                
                {/* Fake QR bars with animation */}
                <div className="w-full h-14 flex gap-[3px] items-center justify-center opacity-90 relative">
                  {[2, 4, 2, 6, 3, 1, 4, 2, 5, 1, 3, 2, 4, 1, 6, 2, 3, 4, 1, 5, 2, 4, 1, 3, 2, 5, 1, 4, 2, 3].map((w, idx) => (
                    <motion.div
                      key={idx}
                      className="h-10 bg-gradient-to-b from-white to-indigo-200 rounded-full"
                      style={{ width: `${w * 1.5}px` }}
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, delay: idx * 0.05, repeat: Infinity }}
                    />
                  ))}
                </div>
                <div className="text-[10px] text-indigo-300/60 font-mono mt-3 tracking-widest text-center">
                  TKT-90210-GENAI
                </div>
              </div>

              {/* Ticket Tear Dot Cutouts */}
              <div className="absolute -left-3 top-[55%] w-6 h-6 rounded-full bg-white/10 border border-white/5" />
              <div className="absolute -right-3 top-[55%] w-6 h-6 rounded-full bg-white/10 border border-white/5" />
              
              {/* Bottom accent */}
              <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
                <span className="text-[8px] text-indigo-300/40 font-mono">#FOUNDING2026</span>
                <span className="flex items-center gap-1 text-[8px] text-indigo-300/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  live
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}