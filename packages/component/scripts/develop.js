import { spawnSync } from "child_process";

import paths from "../config/paths";

const child = spawnSync(
  "rollup",
  ["-c", `${paths.ownRoot}/config/rollup.config.js`, "-w"].concat(
    process.argv.slice(2)
  ),
  {
    stdio: "inherit"
  }
);

if (error) {
  console.error(error);
  process.exit(1);
}
