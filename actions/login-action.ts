
///login.ts
'use server';
import * as z from 'zod';
import { LoginFormSchema } from '@/components/auth/LoginForm';
import { getUserByEmail } from '@/data/user';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT_URL } from '@/lib/routes';

type ReturnLogin = {
    error?: string;
    success?: string;
};
export async function login(values: z.infer<typeof LoginFormSchema>) {
    const validatedFields = await LoginFormSchema.safeParseAsync(values);

    if (!validatedFields.success) {
        return { error: 'Something went wrong!' };
    }
    const { email, password } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser?.email) {
        return { error: 'Email does not exist!' };
    }
    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT_URL,
            redirect: true,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid Credentials!' };
                case 'CallbackRouteError':
                    return { error: error.cause?.err?.message };
                default:
                    return { error: 'Something went wrong!' };
            }
        }
    }
    return { success: 'Login success' };
}


