import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/" ||
    path === "/login" ||
    path === "/registro" ||
    path === "/registro/paso-2" ||
    path === "/servicios" ||
    path.startsWith("/api/auth");

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

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images).*)"],
};
