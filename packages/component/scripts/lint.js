import { spawnSync } from 'child_process';

const eslint = spawnSync(
  'eslint',
  ['-c', require.resolve('@vaporweb/eslint-config-vaporweb'), 'src'].concat(
    process.argv.slice(2)
  ),
  {
    stdio: 'inherit',
  }
);

const tslint = spawnSync(
  'tslint',
  ['-c', require.resolve('@vaporweb/tslint-config-vaporweb'), 'src/**'].concat(
    process.argv.slice(2)
  ),
  {
    stdio: 'inherit',
  }
);

if (eslint.error) {
  console.error(eslint.error);
  process.exit(1);
}

if (tslint.error) {
  console.error(tslint.error);
  process.exit(1);
}
