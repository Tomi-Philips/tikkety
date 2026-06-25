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

      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
      await router.refresh();

    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
          <p className="text-gray-500 text-sm">Start your journey with Tikkety today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2" htmlFor="name">
              <User className="w-3.5 h-3.5 text-gray-400" />
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User className="h-4 w-4" />
              </div>
              <input
                id="name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
                placeholder="John Doe"
              />
            </div>
          </div>

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
                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2" htmlFor="password">
              <Lock className="w-3.5 h-3.5 text-gray-400" />
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-400">At least 8 characters</p>
          </div>

          {/* Account Type */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gray-400" />
              I am a
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className={`relative flex flex-col gap-1 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                role === 'user'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}>
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === 'user'}
                    onChange={(e) => setRole(e.target.value as "user" | "organizer")}
                    className="mt-0.5 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div>
                    <p className={`font-semibold text-sm ${
                      role === 'user' ? 'text-blue-700' : 'text-gray-800'
                    }`}>
                      Attendee
                    </p>
                    <p className="text-xs text-gray-500">Discover & buy tickets</p>
                  </div>
                </div>
                {role === 'user' && (
                  <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-blue-500" />
                )}
              </label>

              <label className={`relative flex flex-col gap-1 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                role === 'organizer'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}>
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="role"
                    value="organizer"
                    checked={role === 'organizer'}
                    onChange={(e) => setRole(e.target.value as "user" | "organizer")}
                    className="mt-0.5 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div>
                    <p className={`font-semibold text-sm ${
                      role === 'organizer' ? 'text-blue-700' : 'text-gray-800'
                    }`}>
                      Organizer
                    </p>
                    <p className="text-xs text-gray-500">Create & manage events</p>
                  </div>
                </div>
                {role === 'organizer' && (
                  <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-blue-500" />
                )}
              </label>
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
                <span>Creating account...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                Create account
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </button>
        </form>

        {/* Sign in link */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700 transition-colors hover:underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}