import fs from 'fs';
import path from 'path';

const rootPath = path.resolve(process.cwd());
// const appPath = fs.realpathSync(argv.root || process.cwd());
const resolveRoot = relativePath => path.resolve(rootPath, relativePath);
// const resolveApp = relativePath => path.resolve(appPath, relativePath);

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

const configFileExtensions = ['js', 'yaml', 'yml', 'json', ''];

const resolveModule = (resolveFn, filePath, extended) => {
  const extension = moduleFileExtensions
    .concat(extended ? configFileExtensions : [])
    .find(extension => fs.existsSync(resolveFn(`${filePath}.${extension}`)));

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

const packageJson = require(resolveRoot('package.json'));

export default {
  src: resolveRoot('src'),
  entry: resolveModule(resolveRoot, 'src/index'),
  pkg: resolveRoot('package.json'),
  customConfig: resolveRoot('.component.js'),
  tsConfig: resolveRoot('tsconfig.json'),
  cjsOut: packageJson.main,
  esmOut: packageJson.module,
  tslintConfig: resolveModule(resolveRoot, 'tslint', true),
  eslintConfig: resolveModule(resolveRoot, '.eslintrc', true),
};
