import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { ROUTES } from "./app/common/constants/route-pages";

const protectedRoutes = ["/user"];
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await auth();

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !session) {
    return NextResponse.redirect(new URL(ROUTES.AUTH.SIGN_IN, request.url));
  }
  if (request.nextUrl.pathname.startsWith("/sign-up")) {
    // This logic is only applied to /about
    console.log("INTERCEPTED");
  }

  if (request.nextUrl.pathname.startsWith("/user")) {
    // This logic is only applied to /dashboard
    console.log("INTERCEPTED");
  }
}
