import fs from 'fs';
import jest from 'jest';
import jestConfigVaporweb from '@vaporweb/jest-config';

import paths from '../config/paths';

const useTypeScript = fs.existsSync(paths.tsConfig);

const config = JSON.stringify({
  ...jestConfigVaporweb({
    tsc: useTypeScript,
  }),
  ...require(paths.pkg).jest,
});

const argv = ['-c', config].concat(process.argv.slice(2));

jest.run(argv);
