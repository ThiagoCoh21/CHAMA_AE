import { z } from "zod";
import { POSITIONS } from "@chama-ae/shared";

export const registerSchema = z.object({
  email: z.string().trim().toLowerCase().email("E-mail invalido"),
  username: z
    .string()
    .trim()
    .min(3, "Usuario deve ter ao menos 3 caracteres")
    .max(24, "Usuario deve ter no maximo 24 caracteres")
    .regex(/^[a-zA-Z0-9_.]+$/, "Use apenas letras, numeros, ponto ou underline"),
  password: z.string().min(6, "Senha deve ter ao menos 6 caracteres").max(72),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("E-mail invalido"),
  password: z.string().min(1, "Senha obrigatoria"),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(10, "refreshToken obrigatorio"),
});

export const updateProfileSchema = z
  .object({
    fullName: z.string().trim().min(1).max(80).nullable().optional(),
    avatarUrl: z.string().trim().url("URL de avatar invalida").nullable().optional(),
    position: z.enum(POSITIONS).nullable().optional(),
    city: z.string().trim().min(1).max(60).nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Envie ao menos um campo para atualizar",
  });

export const idParamSchema = z.object({
  id: z.string().min(1, "id invalido"),
});
