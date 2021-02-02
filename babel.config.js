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
          src: './src',
          assets: './src/assets',
          helpers: './src/helpers',
          components: './src/components',
          navigation: './src/navigation',
          screens: './src/screens',
          store: './src/store',
          libs: './src/libs',
          i18n: './src/i18n',
          utils: './src/utils',
          common: './src/common',
          constants: './src/constants',
        },
      },
    ],
  ],
};
