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
    <section className="relative py-28 bg-gradient-to-b from-blue-100 via-white to-indigo-50/30 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-200/20 to-indigo-200/20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-blue-200/15 to-indigo-200/15 blur-[140px] animate-pulse delay-1000" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-200/5 blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[40px] bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-10 md:p-16 text-center text-white overflow-hidden shadow-2xl shadow-blue-950/40 border border-blue-500/20"
        >

          {/* Animated Background Glows */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <div className="absolute top-[-30%] left-[-20%] w-[400px] h-[400px] rounded-full bg-blue-500/25 blur-[100px] animate-pulse" />
            <div className="absolute bottom-[-30%] right-[-20%] w-[400px] h-[400px] rounded-full bg-sky-500/20 blur-[100px] animate-pulse delay-1000" />
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[120px]" />
          </div>

          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-[40px] p-[1px] bg-gradient-to-r from-blue-500/30 via-sky-500/20 to-indigo-500/30 opacity-50" />

          {/* Decorative floating elements */}
          <div className="absolute top-8 right-8 opacity-20 hidden md:block">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse delay-300" />
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse delay-600" />
            </div>
          </div>
          <div className="absolute bottom-8 left-8 opacity-10 hidden md:block">
            <Ticket className="w-16 h-16 text-white" />
          </div>
          <div className="absolute top-1/3 right-12 opacity-10 hidden md:block">
            <Calendar className="w-12 h-12 text-white" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">

            {/* Badge - Enhanced */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-5 py-2 text-xs font-bold text-blue-200 mb-6 shadow-lg"
            >
              <div className="flex items-center gap-1">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </div>
                <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              </div>
              EARLY ACCESS FOR EVENT ORGANIZERS
            </motion.div>

            {/* Headline - Enhanced */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white"
            >
              Build and Launch Your
              <span className="block bg-gradient-to-r from-blue-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                First Event in Minutes
              </span>
            </motion.h2>

            {/* Copy - Enhanced */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-sm md:text-base text-blue-100/90 font-medium max-w-xl leading-relaxed"
            >
              Get early access to Tikkety's MVP—create events, set ticket tiers, sell securely, 
              and manage QR check-ins in one system. No setup fees. No complexity.
            </motion.p>

            {/* Feature Pills - New */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-2"
            >
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-semibold text-blue-200">
                <Zap className="w-3 h-3" />
                Instant Setup
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-semibold text-blue-200">
                <Users className="w-3 h-3" />
                QR Check-in
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-semibold text-blue-200">
                <Rocket className="w-3 h-3" />
                Live Analytics
              </span>
            </motion.div>

            {/* Form - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
                    className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-md border border-white/15 p-1.5 rounded-2xl w-full shadow-xl shadow-black/20"
                  >
                    <div className="relative flex-1 flex items-center">
                      <Mail className="absolute left-3.5 w-4 h-4 text-blue-300" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-transparent border-0 pl-10 pr-3 py-3 text-sm font-semibold text-white placeholder:text-blue-200/70 focus:outline-none focus:ring-0"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative overflow-hidden bg-white text-blue-950 rounded-xl px-6 py-3 text-sm font-bold hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-black/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center gap-1.5">
                        {loading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                            Reserving...
                          </>
                        ) : (
                          <>
                            Get Early Access
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-2xl shadow-xl"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl animate-pulse" />
                      <CheckCircle className="relative w-12 h-12 text-emerald-400 animate-bounce" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">
                        You're on the early access list!
                      </h4>
                      <p className="text-sm text-blue-100/80 font-medium mt-1">
                        You'll be among the first to create and launch events on Tikkety.
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-blue-300 hover:text-white transition-colors underline decoration-1 underline-offset-2"
                    >
                      Back to form
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Trust indicator - New */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 flex items-center gap-3 text-[10px] text-blue-200/60 font-medium"
            >
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                No credit card required
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                Cancel anytime
              </span>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}