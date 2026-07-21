/** Tokens de design portados do prototipo web (chama-ae-prototype.jsx). */
export const colors = {
  brandCyan: "#2FB6D9",
  brandTeal: "#3BC9A0",
  brandGreen: "#5BD35B",
  sky: "#38BDF8",
  slate50: "#F8FAFC",
  slate200: "#E2E8F0",
  slate400: "#94A3B8",
  slate500: "#64748B",
  slate700: "#334155",
  slate800: "#1E293B",
  white: "#FFFFFF",
};

/** Gradiente principal usado no Splash e no header dos Sheets. */
export const brandGradient = {
  colors: [colors.brandCyan, colors.brandTeal, colors.brandGreen] as const,
  // Aproxima o angulo de 150deg do CSS original.
  start: { x: 0.1, y: 0 } as const,
  end: { x: 0.9, y: 1 } as const,
};

export const radii = {
  field: 999,
  sheet: 34,
  button: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
