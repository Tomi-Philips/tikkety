"use client";

import Link from "next/link";
import { MailCheck, ArrowLeft, Clock, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="relative">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 -right-40 w-80 h-80 bg-emerald-300/20 dark:bg-emerald-500/10 rounded-full blur-[128px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300/10 dark:bg-indigo-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Floating card */}
      <div className="relative bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl shadow-blue-500/10 dark:shadow-black/80 border border-zinc-200 dark:border-zinc-800/80 p-8 md:p-10 transition-all duration-500 hover:shadow-3xl">

        {/* Animated border gradient - subtle */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Decorative dots pattern */}
        <div className="absolute top-6 right-6 opacity-30 pointer-events-none">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="4" r="2" fill="currentColor" className="text-blue-400" />
            <circle cx="16" cy="4" r="2" fill="currentColor" className="text-blue-300" />
            <circle cx="28" cy="4" r="2" fill="currentColor" className="text-blue-400" />
            <circle cx="10" cy="16" r="2" fill="currentColor" className="text-blue-300" />
            <circle cx="22" cy="16" r="2" fill="currentColor" className="text-blue-400" />
            <circle cx="34" cy="16" r="2" fill="currentColor" className="text-blue-300" />
            <circle cx="4" cy="28" r="2" fill="currentColor" className="text-blue-400" />
            <circle cx="16" cy="28" r="2" fill="currentColor" className="text-blue-300" />
            <circle cx="28" cy="28" r="2" fill="currentColor" className="text-blue-400" />
          </svg>
        </div>

        <div className="flex flex-col items-center text-center space-y-8">
          {/* Animated icon */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-2xl animate-ping" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-blue-50 to-white dark:from-blue-500/20 dark:to-blue-500/5 rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-800 shadow-lg shadow-blue-500/20">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-10" />
              <MailCheck className="w-10 h-10 text-blue-500 dark:text-blue-400 animate-in zoom-in duration-500" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-900">
              <Clock className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* Text content */}
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700">
              Verify your email
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-base max-w-sm mx-auto leading-relaxed">
              We've sent a verification link to
            </p>
            <div className="inline-block px-4 py-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-100 dark:border-blue-500/20">
              <span className="font-mono font-semibold text-blue-700 dark:text-blue-300 text-sm md:text-base">
                {email || "your@email.com"}
              </span>
            </div>
          </div>

          {/* Help card - redesigned */}
          <div className="w-full bg-gradient-to-br from-zinc-50/80 to-white/80 dark:from-zinc-900/50 dark:to-zinc-950/50 rounded-2xl p-5 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <div className="text-left">
                <p className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm mb-2">
                  Didn't receive the email?
                </p>
                <ul className="space-y-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-blue-400" />
                    Check your spam or junk folder
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-blue-400" />
                    Verify your email address is correct
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-blue-400" />
                    Wait a few minutes for delivery
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Back to login button */}
          <Link
            href="/login"
            className="group flex items-center justify-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 py-3 px-6 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 -mx-6"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to login
          </Link>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-zinc-500 dark:text-zinc-400 text-sm animate-pulse">Loading...</p>
        </div>
      }>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}