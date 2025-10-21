// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  // Prepare a response we can mutate cookies on
  const res = NextResponse.next();

  // Create a Supabase client bound to request/response cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value ?? null;
        },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          // Remove cookie by setting empty value + past expiry
          res.cookies.set({
            name,
            value: "",
            ...options,
            expires: new Date(0),
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // App routes that require auth
  const isAppRoute =
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/live-readings") ||
    req.nextUrl.pathname.startsWith("/historical-logs") ||
    req.nextUrl.pathname.startsWith("/export-data") ||
    req.nextUrl.pathname.startsWith("/settings") ||
    req.nextUrl.pathname.startsWith("/about");

  // If unauthenticated and trying to access a protected route -> /login
  if (isAppRoute && !session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectedFrom", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // If authenticated and visiting the landing page -> /dashboard
  if (req.nextUrl.pathname === "/" && session) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return res;
}

// Match the routes you want middleware to run on
export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/live-readings/:path*",
    "/historical-logs/:path*",
    "/export-data/:path*",
    "/settings/:path*",
    "/about/:path*",
    "/login",
  ],
};
