import path from 'path';
import jest from 'jest';
import jestConfigVaporweb from '@vaporweb/jest-config-vaporweb';

const appPackageJson = path.resolve(process.cwd(), 'package.json');
const config = Object.assign({}, jestConfigVaporweb);
const overrides = Object.assign({}, require(appPackageJson).jest);

Object.keys(overrides).forEach(key => {
  if (overrides.hasOwnProperty(key)) {
    config[key] = overrides[key];
    delete overrides[key];
  }
});

const argv = ['-c', JSON.stringify(config)].concat(process.argv.slice(2));

jest.run(argv);
