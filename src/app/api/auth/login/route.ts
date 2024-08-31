import { getUserByEmail } from "@/data/user";
import { NextResponse } from "next/server";
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/lib/routes";
import { AuthError } from "next-auth";


export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;
    
    console.log("LOGIN API: ",email, password);

    const existingUser = await getUserByEmail(email);

    if(!existingUser){
        return new NextResponse("User does not exist", { status: 400 });
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
                    return new NextResponse('Invalid Credentials!', { status: 400 });
                case 'CallbackRouteError':
                    return { error: error.cause?.err?.message };
                default:
                    return new NextResponse('Something went wrong!', { status: 500 });
            }
        }
    }

}