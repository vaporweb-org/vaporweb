import { spawnSync } from "child_process";

import paths from "../config/paths";

spawnSync(
  `${paths.ownModules}/.bin/jest`,
  ["src", `--c=${require.resolve('@vaporweb/jest-config-vaporweb')}`].concat(process.argv.slice(2)),
  {
    stdio: "inherit"
  }
);
