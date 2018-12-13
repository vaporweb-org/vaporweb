import { spawnSync } from 'child_process';

import config from '../config/app.config.js';

const eslint =
  config.eslint &&
  spawnSync(
    require.resolve('.bin/eslint'),
    ['-c', require.resolve('@vaporweb/eslint-config-vaporweb')].concat(
      process.argv.slice(2)
    ),
    {
      stdio: 'inherit',
    }
  );

const tslint =
  config.tslint &&
  spawnSync(
    require.resolve('.bin/tslint'),
    ['-c', require.resolve('@vaporweb/tslint-config-vaporweb')].concat(
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