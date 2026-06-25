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
    <footer className="bg-gray-900 border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

        {/* Brand */}
        <div className="lg:col-span-4">
          <Link href="/" className="inline-flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="/tikkety-main-logo-dark.png"
              alt="Tikkety"
              width={130}
              height={36}
              style={{ width: "130px", height: "auto" }}
              className="object-contain"
            />
          </Link>

          <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-sm">
            A modern event platform for creating events, selling tickets, and managing QR check-ins — all in one place.
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs text-gray-500 font-medium">
            <span className="flex h-2 w-2 relative">
              <span className="absolute h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
              <span className="relative h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            MVP System Active
          </div>
        </div>

        {/* Platform */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">
            Platform
          </h4>
          <ul className="mt-4 space-y-2 text-sm font-medium text-gray-400">
            <li><Link href="/events" className="hover:text-blue-400 transition-colors">Explore Events</Link></li>
            <li><Link href="/create" className="hover:text-blue-400 transition-colors">Create Event</Link></li>
            <li><Link href="/tickets" className="hover:text-blue-400 transition-colors">Ticketing</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">
            Resources
          </h4>
          <ul className="mt-4 space-y-2 text-sm font-medium text-gray-400">
            <li><Link href="/support" className="hover:text-blue-400 transition-colors">Support</Link></li>
            <li><Link href="/docs" className="hover:text-blue-400 transition-colors">Docs</Link></li>
            <li><Link href="/status" className="hover:text-blue-400 transition-colors">System Status</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">
            Legal
          </h4>
          <ul className="mt-4 space-y-2 text-sm font-medium text-gray-400">
            <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms</Link></li>
            <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">
            Updates
          </h4>

          <p className="mt-4 text-sm text-gray-400">
            Get early access updates on the Tikkety MVP launch.
          </p>

          {!subscribed ? (
            <form
              onSubmit={handleSubscribe}
              className="mt-3 flex bg-gray-800 border border-gray-700 rounded-lg overflow-hidden focus-within:border-blue-500 transition-colors"
            >
              <input
                type="email"
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 bg-transparent text-sm text-white focus:outline-none px-3 py-2 placeholder:text-gray-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-3 py-2 hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <span className="inline-block mt-3 text-xs text-emerald-400 font-medium bg-emerald-950/50 border border-emerald-800/50 rounded-lg px-3 py-1">
              You're on the list
            </span>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-xs text-gray-500 font-medium">
          © {new Date().getFullYear()} Tikkety. All rights reserved.
        </span>

        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
          <Globe className="w-3.5 h-3.5" />
          <span>English (US)</span>
        </div>
      </div>
    </footer>
  );
}