module.exports = () => {
  return {
    entry: './src/index',
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.(t|j)sx?/,
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
    target: 'web',
  };
};
