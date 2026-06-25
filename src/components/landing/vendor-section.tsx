"use client";

import { useState } from "react";
import Link from "next/link";
import { Camera, Music, Palette, Utensils, Sparkles, Star, Users, Clock, Award, CheckCircle, ArrowRight, Zap, Shield, Building2 } from "lucide-react";
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
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* LEFT SIDE */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium tracking-wider uppercase mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <Zap className="w-3 h-3" />
            Profiles Live
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-[1.15] mb-3">
            Build Your Vendor
            <span className="block text-blue-700 mt-1">
              Profile & Presence
            </span>
          </h2>

          <p className="text-gray-500 text-base leading-relaxed max-w-md">
            Establish your professional digital presence on Tikkety today. Create an account, build your public profile, 
            showcase your services, and share your unique profile link with potential clients.
          </p>

          {/* Category Grid */}
          <div className="grid grid-cols-2 gap-2 mt-6">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const active = activeCat === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 border transition-colors text-sm font-medium rounded-lg ${
                    active
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-300"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-white" : "text-gray-500"}`} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* MVP Context Note */}
          <div className="mt-5 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex gap-2">
              <Sparkles className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium">Note:</span> Vendor profiles are live for online presence and sharing. 
                Direct booking and search marketplace integrations are coming soon.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Vendor Card */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </span>
                  <h3 className="text-xl font-bold mt-2 text-gray-900">
                    {current.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-semibold text-gray-900">{current.rating}</span>
                      <span className="text-xs text-gray-400">({current.reviews})</span>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500">{current.experience}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-medium">From</p>
                  <p className="text-lg font-bold text-gray-900">
                    {current.price}
                  </p>
                </div>
              </div>

              {/* Specialty */}
              <div className="mt-3 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">{current.specialty}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 mt-2.5 leading-relaxed">
                {current.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3.5">
                {current.tags.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs bg-blue-50 px-3 py-1 rounded-full font-medium text-blue-700 border border-blue-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Location */}
              <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                <Building2 className="w-3.5 h-3.5 text-gray-400" />
                <span>{current.location}</span>
              </div>

              {/* Actions - NO GRADIENTS */}
              <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
                <Link
                  href="/waitlist"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span>Join Waitlist</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button className="px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  Profile
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}