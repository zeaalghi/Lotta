import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/id") {
    return NextResponse.redirect(new URL("/", request.url), 308);
  }

  if (pathname.startsWith("/id/")) {
    const canonicalPath = pathname.replace(/^\/id/, "");
    return NextResponse.redirect(
      new URL(canonicalPath || "/", request.url),
      308
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|apple-icon.png|icon.png|.*\\..*).*)",
  ],
};
