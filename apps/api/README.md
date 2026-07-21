# Chama.AE - API

Backend REST em Express + Prisma + PostgreSQL.

## Pre-requisitos

- Node.js 20+
- PostgreSQL (local ou via Docker)

## Setup

A partir da **raiz do monorepo**:

```bash
npm install
npm run build:shared
```

Depois, dentro de `apps/api`:

```bash
# 1. Variaveis de ambiente
cp .env.example .env     # ajuste DATABASE_URL e os segredos JWT

# 2. Banco de dados (opcao com Docker)
docker compose up -d     # sobe um PostgreSQL em localhost:5432

# 3. Migrations + Prisma Client
npm run prisma:generate
npm run prisma:migrate    # aplica a migration inicial (0001_init)

# 4. (Opcional) dados de teste
npm run db:seed           # usuario: jogador@chama.ae / senha: 123456

# 5. Subir a API
npm run dev               # http://localhost:4000
```

> Sem Docker? Aponte `DATABASE_URL` para o seu Postgres e rode `npm run prisma:migrate`.

## Scripts

| Script | Descricao |
| --- | --- |
| `npm run dev` | API em modo watch (tsx) |
| `npm run build` / `npm start` | Build TS e execucao do JS compilado |
| `npm run prisma:migrate` | Cria/aplica migrations em dev |
| `npm run prisma:deploy` | Aplica migrations em producao |
| `npm run db:seed` | Popula um usuario de teste |
| `npm test` | Testes (Jest) |
| `npm run lint` / `npm run format` | ESLint / Prettier |

## Endpoints

| Metodo | Rota | Auth | Descricao |
| --- | --- | --- | --- |
| GET | `/health` | - | Healthcheck |
| POST | `/auth/register` | - | Cria usuario + perfil, retorna tokens |
| POST | `/auth/login` | - | Autentica e retorna tokens (rate limited) |
| POST | `/auth/refresh` | - | Renova o access token |
| GET | `/me` | Bearer | Usuario + perfil logado |
| GET | `/profile/:id` | Bearer | Perfil por id |
| PUT | `/profile` | Bearer | Atualiza o proprio perfil |

Autenticacao via header `Authorization: Bearer <accessToken>`. Toda entrada e validada com Zod.

## Estrutura

```
src/
├─ config/        # env
├─ controllers/   # request/response
├─ services/      # regra de negocio (auth, profile)
├─ routes/        # definicao de rotas
├─ middlewares/   # auth, validate, errorHandler
├─ validators/    # schemas Zod
├─ utils/         # jwt, password, errors, mappers
└─ prisma/        # client Prisma
prisma/
├─ schema.prisma  # User, Profile, enum Position
├─ migrations/    # migrations versionadas
└─ seed.ts        # seed de teste
```
