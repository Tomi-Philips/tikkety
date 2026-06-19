"use client";

import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Sparkles, CheckCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"user" | "organizer">("user");

  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create auth user with metadata
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;

      if (!data.user) {
        throw new Error("User creation failed");
      }

      toast.success("Registration successful!");

      // Redirect to verify email page
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
      await router.refresh();

    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Floating card */}
      <div className="relative bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl shadow-blue-500/10 dark:shadow-black/80 border border-zinc-200 dark:border-zinc-800/80 p-8 transition-all duration-300 hover:shadow-3xl">
        {/* Success badge */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20">
            <Sparkles className="w-3 h-3" />
            <span>Join 10,000+ users</span>
          </div>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent mb-2">
            Create an account
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Start your journey with Tikkety today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Full Name Input */}
          <div className="group space-y-1.5">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2" htmlFor="name">
              <User className="w-3.5 h-3.5 text-blue-500" />
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-blue-500 transition-colors">
                <User className="h-4 w-4" />
              </div>
              <input
                id="name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950/50 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-200 text-zinc-900 dark:text-white placeholder:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
                placeholder="John Doe"
              />
            </div>
          </div>

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
                className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950/50 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-200 text-zinc-900 dark:text-white placeholder:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="group space-y-1.5">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2" htmlFor="password">
              <Lock className="w-3.5 h-3.5 text-blue-500" />
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-blue-500 transition-colors">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3 bg-zinc-50 dark:bg-zinc-950/50 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-200 text-zinc-900 dark:text-white placeholder:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
                placeholder="Create a strong password"
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
            <p className="text-xs text-zinc-400 mt-1">At least 8 characters</p>
          </div>

          {/* Account Type Selection */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 flex items-center gap-2 uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-blue-500" />
              I am a
            </label>

            <div className="grid grid-cols-2 gap-4">
              {/* Attendee Option */}
              <label className={`group relative flex flex-col gap-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 ease-out
                ${role === 'user'
                  ? 'bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/40 dark:to-blue-900/20 shadow-lg shadow-blue-500/10 border-blue-500 dark:border-blue-400'
                  : 'bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md hover:scale-[1.02]'
                } border-2 backdrop-blur-sm`}>

                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === 'user'}
                    onChange={(e) => setRole(e.target.value as "user" | "organizer")}
                    className="mt-0.5 w-4.5 h-4.5 text-blue-600 focus:ring-blue-500 focus:ring-2 focus:ring-offset-1 border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800"
                  />
                  <div className="space-y-1">
                    <p className={`font-bold text-base transition-colors duration-200
                      ${role === 'user'
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-zinc-800 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                      }`}>
                      Attendee
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      Discover & buy tickets
                    </p>
                  </div>
                </div>

                {role === 'user' && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 dark:text-blue-400 drop-shadow-sm" />
                  </div>
                )}
              </label>

              {/* Organizer Option */}
              <label className={`group relative flex flex-col gap-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 ease-out
                ${role === 'organizer'
                  ? 'bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/40 dark:to-blue-900/20 shadow-lg shadow-blue-500/10 border-blue-500 dark:border-blue-400'
                  : 'bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md hover:scale-[1.02]'
                } border-2 backdrop-blur-sm`}>

                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="role"
                    value="organizer"
                    checked={role === 'organizer'}
                    onChange={(e) => setRole(e.target.value as "user" | "organizer")}
                    className="mt-0.5 w-4.5 h-4.5 text-blue-600 focus:ring-blue-500 focus:ring-2 focus:ring-offset-1 border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800"
                  />
                  <div className="space-y-1">
                    <p className={`font-bold text-base transition-colors duration-200
                      ${role === 'organizer'
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-zinc-800 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                      }`}>
                      Organizer
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      Create & manage events
                    </p>
                  </div>
                </div>

                {role === 'organizer' && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 dark:text-blue-400 drop-shadow-sm" />
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="relative w-full group overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-4 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating account...</span>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="relative flex items-center justify-center gap-2">
                  Create account
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </>
            )}
          </button>
        </form>

        {/* Sign in link */}
        <div className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors hover:underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}