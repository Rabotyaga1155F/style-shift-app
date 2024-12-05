module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
          '.css',
        ],
        root: ['.'],
        alias: {
          '@/components': './src/components',
          '@/assets': './src/assets',
          '@/constants': './src/constants',
          '@/hooks': './src/hooks',
          '@/navigation': './src/navigation',
          '@/store': './src/store',
          '@/types': './src/types',
          '@/utils': './src/utils',
        },
      },
    ],
    ['nativewind/babel'],
  ],
};
