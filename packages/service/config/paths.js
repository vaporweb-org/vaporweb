import fs from 'fs';
import path from 'path';

const rootPath = path.resolve(process.cwd());
const servicePath = path.resolve(process.env.VW_SERVICE_ROOT || process.cwd());
const resolveRoot = relativePath => path.resolve(rootPath, relativePath);
const resolveService = relativePath => path.resolve(servicePath, relativePath);

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
  entry: packageJson.main || resolveModule(resolveService, 'index'),
  pkg: resolveRoot('package.json'),
  tsConfig: resolveRoot('tsconfig.json'),
  tslintConfig: resolveModule(resolveRoot, 'tslint', true),
  eslintConfig: resolveModule(resolveRoot, '.eslintrc', true),
};
