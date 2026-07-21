import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuthStore } from "../../src/store/authStore";

/** Guarda de rotas: so entra no grupo (app) quem esta autenticado. */
export default function AppLayout() {
  const status = useAuthStore((s) => s.status);

  if (status === "loading") {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator size="large" color="#2FB6D9" />
      </View>
    );
  }

  if (status !== "authenticated") {
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
