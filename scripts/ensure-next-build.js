const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const nextBinary = path.join(process.cwd(), "node_modules", ".bin", "next");
const buildIdPath = path.join(process.cwd(), ".next", "BUILD_ID");

function runNextBuild() {
  return new Promise((resolve, reject) => {
    const child = spawn(nextBinary, ["build"], {
      cwd: process.cwd(),
      stdio: "inherit",
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`next build failed with exit code ${code}`));
    });

    child.on("error", reject);
  });
}

async function ensureNextBuild() {
  if (fs.existsSync(buildIdPath)) {
    return;
  }

  console.log("No Next production build found. Running `next build` first...");
  await runNextBuild();
}

if (require.main === module) {
  ensureNextBuild().catch((error) => {
    console.error(error.stack || error.message);
    process.exit(1);
  });
}

module.exports = {
  ensureNextBuild,
};
