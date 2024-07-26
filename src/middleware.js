import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

export function middleware(req) {
  const token = req.cookies.get("accessToken")?.value;
  const { pathname, origin } = req.nextUrl;

  // Check if API auth route
  const isApiAuthRoute = pathname.includes(apiAuthPrefix);

  // Check if admin route
  const isAdminRoute = pathname.includes("/admin");

  // Check if public route
  const isPublicRoute = publicRoutes.includes(pathname);

  // Check if auth route (Login page)
  const isAuthRoute = authRoutes.includes(pathname);

  // Allow access to API auth routes without checking the token
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // If the route is public, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check if token is present
  if (token) {
    try {
      console.log("Token found. Verifying...");
      // Verify token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      jwtVerify(token, secret);

      // If authenticated and trying to access login, redirect to home
      if (isAuthRoute) {
        console.log("Authenticated. Redirecting to /admin.");
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, origin));
      }
      // Continue to the requested page
      return NextResponse.next();
    } catch (error) {
      console.log("Invalid token. Redirecting to /admin/login.", error);
      if (isAdminRoute) {
        return NextResponse.redirect(new URL("/admin/login", origin));
      }
      // Continue to the requested page
      const response = NextResponse.next();
      response.headers.set('Cache-Control', 'no-store');
      return response;
    }
  } else {
    console.log("No token found. Redirecting to /admin/login.");
    if (isAdminRoute && !isAuthRoute) {
      return NextResponse.redirect(new URL("/admin/login", origin));
    }
    // Allow access to public or authentication routes
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store');
    return response;
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico).*)", // Exclude static files and images
//     "/(api|trpc)(.*)", // Include API and TRPC routes
//   ],
// };
