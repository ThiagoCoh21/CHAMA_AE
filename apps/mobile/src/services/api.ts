import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import Constants from "expo-constants";
import type { AuthTokens } from "@chama-ae/shared";
import { useAuthStore } from "../store/authStore";
import { STORAGE_KEYS, deleteItem, getItem, setItem } from "../lib/secureStore";

function resolveBaseUrl(): string {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;
  const fromExtra = (Constants.expoConfig?.extra as { apiUrl?: string } | undefined)?.apiUrl;
  return fromEnv ?? fromExtra ?? "http://localhost:4000";
}

export const api = axios.create({
  baseURL: resolveBaseUrl(),
  timeout: 15000,
});

// Instancia separada para o refresh, evitando loop no interceptor.
const refreshClient = axios.create({ baseURL: resolveBaseUrl(), timeout: 15000 });

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshing: Promise<string | null> | null = null;

async function performRefresh(): Promise<string | null> {
  const refreshToken = await getItem(STORAGE_KEYS.refreshToken);
  if (!refreshToken) return null;
  try {
    const { data } = await refreshClient.post<AuthTokens>("/auth/refresh", { refreshToken });
    useAuthStore.getState().setAccessToken(data.accessToken);
    await setItem(STORAGE_KEYS.refreshToken, data.refreshToken);
    return data.accessToken;
  } catch {
    await deleteItem(STORAGE_KEYS.refreshToken);
    useAuthStore.getState().clear();
    return null;
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined;
    const isAuthRoute = original?.url?.includes("/auth/");

    if (error.response?.status === 401 && original && !original._retry && !isAuthRoute) {
      original._retry = true;
      refreshing = refreshing ?? performRefresh();
      const newToken = await refreshing;
      refreshing = null;

      if (newToken) {
        original.headers = { ...original.headers, Authorization: `Bearer ${newToken}` };
        return api(original);
      }
    }
    return Promise.reject(error);
  },
);

/** Extrai uma mensagem amigavel de um erro do axios. */
export function getApiErrorMessage(err: unknown, fallback = "Algo deu errado. Tente novamente."): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as { message?: string } | undefined;
    return data?.message ?? err.message ?? fallback;
  }
  return fallback;
}
