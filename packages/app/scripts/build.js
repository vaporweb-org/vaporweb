import fs from 'fs-extra';
import webpack from 'webpack';
import webpackConfig from '../config/webpack.config';
import paths from '../config/paths';

process.env.NODE_ENV = 'production';

const { client, server } = webpackConfig();
const clientCompiler = webpack(client);

clientCompiler.run(err => {
  if (err) {
    throw err;
  }

  if (server) {
    const serverCompiler = webpack(server);

    serverCompiler.run((err, stats) => {
      if (err) {
        throw err;
      }
    });
  }
});

fs.emptyDirSync(paths.output);
fs.copySync(paths.publicPath, paths.clientOutput, {
  dereference: true,
});
