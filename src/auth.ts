import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./Schema/AuthSchema"
import { getUserByEmail } from "./data/user"
import bcrypt from 'bcryptjs';

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
        name: "Credentials",
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "email@example.com",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            const validatedFields = LoginSchema.safeParse(credentials);

            if (validatedFields.success) {
                const { email, password } = validatedFields.data;
                const user = await getUserByEmail(email);
                if (!user || !user.password) return null;

                const passwordsMatch = await bcrypt.compare(
                    password,
                    user.password
                );

                if (passwordsMatch) return user;
            }
            return null;
        }
      }),
  ],
})