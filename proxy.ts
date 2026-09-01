import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const REGISTRATION_DEADLINE = new Date('2026-09-15T23:59:59+05:30');

const PUBLIC_PATHS = ['/', '/login', '/api/auth'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const now = new Date();
  const isClosed = now >= REGISTRATION_DEADLINE;

  if (isClosed && pathname !== '/registration-closed') {
    return NextResponse.redirect(new URL('/registration-closed', request.url));
  }

  const isPublic = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (isPublic) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|assets|favicon.ico).*)'],
};
