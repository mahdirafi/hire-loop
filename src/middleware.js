import { NextResponse } from 'next/server';

export function middleware(request) {
    // ড্যাশবোর্ডের সব পেজ ডায়নামিক করুন
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        const response = NextResponse.next();
        response.headers.set('x-middleware-cache', 'no-cache');
        return response;
    }
}

export const config = {
    matcher: '/dashboard/:path*',
};