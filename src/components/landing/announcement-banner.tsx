"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function AnnouncementBanner() {
  return (
    <div className="relative w-full py-2 md:py-1.5 min-h-10 text-center z-45 striped-banner border-b border-indigo-500/20 flex items-center justify-center">
      <div className="relative z-10 flex items-center justify-center gap-x-2 gap-y-1 text-[11px] md:text-xs font-semibold text-white px-4 flex-wrap leading-tight">
        <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-extrabold text-indigo-300 shrink-0">
          <Sparkles className="w-2.5 h-2.5 text-indigo-300 animate-pulse" />
          Launch Announcement
        </span>
        <span className="text-zinc-200">
          Tikkety is the ultimate modern event ticketing platform, and we are about to launch!
        </span>
        <Link
          href="/waitlist"
          className="inline-flex items-center gap-0.5 text-indigo-300 hover:text-white transition-colors underline decoration-1 underline-offset-2 font-bold ml-1 shrink-0"
        >
          Join Waitlist <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
