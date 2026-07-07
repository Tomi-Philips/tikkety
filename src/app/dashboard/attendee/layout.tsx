import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AttendeeLayout({
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

  // Security guard for the Attendee segment
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !profile || profile.role !== "user") {
    const actualRole = profile?.role || "user";
    redirect(
      actualRole === "organizer"
        ? "/dashboard/organizer"
        : actualRole === "admin"
        ? "/dashboard/admin"
        : "/login"
    );
  }

  return <>{children}</>;
}
