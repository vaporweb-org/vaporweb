import { spawnSync } from "child_process";

import paths from "../config/paths";

const child = spawnSync(
  `${paths.ownModules}/.bin/rollup`,
  ["-c", `${paths.ownRoot}/config/rollup.config.js`, "-w"].concat(
    process.argv.slice(2)
  ),
  {
    stdio: "inherit"
  }
);
