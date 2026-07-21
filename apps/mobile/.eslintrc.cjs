module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: 2021, sourceType: "module", ecmaFeatures: { jsx: true } },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  env: { node: true, es2021: true },
  ignorePatterns: [".expo", "node_modules", "dist", "babel.config.js", "metro.config.js"],
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
  },
};
