import z from "zod";

export const LoginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Please enter your email." })
        .email({ message: "Please enter a valid email." }),
    password: z
        .string()
        .min(1, { message: "Please enter your password." })
        .min(4, { message: "Password must be at least 4 characters." }),
});

export const RegisterSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email( {
      message: "Please enter a valid email.",
    }),
    phone: z.string().min(10).max(10, {
      message: "Phone number must be at least 10 characters.",
    }),
    password: z.string().min(4, {
      message: "Password must be at least 4 characters.",
    }),
})