"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { signOutAction } from "@/app/actions/auth-actions";
import { Settings, Sun, Moon, Trash2, LogOut, Loader2, AlertOctagon } from "lucide-react";
import { toast } from "sonner";

export default function SettingsManager() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOutAction();
      await supabase.auth.signOut();
      toast.success("Logged out successfully!");
      router.push("/login");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Sign out failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    toast.error("Account deletion is restricted in this MVP preview sandbox.");
  };

  const toggleTheme = () => {
    const nextTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(nextTheme);
    toast.success(`Theme preference updated to ${nextTheme} mode!`);
  };

  return (
    <div className="max-w-xl space-y-6">
      
      {/* Visual Settings Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">Preferences</h3>
          <p className="text-xs text-zinc-400">Configure visual themes and appearance styles.</p>
        </div>

        {/* Theme select option */}
        <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <div>
            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Color Theme</p>
            <p className="text-[10px] text-zinc-400">Switch between light and dark backgrounds.</p>
          </div>
          
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-850 cursor-pointer transition-colors"
          >
            {themeMode === "light" ? (
              <>
                <Sun className="w-4 h-4 text-amber-500" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-400" />
                Dark Mode
              </>
            )}
          </button>
        </div>
      </div>

      {/* Danger Zone Card */}
      <div className="bg-white dark:bg-zinc-900 border border-red-100 dark:border-red-950/20 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center text-red-500">
            <AlertOctagon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-red-600 dark:text-red-400 mb-0.5">Danger Zone</h3>
            <p className="text-[10px] text-zinc-400">High-risk actions that could cause data loss.</p>
          </div>
        </div>

        <div className="border-t border-red-50 dark:border-red-950/20 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Delete Account</p>
            <p className="text-[10px] text-zinc-400">Permanently delete your profile and booking history.</p>
          </div>

          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/30 border border-red-200/50 text-red-600 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        </div>
      </div>

      {/* Sign Out Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-zinc-850 dark:text-zinc-200">Sign Out</p>
          <p className="text-[10px] text-zinc-400">Sign out of this session on this device.</p>
        </div>
        
        <button
          onClick={handleLogout}
          disabled={loading}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <LogOut className="w-4 h-4" />
          )}
          <span>Sign Out</span>
        </button>
      </div>

    </div>
  );
}
