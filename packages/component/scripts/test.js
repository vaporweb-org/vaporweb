import path from 'path';
import jest from 'jest';
import jestConfigVaporweb from '@vaporweb/jest-config';

import componentConfig from '../config/component.config.js';

const packageJson = path.resolve(process.cwd(), 'package.json');
const config = JSON.stringify({
  ...jestConfigVaporweb(componentConfig),
  ...require(packageJson).jest,
});

const argv = ['-c', config].concat(process.argv.slice(2));

jest.run(argv);
