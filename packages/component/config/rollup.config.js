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
  const nodeEnv = isProd ? '"production"' : '"development"';

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
        resolve({ main: true }),
        commonjs({
          include: 'node_modules/**',
        }),
        replace({
          'process.env.NODE_ENV': nodeEnv,
        }),
        componentConfig.eslint &&
          eslint({
            configFile: eslintConifg,
            include: ['src/**/*.js'],
          }),
        componentConfig.tslint &&
          tslint({
            configuration: tslintConifg,
            include: ['src/**/*.{ts,tsx}'],
          }),
        componentConfig.tsc && typescript(),
        componentConfig.babel &&
          babel({
            babelrc: false,
            configFile: false,
            exclude: '/node_modules/**',
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            presets: [require.resolve('@vaporweb/babel-preset')],
          }),
      ].filter(Boolean),
      watch: {
        clearScreen: false,
      },
    },
    { env: nodeEnv }
  );
}
