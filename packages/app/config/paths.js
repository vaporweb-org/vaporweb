import fs from 'fs';
import path from 'path';

function resolveOne(relativeTo, files) {
  let filePath;
  files.forEach(file => {
    const resolved = path.resolve(relativeTo, file);
    if (fs.existsSync(resolved)) {
      filePath = resolved;
    }
  });
  return filePath;
}

const rootPath = path.resolve(process.cwd());
const src = path.resolve(rootPath, 'src');
const publicPath = path.resolve(rootPath, 'public');

const entry = resolveOne(src, ['index.js', 'index.ts', 'index.tsx']);
const output = path.resolve(rootPath, 'dist');

const clientEntry = resolveOne(src, ['client.js', 'client.ts', 'client.tsx']);
const clientOutput = path.resolve(output, 'public');

const pkg = path.resolve(rootPath, 'package.json');
const packageJson = require(pkg);

const tsConfig = path.resolve(rootPath, 'tsconfig.json');
const customConfig = path.resolve(rootPath, '.app.js');

export default {
  src,
  publicPath,
  entry,
  output,
  clientEntry,
  clientOutput,
  pkg,
  customConfig,
  tsConfig,
  cjsOut: packageJson.main,
  esmOut: packageJson.module,
};
