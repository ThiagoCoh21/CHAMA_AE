import { create } from "zustand";
import type { ProfileDTO, UserDTO } from "@chama-ae/shared";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthState {
  status: AuthStatus;
  accessToken: string | null;
  user: UserDTO | null;
  profile: ProfileDTO | null;
  setStatus: (status: AuthStatus) => void;
  setAccessToken: (token: string | null) => void;
  setSession: (data: { accessToken: string; user: UserDTO; profile: ProfileDTO }) => void;
  setProfile: (profile: ProfileDTO) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  status: "loading",
  accessToken: null,
  user: null,
  profile: null,
  setStatus: (status) => set({ status }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setSession: ({ accessToken, user, profile }) =>
    set({ accessToken, user, profile, status: "authenticated" }),
  setProfile: (profile) => set({ profile }),
  clear: () =>
    set({ accessToken: null, user: null, profile: null, status: "unauthenticated" }),
}));
