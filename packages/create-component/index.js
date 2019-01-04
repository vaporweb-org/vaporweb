import program from 'commander';
import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs-extra';
import path from 'path';

import packageJson from './package.json';

program
  .name(packageJson.name)
  .version(packageJson.version)
  .arguments('[directory]')
  .usage(`${chalk.green('[directory]')} [options]`)
  .action(createProject)
  .option('-t, --typescript', 'initialize using the typescript template')
  .option('-f, --force', 'initialize in a non-empty directory')
  .parse(process.argv);

function createProject(directory, cmd) {
  let projectDir = process.cwd();
  if (directory) {
    fs.ensureDirSync(directory);
    projectDir = path.resolve(directory);
  }

  const files = fs.readdirSync(projectDir);
  if (files.length && !cmd.force) {
    console.log(
      `The directory ${path.resolve(
        projectDir
      )} already contains files.\n\nExiting.`
    );
    process.exit(1);
  }

  let existingPackageJson;
  const packageJsonPath = path.resolve(projectDir, 'package.json');
  if (fs.pathExistsSync(packageJsonPath)) {
    existingPackageJson = fs.readJsonSync(packageJsonPath);
  }

  let templateDir = path.resolve(__dirname, 'templates/default');
  if (cmd.typescript) {
    templateDir = path.resolve(__dirname, 'templates/typescript');
  }
  fs.copySync(templateDir, projectDir);

  if (existingPackageJson) {
    const packageJson = fs.readJsonSync(packageJsonPath);
    fs.outputJsonSync(
      packageJsonPath,
      {
        ...existingPackageJson,
        scripts: packageJson.scripts,
        browser: packageJson.browser,
        main: packageJson.main,
        module: packageJson.module,
        browserslist: packageJson.browserslist,
      },
      { spaces: 2 }
    );
  }

  const dependencies = ['react', 'react-dom'];
  const devDependencies = ['@vaporweb/component'];
  if (cmd.typescript) {
    devDependencies.push(
      '@types/react',
      '@types/react-dom',
      '@types/node',
      '@types/jest'
    );
  }

  process.chdir(projectDir);
  console.log('installing dependencies...');
  execa('npm', ['install', '--save', '--save-exact', ...dependencies])
    .then(() => {
      console.log('installed dependencies.');
      console.log('installing dev dependencies...');
      execa('npm', [
        'install',
        '--save-dev',
        '--save-exact',
        ...devDependencies,
      ])
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
}
