import fs from 'fs';
import path from 'path';

const rootPath = path.resolve(process.cwd());
const src = path.resolve(rootPath, 'src');

let entry = path.resolve(src, 'index');
const ts = path.resolve(src, 'index.ts');
const tsx = path.resolve(src, 'index.tsx');
if (fs.existsSync(ts)) {
  entry = ts;
} else if (fs.existsSync(tsx)) {
  entry = tsx;
}

const pkg = path.resolve(rootPath, 'package.json');
const packageJson = require(pkg);

const tsConfig = path.resolve(rootPath, 'tsconfig.json');
const customConfig = path.resolve(rootPath, '.vaporweb.js');

export default {
  entry,
  pkg,
  customConfig,
  tsConfig,
  cjsOut: packageJson.main,
  esmOut: packageJson.module,
};
