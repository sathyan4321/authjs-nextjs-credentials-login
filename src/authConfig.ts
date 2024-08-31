
///auth.config.ts
import { getUserByEmail } from '@/data/user';
import { LoginFormSchema } from '@/components/auth/LoginForm';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
export default {
    providers: [
        Credentials({
            async authorize(credentials, request) {
                const validatedFields = await LoginFormSchema.safeParse(
                    credentials,
                );
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;
                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );
                    if (user && passwordMatch) return user;
                }
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
