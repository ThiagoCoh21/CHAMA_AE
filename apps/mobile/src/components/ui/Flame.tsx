import React from "react";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";

type FlameProps = {
  size?: number;
};

/**
 * Logo do Chama.AE (chama + luva de goleiro) portado do prototipo web para
 * react-native-svg, mantendo qualidade vetorial em qualquer densidade.
 */
export function Flame({ size = 160 }: FlameProps) {
  return (
    <Svg width={size} height={size * 1.32} viewBox="0 0 200 264" fill="none">
      <Defs>
        <LinearGradient id="fDeep" x1="0.5" y1="0" x2="0.5" y2="1">
          <Stop offset="0%" stopColor="#FF7A18" />
          <Stop offset="50%" stopColor="#F4451A" />
          <Stop offset="100%" stopColor="#CE2410" />
        </LinearGradient>
        <LinearGradient id="fMid" x1="0.5" y1="0" x2="0.5" y2="1">
          <Stop offset="0%" stopColor="#FFC02E" />
          <Stop offset="55%" stopColor="#FF8A14" />
          <Stop offset="100%" stopColor="#F0541A" />
        </LinearGradient>
        <LinearGradient id="fCore" x1="0.5" y1="0" x2="0.5" y2="1">
          <Stop offset="0%" stopColor="#FFF0A8" />
          <Stop offset="55%" stopColor="#FFD046" />
          <Stop offset="100%" stopColor="#FF9A1C" />
        </LinearGradient>
        <LinearGradient id="glove" x1="0.1" y1="0" x2="0.95" y2="1">
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="50%" stopColor="#F4F7FA" />
          <Stop offset="100%" stopColor="#C4CED8" />
        </LinearGradient>
        <LinearGradient id="cuff" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#FBFDFF" />
          <Stop offset="100%" stopColor="#B9C4CE" />
        </LinearGradient>
        <RadialGradient id="glow" cx="50%" cy="60%" r="55%">
          <Stop offset="0%" stopColor="#FFDE8A" stopOpacity="0.9" />
          <Stop offset="65%" stopColor="#FF9A28" stopOpacity="0.35" />
          <Stop offset="100%" stopColor="#FF7A18" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      <Ellipse cx="100" cy="152" rx="95" ry="108" fill="url(#glow)" />

      {/* linguas externas separadas */}
      <Path
        d="M100 6c16 46 44 62 56 100 14 42-6 88-56 108-50-20-70-66-56-108C56 68 84 52 100 6z"
        fill="url(#fDeep)"
      />
      <Path
        d="M40 62c12 22 8 40 4 60-5 26 8 54 30 68-36-12-56-48-46-84 3-14 8-30 12-44z"
        fill="url(#fDeep)"
      />
      <Path
        d="M160 62c-12 22-8 40-4 60 5 26-8 54-30 68 36-12 56-48 46-84-3-14-8-30-12-44z"
        fill="url(#fDeep)"
      />
      <Path d="M58 20c10 28 0 44-6 64 16-10 28-26 32-44 3-12-2-20-26-20z" fill="url(#fMid)" />
      <Path d="M142 20c-10 28 0 44 6 64-16-10-28-26-32-44-3-12 2-20 26-20z" fill="url(#fMid)" />
      <Path
        d="M26 108c8 18 4 32 2 46-3 20 8 38 24 48-30-12-42-42-34-70 2-8 5-16 8-24z"
        fill="url(#fMid)"
      />
      <Path
        d="M174 108c-8 18-4 32-2 46 3 20-8 38-24 48 30-12 42-42 34-70-2-8-5-16-8-24z"
        fill="url(#fMid)"
      />

      {/* corpo intermediario */}
      <Path
        d="M100 38c12 36 32 48 41 78 9 32-5 64-41 82-36-18-50-50-41-82 9-30 29-42 41-78z"
        fill="url(#fMid)"
      />
      <Path
        d="M66 88c5 20-2 32-6 48-6 20 5 38 20 48-26-10-38-34-31-60 2-13 9-25 17-36z"
        fill="url(#fCore)"
        opacity={0.92}
      />
      <Path
        d="M134 88c-5 20 2 32 6 48 6 20-5 38-20 48 26-10 38-34 31-60-2-13-9-25-17-36z"
        fill="url(#fCore)"
        opacity={0.92}
      />

      {/* nucleo brilhante */}
      <Path
        d="M100 78c9 26 23 34 29 56 7 24-4 48-29 60-25-12-36-36-29-60 6-22 20-30 29-56z"
        fill="url(#fCore)"
      />

      {/* faiscas */}
      <Circle cx="44" cy="48" r="3.2" fill="#FFE07A" />
      <Circle cx="160" cy="42" r="2.6" fill="#FFE07A" />
      <Circle cx="30" cy="92" r="2.2" fill="#FFCB4D" />
      <Circle cx="172" cy="86" r="2.8" fill="#FFCB4D" />
      <Circle cx="52" cy="196" r="2.4" fill="#FFCB4D" />
      <Circle cx="150" cy="204" r="2" fill="#FFE07A" />

      {/* luva de goleiro levemente inclinada */}
      <G rotation={-6} originX={100} originY={170}>
        <Rect x="68" y="96" width="18" height="88" rx="9" fill="url(#glove)" />
        <Rect x="88" y="82" width="19" height="102" rx="9.5" fill="url(#glove)" />
        <Rect x="109" y="88" width="18" height="96" rx="9" fill="url(#glove)" />
        <Rect x="129" y="106" width="17" height="78" rx="8.5" fill="url(#glove)" />
        <G rotation={-24} originX={51} originY={160}>
          <Rect x="42" y="132" width="18" height="56" rx="9" fill="url(#glove)" />
        </G>

        <Path
          d="M64 156h84c6 0 10 4 10 10v32c0 15-12 27-27 27H81c-15 0-27-12-27-27v-32c0-6 4-10 10-10z"
          fill="url(#glove)"
        />
        <Path
          d="M64 156h84c6 0 10 4 10 10v5H54v-5c0-6 4-10 10-10z"
          fill="#DDE4EA"
          opacity={0.65}
        />
        <Path
          d="M126 156h22c6 0 10 4 10 10v32c0 15-12 27-27 27h-8c14-6 21-20 21-36v-24c0-4-8-9-18-9z"
          fill="#CBD5DE"
          opacity={0.5}
        />

        <Rect x="71" y="218" width="62" height="32" rx="13" fill="url(#cuff)" />
        <Rect x="71" y="229" width="62" height="4" fill="#A9B5C0" opacity={0.5} />

        {[0, 1, 2, 3, 4].map((r) =>
          [0, 1, 2].map((c) => (
            <Circle
              key={`${r}-${c}`}
              cx={91 + c * 11}
              cy={106 + r * 12}
              r={1.7}
              fill="#93A0AC"
              opacity={0.5}
            />
          )),
        )}
      </G>
    </Svg>
  );
}

export default Flame;
