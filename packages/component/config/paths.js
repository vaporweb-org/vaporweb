import fs from "fs";
import path from "path";
import { camelCase } from "lodash";

const rootPath = path.resolve(process.cwd());
const src = path.resolve(rootPath, "src");

let entry = path.resolve(src, "index");
const ts = path.resolve(src, "index.ts");
const tsx = path.resolve(src, "index.tsx");
if (fs.existsSync(ts)) {
  entry = ts;
} else if (fs.existsSync(tsx)) {
  entry = tsx;
}
// const dist = path.resolve(rootPath, 'dist')
// const modules = path.resolve(rootPath, 'node_modules')

const pkg = path.resolve(rootPath, "package.json");
const packageJson = require(pkg);

const ownRoot = path.resolve(__dirname, "..");
const ownModules = path.resolve(ownRoot, "node_modules");

export default {
  // paths to dependent library files
  root: rootPath,
  // src,
  entry,
  // dist,
  umdName: camelCase(packageJson.name),
  umdOut: packageJson.browser,
  cjsOut: packageJson.main,
  esmOut: packageJson.module,
  // modules,
  pkg,

  // paths to own files
  ownRoot,
  ownModules
};
