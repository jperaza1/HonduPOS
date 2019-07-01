const packager = require("electron-packager");
const path = require("path");
const yargs = require("yargs");
const argv = yargs
  .option("platform", {
    description: "The platform for the package",
    alias: "p",
    type: "string"
  })
  .option("out", {
    description: "The output folder for the builds",
    alias: "o",
    type: "string",
    default: "builds"
  })
  .option("arch", {
    description: "The arc for the package",
    alias: "a",
    type: "string"
  })
  .option("prune", {
    description: "Should the packager prune the package",
    alias: "pr",
    type: "boolean",
    default: true
  })
  .option("overwrite", {
    description: "Should the packager remove the last build dir",
    alias: "ow",
    type: "boolean",
    default: true
  })
  .demandOption(["platform"])
  .help()
  .alias("help", "h").argv;

let opts = {
  dir: ".",
  asar: { unpackDir: "Server/Database" }
};

switch (argv.platform) {
  case "win": {
    opts.platform = "win32";
    opts.win32metadata = {
      CompanyName: "Sinewave"
    };
    opts.icon = "assets/Icons/win-icon.ico";
    break;
  }
  case "lin": {
    opts.platform = "linux";
    opts.icon = "assets/Icons/lin-icon.png";
  }
  case "mac": {
    opts.platform = "darwin";
    opts.icon = "assets/Icons/mac-icon.icns";
  }
  default:
    process.exit();
    break;
}

if (argv.out) {
  opts.out = argv.out;
}

async function bundleElectronApp(options) {
  let inicio = new Date();
  const appPaths = await packager(options)
    .then(appPaths => {
      let final = path.join(__dirname, "./" + appPaths);
      console.log(`Electron app bundles created:\n${final}` + "\n");
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      let final = new Date();
      var delta = Math.abs(final - inicio) / 1000;
      var days = Math.floor(delta / 86400);
      delta -= days * 86400;
      var hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;
      var minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;
      var seconds = Math.floor(delta % 60);
      console.log(`Execution took ${minutes}:${seconds}`);
    });
}
bundleElectronApp(opts);
