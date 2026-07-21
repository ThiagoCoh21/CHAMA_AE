import { Link, Redirect, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GradientBackground } from "../src/components/ui/GradientBackground";
import { Flame } from "../src/components/ui/Flame";
import { PrimaryButton } from "../src/components/ui/PrimaryButton";
import { useAuthStore } from "../src/store/authStore";

export default function SplashScreen() {
  const router = useRouter();
  const status = useAuthStore((s) => s.status);

  if (status === "authenticated") {
    return <Redirect href="/(app)/profile" />;
  }

  return (
    <View className="flex-1">
      <GradientBackground stripes />
      <SafeAreaView className="flex-1 justify-between py-10">
        <View />
        <View className="items-center">
          <Flame size={160} />
          <Text className="text-white text-4xl font-extrabold mt-4">Chama.AE</Text>
          <Text className="text-white/90 text-sm mt-2">Organize sua pelada</Text>
        </View>
        <View className="px-8">
          <PrimaryButton
            title="Comecar"
            variant="white"
            onPress={() => router.push("/signup")}
          />
          <Link href="/login" className="mt-4">
            <Text className="text-white/90 text-xs text-center w-full">
              Ja tenho uma conta
            </Text>
          </Link>
        </View>
      </SafeAreaView>
    </View>
  );
}
