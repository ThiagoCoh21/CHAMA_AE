import React from "react";
import { Pressable, View } from "react-native";

const BRANDS = ["#EA4335", "#FFC107", "#1877F2"];

/** Linha de botoes sociais (visual), portada do prototipo. */
export function Social() {
  return (
    <View className="flex-row justify-center gap-4 my-4">
      {BRANDS.map((c) => (
        <Pressable
          key={c}
          accessibilityRole="button"
          className="w-12 h-12 rounded-xl active:opacity-80"
          style={{ backgroundColor: c }}
        />
      ))}
    </View>
  );
}

export default Social;
