import type { UserDTO } from "./user";
import type { ProfileDTO } from "./profile";

/** Formato padrao de erro retornado pela API. */
export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

/** Resposta de GET /me. */
export interface MeResponse {
  user: UserDTO;
  profile: ProfileDTO;
}
