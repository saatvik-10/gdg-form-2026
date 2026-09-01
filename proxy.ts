import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REGISTRATION_DEADLINE = new Date(
  "2026-09-15T23:59:59+05:30"
);

export function proxy(request: NextRequest) {
  const now = new Date();

  const isClosed = now >= REGISTRATION_DEADLINE;

  if (
    isClosed &&
    request.nextUrl.pathname !== "/registration-closed"
  ) {
    return NextResponse.redirect(
      new URL("/registration-closed", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|assets|favicon.ico).*)",
  ],
};