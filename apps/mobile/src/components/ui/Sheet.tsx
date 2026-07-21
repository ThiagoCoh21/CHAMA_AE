import React from "react";
import { ScrollView, Text, View } from "react-native";
import { GradientBackground } from "./GradientBackground";
import { Flame } from "./Flame";

type SheetProps = {
  title: string;
  children: React.ReactNode;
};

/** Layout com header em gradiente + logo e um cartao branco rolavel. */
export function Sheet({ title, children }: SheetProps) {
  return (
    <View className="flex-1 bg-slate-50">
      <View className="items-center pt-14 pb-20 overflow-hidden">
        <GradientBackground stripes />
        <Flame size={110} />
      </View>
      <View className="flex-1 bg-slate-50 rounded-t-[34px] -mt-8 px-7 pt-7">
        <Text className="text-2xl font-extrabold text-slate-800 text-center mb-6">{title}</Text>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      </View>
    </View>
  );
}

export default Sheet;
