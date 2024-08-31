"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { signIn } from "../src/auth";
import { LoginSchema } from "@/Schema/AuthSchema";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/lib/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  console.log(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password} = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials!" };
  }

  try {
    console.log("Login Callback:", { email, password });
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT_URL,
    });

    return { success: "Login successful" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          console.log(error);
          return { error: "Invalid credentials!" };
        default:
          console.log(error);
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};