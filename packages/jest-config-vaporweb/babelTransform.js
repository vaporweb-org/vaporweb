const babelJest = require('babel-jest');
const babelConfig = require('@vaporweb/babel-preset-vaporweb');

module.exports = babelJest.createTransformer({
  ...babelConfig,
  babelrc: false,
  configFile: false,
});
