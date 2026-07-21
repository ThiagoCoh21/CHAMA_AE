import { loginSchema, registerSchema, updateProfileSchema } from "../src/validators/schemas";

describe("registerSchema", () => {
  it("aceita dados validos e normaliza email/username", () => {
    const parsed = registerSchema.parse({
      email: "  TESTE@Chama.AE ",
      username: "jogador_10",
      password: "123456",
    });
    expect(parsed.email).toBe("teste@chama.ae");
    expect(parsed.username).toBe("jogador_10");
  });

  it("rejeita email invalido", () => {
    expect(() =>
      registerSchema.parse({ email: "nao-email", username: "abc", password: "123456" }),
    ).toThrow();
  });

  it("rejeita senha curta", () => {
    expect(() =>
      registerSchema.parse({ email: "a@b.com", username: "abc", password: "123" }),
    ).toThrow();
  });
});

describe("loginSchema", () => {
  it("exige senha", () => {
    expect(() => loginSchema.parse({ email: "a@b.com", password: "" })).toThrow();
  });
});

describe("updateProfileSchema", () => {
  it("aceita posicao valida", () => {
    const parsed = updateProfileSchema.parse({ position: "FORWARD", city: "Rio" });
    expect(parsed.position).toBe("FORWARD");
  });

  it("rejeita objeto vazio", () => {
    expect(() => updateProfileSchema.parse({})).toThrow();
  });

  it("rejeita posicao invalida", () => {
    expect(() => updateProfileSchema.parse({ position: "COACH" })).toThrow();
  });
});
