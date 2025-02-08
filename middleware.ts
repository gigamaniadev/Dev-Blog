import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Remove trailing slashes
  if (
    request.nextUrl.pathname.endsWith("/") &&
    request.nextUrl.pathname.length > 1
  ) {
    return NextResponse.redirect(
      new URL(request.nextUrl.pathname.slice(0, -1), request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
