import { spawnSync } from 'child_process';

const { error } = spawnSync(
  require.resolve('jest/bin/jest'),
  ['src', `--c=${require.resolve('@vaporweb/jest-config-vaporweb')}`].concat(
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
