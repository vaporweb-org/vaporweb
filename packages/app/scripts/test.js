import jest from 'jest';
import jestConfigVaporweb from '@vaporweb/jest-config-vaporweb';

import paths from '../config/paths';
import appConfig from '../config/app.config.js';

const config = JSON.stringify({
  ...jestConfigVaporweb(appConfig),
  ...require(paths.pkg).jest,
});

const argv = ['-c', config].concat(process.argv.slice(2));

jest.run(argv);
