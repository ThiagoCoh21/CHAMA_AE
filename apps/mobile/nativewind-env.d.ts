/// <reference types="nativewind/types" />

// Augmentacoes explicitas para garantir suporte a `className` no TypeScript,
// cobrindo tambem componentes que o css-interop nao tipa por padrao (Pressable,
// SafeAreaView). Em runtime o NativeWind ja aceita className nesses componentes.
declare module "react-native" {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface TextInputProps {
    className?: string;
    placeholderClassName?: string;
  }
  interface ImageProps {
    className?: string;
  }
  interface ScrollViewProps {
    className?: string;
    contentContainerClassName?: string;
  }
  interface PressableProps {
    className?: string;
  }
  interface SwitchProps {
    className?: string;
  }
}

declare module "react-native-safe-area-context" {
  interface NativeSafeAreaViewProps {
    className?: string;
  }
}

// Torna este arquivo um modulo, fazendo os blocos `declare module` acima
// funcionarem como AUGMENTACAO (merge) em vez de substituir os tipos originais.
export {};
