"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto">
      <div className="w-16 h-16 bg-red-50 dark:bg-red-950/20 rounded-full flex items-center justify-center text-red-500">
        <AlertCircle className="w-8 h-8" />
      </div>
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Something went wrong</h2>
        <p className="text-xs text-zinc-500">We encountered an error loading this dashboard view.</p>
      </div>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-all flex items-center gap-1.5 cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Retry View
      </button>
    </div>
  );
}
