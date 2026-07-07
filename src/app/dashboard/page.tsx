import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Traffic Cop role redirection (100% Database-Aware)
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = profile?.role || "user";

  if (role === "organizer") {
    redirect("/dashboard/organizer");
  } else if (role === "admin") {
    redirect("/dashboard/admin");
  } else {
    redirect("/dashboard/attendee");
  }
}
