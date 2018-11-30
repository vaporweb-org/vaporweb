import fs from 'fs';
import { spawnSync } from 'child_process';

const useTypeScript = fs.existsSync('tsconfig.json');

const nodemon = () =>
  spawnSync(
    require.resolve('.bin/nodemon'),
    ['-r', 'esm'].concat(process.argv.slice(2)),
    {
      stdio: 'inherit',
    }
  );

const tsNodeDev = () =>
  spawnSync(
    require.resolve('.bin/ts-node-dev'),
    [].concat(process.argv.slice(2)),
    {
      stdio: 'inherit',
    }
  );

const { error } = useTypeScript ? tsNodeDev() : nodemon();

if (error) {
  console.error(error);
  process.exit(1);
}
