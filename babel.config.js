module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Ensure 'react-native-reanimated/plugin' is the last plugin if you add others.
      'react-native-reanimated/plugin',
    ],
  };
};