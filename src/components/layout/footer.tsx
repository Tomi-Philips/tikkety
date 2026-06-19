"use client";

import Link from "next/link";
import { Globe, Send, Ticket } from "lucide-react";
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
    <footer className="bg-zinc-50 border-t border-zinc-200 pt-16 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

        {/* Brand */}
        <div className="lg:col-span-4">
          <Link href="/" className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-blue-600 rotate-12" />
            <span className="font-extrabold text-lg text-zinc-900 tracking-tight">
              Tikkety
            </span>
          </Link>

          <p className="mt-4 text-sm text-zinc-500 font-medium leading-relaxed max-w-sm">
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
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900">
            Platform
          </h4>
          <ul className="mt-4 space-y-2 text-sm font-medium text-zinc-500">
            <li><Link href="/events" className="hover:text-blue-600">Explore Events</Link></li>
            <li><Link href="/create" className="hover:text-blue-600">Create Event</Link></li>
            <li><Link href="/tickets" className="hover:text-blue-600">Ticketing</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900">
            Resources
          </h4>
          <ul className="mt-4 space-y-2 text-sm font-medium text-zinc-500">
            <li><Link href="/support" className="hover:text-blue-600">Support</Link></li>
            <li><Link href="/docs" className="hover:text-blue-600">Docs</Link></li>
            <li><Link href="/status" className="hover:text-blue-600">System Status</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900">
            Legal
          </h4>
          <ul className="mt-4 space-y-2 text-sm font-medium text-zinc-500">
            <li><Link href="/terms" className="hover:text-blue-600">Terms</Link></li>
            <li><Link href="/privacy" className="hover:text-blue-600">Privacy</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900">
            Updates
          </h4>

          <p className="mt-4 text-sm text-zinc-500">
            Get early access updates on the Tikkety MVP launch.
          </p>

          {!subscribed ? (
            <form
              onSubmit={handleSubscribe}
              className="mt-3 flex bg-white border border-zinc-200 p-1.5 rounded-xl"
            >
              <input
                type="email"
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-transparent text-sm text-zinc-800 focus:outline-none pl-2.5"
              />
              <button
                type="submit"
                className="bg-zinc-900 text-white p-2 rounded-lg hover:bg-zinc-800"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <span className="inline-block mt-3 text-xs text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 rounded-lg px-2.5 py-1">
              You're on the list
            </span>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 border-t border-zinc-200 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
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