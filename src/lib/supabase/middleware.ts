import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {

  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Route protection logic
  const isAuthRoute =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register') ||
    request.nextUrl.pathname.startsWith('/verify-email');

  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');

  // If user is not logged in and tries to access dashboard, redirect to login
  if (!user && isDashboardRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // If user is logged in and tries to access auth pages, redirect to /dashboard.
  // The /dashboard page reads the DB and routes to the correct role sub-dashboard.
  // We deliberately do NOT use user_metadata.role here because it may be stale/unset,
  // causing a desync with the database that produces an infinite redirect loop.
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // ⚠️  RBAC (role-segment enforcement) is intentionally NOT handled here.
  //    The proxy only has access to the JWT (user_metadata), which can be stale
  //    or unset, while each layout reads the authoritative role from the database.
  //    Doing RBAC in both places with different data sources causes redirect loops.
  //    Role enforcement is delegated entirely to each segment's layout.tsx.

  return response;
}