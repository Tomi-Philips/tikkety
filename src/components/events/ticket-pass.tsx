"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import TicketQrCode from "./ticket-qr-code";
import { Download, Share2, Wallet, ArrowLeft, Printer, Calendar, Clock, MapPin, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";

type TicketPassProps = {
  ticket: any;
  profile: any;
};

export default function TicketPass({ ticket, profile }: TicketPassProps) {
  const [downloading, setDownloading] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${ticket.events.title} Ticket`,
        text: `Check out my ticket for ${ticket.events.title}!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard! Share it with friends.");
    }
  };

  const eventDate = new Date(ticket.events.event_date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div className="space-y-8 max-w-md mx-auto print:max-w-full">
      {/* Back Link (Hidden on Print) */}
      <Link
        href="/dashboard/attendee/tickets"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors print:hidden cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to My Tickets
      </Link>

      {/* TICKET WRAPPER */}
      <div 
        ref={ticketRef}
        className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-850 rounded-[32px] shadow-2xl overflow-hidden print:border-0 print:shadow-none relative"
      >
        {/* Glow indicator */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-violet-600 to-indigo-600" />

        {/* Banner/Header */}
        <div className="relative aspect-[16/7] w-full bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-zinc-800 dark:to-zinc-850">
          {ticket.events.banner_url ? (
            <img 
              src={ticket.events.banner_url} 
              alt={ticket.events.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-indigo-400 dark:text-zinc-600">
              <Sparkles className="w-10 h-10" />
            </div>
          )}
          
          {/* Transparent Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Badge Overlay */}
          <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-black border border-zinc-200/20 text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            {ticket.ticket_types.name} PASS
          </div>
        </div>

        {/* Ticket Content Area */}
        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <h1 className="text-xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
              {ticket.events.title}
            </h1>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">
              {ticket.events.category || "CAMPUS EVENT"}
            </p>
          </div>

          {/* Time & Venue list */}
          <div className="grid grid-cols-1 gap-3 text-xs text-zinc-600 dark:text-zinc-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center border border-zinc-150 dark:border-zinc-700/60 text-zinc-400">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-zinc-900 dark:text-white">{formattedDate}</p>
                <p className="text-[10px] text-zinc-400">Date</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center border border-zinc-150 dark:border-zinc-700/60 text-zinc-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-zinc-900 dark:text-white">{formattedTime}</p>
                <p className="text-[10px] text-zinc-400">Door Time</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center border border-zinc-150 dark:border-zinc-700/60 text-zinc-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-zinc-900 dark:text-white line-clamp-1">{ticket.events.location}</p>
                <p className="text-[10px] text-zinc-400">Venue</p>
              </div>
            </div>
          </div>
        </div>

        {/* MOCK TICKET STUB DECORATIVE DIVIDER */}
        <div className="relative z-10 print:hidden">
          {/* Half-circles */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-100 dark:bg-zinc-950 rounded-full border-r border-zinc-200 dark:border-zinc-800" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-100 dark:bg-zinc-950 rounded-full border-l border-zinc-200 dark:border-zinc-800" />
          {/* Dash line */}
          <div className="border-t-2 border-dashed border-zinc-150 dark:border-zinc-800/80 my-1 mx-4" />
        </div>

        {/* Ticket QR Stub */}
        <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col items-center justify-center text-center space-y-4">
          
          <TicketQrCode value={ticket.qr_code} />

          <div className="space-y-0.5">
            <p className="text-xs font-black text-zinc-900 dark:text-white tracking-widest font-mono">
              {ticket.qr_code}
            </p>
            <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
              Scan QR code at entry gate
            </p>
          </div>

          {/* Ticket metadata info block */}
          <div className="grid grid-cols-3 gap-2 w-full pt-4 border-t border-zinc-200/50 dark:border-zinc-800/60 text-center">
            <div>
              <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Ticket Owner</p>
              <p className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200 truncate px-1">
                {profile?.full_name || "Attendee"}
              </p>
            </div>
            <div>
              <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Admission</p>
              <p className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200">
                {ticket.admissions_used}/{ticket.admission_limit} Limit
              </p>
            </div>
            <div>
              <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Order No</p>
              <p className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200 font-mono">
                #{ticket.order_id.slice(0, 6).toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS ROW (Hidden on Print) */}
      <div className="grid grid-cols-3 gap-3 print:hidden">
        <button
          onClick={handlePrint}
          className="flex flex-col items-center justify-center gap-1.5 p-3 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4 text-zinc-400" />
          <span>Print Pass</span>
        </button>

        <button
          onClick={handleShare}
          className="flex flex-col items-center justify-center gap-1.5 p-3 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-zinc-400" />
          <span>Share Ticket</span>
        </button>

        <button
          onClick={() => toast.info("Apple Wallet integrations are coming soon in V2!")}
          className="relative flex flex-col items-center justify-center gap-1.5 p-3 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-xs font-bold text-zinc-400 dark:text-zinc-500 cursor-pointer"
        >
          <span className="absolute -top-2 px-1.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-[8px] font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-100">
            Soon
          </span>
          <Wallet className="w-4 h-4 text-zinc-300 dark:text-zinc-700" />
          <span>Add to Wallet</span>
        </button>
      </div>
    </div>
  );
}
