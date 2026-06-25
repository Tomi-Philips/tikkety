"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function AnnouncementBanner() {
  return (
    <div className="relative w-full py-2 md:py-1.5 min-h-10 text-center striped-banner border-b border-blue-200 flex items-center justify-center">
      <div className="relative z-10 flex items-center justify-center gap-x-2 gap-y-1 text-[11px] md:text-xs font-medium px-4 flex-wrap leading-tight">
        <span className="inline-flex items-center gap-1 bg-white px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-semibold text-blue-700 shrink-0 border border-blue-200">
          <Sparkles className="w-2.5 h-2.5 text-blue-600" />
          Launch Announcement
        </span>
        <span className="text-gray-700">
          Tikkety is the ultimate modern event ticketing platform, and we are about to launch!
        </span>
        <Link
          href="/waitlist"
          className="inline-flex items-center gap-0.5 text-blue-600 hover:text-blue-800 transition-colors underline decoration-1 underline-offset-2 font-semibold ml-1 shrink-0"
        >
          Join Waitlist <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}