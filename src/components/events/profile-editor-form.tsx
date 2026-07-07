"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User, Mail, Sparkles, Loader2, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

type ProfileEditorFormProps = {
  profile: any;
  user: any;
};

export default function ProfileEditorForm({ profile, user }: ProfileEditorFormProps) {
  const supabase = createClient();
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          avatar_url: avatarUrl,
        })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Profile Info Header */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl font-bold font-sans shadow-md">
            {fullName ? fullName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Account Profile</h3>
            <p className="text-[10px] text-zinc-400">Configure your personal information below.</p>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4 pt-2">
          {/* Email (Read Only) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              Email Address (Read Only)
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-250 dark:border-zinc-800/50 rounded-xl text-sm text-zinc-500 cursor-not-allowed"
            />
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-zinc-850 dark:text-zinc-100"
            />
          </div>

          {/* Avatar Image URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
              <LinkIcon className="w-3.5 h-3.5" />
              Avatar Picture URL
            </label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-zinc-850 dark:text-zinc-100"
            />
          </div>
        </div>

        {/* Save button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving Profile...
            </>
          ) : (
            <>
              Save Changes
              <Sparkles className="w-4 h-4" />
            </>
          )}
        </button>

      </form>
    </div>
  );
}
