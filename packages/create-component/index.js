import commander from 'commander';
import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs-extra';
import path from 'path';

import packageJson from './package.json';

let componentName;

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<component-directory>')
  .usage(`${chalk.green('<component-directory>')} [options]`)
  .action(name => {
    componentName = name;
  })
  .option('--typescript')
  .allowUnknownOption()
  .on('--help', () => {
    console.log(chalk.green('halp'));
  })
  .parse(process.argv);

if (fs.existsSync(componentName)) {
  console.log(
    chalk.yellow(`a directory with the name ${componentName} already exists`)
  );
  process.exit(1);
}

fs.ensureDirSync(componentName);

const root = path.resolve(componentName);

let templateDir = path.resolve(__dirname, 'templates/default');
if (program.typescript) {
  templateDir = path.resolve(__dirname, 'templates/typescript');
}

fs.copySync(templateDir, root);

const dependencies = ['react', 'react-dom'];
const devDependencies = ['@vaporweb/component'];
if (program.typescript) {
  devDependencies.push(
    '@types/react',
    '@types/react-dom',
    '@types/node',
    '@types/jest'
  );
}

process.chdir(root);

console.log('installing dependencies...');
execa('npm', ['install', '--save', '--save-exact', ...dependencies])
  .then(() => {
    console.log('installed dependencies.');
    console.log('installing dev dependencies...');
    execa('npm', ['install', '--save-dev', '--save-exact', ...devDependencies])
      .then(() => console.log('success'))
      .catch(err => {
        console.log('npm install failed');
        console.error(err);
      });
  })
  .catch(err => {
    console.log('npm install failed');
    console.error(err);
  });
