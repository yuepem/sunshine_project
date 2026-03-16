const fs = require("fs");
const path = require("path");

const nextDir = path.join(process.cwd(), ".next");

try {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log(`Removed ${nextDir}`);
} catch (error) {
  console.error(error.stack || error.message);
  process.exit(1);
}
