import { z } from "zod";

export const signupFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Minimo de 3 caracteres")
    .max(24, "Maximo de 24 caracteres")
    .regex(/^[a-zA-Z0-9_.]+$/, "Use letras, numeros, ponto ou _"),
  email: z.string().trim().toLowerCase().email("E-mail invalido"),
  password: z.string().min(6, "Minimo de 6 caracteres"),
});

export const loginFormSchema = z.object({
  email: z.string().trim().toLowerCase().email("E-mail invalido"),
  password: z.string().min(1, "Informe sua senha"),
});

export type SignupForm = z.infer<typeof signupFormSchema>;
export type LoginForm = z.infer<typeof loginFormSchema>;
