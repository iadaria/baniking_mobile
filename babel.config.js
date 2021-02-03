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
          '@app': './src/app',
          '@constatns': './src/app/common/constants/index.ts',
          '@assets': './src/assets',
          '@i18n': './src/i18n',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};
