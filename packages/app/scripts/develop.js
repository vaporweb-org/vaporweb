import fs from 'fs-extra';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import paths from '../config/paths';
import webpackConfig from '../config/webpack.config';

process.env.NODE_ENV = 'development';

const { client, server } = webpackConfig();

const clientCompiler = webpack(client);

clientCompiler.plugin('done', () => {
  if (server) {
    const serverCompiler = webpack(server);
    serverCompiler.watch(
      {
        quiet: true,
        stats: 'none',
      },
      stats => {}
    );
  }
});

const devServer = new WebpackDevServer(clientCompiler, client.devServer);

devServer.listen(3001, err => {
  if (err) {
    console.error(err);
  }
});

fs.emptyDirSync(paths.output);
fs.copySync(paths.publicPath, paths.clientOutput, {
  dereference: true,
});
