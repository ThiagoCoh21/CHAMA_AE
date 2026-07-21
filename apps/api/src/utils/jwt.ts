import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import { unauthorized } from "./errors";

export interface TokenPayload {
  sub: string;
  type: "access" | "refresh";
}

export function signAccessToken(userId: string): string {
  return jwt.sign({ type: "access" } satisfies Omit<TokenPayload, "sub">, env.jwt.accessSecret, {
    subject: userId,
    expiresIn: env.jwt.accessExpiresIn,
  } as SignOptions);
}

export function signRefreshToken(userId: string): string {
  return jwt.sign({ type: "refresh" } satisfies Omit<TokenPayload, "sub">, env.jwt.refreshSecret, {
    subject: userId,
    expiresIn: env.jwt.refreshExpiresIn,
  } as SignOptions);
}

export function verifyAccessToken(token: string): TokenPayload {
  try {
    const decoded = jwt.verify(token, env.jwt.accessSecret) as TokenPayload;
    if (decoded.type !== "access") throw unauthorized("Token invalido");
    return decoded;
  } catch {
    throw unauthorized("Token de acesso invalido ou expirado");
  }
}

export function verifyRefreshToken(token: string): TokenPayload {
  try {
    const decoded = jwt.verify(token, env.jwt.refreshSecret) as TokenPayload;
    if (decoded.type !== "refresh") throw unauthorized("Token invalido");
    return decoded;
  } catch {
    throw unauthorized("Token de refresh invalido ou expirado");
  }
}
