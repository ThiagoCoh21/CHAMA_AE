# Chama.AE - Mobile

App React Native com Expo, Expo Router e NativeWind.

## Pre-requisitos

- Node.js 20+
- App **Expo Go** no celular, ou um emulador Android / simulador iOS
- A [API](../api/README.md) rodando e acessivel

## Setup

A partir da **raiz do monorepo**:

```bash
npm install
npm run build:shared
```

Depois, dentro de `apps/mobile`:

```bash
cp .env.example .env   # defina EXPO_PUBLIC_API_URL
npm run start          # abre o Expo Dev Tools
```

### Apontando para a API

Ajuste `EXPO_PUBLIC_API_URL` no `.env` conforme o ambiente:

- Emulador Android: `http://10.0.2.2:4000`
- Simulador iOS: `http://localhost:4000`
- Dispositivo fisico: `http://<IP-da-sua-maquina>:4000`

## Scripts

| Script | Descricao |
| --- | --- |
| `npm run start` | Inicia o Metro / Expo |
| `npm run android` / `npm run ios` / `npm run web` | Abre em cada plataforma |
| `npm run typecheck` | Checagem de tipos |
| `npm run lint` / `npm run format` | ESLint / Prettier |

## Estrutura

```
app/                     # rotas (Expo Router, file-based)
├─ _layout.tsx           # layout raiz + hidratacao de sessao
├─ index.tsx             # Splash
├─ signup.tsx / login.tsx
└─ (app)/                # grupo protegido
   ├─ _layout.tsx        # guarda de autenticacao
   └─ profile.tsx        # perfil do jogador
src/
├─ components/ui/        # Flame (SVG), Field, Social, Sheet, PrimaryButton, GradientBackground
├─ features/auth/        # api, sessao e validacao (RHF + Zod)
├─ features/profile/     # api de perfil
├─ services/api.ts       # Axios + interceptors (token e refresh)
├─ store/authStore.ts    # estado de sessao (Zustand)
├─ lib/secureStore.ts    # persistencia segura (expo-secure-store)
└─ theme/                # tokens de cor / gradiente da marca
assets/                  # icon, splash, adaptive-icon
```

## Notas

- O logo (`Flame`) e vetorial (`react-native-svg`), nitido em qualquer densidade.
- O `refreshToken` fica no armazenamento seguro; o `accessToken` vive em memoria e e
  renovado automaticamente pelo interceptor do Axios ao receber 401.
- Substitua os arquivos em `assets/` pela arte final do app quando disponivel.
