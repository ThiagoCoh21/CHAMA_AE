import { hashPassword, verifyPassword } from "../src/utils/password";
import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../src/utils/jwt";

describe("password utils", () => {
  it("faz hash e valida a senha correta", async () => {
    const hash = await hashPassword("segredo123");
    expect(hash).not.toBe("segredo123");
    await expect(verifyPassword("segredo123", hash)).resolves.toBe(true);
  });

  it("rejeita senha incorreta", async () => {
    const hash = await hashPassword("segredo123");
    await expect(verifyPassword("errada", hash)).resolves.toBe(false);
  });
});

describe("jwt utils", () => {
  it("assina e verifica um access token", () => {
    const token = signAccessToken("user-1");
    const payload = verifyAccessToken(token);
    expect(payload.sub).toBe("user-1");
    expect(payload.type).toBe("access");
  });

  it("assina e verifica um refresh token", () => {
    const token = signRefreshToken("user-2");
    const payload = verifyRefreshToken(token);
    expect(payload.sub).toBe("user-2");
    expect(payload.type).toBe("refresh");
  });

  it("nao aceita access token como refresh", () => {
    const token = signAccessToken("user-3");
    expect(() => verifyRefreshToken(token)).toThrow();
  });
});
