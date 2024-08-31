import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { AuthError } from "next-auth";
import { NextResponse } from "next/server";

export async  function POST(request: Request) {
    const body = await request.json();

    try {
        const { email, password } = body;

        const existingUser = await getUserByEmail(email);
        if(!existingUser){
            return NextResponse.json({message: "User does not exist"}, {status: 400})
        }

        const FormData = {
            email,
            password,
            role: existingUser.role,
            redirectTo: "/home",
        }
        
        return(await signIn("credentials", FormData));

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
              case "CredentialsSignin":
                return { error: "Invalid credentials!" };
              default:
                return { error: "Something went wrong!" };
            }
          }
      
          throw error;
    }
}