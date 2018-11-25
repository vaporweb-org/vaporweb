import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';

import paths from './paths';

export default async function config() {
  const pkg = await import(paths.pkg);
  return [
    // {
    //   input: paths.entry,
    //   output: {
    //     name: paths.umdName,
    //     file: paths.umdOut,
    //     format: "umd"
    //   },
    //   plugins: [
    //     resolve(),
    //     commonjs(),
    //     babel({
    //       exclude: "/node_modules/**",
    //       ...require("./babel.config.js")
    //     })
    //   ]
    // },
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
        eslint({
          useEslintrc: false,
          configFile: require.resolve('@vaporweb/eslint-config-vaporweb'),
        }),
        babel({
          exclude: '/node_modules/**',
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          ...require('@vaporweb/babel-preset-vaporweb'),
        }),
      ],
    },
  ];
}
