import fs from 'fs';
import path from 'path';
import jest from 'jest';
import jestConfigVaporweb from '@vaporweb/jest-config';

const useTypeScript = fs.existsSync('tsconfig.json');

const appPackageJson = path.resolve(process.cwd(), 'package.json');
const config = JSON.stringify({
  ...jestConfigVaporweb({
    tsc: useTypeScript,
  }),
  ...require(appPackageJson).jest,
});

const argv = ['-c', config].concat(process.argv.slice(2));

jest.run(argv);
