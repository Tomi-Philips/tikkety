// analytics-banner.tsx
import { Sparkles, Rocket } from "lucide-react";

export default function AnalyticsBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-600 rounded-3xl p-6 shadow-xl shadow-blue-500/10 text-white group hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
        <Sparkles className="w-24 h-24 text-white" />
      </div>

      {/* Floating particles */}
      <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-20 pointer-events-none" />

      <div className="relative z-10 flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-1.5 flex items-center justify-center">
            <Rocket className="w-4 h-4 text-white" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">Pro Feature</span>
        </div>
        <div className="space-y-1">
          <h4 className="font-extrabold text-xl leading-snug">Boost Your Campus Event Sales with AI!</h4>
          <p className="text-xs text-white/80 max-w-3xl leading-relaxed">
            Struggling to find the right words? Leverage our integrated AI engine to automatically draft invitation emails, dynamic ticket pricing structures, and social announcements that double your target attendee rate in seconds.
          </p>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-2 bg-white text-blue-700 px-5 py-3 rounded-2xl text-xs font-extrabold hover:bg-violet-50 hover:scale-[1.02] active:scale-95 transition-all shadow-lg self-start md:self-auto shrink-0 group/btn">
        <span>Draft Campaign</span>
        <Sparkles className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform" />
      </div>
    </div>
  );
}