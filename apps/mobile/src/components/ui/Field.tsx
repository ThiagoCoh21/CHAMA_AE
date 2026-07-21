import React from "react";
import { Text, TextInput, View, type TextInputProps } from "react-native";

type FieldProps = TextInputProps & {
  icon?: string;
  error?: string;
};

/** Input em pilula, portado do `Field` do prototipo web. */
export function Field({ icon, error, ...props }: FieldProps) {
  return (
    <View className="mb-3">
      <View
        className={`flex-row items-center gap-3 bg-white rounded-full px-5 py-3 border ${
          error ? "border-red-400" : "border-slate-200"
        }`}
      >
        {icon ? <Text className="text-slate-400 text-lg">{icon}</Text> : null}
        <TextInput
          className="flex-1 text-slate-700"
          placeholderTextColor="#94A3B8"
          {...props}
        />
      </View>
      {error ? <Text className="text-red-500 text-xs mt-1 ml-4">{error}</Text> : null}
    </View>
  );
}

export default Field;
