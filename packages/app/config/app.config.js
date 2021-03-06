import fs from 'fs';

import paths from './paths';

let config = {
  babel: true,
  eslint: true,
  tsc: false,
  tslint: false,
  server: false,
  devPort: process.env.DEV_PORT || null,
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  publicPath: process.env.PUBLIC_PATH || '/',
  clientPublicPath: process.env.CLIENT_PUBLIC_PATH,
  webpack: cfg => cfg,
};

const hasTsConfig = fs.existsSync(paths.tsConfig);
const hasCustomConfig = fs.existsSync(paths.customConfig);
const bundleServer = fs.existsSync(paths.clientEntry);

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

if (bundleServer) {
  config = {
    ...config,
    server: true,
  };
}

export default config;
