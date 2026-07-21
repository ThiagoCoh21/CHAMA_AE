import type { AuthResponse, LoginInput, RegisterInput } from "@chama-ae/shared";
import { useAuthStore } from "../../store/authStore";
import { STORAGE_KEYS, deleteItem, getItem, setItem } from "../../lib/secureStore";
import { api } from "../../services/api";
import { loginRequest, meRequest, registerRequest } from "./authApi";

async function applyAuth(res: AuthResponse) {
  await setItem(STORAGE_KEYS.refreshToken, res.refreshToken);
  useAuthStore.getState().setSession({
    accessToken: res.accessToken,
    user: res.user,
    profile: res.profile,
  });
}

export async function login(input: LoginInput): Promise<void> {
  const res = await loginRequest(input);
  await applyAuth(res);
}

export async function register(input: RegisterInput): Promise<void> {
  const res = await registerRequest(input);
  await applyAuth(res);
}

export async function logout(): Promise<void> {
  await deleteItem(STORAGE_KEYS.refreshToken);
  useAuthStore.getState().clear();
}

/**
 * Restaura a sessao ao abrir o app: troca o refresh token salvo por um novo
 * access token e carrega o usuario/perfil atual.
 */
export async function hydrateSession(): Promise<void> {
  const { setStatus, setAccessToken, setSession, clear } = useAuthStore.getState();
  setStatus("loading");

  const refreshToken = await getItem(STORAGE_KEYS.refreshToken);
  if (!refreshToken) {
    clear();
    return;
  }

  try {
    const { data } = await api.post("/auth/refresh", { refreshToken });
    setAccessToken(data.accessToken);
    await setItem(STORAGE_KEYS.refreshToken, data.refreshToken);

    const me = await meRequest();
    setSession({ accessToken: data.accessToken, user: me.user, profile: me.profile });
  } catch {
    await deleteItem(STORAGE_KEYS.refreshToken);
    clear();
  }
}
