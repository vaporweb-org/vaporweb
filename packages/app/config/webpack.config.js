import webpack from 'webpack';
import StartServerPlugin from 'start-server-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import WebpackBar from 'webpackbar';

import paths from './paths';
import vaporwebConfig from './vaporweb.config';

var ManifestPlugin = require('webpack-manifest-plugin');

const mode = 'development'; // process.env.NODE_ENV || 'production';
const isProd = false; // process.env.NODE_ENV === 'production';
const isDev = true; // process.env.NODE_ENV === 'development';

const __PORT__ = '3000';

const devServerPort = parseInt(__PORT__, 10) + 1;
const clientPublicPath = isDev ? `http://localhost:${devServerPort}/` : '/';

export default () => {
  const baseConfig = {
    mode,
    bail: isProd,
    devtool: isProd ? 'source-map' : 'cheap-eval-sourcemap',
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              configFile: false,
              presets: ['@vaporweb/babel-preset-vaporweb'],
            },
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
  };

  const baseClientConfig = {
    ...baseConfig,
    output: {
      pathinfo: isDev,
      libraryTarget: 'var',
      filename: 'static/js/client.js',
      chunkFilename: 'static/js/[name].chunk.js',
      path: paths.clientOutput,
      publicPath: clientPublicPath,
    },
    target: 'web',
    plugins: [
      new WebpackBar({
        color: '#f56be2',
        name: 'client',
      }),
      new FriendlyErrorsWebpackPlugin(),
      new ManifestPlugin({
        path: paths.output,
        writeToFileEmit: true,
        filename: 'manifest.json',
      }),
      isDev &&
        new webpack.HotModuleReplacementPlugin({
          multiStep: true,
        }),
      isDev && new webpack.NamedModulesPlugin(),
    ].filter(Boolean),
    devServer: {
      compress: true,
      watchContentBase: true,
      port: devServerPort,
      contentBase: paths.clientOutput,
      quiet: true,
      watchOptions: {
        ignored: /node_modules/,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  };

  if (vaporwebConfig.server) {
    return {
      server: vaporwebConfig.webpack(
        {
          ...baseConfig,
          mode: 'none',
          watch: isDev,
          entry: [isDev && 'webpack/hot/poll?300', paths.entry].filter(Boolean),
          output: {
            libraryTarget: 'commonjs2',
            path: paths.output,
            filename: 'server.js',
          },
          target: 'node',
          externals: [nodeExternals()],
          plugins: [
            new WebpackBar({
              color: '#c065f4',
              name: 'server',
            }),
            new FriendlyErrorsWebpackPlugin(),
            new webpack.optimize.LimitChunkCountPlugin({
              maxChunks: 1,
            }),
            isDev && new webpack.HotModuleReplacementPlugin(),
            isDev &&
              new webpack.WatchIgnorePlugin([
                process.cwd() + '/dist/public/manifest.json',
              ]),
            isDev &&
              new StartServerPlugin({
                name: 'server.js',
                nodeArgs: ['-r', 'source-map-support/register'],
              }),
            isDev && new webpack.NamedModulesPlugin(),
          ].filter(Boolean),
        },
        { target: 'server', env: mode }
      ),
      client: vaporwebConfig.webpack(
        {
          ...baseClientConfig,
          entry: {
            client: [
              isDev && require.resolve('./webpackHotDevClient'),
              paths.clientEntry,
            ].filter(Boolean),
          },
        },
        { target: 'client', env: mode }
      ),
    };
  }

  return {
    client: vaporwebConfig.webpack(
      {
        ...baseClientConfig,
        entry: { client: [paths.entry] },
      },
      { target: 'client', env: mode }
    ),
  };
};
