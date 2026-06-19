"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function OrganizerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an analytics or error tracking service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-red-100 dark:bg-red-950/30 flex items-center justify-center text-red-600 dark:text-red-400 shadow-lg shadow-red-500/10">
        <AlertCircle className="w-8 h-8" />
      </div>
      
      <div className="max-w-md space-y-2">
        <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
          Something went wrong
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          We encountered an issue loading your Organizer Studio data. This could be due to a temporary connection interruption.
        </p>
      </div>

      <button
        onClick={() => reset()}
        className="inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 font-bold px-6 py-3 rounded-2xl text-sm transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-zinc-900/10 dark:shadow-white/5"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Try Again</span>
      </button>
    </div>
  );
}
