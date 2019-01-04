import fs from 'fs';
import path from 'path';

const rootPath = path.resolve(process.cwd());
const appPath = fs.realpathSync(process.env.VW_APP_ROOT || process.cwd());
const resolveRoot = relativePath => path.resolve(rootPath, relativePath);
const resolveApp = relativePath => path.resolve(appPath, relativePath);

export const moduleFileExtensions = [
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

export default {
  src: resolveApp('src'),
  publicPath: resolveApp('public'),
  entry: resolveModule(resolveApp, 'src/index'),
  output: resolveApp('dist'),
  clientEntry: resolveModule(resolveApp, 'src/client'),
  clientOutput: resolveApp('dist/public'),
  appManifest: resolveApp('dist/public/manifest.json'),
  pkg: resolveRoot('package.json'),
  customConfig: resolveApp('.app.js'),
  tsConfig: resolveRoot('tsconfig.json'),
  tslintConfig: resolveModule(resolveRoot, 'tslint', true),
  eslintConfig: resolveModule(resolveRoot, '.eslintrc', true),
  appModules: resolveRoot('node_modules'),
};
