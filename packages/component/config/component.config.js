import fs from 'fs';
import paths from './paths';

let config = {
  babel: true,
  eslint: true,
  tsc: false,
  tslint: false,
  rollup: (cfg, { env }) => cfg,
};

const hasTsConfig = fs.existsSync(paths.tsConfig);
const hasCustomConfig = fs.existsSync(paths.customConfig);

if (hasTsConfig) {
  config = {
    ...config,
    babel: false,
    eslint: false,
    tsc: true,
    tslint: true,
  };
}

if (hasCustomConfig) {
  const customConfig = require(paths.customConfig);
  config = {
    ...config,
    ...customConfig,
  };
}

export default config;
