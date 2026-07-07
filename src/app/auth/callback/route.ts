import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    
    // PKCE handles the exchange automatically
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Fetch the profile to determine role-based routing (100% Database-Aware)
      const { data: { user } } = await supabase.auth.getUser();
      let targetPath = "/dashboard/attendee";
      
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
          
        const role = profile?.role || "user";
        
        if (role === "organizer") {
          targetPath = "/dashboard/organizer";
        } else if (role === "admin") {
          targetPath = "/dashboard/admin";
        }
      }

      return NextResponse.redirect(`${origin}${targetPath}`);
    }
  }

  // If there's an error or no code, redirect to login with an error flag
  return NextResponse.redirect(`${origin}/login?error=auth-code-failed`);
}
