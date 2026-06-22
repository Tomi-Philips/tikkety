"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe, Send } from "lucide-react";
import { useState, FormEvent } from "react";

export default function Footer() {
  const [newsEmail, setNewsEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!newsEmail || !newsEmail.includes("@")) return;
    setSubscribed(true);
    setNewsEmail("");
  };

  return (
    <footer className="relative bg-slate-950 border-t border-zinc-900 pt-16 pb-8 overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[-20%] left-[10%] w-[300px] h-[300px] rounded-full bg-blue-900/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[300px] h-[300px] rounded-full bg-indigo-900/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

        {/* Brand */}
        <div className="lg:col-span-4">
          <Link href="/" className="inline-flex items-center hover:opacity-85 transition-opacity">
            <Image
              src="/tikkety-main-logo-dark.png"
              alt="Tikkety"
              width={130}
              height={36}
              style={{ width: "130px", height: "auto" }}
              className="object-contain"
            />
          </Link>

          <p className="mt-4 text-sm text-zinc-400 font-medium leading-relaxed max-w-sm">
            A modern event platform for creating events, selling tickets, and managing QR check-ins — all in one place.
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs text-zinc-400 font-semibold">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            MVP System Active
          </div>
        </div>

        {/* Platform */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">
            Platform
          </h4>
          <ul className="mt-4 space-y-2 text-sm font-medium text-zinc-400">
            <li><Link href="/events" className="hover:text-blue-400 transition-colors">Explore Events</Link></li>
            <li><Link href="/create" className="hover:text-blue-400 transition-colors">Create Event</Link></li>
            <li><Link href="/tickets" className="hover:text-blue-400 transition-colors">Ticketing</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">
            Resources
          </h4>
          <ul className="mt-4 space-y-2 text-sm font-medium text-zinc-400">
            <li><Link href="/support" className="hover:text-blue-400 transition-colors">Support</Link></li>
            <li><Link href="/docs" className="hover:text-blue-400 transition-colors">Docs</Link></li>
            <li><Link href="/status" className="hover:text-blue-400 transition-colors">System Status</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">
            Legal
          </h4>
          <ul className="mt-4 space-y-2 text-sm font-medium text-zinc-400">
            <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms</Link></li>
            <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">
            Updates
          </h4>

          <p className="mt-4 text-sm text-zinc-400">
            Get early access updates on the Tikkety MVP launch.
          </p>

          {!subscribed ? (
            <form
              onSubmit={handleSubscribe}
              className="mt-3 flex bg-white/5 border border-white/10 p-1.5 rounded-xl focus-within:border-blue-500/50 transition-all duration-200"
            >
              <input
                type="email"
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-transparent text-sm text-white focus:outline-none pl-2.5 placeholder:text-zinc-500"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-sky-600 text-white p-2 rounded-lg hover:from-blue-700 hover:to-sky-700 shadow-md shadow-blue-500/20 active:scale-95 transition-all duration-200"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <span className="inline-block mt-3 text-xs text-emerald-400 font-bold bg-emerald-950/30 border border-emerald-900/50 rounded-lg px-2.5 py-1">
              You&apos;re on the list
            </span>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 border-t border-zinc-900 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-xs text-zinc-400 font-semibold">
          © {new Date().getFullYear()} Tikkety. All rights reserved.
        </span>

        <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold">
          <Globe className="w-3.5 h-3.5" />
          <span>English (US)</span>
        </div>
      </div>
    </footer>
  );
}