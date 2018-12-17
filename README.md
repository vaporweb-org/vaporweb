# v a p o r w e b

Create React component libraries and Node.js services with no configuration.

## Overview

### @vaporweb/component

```
npm init @vaporweb/component my-component
cd my-component
npm start
```

### @vaporweb/service

```
npm init @vaporweb/service my-service
cd my-service
npm start
```

### Get Started Immediately

Development tools like Babel, Jest, and Rollup are preconfigured and hidden so that you can focus on the code.

## Creating a Component

To create a new component, run the following command:

```sh
npm init @vaporweb/component my-component (--typescript)
```

The initialization script will create a directory called `my-component` inside the current folder.

Inside that directory, it will generate the initial project structure and install the dependencies:

```
my-component
├── README.md
├── node_modules
├── package.json
├── (tsconfig.json)
├── (tslint.json)
├── .gitignore
└── src
    ├── index.jsx (index.tsx)
    └── index.test.jsx (index.test.jsx)
```

Inside the newly created project, you can run some built-in commands:

### `npm start`

Builds the project in watch mode.

### `npm test`

Starts the test runner.

### `npm run build`

Builds the project for production.

### `npm run lint`

Runs the linter. You can pass the fix param (`npm run lint -- --fix`) to automatically fix lint errors.

[Read more about @vaporweb/component here.](/packages/component/README.md)

## Creating a Service

To create a new service, run the following command:

```sh
npm init @vaporweb/service my-service (--typescript)
```

The initialization script will create a directory called `my-service` inside the current folder.

Inside that directory, it will generate the initial project structure and install the dependencies:

```
my-service
├── README.md
├── node_modules
├── package.json
├── index.js (index.ts)
├── (tsconfig.json)
├── (tslint.json)
├── .gitignore
└── tests
    └── quick-maths.test.js (quick-maths.test.ts)
```

Inside the newly created project, you can run some built-in commands:

### `npm start`

Starts the service.

### `npm test`

Starts the test runner.

### `npm run lint`

Runs the linter. You can pass the fix param (`npm run lint -- --fix`) to automatically fix lint errors.

[Read more about @vaporweb/service here.](/packages/service/README.md)

## Inspiration

- [facebook/create-react-app](https://github.com/facebook/create-react-app/)
- [jaredpalmer/razzle](https://github.com/jaredpalmer/razzle)
