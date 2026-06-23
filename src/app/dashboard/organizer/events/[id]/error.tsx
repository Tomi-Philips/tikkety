"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, RotateCcw, ArrowLeft } from "lucide-react";

export default function EventError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("[EventError]", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-6 animate-in fade-in duration-300">
      <div className="w-16 h-16 rounded-3xl bg-red-100 dark:bg-red-950/30 flex items-center justify-center text-red-600 dark:text-red-400 shadow-lg shadow-red-500/10">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="max-w-md space-y-2">
        <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
          Something went wrong
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          We couldn't load this event page. It may have been removed or there was a temporary connection issue.
        </p>
        {error?.digest && (
          <p className="text-xs font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg inline-block">
            Error ID: {error.digest}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/dashboard/organizer")}
          className="inline-flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-semibold px-5 py-2.5 rounded-2xl text-sm transition-all duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Studio
        </button>
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 font-bold px-5 py-2.5 rounded-2xl text-sm transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-zinc-900/10"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
