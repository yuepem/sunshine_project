const path = require("path");

const testModules = [
  "./tests/seo/metadata.test.js",
  "./tests/seo/routes.test.js",
];

async function run() {
  let failures = 0;

  for (const modulePath of testModules) {
    const absolutePath = path.resolve(modulePath);
    const testModule = require(absolutePath);

    try {
      await testModule.run();
      console.log(`PASS ${modulePath}`);
    } catch (error) {
      failures += 1;
      console.error(`FAIL ${modulePath}`);
      console.error(error.stack || error.message);
    }
  }

  if (failures > 0) {
    process.exitCode = 1;
    return;
  }

  console.log(`Passed ${testModules.length} test modules.`);
}

run();
