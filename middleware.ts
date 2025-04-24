/**
 * Next.js Middleware
 *
 * This middleware runs on every request and handles:
 * 1. Authentication checks for protected routes
 * 2. Redirecting authenticated users away from public routes
 * 3. Redirecting unauthenticated users to login
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

/**
 * Middleware function that runs on each request
 * @param {NextRequest} request - The incoming request
 * @returns {NextResponse} The response or next middleware
 */
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/" ||
    path === "/login" ||
    path === "/registro" ||
    path === "/registro/paso-2" ||
    path === "/servicios" ||
    path.startsWith("/api/auth") ||
    path.startsWith("/admin") || // Allow admin routes without authentication
    path.startsWith("/api/admin"); // Allow admin API routes without authentication

  // Define protected paths that require authentication
  const isProtectedPath =
    path.startsWith("/dashboard") ||
    path === "/profile" ||
    path === "/change-password" ||
    path.startsWith("/api/user") ||
    path.startsWith("/api/upload-documents");

  // Get the token from the cookies
  const token = request.cookies.get("auth_token")?.value;

  // If the path requires authentication and there's no token, redirect to login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is logged in and trying to access login/register pages, redirect to dashboard
  if (
    isPublicPath &&
    token &&
    (path === "/login" || path === "/registro" || path === "/registro/paso-2")
  ) {
    try {
      // Verify token
      const decoded = verifyToken(token);
      if (decoded) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (err) {
      // If token verification fails, continue to the login page
      console.error("Token verification error:", err);
    }
  }

  // Continue to the requested page
  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images).*)"],
};
