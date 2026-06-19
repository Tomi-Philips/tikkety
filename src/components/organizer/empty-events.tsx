// empty-events.tsx
import Link from "next/link";
import { Calendar, ArrowRight, Sparkles, Plus } from "lucide-react";

export default function EmptyEvents() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-zinc-50/80 dark:from-zinc-900/80 dark:to-zinc-950/80 backdrop-blur-sm rounded-3xl p-12 border-2 border-dashed border-zinc-300/60 dark:border-zinc-800/60 flex flex-col items-center justify-center text-center space-y-6 transition-all duration-300 hover:border-violet-500/40 hover:shadow-2xl">

      {/* Decorative background circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/5 to-blue-500/5 rounded-full blur-3xl" />

      {/* Animated icon */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-3xl blur-xl animate-pulse" />
        <div className="relative w-24 h-24 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-violet-500/30">
          <Calendar className="w-12 h-12 text-white" />
        </div>
        <div className="absolute -top-2 -right-2">
          <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>

      <div className="max-w-md space-y-3 relative z-10">
        <h4 className="text-2xl font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
          No events created yet
        </h4>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Your Organizer Studio is empty! Design your first event banner, configure ticketing, and launch your booking flow to the campus community today.
        </p>
      </div>

      <Link
        href="/dashboard/organizer/create-event"
        className="group relative inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-bold px-8 py-3.5 rounded-2xl text-sm transition-all duration-200 hover:scale-[1.02] shadow-xl shadow-zinc-900/20 dark:shadow-white/10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        <Plus className="w-4 h-4 relative z-10" />
        <span className="relative z-10">Build Your First Event</span>
        <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}