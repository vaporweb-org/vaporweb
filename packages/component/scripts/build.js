import { spawnSync } from 'child_process';

import paths from '../config/paths';

const { error } = spawnSync(
  'rollup',
  ['-c', require.resolve('../config/rollup.config.js')].concat(
    process.argv.slice(2)
  ),
  {
    stdio: 'inherit',
  }
);

if (error) {
  console.error(error);
  process.exit(1);
}
