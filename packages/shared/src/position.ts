/** Posicoes do jogador em campo. Espelha o enum `Position` do Prisma. */
export const POSITIONS = [
  "GOALKEEPER",
  "DEFENDER",
  "MIDFIELDER",
  "FORWARD",
] as const;

export type Position = (typeof POSITIONS)[number];

/** Rotulos em pt-BR para exibicao na UI. */
export const POSITION_LABELS: Record<Position, string> = {
  GOALKEEPER: "Goleiro",
  DEFENDER: "Zagueiro",
  MIDFIELDER: "Meio-campo",
  FORWARD: "Atacante",
};
