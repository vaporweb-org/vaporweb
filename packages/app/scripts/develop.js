import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from '../config/webpack.config';

const compiler = webpack(config());

compiler.plugin('done', () => {
  console.log('done');
});

const devServer = new WebpackDevServer(compiler, {
  // quiet: true,
  // stats: 'none'
});

devServer.listen(8080, err => {
  if (err) {
    console.log(err);
  }
});
