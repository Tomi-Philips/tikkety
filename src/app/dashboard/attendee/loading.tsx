import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
      <p className="text-xs text-zinc-400 font-semibold tracking-wider uppercase">Loading Dashboard...</p>
    </div>
  );
}
