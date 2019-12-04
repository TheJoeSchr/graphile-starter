#!/usr/bin/env node
const { execSync } = require("child_process");
const { basename, dirname, resolve } = require("path");

const projectName = basename(dirname(resolve(__dirname, "..")));

  const nmNames = [
    "vscode-extensions",
    "db-volume",
    "nm_root",
    "nm_app_client",
    "nm_app_config",
    "nm_app_db",
    "nm_app_e2e",
    "nm_app_graphql",
    "nm_app_server",
    "nm_app_worker"
  ]
  nmNames.forEach((nmName)=> {
    // remove each container
    try {
        execSync( `docker volume rm ${projectName}_${nmName}`,
          { stdio: "inherit" }
        );
    } catch (e) {
      /* noop: volume might not exist, still delete others */
    }
    // remove each container for VSCode .devcontainer as well
    try {
      execSync(
        `docker volume rm ${projectName}_devcontainer_${nmName}`,
        { stdio: "inherit" }
      );
    } catch (e) {
      /* noop: volume might not exist, still delete others */
    }
  })
