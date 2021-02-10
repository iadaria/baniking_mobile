module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '~/src': './src',
          // '~/app': './src/app',
          // '~/assets': './src/assets',
          // '~/i18n': './src/i18n',
          // '~/navigation': './src/navigation',
          // '~/initial': './src/initial-imports',
          // '~/features': './src/features',
        },
      },
    ],
  ],
};
