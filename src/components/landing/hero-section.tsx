"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Ticket } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white pt-10">
      {/* Background Gradients & Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-50/70 blur-[130px]" />
        <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] rounded-full bg-violet-100/40 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 md:py-24 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Copy, Audience Grid & Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          {/* Early Stage Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 self-start rounded-full border border-blue-200/80 bg-blue-50/50 px-4 py-1.5 text-sm font-semibold text-blue-700 mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>Tikkety &bull; Launching Soon 🚀</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]"
          >
            Create Events. Sell Tickets.{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Manage Seamlessly.
            </span>
          </motion.h1>

          {/* Subtitle / positioning */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-base md:text-lg text-zinc-650 font-medium leading-relaxed max-w-2xl"
          >
            Tikkety is the modern event platform designed to simplify event creation and ticketing for organizers, discovery for attendees, and portfolio visibility for local service providers.
          </motion.p>

          {/* Target Audience Clarity Grid (Organizers, Attendees, Vendors) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-zinc-150 py-6"
          >
            <div>
              <h4 className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                For Organizers
              </h4>
              <p className="text-zinc-500 text-xs mt-1.5 leading-relaxed font-medium">
                Create events easily, customize pricing tiers, and monitor live sales.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                For Attendees
              </h4>
              <p className="text-zinc-500 text-xs mt-1.5 leading-relaxed font-medium">
                Discover happenings, buy secure passes, and enjoy fast gate entry.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-600" />
                For Vendors
              </h4>
              <p className="text-zinc-500 text-xs mt-1.5 leading-relaxed font-medium">
                Showcase DJ, photo, or caterer portfolios directly to event creators.
              </p>
            </div>
          </motion.div>

          {/* Waitlist Calls to Action */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/waitlist"
              className="group inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 text-white font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-600/30 transition-all duration-200"
            >
              Join Waitlist
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-zinc-200 bg-white px-7 py-4 font-bold text-zinc-800 hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-200"
            >
              Become an Organizer
            </Link>
          </motion.div>

          {/* Safe Social Proof (no fake stats) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-zinc-400"
          >
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Early Access Open</span>
            </div>
            <div>&bull;</div>
            <div>Founding Users Welcome</div>
            <div>&bull;</div>
            <div>Built for Modern Event Creators</div>
          </motion.div>
        </div>

        {/* Right Column: Visual Preview Ticket Mockup */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          {/* Decorative glowing sphere behind ticket */}
          <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 opacity-20 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            whileHover={{ y: -8, rotate: 0 }}
            className="relative w-full max-w-[380px] bg-gradient-to-b from-blue-900 to-zinc-950 text-white rounded-[32px] p-6 shadow-3xl shadow-blue-950/40 border border-white/10"
          >
            {/* Header branding */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-blue-400 rotate-12" />
                <span className="font-extrabold tracking-tight text-sm text-blue-200">TIKKETY FOUNDING PASS</span>
              </div>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded-full border border-blue-400/20">
                EARLY STAGE
              </span>
            </div>

            {/* Event Name */}
            <div>
              <span className="text-[9px] text-zinc-400 font-bold tracking-widest uppercase">Platform Premiere</span>
              <h3 className="text-xl font-bold mt-1 text-white">Tikkety Early Adopters Mixer</h3>
            </div>

            {/* Event details */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
              <div>
                <span className="text-[9px] text-zinc-400 block font-bold">LAUNCH TARGET</span>
                <span className="text-xs font-semibold mt-0.5 block text-zinc-150">Fall 2026</span>
              </div>
              <div>
                <span className="text-[9px] text-zinc-400 block font-bold">COMMUNITY</span>
                <span className="text-xs font-semibold mt-0.5 block text-zinc-150">Founding Member</span>
              </div>
            </div>

            {/* Ticket Scannable Mockup with QR Barcode */}
            <div className="mt-8 bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-center">
              {/* Fake QR bars */}
              <div className="w-full h-12 flex gap-[3px] items-center justify-center opacity-85">
                {[1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 4, 2, 1, 2, 4, 1, 3, 2, 1, 4, 2].map((w, idx) => (
                  <div
                    key={idx}
                    className="h-10 bg-white rounded-full"
                    style={{ width: `${w * 1.5}px` }}
                  />
                ))}
              </div>
              <div className="text-[10px] text-zinc-450 font-mono mt-3 tracking-widest">
                TKT-90210-GENAI
              </div>
            </div>

            {/* Ticket Tear Dot Cutouts */}
            <div className="absolute -left-3 top-[55%] w-6 h-6 rounded-full bg-white border-r border-zinc-200" />
            <div className="absolute -right-3 top-[55%] w-6 h-6 rounded-full bg-white border-l border-zinc-200" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
