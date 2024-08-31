"use server";
import { z } from "zod";
import { signIn } from "@/auth";
import { LoginFormSchema } from "@/components/auth/LoginForm";
import { getUserByEmail } from "@/data/user";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";


export const loginWithCreds = async (values: z.infer<typeof LoginFormSchema>) => {
  const loginData = LoginFormSchema.parse(values);

  const { email, password } = loginData;

  const existingUser = await getUserByEmail(email);
  console.log(existingUser);

  try {
    await signIn("credentials", { email, password, redirectTo: "/home", });
  } catch (error: any) {
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
  revalidatePath("/");
};
