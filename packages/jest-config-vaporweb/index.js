"use strict";

const { defaults } = require("jest-config");

module.exports = {
  rootDir: process.env.PWD,
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": require.resolve("./babelTransform")
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$"]
};
