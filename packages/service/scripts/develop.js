import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const rootDir = process.cwd();
const useTypeScript = fs.existsSync(path.resolve(rootDir, 'tsconfig.json'));
const packageJson = require(path.resolve(rootDir, 'package.json'));

const nodemon = () =>
  spawnSync(
    require.resolve('.bin/nodemon'),
    ['-r', 'esm'].concat(process.argv.slice(2), packageJson.main),
    {
      stdio: 'inherit',
    }
  );

const tsNodeDev = () =>
  spawnSync(
    require.resolve('.bin/ts-node-dev'),
    process.argv.slice(2).concat('--', packageJson.main),
    {
      stdio: 'inherit',
    }
  );

const { error } = useTypeScript ? tsNodeDev() : nodemon();

if (error) {
  console.error(error);
  process.exit(1);
}
