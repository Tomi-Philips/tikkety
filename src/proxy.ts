import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // ── Protected dashboard paths ─────────────────────────────────────────
    "/dashboard/:path*",

    // ── Everything else except: static files, images, favicon, and auth pages.
    //    Auth pages (/login, /register, /verify-email) are intentionally
    //    EXCLUDED so updateSession() never fires on them — that was causing
    //    a double-invocation race that generated an infinite /dashboard→/login
    //    redirect loop.
    '/((?!_next/static|_next/image|favicon.ico|login|register|verify-email|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
