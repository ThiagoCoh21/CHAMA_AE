import type { MeResponse, ProfileDTO, UpdateProfileInput } from "@chama-ae/shared";
import { prisma } from "../prisma/client";
import { notFound } from "../utils/errors";
import { toProfileDTO, toUserDTO } from "../utils/mappers";

export async function getMe(userId: string): Promise<MeResponse> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true },
  });
  if (!user) throw notFound("Usuario nao encontrado");

  const profile = user.profile ?? (await prisma.profile.create({ data: { userId } }));
  return { user: toUserDTO(user), profile: toProfileDTO(profile) };
}

export async function getProfileById(id: string): Promise<ProfileDTO> {
  const profile = await prisma.profile.findUnique({ where: { id } });
  if (!profile) throw notFound("Perfil nao encontrado");
  return toProfileDTO(profile);
}

export async function updateProfile(
  userId: string,
  input: UpdateProfileInput,
): Promise<ProfileDTO> {
  await prisma.profile.upsert({
    where: { userId },
    create: { userId, ...input },
    update: input,
  });
  const profile = await prisma.profile.findUniqueOrThrow({ where: { userId } });
  return toProfileDTO(profile);
}
