import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

// const protectedRoutes = ["/user"]; // Protected routes for unauthenticated users
// const publicRoutes = ["/auth", "/auth/register", "/api/auth/signin"]; // Routes where authenticated users shouldn't go
const protectedRoutes = ["/user"];
export default async function middleware(request: NextRequest) {
  const session = await auth();

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
    // Handle protected routes (like /user)
    if (protectedRoutes.some((route) => pathname.startsWith(route)) && !session) {
      // Redirect unauthenticated users to the login page
      return NextResponse.redirect(new URL("/auth", request.url));
    }

  //   // Handle routes like /auth and /auth/register
  //   if (publicRoutes.some((route) => pathname.startsWith(route)) && session) {
  //     // Redirect authenticated users to the homepage or dashboard
  //     return NextResponse.redirect(new URL("/", request.url)); // Or replace `/` with `/dashboard`
  //   }

  return NextResponse.next();
}
