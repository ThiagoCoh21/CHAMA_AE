import { useState } from "react";
import { Alert, Pressable, Switch, Text, View } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sheet } from "../src/components/ui/Sheet";
import { Field } from "../src/components/ui/Field";
import { Social } from "../src/components/ui/Social";
import { PrimaryButton } from "../src/components/ui/PrimaryButton";
import { signupFormSchema, type SignupForm } from "../src/features/auth/validation";
import { register as registerUser } from "../src/features/auth/session";
import { getApiErrorMessage } from "../src/services/api";
import { useAuthStore } from "../src/store/authStore";

export default function SignupScreen() {
  const router = useRouter();
  const status = useAuthStore((s) => s.status);
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: { username: "", email: "", password: "" },
  });

  if (status === "authenticated") {
    return <Redirect href="/(app)/profile" />;
  }

  const onSubmit = async (values: SignupForm) => {
    try {
      setSubmitting(true);
      await registerUser(values);
      router.replace("/(app)/profile");
    } catch (err) {
      Alert.alert("Nao foi possivel cadastrar", getApiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sheet title="ola!">
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, onBlur, value } }) => (
          <Field
            icon="@"
            placeholder="Usuario"
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.username?.message}
          />
        )}
      />
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

      <View className="flex-row items-center gap-2 my-4">
        <Switch value={agree} onValueChange={setAgree} />
        <Text className="text-[11px] text-slate-500">
          Concordo com os <Text className="text-sky-500 font-bold">termos e condicoes</Text>
        </Text>
      </View>

      <PrimaryButton
        title="Cadastrar"
        disabled={!agree}
        loading={submitting}
        onPress={handleSubmit(onSubmit)}
      />

      <Text className="text-center text-slate-400 text-xs my-4">ou</Text>
      <Social />

      <Pressable onPress={() => router.replace("/login")} className="pb-8">
        <Text className="text-center text-xs text-slate-500">
          Ja tem conta? <Text className="text-sky-500">Entrar</Text>
        </Text>
      </Pressable>
    </Sheet>
  );
}
