import fs from 'fs';
import { spawnSync } from 'child_process';

import config from '../config/component.config.js';
import paths from '../config/paths';

const eslintConfig = fs.existsSync(paths.eslintConfig)
  ? paths.eslintConfig
  : require.resolve('@vaporweb/eslint-config');

const tslintConfig = fs.existsSync(paths.tslintConfig)
  ? paths.tslintConfig
  : require.resolve('@vaporweb/eslint-config');

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
    [
      '-c',
      tslintConfig,
      `${paths.src}/**/*.ts`,
      `${paths.src}/**/*.tsx`,
    ].concat(process.argv.slice(2)),
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
