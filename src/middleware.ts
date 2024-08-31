
// ///midleware.ts
// import authConfig from '@/authConfig';
// import {
//     API_AUTH_PREFIX,
//     AUTH_ROUTES,
//     DEFAULT_LOGIN_REDIRECT_URL,
//     PUBLIC_ROUTES,
// } from '@/lib/routes';
// import NextAuth from 'next-auth';
// import { NextResponse } from 'next/server';

// const { auth } = NextAuth(authConfig);
// export default auth((request): any => {
//     const { nextUrl } = request;
//     let isLoggedIn = !!request;

//     const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
//     const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
//     const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

//     if (isApiAuthRoute) {
//         return null;
//     }
//     console.log(isLoggedIn);
//     if (isAuthRoute) {
//         if (isLoggedIn) {
//             return NextResponse.redirect(
//                 new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl),
//             );
//         }
//         return null;
//     }
//     if (!isLoggedIn) {
//         return NextResponse.redirect(new URL('/auth/login', nextUrl));
//     }
//     return null;
// });
// export const config = {
//     matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trcp)(.*)'],
// };





// export { auth as middleware } from "@/auth";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";
import {
    API_AUTH_PREFIX,
    AUTH_ROUTES,
    DEFAULT_LOGIN_REDIRECT_URL,
    PUBLIC_ROUTES,
} from '@/lib/routes';


export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { nextUrl } = request;
  let isLoggedIn = !!session;

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
    const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
    const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);


//   const isProtected = protectedRoutes.some((route) =>
//     request.nextUrl.pathname.startsWith(route)
//   );

  if (isApiAuthRoute) {
    return NextResponse.next();
}
console.log(isLoggedIn);
if (isAuthRoute) {
    if (isLoggedIn) {
        return NextResponse.redirect(
            new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl),
        );
    }
    return NextResponse.next();
}
if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', nextUrl));
}


//   if (!session && isProtected) {
//     const absoluteURL = new URL("/", request.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
