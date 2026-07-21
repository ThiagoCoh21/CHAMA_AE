# Chama.AE

Plataforma para organizar peladas de futebol. Monorepo com **app mobile** (Expo / React Native)
e **API REST** (Express + Prisma + PostgreSQL), evoluido a partir do prototipo visual em
`reference/chama-ae-prototype.jsx`.

## Estrutura do monorepo

```
CHAMA_AE/
├─ apps/
│  ├─ api/        # Backend Express + Prisma (PostgreSQL)
│  └─ mobile/     # App Expo (React Native + Expo Router)
├─ packages/
│  └─ shared/     # Tipos e contratos TypeScript compartilhados (DTOs)
├─ reference/     # Prototipo web original (referencia visual)
└─ package.json   # npm workspaces
```

Usa **npm workspaces**. Instale tudo a partir da raiz:

```bash
npm install
```

## Stack

- **Mobile:** Expo, React Native, Expo Router, NativeWind (Tailwind), Zustand, Axios,
  React Hook Form + Zod, expo-secure-store, react-native-svg.
- **Backend:** Node.js, Express, Prisma, PostgreSQL, JWT (access + refresh), bcrypt, Zod, Helmet.
- **Compartilhado:** pacote `@chama-ae/shared` com os tipos usados pelos dois lados.

## Como rodar (visao geral)

1. Suba o banco e a API — veja [`apps/api/README.md`](apps/api/README.md).
2. Rode o app mobile — veja [`apps/mobile/README.md`](apps/mobile/README.md).

Scripts uteis na raiz:

```bash
npm run build:shared   # compila os tipos compartilhados
npm run api            # inicia a API em modo dev
npm run mobile         # inicia o app Expo
npm run lint           # lint da API e do mobile
npm test               # testes da API
```

## Escopo (MVP)

Splash, cadastro, login (JWT), sessao persistente e perfil do jogador (posicao, cidade,
avaliacao, partidas, avatar). Arquitetura preparada para as fases seguintes (partidas,
grupos, chat) sem refatorar o nucleo.
