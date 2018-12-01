const { defaults } = require('jest-config');

module.exports = {
  rootDir: process.env.PWD,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testMatch: [
    '<rootDir>/(src|test(s|))/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/(src|test(s|))/**/?(*.)(spec|test).{js,jsx,ts,tsx}',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': require.resolve('./babelTransform'),
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$'],
};
