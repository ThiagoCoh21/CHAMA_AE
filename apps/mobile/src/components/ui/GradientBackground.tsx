import React from "react";
import { StyleSheet, View, type ViewProps } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { colors } from "../../theme";

type Props = ViewProps & {
  /** Desenha faixas diagonais claras como no prototipo. */
  stripes?: boolean;
};

/** Fundo com o gradiente da marca (cyan -> teal -> green), implementado via SVG. */
export function GradientBackground({ stripes = false, style, children, ...rest }: Props) {
  return (
    <View style={[StyleSheet.absoluteFill, style]} {...rest}>
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
        <Defs>
          <LinearGradient id="brandBg" x1="0.1" y1="0" x2="0.9" y2="1">
            <Stop offset="0%" stopColor={colors.brandCyan} />
            <Stop offset="55%" stopColor={colors.brandTeal} />
            <Stop offset="100%" stopColor={colors.brandGreen} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#brandBg)" />
        {stripes ? (
          <>
            <Rect x="-40" y="-40" width="70" height="140%" fill="#FFFFFF" opacity={0.08} transform="rotate(25)" />
            <Rect x="90" y="-40" width="40" height="140%" fill="#FFFFFF" opacity={0.08} transform="rotate(25)" />
          </>
        ) : null}
      </Svg>
      {children}
    </View>
  );
}

export default GradientBackground;
