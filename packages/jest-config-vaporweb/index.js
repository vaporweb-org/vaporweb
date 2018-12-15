module.exports = vaporwebConfig => {
  let config = {
    rootDir: process.cwd(),
    testEnvironment: 'jsdom',
  };

  if (vaporwebConfig.babel && !vaporwebConfig.tsc) {
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

  if (vaporwebConfig.tsc && !vaporwebConfig.babel) {
    config = {
      ...config,
      preset: 'ts-jest',
    };
  }

  if (vaporwebConfig.tsc && vaporwebConfig.babel) {
    config = {
      ...config,
      preset: 'ts-jest/presets/js-with-babel',
      globals: {
        'ts-jest': {
          babelConfig: require('@vaporweb/babel-preset-vaporweb'),
        },
      },
    };
  }

  return config;
};
