import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileEditorForm from "@/components/events/profile-editor-form";
import { User } from "lucide-react";

export default async function AttendeeProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
          <User className="w-6 h-6 text-indigo-600" />
          Edit Profile
        </h1>
        <p className="text-xs text-zinc-400">Update your attendee account profile settings.</p>
      </div>

      <ProfileEditorForm profile={profile} user={user} />
    </div>
  );
}
