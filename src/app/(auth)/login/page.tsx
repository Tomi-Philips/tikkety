"use client";

import Link from 'next/link';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Suspense, useState } from 'react';
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

// Inner component that uses useSearchParams — must live inside a Suspense boundary
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: authData, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) throw error;

      if (!authData.user) {
        throw new Error("Login failed");
      }

      toast.success("Welcome back!");

      let profile: { role: string } | null = null;
      for (let attempt = 1; attempt <= 3; attempt++) {
        const { data } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", authData.user.id)
          .single();
        profile = data as { role: string } | null;
        if (profile) break;
        await new Promise(r => setTimeout(r, 500));
      }

      if (!profile) {
        await supabase.auth.signOut();
        throw new Error("User profile not found in database. Please ensure your database tables/triggers are set up and email is confirmed.");
      }

      const role = profile.role;
      const redirectTo = searchParams.get("redirectTo");

      if (role === "organizer") {
        router.push("/dashboard/organizer");
        await router.refresh();
      } else if (role === "admin") {
        router.push("/dashboard/admin");
        await router.refresh();
      } else {
        router.push(redirectTo || "/dashboard/attendee");
        await router.refresh();
      }

    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-gray-500 text-sm">Sign in to continue to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
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

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2" htmlFor="password">
                <Lock className="w-3.5 h-3.5 text-gray-400" />
                Password
              </label>
              <Link href="/forgot-password" className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors hover:underline underline-offset-4">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" className="peer sr-only" />
                <div className="w-4 h-4 rounded border-2 border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-all"></div>
                <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none text-white scale-0 peer-checked:scale-100 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                Remember me
              </span>
            </label>
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
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                Sign in
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </button>
        </form>

        {/* Sign up link */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-700 transition-colors hover:underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

// Outer page wraps LoginForm in Suspense to satisfy Next.js App Router
// requirement that useSearchParams() be inside a Suspense boundary.
export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}