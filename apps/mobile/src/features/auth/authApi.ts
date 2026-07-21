import type { AuthResponse, LoginInput, MeResponse, RegisterInput } from "@chama-ae/shared";
import { api } from "../../services/api";

export async function registerRequest(input: RegisterInput): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/register", input);
  return data;
}

export async function loginRequest(input: LoginInput): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/login", input);
  return data;
}

export async function meRequest(): Promise<MeResponse> {
  const { data } = await api.get<MeResponse>("/me");
  return data;
}
