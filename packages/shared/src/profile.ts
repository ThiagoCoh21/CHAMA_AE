import type { Position } from "./position";

export interface ProfileDTO {
  id: string;
  userId: string;
  fullName: string | null;
  avatarUrl: string | null;
  position: Position | null;
  city: string | null;
  rating: number;
  matchesPlayed: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileInput {
  fullName?: string | null;
  avatarUrl?: string | null;
  position?: Position | null;
  city?: string | null;
}
