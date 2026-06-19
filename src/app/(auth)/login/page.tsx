"use client";

import Link from 'next/link';
import { Mail, Lock, ArrowRight, Fingerprint, Shield, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

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

      // Fetch user profile role from the database.
      // Retry up to 3 times with 500ms delay to handle the rare case where
      // the DB trigger that creates the profile row hasn't committed yet.
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

      if (role === "organizer") {
        router.push("/dashboard/organizer");
        await router.refresh();
      } else if (role === "admin") {
        router.push("/dashboard/admin");
        await router.refresh();
      } else {
        router.push("/dashboard/user");
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
    <div className="relative">
      {/* Floating card */}
      <div className="relative bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl shadow-blue-500/10 dark:shadow-black/80 border border-zinc-200 dark:border-zinc-800/80 p-8 transition-all duration-300 hover:shadow-3xl">

        {/* Security badge */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium px-3 py-1 rounded-full border border-blue-200 dark:border-blue-500/20">
            <Shield className="w-3 h-3" />
            <span>Secure login</span>
          </div>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent mb-2">
            Welcome back
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Sign in to continue to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div className="group space-y-1.5">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2" htmlFor="email">
              <Mail className="w-3.5 h-3.5 text-blue-500" />
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-blue-500 transition-colors">
                <Mail className="h-4 w-4" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950/50 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-200 text-zinc-900 dark:text-white placeholder:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="group space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2" htmlFor="password">
                <Lock className="w-3.5 h-3.5 text-blue-500" />
                Password
              </label>
              <Link href="/forgot-password" className="text-xs font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors hover:underline underline-offset-4">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-blue-500 transition-colors">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-11 pr-11 py-3 bg-zinc-50 dark:bg-zinc-950/50 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-200 text-zinc-900 dark:text-white placeholder:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember me checkbox */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="peer sr-only"
                />
                <div className="w-4 h-4 rounded border-2 border-zinc-300 dark:border-zinc-600 peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-all duration-200"></div>
                <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none text-white scale-0 peer-checked:scale-100 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                Remember me
              </span>
            </label>

            <button type="button" className="text-xs text-zinc-400 hover:text-blue-500 transition-colors flex items-center gap-1">
              <Fingerprint className="w-3 h-3" />
              Biometric login
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="relative w-full group overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-4 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="relative flex items-center justify-center gap-2">
                  Sign in
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white/90 dark:bg-zinc-900/90 text-zinc-400 backdrop-blur-sm">Or continue with</span>
            </div>
          </div>
        </div>

        {/* Sign up link */}
        <div className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Don&apost have an account?{' '}
          <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors hover:underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}