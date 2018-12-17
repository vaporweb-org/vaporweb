# @vaporweb/app

## App Scripts

### `app build`

Builds the project for production with [Webpack](https://webpack.js.org/).

### `app develop`

Builds the project in development mode and watches for changes.

### `app lint`

Runs the linter.

CLI options will be forwarded to [eslint](https://eslint.org/) or [tslint](https://palantir.github.io/tslint). For example, `app lint --fix`.

[ESLint CLI options](https://eslint.org/docs/user-guide/command-line-interface#options)

[TSLint CLI options](https://palantir.github.io/tslint/usage/cli/#cli-usage)

### `app test`

Starts the test runner. CLI options will be forwarded to [Jest](https://jestjs.io/). For example, `app test --watch`.

[Jest CLI options](https://jestjs.io/docs/en/cli.html#options)

You can override jest configuration options by adding them to the package.json file.

## App Config

You can modify the config by placing a .app.js file in the root of your project. The config defaults are given in the example below.

```
  module.exports = {
    babel: true,
    eslint: true,
    tsc: false,
    tslint: false,
    server: false,
    webpack(config, { target, env }) {
      if (target === 'client' && env === 'development') {
        // ...
      }

      if (target === 'server' && env === 'production') {
        // ...
      }

      return config;
    },
  }
```
