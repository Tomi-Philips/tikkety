"use client";

import Link from 'next/link';
import { Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Reset password</h2>
          <p className="text-gray-500 text-sm">We'll send you a link to reset your password</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2" htmlFor="email">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Send reset link
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Check your email</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              We've sent a password reset link to <span className="font-medium text-gray-700">{email}</span>
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors hover:underline underline-offset-4"
            >
              Try another email
            </button>
          </div>
        )}

        {/* Back to login link */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Remember your password?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700 transition-colors hover:underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}