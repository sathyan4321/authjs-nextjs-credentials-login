
///auth.ts
import  {db}  from '@/data/db';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from '@/authConfig';
import { getUserById } from '@/data/user';
export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: '/auth/login',
    },
    // events: {
    //     async linkAccount({ user }) {
    //         await db.user.update({
    //             where: {
    //                 id: user.id,
    //             },
    //             data: {
    //                 emailVerified: new Date(),
    //             },
    //         });
    //     },
    // },
    callbacks: {
        // async signIn({ user, account }) {
        //     if (account?.provider !== 'credentials') return true;
        //     const existingUser = await getUserById(user);
        //     if (!existingUser?.email) return false;
        //     return true;
        // },
        async jwt({ token }) {
            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
    secret: process.env.AUTH_SECRET,
});

