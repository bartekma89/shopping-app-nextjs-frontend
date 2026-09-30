import { type NextRequest, NextResponse } from "next/server";

import { guestOnlyPaths } from "@/lib/constants";
import { hasAuthCookie } from "./features/auth/session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute = guestOnlyPaths.includes(pathname);
  const isAuth = await hasAuthCookie();

  if (!isAuth && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isAuth && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)$).*)",
  ],
};
