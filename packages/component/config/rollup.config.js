import fs from 'fs';
import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import tslint from 'rollup-plugin-tslint';
import progress from 'rollup-plugin-progress';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

import paths from './paths';

// TODO: create vaporweb config//plugin schema
const useTypeScript = fs.existsSync('tsconfig.json');
const useBabel = !useTypeScript;

export default async function config() {
  const pkg = await import(paths.pkg);
  return [
    {
      input: paths.entry,
      output: [
        { file: paths.cjsOut, format: 'cjs' },
        { file: paths.esmOut, format: 'es' },
      ],
      external: [].concat(
        Object.keys(pkg.dependencies || {}),
        Object.keys(pkg.peerDependencies || {})
      ),
      plugins: [
        progress(),
        commonjs({
          include: 'node_modules/**',
        }),
        resolve(),
        eslint({
          useEslintrc: false,
          configFile: require.resolve('@vaporweb/eslint-config-vaporweb'),
          include: ['src/**/*.js', 'src/**/*.jsx'],
        }),
        useTypeScript &&
          tslint({
            configuration: require.resolve('@vaporweb/tslint-config-vaporweb'),
            include: ['src/**/*.ts', 'src/**/*.tsx'],
          }),
        useTypeScript && typescript(),
        useBabel &&
          babel({
            babelrc: false,
            exclude: '/node_modules/**',
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            presets: ['@vaporweb/babel-preset-vaporweb'],
          }),
      ].filter(Boolean),
      watch: {
        clearScreen: false,
      },
    },
  ];
}
