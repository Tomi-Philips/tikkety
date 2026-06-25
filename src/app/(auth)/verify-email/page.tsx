"use client";

import Link from "next/link";
import { MailCheck, ArrowLeft, Clock, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Icon */}
          <div className="relative">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center border-2 border-blue-200">
              <MailCheck className="w-10 h-10 text-blue-600" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
              <Clock className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* Text content */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Verify your email
            </h2>
            <p className="text-gray-500 text-base max-w-sm mx-auto leading-relaxed">
              We've sent a verification link to
            </p>
            <div className="inline-block px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
              <span className="font-mono font-semibold text-blue-700 text-sm md:text-base">
                {email || "your@email.com"}
              </span>
            </div>
          </div>

          {/* Help card */}
          <div className="w-full bg-gray-50 rounded-xl p-5 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                </div>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800 text-sm mb-2">
                  Didn't receive the email?
                </p>
                <ul className="space-y-1.5 text-sm text-gray-500">
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
            className="group flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors py-2 px-4"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to login
          </Link>
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
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      }>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}