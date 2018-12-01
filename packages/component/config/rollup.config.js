import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import tslint from 'rollup-plugin-tslint';
import progress from 'rollup-plugin-progress';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript2';

import paths from './paths';
import vaporwebConfig from './vaporweb.config.js';

export default function config() {
  const pkg = require(paths.pkg);
  const isProd = !process.env.ROLLUP_WATCH;

  return vaporwebConfig.modify({
    input: paths.entry,
    output: [
      { file: paths.cjsOut, format: 'cjs' },
      { file: paths.esmOut, format: 'es' },
    ],
    external: [Object.keys(pkg.peerDependencies || {})],
    plugins: [
      progress(),
      commonjs({
        include: 'node_modules/**',
      }),
      resolve(),
      replace({
        'process.env.NODE_ENV': isProd ? '"production"' : '"development"',
      }),
      vaporwebConfig.eslint &&
        eslint({
          configFile: require.resolve('@vaporweb/eslint-config-vaporweb'),
          include: ['src/**/*.js', 'src/**/*.jsx'],
        }),
      vaporwebConfig.tslint &&
        tslint({
          configuration: require.resolve('@vaporweb/tslint-config-vaporweb'),
          include: ['src/**/*.ts', 'src/**/*.tsx'],
        }),
      vaporwebConfig.tsc && typescript(),
      vaporwebConfig.babel &&
        babel({
          babelrc: false,
          configFile: false,
          exclude: '/node_modules/**',
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          presets: ['@vaporweb/babel-preset-vaporweb'],
        }),
    ].filter(Boolean),
    watch: {
      clearScreen: false,
    },
  });
}
