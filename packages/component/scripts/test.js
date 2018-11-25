import { spawnSync } from 'child_process';

const { error } = spawnSync(
  'jest',
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
