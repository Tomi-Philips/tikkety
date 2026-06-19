import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
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

  // 🛡️ LAYER 2: DB-Aware Security Guard for the Admin Segment
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !profile || profile.role !== "admin") {
    // Deflect unauthorized role attempts
    const actualRole = profile?.role || "user";
    redirect(actualRole === "organizer" ? "/dashboard/organizer" : "/dashboard/user");
  }

  return <>{children}</>;
}
