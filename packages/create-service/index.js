import commander from 'commander';
import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs-extra';
import path from 'path';

import packageJson from './package.json';

let projectName;

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action(name => {
    projectName = name;
  })
  .option('--typescript')
  .allowUnknownOption()
  .on('--help', () => {
    console.log(chalk.green('halp'));
  })
  .parse(process.argv);

if (fs.existsSync(projectName)) {
  console.log(
    chalk.yellow(`a directory with the name ${projectName} already exists`)
  );
  process.exit(1);
}

fs.ensureDirSync(projectName);

const root = path.resolve(projectName);

let templateDir = path.resolve(__dirname, 'templates/default');
if (program.typescript) {
  templateDir = path.resolve(__dirname, 'templates/typescript');
}

fs.copySync(templateDir, root);

const dependencies = ['apollo-server', 'graphql'];
const devDependencies = ['@vaporweb/service'];
if (program.typescript) {
  dependencies.push('ts-node', 'typescript');
  devDependencies.push('@types/node', '@types/jest', '@types/graphql');
} else {
  dependencies.push('esm');
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
