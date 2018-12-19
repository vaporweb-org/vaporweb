import fs from 'fs';
import { spawnSync } from 'child_process';

import paths from '../config/paths';

const useTypeScript = fs.existsSync(paths.tsConfig);

const nodemon = () =>
  spawnSync(
    require.resolve('.bin/nodemon'),
    ['-r', 'esm'].concat(process.argv.slice(2), paths.entry),
    {
      stdio: 'inherit',
    }
  );

const tsNodeDev = () =>
  spawnSync(
    require.resolve('.bin/ts-node-dev'),
    process.argv.slice(2).concat('--', paths.entry),
    {
      stdio: 'inherit',
    }
  );

const { error } = useTypeScript ? tsNodeDev() : nodemon();

if (error) {
  console.error(error);
  process.exit(1);
}
