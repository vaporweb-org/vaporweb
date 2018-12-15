module.exports = ({ tsc, babel }) => {
  let config = {
    rootDir: process.cwd(),
    testEnvironment: 'jsdom',
  };

  if (babel && !tsc) {
    config = {
      ...config,
      moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
      testMatch: [
        '<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/**/?(*.)(spec|test).{js,jsx,ts,tsx}',
      ],
      transform: {
        '^.+\\.(js|jsx|ts|tsx)$': require.resolve('./babelTransform'),
      },
      transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
      ],
    };
  }

  if (tsc && !babel) {
    config = {
      ...config,
      preset: 'ts-jest',
    };
  }

  if (tsc && babel) {
    config = {
      ...config,
      preset: 'ts-jest/presets/js-with-babel',
      globals: {
        'ts-jest': {
          babelConfig: require('@vaporweb/babel-preset'),
        },
      },
    };
  }

  return config;
};
