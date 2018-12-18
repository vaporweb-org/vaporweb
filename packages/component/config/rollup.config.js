import fs from 'fs';
import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import tslint from 'rollup-plugin-tslint';
import progress from 'rollup-plugin-progress';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript2';

import paths from './paths';
import componentConfig from './component.config.js';

export default function config() {
  const pkg = require(paths.pkg);
  const isProd = !process.env.ROLLUP_WATCH;
  const nodeEnv = isProd ? 'production' : 'development';

  const eslintConifg = fs.existsSync(paths.eslintConifg)
    ? paths.eslintConifg
    : require.resolve('@vaporweb/eslint-config');

  const tslintConifg = fs.existsSync(paths.tslintConifg)
    ? paths.tslintConifg
    : require.resolve('@vaporweb/tslint-config');

  return componentConfig.rollup(
    {
      input: paths.entry,
      output: [
        { file: paths.cjsOut, format: 'cjs' },
        { file: paths.esmOut, format: 'es' },
      ],
      external: [Object.keys(pkg.peerDependencies || {})],
      plugins: [
        progress(),
        componentConfig.resolve &&
          resolve({
            ...componentConfig.resolve,
          }),
        componentConfig.commonjs &&
          commonjs({
            include: 'node_modules/**',
            ...componentConfig.commonjs,
          }),
        componentConfig.replace &&
          replace({
            'process.env.NODE_ENV': JSON.stringify(nodeEnv),
            ...componentConfig.replace,
          }),
        componentConfig.eslint &&
          eslint({
            configFile: eslintConifg,
            include: ['src/**/*.js'],
            ...componentConfig.eslint,
          }),
        componentConfig.tslint &&
          tslint({
            configuration: tslintConifg,
            include: ['src/**/*.{ts,tsx}'],
            ...componentConfig.tslint,
          }),
        componentConfig.tsc && typescript(),
        componentConfig.babel &&
          babel({
            babelrc: false,
            configFile: false,
            exclude: '/node_modules/**',
            extensions: ['.js', '.ts', '.tsx'],
            presets: [require.resolve('@vaporweb/babel-preset')],
            ...componentConfig.babel,
          }),
      ].filter(Boolean),
      watch: {
        clearScreen: false,
      },
    },
    { env: nodeEnv }
  );
}
