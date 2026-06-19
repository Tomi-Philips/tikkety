"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, CheckCircle, Mail, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    setLoading(false);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        <div className="relative rounded-[40px] bg-gradient-to-br from-blue-700 via-indigo-800 to-violet-900 p-10 md:p-16 text-center text-white overflow-hidden shadow-2xl shadow-blue-800/30 border border-white/10">

          {/* background glow */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <div className="absolute top-[-30%] left-[-20%] w-[350px] h-[350px] rounded-full bg-blue-400 blur-[80px]" />
            <div className="absolute bottom-[-30%] right-[-20%] w-[350px] h-[350px] rounded-full bg-violet-400 blur-[80px]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">

            {/* badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs font-bold text-blue-200 mb-6 backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-300 animate-pulse" />
              EARLY ACCESS FOR EVENT ORGANIZERS
            </motion.div>

            {/* headline */}
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white">
              Build and Launch Your First Event in Minutes
            </h2>

            {/* MVP-focused copy */}
            <p className="mt-6 text-sm md:text-base text-blue-100 font-medium max-w-xl">
              Get early access to Tikkety’s MVP—create events, set ticket tiers, sell securely, and manage QR check-ins in one system.
              No setup fees. No complexity.
            </p>

            {/* form */}
            <div className="mt-10 w-full max-w-md">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col sm:flex-row gap-3 bg-white/10 border border-white/15 p-2 rounded-2xl w-full backdrop-blur-md"
                  >
                    <div className="relative flex-1 flex items-center">
                      <Mail className="absolute left-3 w-4 h-4 text-blue-200" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-transparent border-0 pl-10 pr-3 py-2.5 text-sm font-semibold text-white placeholder:text-blue-200 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-white text-blue-800 rounded-xl px-6 py-2.5 text-sm font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-1.5 shadow shrink-0 active:scale-95 disabled:opacity-50"
                    >
                      {loading ? "Reserving..." : "Get Early Access"}
                      {!loading && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-3 bg-white/10 border border-white/15 p-6 rounded-3xl backdrop-blur-md"
                  >
                    <CheckCircle className="w-10 h-10 text-emerald-400 animate-bounce" />
                    <div>
                      <h4 className="font-bold text-white text-base">
                        You're on the early access list
                      </h4>
                      <p className="text-xs text-blue-100 font-medium mt-1">
                        You’ll be among the first to create and launch events on Tikkety.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}