import type { Profile, User } from "@prisma/client";
import type { ProfileDTO, UserDTO } from "@chama-ae/shared";

export function toUserDTO(user: User): UserDTO {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    createdAt: user.createdAt.toISOString(),
  };
}

export function toProfileDTO(profile: Profile): ProfileDTO {
  return {
    id: profile.id,
    userId: profile.userId,
    fullName: profile.fullName,
    avatarUrl: profile.avatarUrl,
    position: profile.position,
    city: profile.city,
    rating: profile.rating,
    matchesPlayed: profile.matchesPlayed,
    createdAt: profile.createdAt.toISOString(),
    updatedAt: profile.updatedAt.toISOString(),
  };
}
