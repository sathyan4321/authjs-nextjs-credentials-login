
///midleware.ts
import authConfig from '@/authConfig';
import {
    API_AUTH_PREFIX,
    AUTH_ROUTES,
    DEFAULT_LOGIN_REDIRECT_URL,
    PUBLIC_ROUTES,
} from '@/lib/routes';
import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);
export default auth((request): any => {
    const { nextUrl } = request;
    let isLoggedIn = !!request.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
    const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
    const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return null;
    }
    console.log(isLoggedIn);
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(
                new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl),
            );
        }
        return null;
    }
    if (!isLoggedIn) {
        return NextResponse.redirect(new URL('/auth/login', nextUrl));
    }
    return null;
});
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trcp)(.*)'],
};
