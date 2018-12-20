#!/usr/bin/env node -r esm
import program from 'commander';
import { spawnSync } from 'child_process';
import pkg from '../package.json';

program
  .version(pkg.version)
  .option('--inspect')
  .option('--inspect-brk');

program
  .command('develop [root]')
  .description('run the development script')
  .action(run);

program
  .command('lint [root]')
  .description('run the lint script')
  .allowUnknownOption()
  .action(run);

program
  .command('test [root]')
  .description('run the test script')
  .allowUnknownOption()
  .action(run);

program.parse(process.argv);

function run(root, cmd) {
  const args = process.argv.slice(2);
  const script = cmd.name();
  const scriptIndex = args.findIndex(x => x === script);
  const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];
  const forwardArgs = args.slice(scriptIndex + (root ? 2 : 1));

  const result = spawnSync(
    'node',
    nodeArgs
      .concat('-r', require.resolve('esm'))
      .concat(require.resolve('../scripts/' + script))
      .concat(forwardArgs),
    {
      stdio: 'inherit',
      env: {
        ...process.env,
        VW_SERVICE_ROOT: root || '.',
      },
    }
  );

  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log(
        'The build failed because the process exited too early. ' +
          'This probably means the system ran out of memory or someone called ' +
          '`kill -9` on the process.'
      );
    } else if (result.signal === 'SIGTERM') {
      console.log(
        'The build failed because the process exited too early. ' +
          'Someone might have called `kill` or `killall`, or the system could ' +
          'be shutting down.'
      );
    }
    process.exit(1);
  }
  process.exit(result.status);
}
