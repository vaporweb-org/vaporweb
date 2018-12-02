import path from 'path';
import jest from 'jest';
import jestConfigVaporweb from '@vaporweb/jest-config-vaporweb';

import vaporwebConfig from '../config/vaporweb.config.js';

const appPackageJson = path.resolve(process.cwd(), 'package.json');
const config = JSON.stringify({
  ...jestConfigVaporweb(vaporwebConfig),
  ...require(appPackageJson).jest,
});

const argv = ['-c', config].concat(process.argv.slice(2));

jest.run(argv);
