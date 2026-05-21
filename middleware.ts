import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

 if (hostname === 'photo.skdevents.lk') {
    url.pathname = `/photo-form${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
   matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};