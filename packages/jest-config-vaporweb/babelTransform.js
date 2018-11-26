const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: ['@vaporweb/babel-preset-vaporweb'],
});
