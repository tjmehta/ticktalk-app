module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ts',
          '.tsx',
          '.js',
          '.jsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        root: ['.'],
        alias: {
          '~': './',
        },
      },
    ],
  ],
}
