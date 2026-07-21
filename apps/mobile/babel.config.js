module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // O plugin do Reanimated precisa ser SEMPRE o ultimo.
    plugins: ["react-native-reanimated/plugin"],
  };
};
