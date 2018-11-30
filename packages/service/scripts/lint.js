import fs from 'fs';
import { spawnSync } from 'child_process';

const useTypeScript = fs.existsSync('tsconfig.json');

const eslint = spawnSync(
  require.resolve('.bin/eslint'),
  ['-c', require.resolve('@vaporweb/eslint-config-vaporweb'), '.'].concat(
    process.argv.slice(2)
  ),
  {
    stdio: 'inherit',
  }
);

const tslint =
  useTypeScript &&
  spawnSync(
    require.resolve('.bin/tslint'),
    [
      '-c',
      require.resolve('@vaporweb/tslint-config-vaporweb'),
      '--project',
      '.',
    ].concat(process.argv.slice(2)),
    {
      stdio: 'inherit',
    }
  );

if (eslint.error) {
  console.error(eslint.error);
  process.exit(1);
}

if (useTypeScript && tslint.error) {
  console.error(tslint.error);
  process.exit(1);
}
