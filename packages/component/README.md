# @vaporweb/component

## Component Scripts

### `component build`

Builds the project for production. CLI options will be forwarded to [Rollup](https://rollupjs.org/). 

[Rollup CLI options](https://rollupjs.org/guide/en#command-line-flags)

Build files are output at the main and module paths set in the project's package.json file.

### `component develop`

Builds the project in development mode and watches for changes. CLI options will be forwarded to [Rollup](https://rollupjs.org/). 

[Rollup CLI options](https://rollupjs.org/guide/en#command-line-flags)

### `component lint`

Runs the linter. 

CLI options will be forwarded to [eslint](https://eslint.org/) or [tslint](https://palantir.github.io/tslint). For example, `component lint --fix`.

[ESLint CLI options](https://eslint.org/docs/user-guide/command-line-interface#options)

[TSLint CLI options](https://palantir.github.io/tslint/usage/cli/#cli-usage)

### `component test`

Starts the test runner. CLI options will be forwarded to [Jest](https://jestjs.io/). For example, `component test --watch`.

[Jest CLI options](https://jestjs.io/docs/en/cli.html#options)

You can override jest configuration options by adding them to the package.json file.

## Vaporweb Config

You can modify the config by placing a .vaporweb.js file in the root of your project. The config defaults are given in the example below.

```
  module.exports = {
    babel: true,
    eslint: true,
    tsc: false,
    tslint: false,
    rollup(config) {
      return config
    }
  }
```


