import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

   if (hostname === 'photo.skdevents.lk') {
    
   if (url.pathname.match(/\.(png|jpe?g|svg|webp|gif|ico)$/i)) {
      return NextResponse.next();
    }

    if (url.pathname === '/') {
      url.pathname = '/photo-form';
      return NextResponse.rewrite(url);
    }

    return NextResponse.redirect(`https://skdevents.lk${url.pathname}`);
  }

  return NextResponse.next();
}

export const config = {
   matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};