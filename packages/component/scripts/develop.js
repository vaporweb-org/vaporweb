import { spawnSync } from 'child_process';

const { error } = spawnSync(
  require.resolve('rollup/bin/rollup'),
  ['-c', require.resolve('../config/rollup.config.js'), '-w'].concat(
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
