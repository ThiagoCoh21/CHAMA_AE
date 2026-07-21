import { useState } from "react";
import { Alert, Pressable, Text } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sheet } from "../src/components/ui/Sheet";
import { Field } from "../src/components/ui/Field";
import { Social } from "../src/components/ui/Social";
import { PrimaryButton } from "../src/components/ui/PrimaryButton";
import { loginFormSchema, type LoginForm } from "../src/features/auth/validation";
import { login } from "../src/features/auth/session";
import { getApiErrorMessage } from "../src/services/api";
import { useAuthStore } from "../src/store/authStore";

export default function LoginScreen() {
  const router = useRouter();
  const status = useAuthStore((s) => s.status);
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  if (status === "authenticated") {
    return <Redirect href="/(app)/profile" />;
  }

  const onSubmit = async (values: LoginForm) => {
    try {
      setSubmitting(true);
      await login(values);
      router.replace("/(app)/profile");
    } catch (err) {
      Alert.alert("Nao foi possivel entrar", getApiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sheet title="bem-vindo de volta!">
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Field
            icon="@"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Field
            icon="*"
            placeholder="Senha"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.password?.message}
          />
        )}
      />

      <Text className="text-right text-[11px] text-sky-500 mb-5">Esqueci minha senha</Text>

      <PrimaryButton title="Entrar" loading={submitting} onPress={handleSubmit(onSubmit)} />

      <Text className="text-center text-slate-400 text-xs my-4">ou</Text>
      <Social />

      <Pressable onPress={() => router.replace("/signup")} className="pb-8">
        <Text className="text-center text-xs text-slate-500">
          Nao tem conta? <Text className="text-sky-500">Cadastre-se</Text>
        </Text>
      </Pressable>
    </Sheet>
  );
}
