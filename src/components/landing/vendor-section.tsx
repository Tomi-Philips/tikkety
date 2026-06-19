"use client";

import { useState } from "react";
import Link from "next/link";
import { Camera, Music, Palette, Utensils, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { id: "music", label: "DJs & Music", icon: Music },
  { id: "photo", label: "Photography", icon: Camera },
  { id: "decor", label: "Decor & Lighting", icon: Palette },
  { id: "catering", label: "Catering", icon: Utensils },
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
  }
> = {
  music: {
    name: "DJ Pulse Collective",
    rating: 4.9,
    reviews: 42,
    price: "$150/hr",
    specialty: "Afrobeats • Hip-Hop • House Sets",
    description:
      "Professional DJ network for high-energy events. Fully equipped sound systems, live mixing, and event-ready setups.",
    tags: ["Sound Ready", "Event Tested", "High Energy"],
  },
  photo: {
    name: "Aura Media Studio",
    rating: 4.8,
    reviews: 29,
    price: "$200/hr",
    specialty: "Event Photography & Cinematic Coverage",
    description:
      "Capture your event moments with professional-grade photography and fast turnaround highlight reels.",
    tags: ["4K Capture", "Fast Delivery", "Pro Editing"],
  },
  decor: {
    name: "Luxe Event Designs",
    rating: 5.0,
    reviews: 18,
    price: "$500+",
    specialty: "Stage & Ambient Design",
    description:
      "Transform event spaces with premium lighting, stage design, and immersive decorations tailored to your theme.",
    tags: ["Custom Themes", "Lighting FX", "Stage Design"],
  },
  catering: {
    name: "Savory Table Co.",
    rating: 4.7,
    reviews: 35,
    price: "$25/plate",
    specialty: "Full Event Catering Services",
    description:
      "Premium catering solutions for private and public events with flexible menu options and professional service staff.",
    tags: ["Full Service", "Custom Menu", "On-site Staff"],
  },
};

export default function VendorSection() {
  const [activeCat, setActiveCat] = useState("music");
  const current = VENDORS[activeCat];

  return (
    <section className="relative py-24 bg-zinc-50 border-y border-zinc-100 overflow-hidden">
      {/* background glow */}
      <div className="absolute bottom-[-10%] left-[-15%] w-[450px] h-[450px] rounded-full bg-blue-100/30 blur-[130px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center">

        {/* LEFT SIDE */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-extrabold uppercase tracking-widest shadow-md shadow-blue-500/25 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Coming Soon
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 mt-3">
            Built for the Full Event Ecosystem
          </h2>

          <p className="text-zinc-500 mt-4 text-base md:text-lg leading-relaxed">
            While Tikkety starts with powerful event creation and ticketing,
            we are expanding into a verified ecosystem of event professionals —
            connecting organizers with trusted service providers when they need them.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-8">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const active = activeCat === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                    active
                      ? "bg-white border-blue-600 text-blue-700 shadow"
                      : "bg-white/60 border-zinc-200 text-zinc-600 hover:bg-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-semibold">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* MVP CONTEXT NOTE (IMPORTANT STRATEGIC LINE) */}
          <p className="mt-6 text-xs text-zinc-400 leading-relaxed">
            *Vendor marketplace is a planned expansion. Core MVP focuses on event creation, ticketing, and attendee management.*
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-bold border border-blue-100">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                    Preview Listing
                  </span>
                  <h3 className="text-xl font-bold mt-3 text-zinc-900">
                    {current.name}
                  </h3>
                </div>

                <div className="text-sm font-bold text-zinc-700">
                  ⭐ {current.rating} ({current.reviews})
                </div>
              </div>

              <p className="text-sm text-zinc-500 mt-4 leading-relaxed">
                {current.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {current.tags.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-zinc-100 px-2 py-1 rounded-lg font-semibold text-zinc-600"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center mt-6 pt-5 border-t">
                <div>
                  <p className="text-xs text-zinc-400 font-semibold">Starting From</p>
                  <p className="text-lg font-bold text-zinc-900">
                    {current.price}
                  </p>
                </div>

                <Link
                  href="/waitlist"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800 transition-colors"
                >
                  Join Waitlist
                  <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}