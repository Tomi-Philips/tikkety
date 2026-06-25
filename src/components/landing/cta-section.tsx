"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, CheckCircle, Mail, Sparkles, Zap, Rocket, Users, Calendar, Ticket } from "lucide-react";
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
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="w-full max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative rounded-2xl bg-gray-900 p-10 md:p-14 text-center text-white border border-gray-800 shadow-xl"
        >
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">

            {/* Badge */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600/20 border border-blue-500/30 px-4 py-1.5 text-xs font-bold text-blue-300 mb-6"
            >
              <div className="flex items-center gap-1.5">
                <div className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400" />
                </div>
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              EARLY ACCESS FOR EVENT ORGANIZERS
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white"
            >
              Build and Launch Your
              <span className="block text-blue-400 mt-1">
                First Event in Minutes
              </span>
            </motion.h2>

            {/* Copy */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-5 text-sm md:text-base text-gray-400 font-medium max-w-xl leading-relaxed"
            >
              Get early access to Tikkety's MVP—create events, set ticket tiers, sell securely, 
              and manage QR check-ins in one system. No setup fees. No complexity.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mt-5 flex flex-wrap items-center justify-center gap-2"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-[10px] font-medium text-gray-300">
                <Zap className="w-3 h-3 text-blue-400" />
                Instant Setup
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-[10px] font-medium text-gray-300">
                <Users className="w-3 h-3 text-blue-400" />
                QR Check-in
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-[10px] font-medium text-gray-300">
                <Rocket className="w-3 h-3 text-blue-400" />
                Live Analytics
              </span>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-8 w-full max-w-md"
            >
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col sm:flex-row gap-2 bg-gray-800 border border-gray-700 p-1 rounded-xl w-full"
                  >
                    <div className="relative flex-1 flex items-center">
                      <Mail className="absolute left-3.5 w-4 h-4 text-gray-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-transparent border-0 pl-10 pr-3 py-2.5 text-sm font-medium text-white placeholder:text-gray-500 focus:outline-none focus:ring-0"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 text-white rounded-lg px-5 py-2.5 text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Reserving...
                        </>
                      ) : (
                        <>
                          Get Early Access
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-2 bg-gray-800 border border-gray-700 p-6 rounded-xl"
                  >
                    <CheckCircle className="w-12 h-12 text-emerald-400" />
                    <div>
                      <h4 className="font-bold text-white text-lg">
                        You're on the early access list!
                      </h4>
                      <p className="text-sm text-gray-400 font-medium mt-1">
                        You'll be among the first to create and launch events on Tikkety.
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-gray-400 hover:text-white transition-colors underline decoration-1 underline-offset-2"
                    >
                      Back to form
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}