import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 🛡️ LAYER 2: DB-Aware Security Guard for the User Segment
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !profile || profile.role !== "user") {
    // Deflect unauthorized role attempts
    const actualRole = profile?.role || "user";
    redirect(actualRole === "admin" ? "/dashboard/admin" : "/dashboard/organizer");
  }

  return <>{children}</>;
}
