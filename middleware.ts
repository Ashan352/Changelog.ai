import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ratelimit } from "@/lib/ratelimit";

const { auth } = NextAuth(authConfig);

// Global Security Headers Configuration
const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
};

export default auth(async (req) => {
  const { nextUrl, auth: session } = req;
  const isApiRoute = nextUrl.pathname.startsWith("/api");
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");
  const isAuthRoute = nextUrl.pathname.startsWith("/api/auth") || nextUrl.pathname.startsWith("/login");
  const isWebhookRoute = nextUrl.pathname.startsWith("/api/stripe/webhook");

  // ─── Pro Feature Gate ─────────────────────────────────────────────────────
  // Set NEXT_PUBLIC_PRO_ENABLED=true in .env to open billing/pricing routes.
  // While false (default), any attempt to visit those pages lands on the
  // "coming soon" page instead — the actual routes are untouched/preserved.
  const isProEnabled = process.env.NEXT_PUBLIC_PRO_ENABLED === "true";
  const isProRoute =
    nextUrl.pathname.startsWith("/dashboard/billing") ||
    nextUrl.pathname.startsWith("/dashboard/pricing") ||
    nextUrl.pathname.startsWith("/api/stripe");

  if (!isProEnabled && isProRoute && !isWebhookRoute) {
    return NextResponse.redirect(new URL("/pro-coming-soon", nextUrl));
  }
  // ─────────────────────────────────────────────────────────────────────────

  // 0. Bypass everything for Stripe webhooks
  if (isWebhookRoute) {
    return NextResponse.next();
  }

  // 1. Edge-based Rate Limiting (Protects Serverless Invocations)
  if (isApiRoute && !isAuthRoute) {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    // For API calls, we use IP or User ID if authenticated
    const identifier = session?.user?.id || ip;
    
    if (ratelimit) {
      const { success, limit, reset, remaining } = await ratelimit.limit(`mw_${identifier}`);
      
      if (!success) {
        return new NextResponse(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        });
      }
    }
  }

  // 2. Authentication Protection
  if (isDashboardRoute && !session) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 3. Response Construction with Security Headers
  const response = NextResponse.next();
  
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
