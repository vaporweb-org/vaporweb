import fs from 'fs';
import { spawnSync } from 'child_process';

import paths from '../config/paths';

const useTypeScript = fs.existsSync(paths.tsConfig);

const eslint = () =>
  spawnSync(
    require.resolve('.bin/eslint'),
    ['-c', require.resolve('@vaporweb/eslint-config'), '.'].concat(
      process.argv.slice(2)
    ),
    {
      stdio: 'inherit',
    }
  );

const tslint = () =>
  spawnSync(
    require.resolve('.bin/tslint'),
    ['-c', require.resolve('@vaporweb/tslint-config'), '--project', '.'].concat(
      process.argv.slice(2)
    ),
    {
      stdio: 'inherit',
    }
  );

const { error } = useTypeScript ? tslint() : eslint();

if (error) {
  console.error(error);
  process.exit(1);
}
