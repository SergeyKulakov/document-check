module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [ ["@babel/plugin-syntax-bigint"],
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
  ],
};
