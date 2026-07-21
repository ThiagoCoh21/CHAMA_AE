import type { MeResponse, ProfileDTO, UpdateProfileInput } from "@chama-ae/shared";
import { api } from "../../services/api";

export async function fetchMe(): Promise<MeResponse> {
  const { data } = await api.get<MeResponse>("/me");
  return data;
}

export async function fetchProfileById(id: string): Promise<ProfileDTO> {
  const { data } = await api.get<ProfileDTO>(`/profile/${id}`);
  return data;
}

export async function updateProfileRequest(input: UpdateProfileInput): Promise<ProfileDTO> {
  const { data } = await api.put<ProfileDTO>("/profile", input);
  return data;
}
