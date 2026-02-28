import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/welcome"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const { pathname } = req.nextUrl;
  const hasOnboarded = req.cookies.get("onboarded")?.value === "true";

  // Logged-in users should never see the welcome page
  if (pathname === "/welcome" && userId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Already onboarded but not logged in — let them through to sign-in / protected routes
  // Not onboarded and not logged in — redirect to welcome (except sign-in & welcome themselves)
  if (!userId && !hasOnboarded && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/welcome", req.url));
  }

  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
