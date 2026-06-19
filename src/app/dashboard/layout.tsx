import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/layout/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 🔐 PROTECTED ROUTE LAYER 1 (Edge Authentication Guard)
  if (!user) {
    redirect("/login");
  }

  // Fetch the user's active database profile to populate the Shell
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    redirect("/login");
  }

  // Pass user information and the real-time database profile into the responsive Client DashboardShell
  return <DashboardShell user={user} profile={profile}>{children}</DashboardShell>;
}
