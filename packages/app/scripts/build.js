import webpack from 'webpack';
import config from '../config/webpack.config';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';

const compiler = webpack(config());

compiler.run((err, stats) => {
  if (err) {
    throw err;
  }

  const { errors, warnings } = formatWebpackMessages(stats.toJson(), true);
  if (errors.lenght) {
    throw new Error(errors.join('\n\n'));
  }

  if (warnings.length) {
    console.warn(warnings.join('\n\n'));
  }
});
