import React from "react";
import { ActivityIndicator, Pressable, Text, type PressableProps } from "react-native";

type Props = PressableProps & {
  title: string;
  loading?: boolean;
  variant?: "sky" | "white";
};

/** Botao primario em pilula, portado do prototipo. */
export function PrimaryButton({
  title,
  loading = false,
  variant = "sky",
  disabled,
  ...props
}: Props) {
  const isDisabled = disabled || loading;
  const bg = variant === "sky" ? "bg-sky-400" : "bg-white";
  const text = variant === "sky" ? "text-white" : "text-slate-800";

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className={`w-full ${bg} rounded-full py-4 items-center shadow-md active:opacity-90 ${
        isDisabled ? "opacity-40" : ""
      }`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === "sky" ? "#FFFFFF" : "#1E293B"} />
      ) : (
        <Text className={`font-semibold text-base ${text}`}>{title}</Text>
      )}
    </Pressable>
  );
}

export default PrimaryButton;
