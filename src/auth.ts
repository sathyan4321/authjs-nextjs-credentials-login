import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { getUserByEmail } from "./data/user";
import { LoginSchema } from "./Schema/AuthSchema";
import { db } from "./data/db";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt", // Use the database to store session data
        maxAge:  60 * 60, // 1 day
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async session({ session, token, user }) {
            if(session.user){
                session.user.id = token.sub as string
                
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
    pages: {
            signIn: '/auth/signin',
            error: '/auth/error',
    },
    providers: [
        CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email", placeholder: "email@example.com" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            const validatedFields = LoginSchema.safeParse(credentials);

            if (!validatedFields.success) {
            throw new Error("Invalid credentials.");
            }

            const { email, password } = validatedFields.data;
            const user = await getUserByEmail(email);

            if (!user || !user.password) {
            return null;
            }

            const passwordsMatch = await bcrypt.compare(password, user.password);

            if (!passwordsMatch) {
            return null;
            }

            return user;
        },
        }),
    ],
});
