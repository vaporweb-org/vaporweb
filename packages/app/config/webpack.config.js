import webpack from 'webpack';
import StartServerPlugin from 'start-server-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import WebpackBar from 'webpackbar';
import ManifestPlugin from 'webpack-manifest-plugin';

import paths from './paths';
import appConfig from './app.config';

export default () => {
  const mode = process.env.NODE_ENV || 'development';
  const isProd = mode === 'production';
  const isDev = mode === 'development';
  const devServerPort = parseInt(appConfig.port, 10) + 1;
  const clientPublicPath = isDev ? `http://localhost:${devServerPort}/` : '/';

  const baseConfig = {
    mode,
    bail: isProd,
    devtool: isProd ? 'source-map' : 'cheap-eval-sourcemap',
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          include: [paths.src],
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              configFile: false,
              presets: [require.resolve('@vaporweb/babel-preset')],
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
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: isDev && [
            `Webpack Dev Server is running on port ${devServerPort}`,
          ],
        },
      }),
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
      allowedHosts: [],
      quiet: true,
      watchOptions: {
        ignored: /node_modules/,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  };

  if (appConfig.server) {
    return {
      server: appConfig.webpack(
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
          externals: [
            nodeExternals({
              whitelist: ['webpack/hot/poll?300'],
            }),
          ],
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
            isDev && new webpack.WatchIgnorePlugin([paths.appManifest]),
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
      client: appConfig.webpack(
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
    client: appConfig.webpack(
      {
        ...baseClientConfig,
        entry: { client: [paths.entry] },
      },
      { target: 'client', env: mode }
    ),
  };
};
