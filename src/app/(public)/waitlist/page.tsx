"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Sparkles, Ticket } from "lucide-react";

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
    // Simulate a short submission delay
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-200/30 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-200/30 blur-[140px] pointer-events-none" />

      {/* Back link */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 hover:opacity-85 transition-opacity"
        >
          <Image
            src="/tikkety-main-logo.png"
            alt="Tikkety"
            width={110}
            height={32}
            style={{ width: "110px", height: "auto" }}
            className="object-contain"
          />
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {!submitted ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-[32px] border border-white/60 shadow-2xl shadow-indigo-900/10 p-8 md:p-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-extrabold uppercase tracking-widest mb-6 shadow-md shadow-indigo-500/25">
              <Sparkles className="w-3.5 h-3.5" />
              Early Access
            </div>

            <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight leading-tight">
              Join the Tikkety Waitlist
            </h1>
            <p className="text-zinc-500 mt-3 text-sm font-medium leading-relaxed">
              Be among the first to create events, sell tickets, and manage QR check-ins when we
              launch. Spots are limited.
            </p>

            {/* Benefits */}
            <ul className="mt-6 space-y-2.5">
              {BENEFITS.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-zinc-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
              <input
                type="text"
                required
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
              />
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="group relative flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-sm font-bold text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-indigo-500/20 disabled:opacity-70 overflow-hidden mt-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                {loading ? (
                  <span className="relative z-10">Submitting…</span>
                ) : (
                  <>
                    <Ticket className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Reserve My Spot</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <p className="text-[11px] text-zinc-400 text-center mt-4">
              No spam, ever. Unsubscribe at any time.
            </p>
          </div>
        ) : (
          /* Success state */
          <div className="bg-white/80 backdrop-blur-xl rounded-[32px] border border-white/60 shadow-2xl shadow-indigo-900/10 p-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 mb-6 mx-auto">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
              You're on the list! 🎉
            </h2>
            <p className="text-zinc-500 mt-3 text-sm font-medium leading-relaxed">
              Thanks{name ? `, ${name.split(" ")[0]}` : ""}! We'll be in touch when Tikkety is ready for you.
              Keep an eye on your inbox.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-zinc-900 text-white text-sm font-bold hover:bg-zinc-800 transition-colors"
            >
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
