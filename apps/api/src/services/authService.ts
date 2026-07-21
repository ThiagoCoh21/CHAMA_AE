import type { AuthResponse, LoginInput, RegisterInput } from "@chama-ae/shared";
import { prisma } from "../prisma/client";
import { hashPassword, verifyPassword } from "../utils/password";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { conflict, notFound, unauthorized } from "../utils/errors";
import { toProfileDTO, toUserDTO } from "../utils/mappers";

function issueTokens(userId: string) {
  return {
    accessToken: signAccessToken(userId),
    refreshToken: signRefreshToken(userId),
  };
}

export async function register(input: RegisterInput): Promise<AuthResponse> {
  const existing = await prisma.user.findFirst({
    where: { OR: [{ email: input.email }, { username: input.username }] },
    select: { email: true, username: true },
  });
  if (existing) {
    if (existing.email === input.email) throw conflict("E-mail ja cadastrado");
    throw conflict("Nome de usuario ja utilizado");
  }

  const passwordHash = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      email: input.email,
      username: input.username,
      passwordHash,
      profile: { create: {} },
    },
    include: { profile: true },
  });

  const tokens = issueTokens(user.id);
  return {
    ...tokens,
    user: toUserDTO(user),
    profile: toProfileDTO(user.profile!),
  };
}

export async function login(input: LoginInput): Promise<AuthResponse> {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
    include: { profile: true },
  });
  if (!user) throw unauthorized("Credenciais invalidas");

  const valid = await verifyPassword(input.password, user.passwordHash);
  if (!valid) throw unauthorized("Credenciais invalidas");

  // Garante um profile mesmo para contas antigas sem perfil.
  const profile = user.profile ?? (await prisma.profile.create({ data: { userId: user.id } }));

  const tokens = issueTokens(user.id);
  return {
    ...tokens,
    user: toUserDTO(user),
    profile: toProfileDTO(profile),
  };
}

export async function refresh(refreshToken: string) {
  const payload = verifyRefreshToken(refreshToken);
  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user) throw notFound("Usuario nao encontrado");
  return issueTokens(user.id);
}
