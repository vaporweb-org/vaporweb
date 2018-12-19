import jest from 'jest';
import jestConfigVaporweb from '@vaporweb/jest-config';

import paths from '../config/paths';
import componentConfig from '../config/component.config.js';

const config = JSON.stringify({
  ...jestConfigVaporweb(componentConfig),
  ...require(paths.pkg).jest,
});

const argv = ['-c', config].concat(process.argv.slice(2));

jest.run(argv);
