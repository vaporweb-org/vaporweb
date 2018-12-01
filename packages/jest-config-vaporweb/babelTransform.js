const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  babelrc: false,
  configFile: false,
  presets: ['@vaporweb/babel-preset-vaporweb'],
});
