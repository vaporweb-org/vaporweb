import { spawnSync } from "child_process";

import paths from "../config/paths";

const child = spawnSync(
  "eslint",
  ["-c", require.resolve("@vaporweb/eslint-config-vaporweb"), "src"].concat(
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
