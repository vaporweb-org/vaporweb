import fs from 'fs';
import path from 'path';
import commander from 'commander';

const argv = commander
  .option('--root <dir>')
  .allowUnknownOption()
  .parse(process.argv);

const rootPath = path.resolve(process.cwd());
const appPath = fs.realpathSync(argv.root || process.cwd());
const resolveRoot = relativePath => path.resolve(rootPath, relativePath);
const resolveApp = relativePath => path.resolve(appPath, relativePath);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveExt = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

export default {
  src: resolveApp('src'),
  publicPath: resolveApp('public'),
  entry: resolveExt(resolveApp, 'src/index'),
  output: resolveApp('dist'),
  clientEntry: resolveExt(resolveApp, 'src/client'),
  clientOutput: resolveApp('dist/public'),
  appManifest: resolveApp('dist/public/manifest.json'),
  pkg: resolveRoot('package.json'),
  customConfig: resolveApp('.app.js'),
  tsConfig: resolveRoot('tsconfig.json'),
};
