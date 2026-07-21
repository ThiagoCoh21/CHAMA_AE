import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { POSITIONS, POSITION_LABELS, type Position } from "@chama-ae/shared";
import { GradientBackground } from "../../src/components/ui/GradientBackground";
import { Field } from "../../src/components/ui/Field";
import { PrimaryButton } from "../../src/components/ui/PrimaryButton";
import { useAuthStore } from "../../src/store/authStore";
import { fetchMe, updateProfileRequest } from "../../src/features/profile/profileApi";
import { logout } from "../../src/features/auth/session";
import { getApiErrorMessage } from "../../src/services/api";

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <View className="flex-1 items-center">
      <Text className="text-2xl font-extrabold text-slate-800">{value}</Text>
      <Text className="text-xs text-slate-500 mt-1">{label}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const me = await fetchMe();
        useAuthStore.getState().setSession({
          accessToken: useAuthStore.getState().accessToken ?? "",
          user: me.user,
          profile: me.profile,
        });
      } catch (err) {
        Alert.alert("Erro ao carregar perfil", getApiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName ?? "");
      setCity(profile.city ?? "");
      setAvatarUrl(profile.avatarUrl ?? "");
      setPosition(profile.position ?? null);
    }
  }, [profile]);

  const onSave = async () => {
    try {
      setSaving(true);
      const updated = await updateProfileRequest({
        fullName: fullName.trim() || null,
        city: city.trim() || null,
        avatarUrl: avatarUrl.trim() || null,
        position,
      });
      setProfile(updated);
      setEditing(false);
    } catch (err) {
      Alert.alert("Erro ao salvar", getApiErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const onLogout = async () => {
    await logout();
    router.replace("/");
  };

  if (loading || !profile) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator size="large" color="#2FB6D9" />
      </View>
    );
  }

  const initials = (profile.fullName ?? user?.username ?? "?").slice(0, 1).toUpperCase();

  return (
    <View className="flex-1 bg-slate-50">
      <View className="h-56 overflow-hidden">
        <GradientBackground stripes />
        <SafeAreaView className="items-center pt-6">
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              className="w-24 h-24 rounded-full border-4 border-white"
            />
          ) : (
            <View className="w-24 h-24 rounded-full border-4 border-white bg-white/30 items-center justify-center">
              <Text className="text-white text-3xl font-extrabold">{initials}</Text>
            </View>
          )}
          <Text className="text-white text-xl font-extrabold mt-3">
            {profile.fullName ?? user?.username}
          </Text>
          <Text className="text-white/90 text-xs">@{user?.username}</Text>
        </SafeAreaView>
      </View>

      <ScrollView
        className="flex-1 -mt-6 bg-slate-50 rounded-t-[34px] px-7 pt-7"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row bg-white rounded-2xl py-5 px-4 border border-slate-100 mb-6">
          <Stat label="Avaliacao" value={profile.rating.toFixed(1)} />
          <View className="w-px bg-slate-100" />
          <Stat label="Partidas" value={profile.matchesPlayed} />
          <View className="w-px bg-slate-100" />
          <Stat
            label="Posicao"
            value={profile.position ? POSITION_LABELS[profile.position] : "-"}
          />
        </View>

        {editing ? (
          <View>
            <Text className="text-sm font-bold text-slate-700 mb-2">Nome completo</Text>
            <Field icon="#" placeholder="Seu nome" value={fullName} onChangeText={setFullName} />

            <Text className="text-sm font-bold text-slate-700 mb-2">Cidade</Text>
            <Field icon="#" placeholder="Sua cidade" value={city} onChangeText={setCity} />

            <Text className="text-sm font-bold text-slate-700 mb-2">URL do avatar</Text>
            <Field
              icon="#"
              placeholder="https://..."
              autoCapitalize="none"
              value={avatarUrl}
              onChangeText={setAvatarUrl}
            />

            <Text className="text-sm font-bold text-slate-700 mb-2">Posicao</Text>
            <View className="flex-row flex-wrap gap-2 mb-6">
              {POSITIONS.map((p) => {
                const active = position === p;
                return (
                  <Pressable
                    key={p}
                    onPress={() => setPosition(active ? null : p)}
                    className={`px-4 py-2 rounded-full border ${
                      active ? "bg-sky-400 border-sky-400" : "bg-white border-slate-200"
                    }`}
                  >
                    <Text className={active ? "text-white" : "text-slate-600"}>
                      {POSITION_LABELS[p]}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <PrimaryButton title="Salvar" loading={saving} onPress={onSave} />
            <Pressable onPress={() => setEditing(false)} className="py-4">
              <Text className="text-center text-slate-500 text-sm">Cancelar</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <View className="bg-white rounded-2xl p-4 border border-slate-100 mb-3">
              <Text className="text-xs text-slate-400">Cidade</Text>
              <Text className="text-slate-700 mt-1">{profile.city ?? "Nao informada"}</Text>
            </View>
            <View className="bg-white rounded-2xl p-4 border border-slate-100 mb-6">
              <Text className="text-xs text-slate-400">E-mail</Text>
              <Text className="text-slate-700 mt-1">{user?.email}</Text>
            </View>

            <PrimaryButton title="Editar perfil" onPress={() => setEditing(true)} />
            <Pressable onPress={onLogout} className="py-4 mb-8">
              <Text className="text-center text-red-500 text-sm font-semibold">Sair</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
