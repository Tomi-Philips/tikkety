"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Zap,
  Users,
  Calendar,
  Shield,
  Star,
  Rocket,
} from "lucide-react";

const BENEFITS = [
  "First access when Tikkety launches",
  "Founding member badge on your profile",
  "Priority onboarding with our team",
  "Shape the product with direct feedback",
];

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !name.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/50 relative overflow-hidden">

      {/* ── Background decorations ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-200/30 to-blue-200/20 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-blue-200/30 to-pink-200/20 blur-[150px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-200/5 blur-[150px]" />
        {/* Grid pattern lives in /public — no inline data URI, no quote issues */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-50" />
      </div>

      {/* ── Top-left logo ── */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 hover:opacity-85 transition-opacity group"
        >
          <Image
            src="/tikkety-main-logo.png"
            alt="Tikkety"
            width={130}
            height={36}
            style={{ width: "130px", height: "auto" }}
            className="object-contain"
            priority
          />
        </Link>
      </div>

      {/* ── Floating ambient icons ── */}
      <div className="absolute top-20 right-20 opacity-20 hidden lg:block pointer-events-none">
        <Users className="w-16 h-16 text-indigo-400" />
      </div>
      <div className="absolute bottom-20 left-20 opacity-20 hidden lg:block pointer-events-none">
        <Calendar className="w-14 h-14 text-blue-400" />
      </div>
      <div className="absolute top-1/3 right-10 opacity-10 hidden lg:block pointer-events-none">
        <Star className="w-10 h-10 text-indigo-300" />
      </div>

      {/* ── Two-column layout ── */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

          {/* ── LEFT: illustration + tagline ── */}
          <div className="flex flex-col items-center lg:items-start gap-2 order-2 lg:order-1">

            {/* Tagline — desktop only */}
            <div className="hidden lg:block space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-extrabold uppercase tracking-widest shadow-lg shadow-indigo-500/25">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Early Access
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span className="text-[8px] font-bold">LIMITED SPOTS</span>
              </div>
              <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-sm">
                Tikkety is redefining how events are created, ticketed, and
                experienced. Join the waitlist and help shape the future.
              </p>
            </div>

            {/* Illustration — hidden on small screens, shown on lg+ */}
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-none hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-300/20 to-blue-200/10 rounded-3xl blur-2xl" />
              <Image
                src="/Waiting-rafiki.svg"
                alt="Person waiting for Tikkety to launch"
                width={520}
                height={520}
                className="relative w-full h-auto drop-shadow-xl"
                priority
              />
            </div>
          </div>

          {/* ── RIGHT: form card (or success) ── */}
          <div className="order-1 lg:order-2">
            {!submitted ? (
              <div className="bg-white/80 backdrop-blur-xl rounded-[32px] border border-white/60 shadow-2xl shadow-indigo-900/20 p-8 md:p-10 hover:shadow-indigo-900/30 transition-all duration-300">

                {/* Badge — mobile only (desktop shows it on the left) */}
                <div className="lg:hidden inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-extrabold uppercase tracking-widest mb-6 shadow-lg shadow-indigo-500/25 animate-pulse">
                  <Sparkles className="w-3.5 h-3.5" />
                  Early Access
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span className="text-[8px] font-bold">LIMITED SPOTS</span>
                </div>

                <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight leading-tight">
                  Join the Tikkety
                  <span className="block bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                    Waitlist
                  </span>
                </h1>

                <p className="text-zinc-500 mt-3 text-sm font-medium leading-relaxed">
                  Be among the first to create events, sell tickets, and manage
                  QR check-ins when we launch. Spots are limited.
                </p>

                {/* Benefits */}
                <ul className="mt-6 space-y-2.5">
                  {BENEFITS.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-zinc-700 font-medium group hover:text-indigo-700 transition-colors"
                    >
                      <div className="p-0.5 rounded-full bg-gradient-to-r from-indigo-100 to-blue-100 group-hover:from-indigo-200 group-hover:to-blue-200 transition-colors shrink-0">
                        <CheckCircle className="w-4 h-4 text-indigo-600" />
                      </div>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-zinc-200 bg-white/90 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-200 hover:border-zinc-300"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-zinc-200 bg-white/90 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-200 hover:border-zinc-300"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-sm font-bold text-white hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden mt-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    {loading ? (
                      <span className="relative z-10 flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      <>
                        <Rocket className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">Reserve My Spot</span>
                        <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                <p className="text-[11px] text-zinc-400 text-center mt-4 flex items-center justify-center gap-1.5">
                  <Shield className="w-3 h-3" />
                  No spam, ever. Unsubscribe at any time.
                </p>
              </div>
            ) : (
              /* ── Success state ── */
              <div className="bg-white/80 backdrop-blur-xl rounded-[32px] border border-white/60 shadow-2xl shadow-indigo-900/20 p-10 text-center hover:shadow-indigo-900/30 transition-all duration-300">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 mb-6 mx-auto">
                  <div className="absolute inset-0 bg-emerald-400/20 rounded-2xl blur-xl animate-pulse" />
                  <CheckCircle className="relative w-10 h-10 text-emerald-600 animate-bounce" />
                </div>
                <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
                  You&apos;re on the list! 🎉
                </h2>
                <p className="text-zinc-500 mt-3 text-sm font-medium leading-relaxed">
                  Thanks{name ? `, ${name.split(" ")[0]}` : ""}! We&apos;ll be in
                  touch when Tikkety is ready for you. Keep an eye on your inbox.
                </p>

                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-50/50 to-blue-50/50 border border-indigo-100/50">
                  <div className="flex items-center justify-center gap-6 text-xs font-medium text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-500" />
                      Founding member
                    </span>
                    <span className="w-px h-4 bg-zinc-200" />
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-indigo-500" />
                      Early access
                    </span>
                  </div>
                </div>

                <Link
                  href="/"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-800 text-white text-sm font-bold hover:from-zinc-800 hover:to-zinc-700 transition-all duration-200 shadow-lg shadow-zinc-900/20 group"
                >
                  Back to Home
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}