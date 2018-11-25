'use strict';

module.exports = {
  presets: [require.resolve("@babel/preset-env"), require.resolve("@babel/preset-react")],
  plugins: [
    [require.resolve("@babel/plugin-proposal-class-properties"), { loose: true }],
    require.resolve("@babel/plugin-proposal-object-rest-spread")
  ]
};
