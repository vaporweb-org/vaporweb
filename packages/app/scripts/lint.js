import fs from 'fs';
import { spawnSync } from 'child_process';

import config from '../config/app.config';
import paths from '../config/paths';

let eslintConfig = require.resolve('@vaporweb/eslint-config');
if (fs.existsSync(paths.eslintConfig)) {
  eslintConfig = paths.eslintConfig;
}

let tslintConfig = require.resolve('@vaporweb/tslint-config');
if (fs.existsSync(paths.tslintConfig)) {
  tslintConfig = paths.tslintConfig;
}

const eslint =
  config.eslint &&
  spawnSync(
    require.resolve('.bin/eslint'),
    ['-c', eslintConfig, paths.src].concat(process.argv.slice(2)),
    {
      stdio: 'inherit',
    }
  );

const tslint =
  config.tslint &&
  spawnSync(
    require.resolve('.bin/tslint'),
    ['-c', tslintConfig, `${paths.src}/**/*.{ts,tsx}`].concat(
      process.argv.slice(2)
    ),
    {
      stdio: 'inherit',
    }
  );

if (eslint && eslint.error) {
  console.error(eslint.error);
  process.exit(1);
}

if (tslint && tslint.error) {
  console.error(tslint.error);
  process.exit(1);
}
