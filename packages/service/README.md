# @vaporweb/service

## Service Scripts

### `service develop`

Runs the service in development mode and watches for changes. CLI options will be forwarded to [Node.js](https://nodejs.org/). 

[Node.js CLI options](https://nodejs.org/api/cli.html)

### `service lint`

Runs the linter. 

CLI options will be forwarded to [eslint](https://eslint.org/) or [tslint](https://palantir.github.io/tslint). For example, `service lint --fix`.

[ESLint CLI options](https://eslint.org/docs/user-guide/command-line-interface#options)

[TSLint CLI options](https://palantir.github.io/tslint/usage/cli/#cli-usage)

### `service test`

Starts the test runner. CLI options will be forwarded to [Jest](https://jestjs.io/). For example, `service test --watch`.

[Jest CLI options](https://jestjs.io/docs/en/cli.html#options)

You can override jest configuration options by adding them to the package.json file.
