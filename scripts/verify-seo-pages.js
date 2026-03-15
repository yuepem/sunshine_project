const { spawn } = require("child_process");
const path = require("path");
const { ensureNextBuild } = require("./ensure-next-build");
const locationsData = require("../data/locations");
const toolsData = require("../data/tools");
const guidesData = require("../data/guides");

const { locations } = locationsData;
const { tools } = toolsData;
const { guides } = guidesData;

const port = 3210;
const baseUrl = `http://127.0.0.1:${port}`;
const nextBinary = path.join(process.cwd(), "node_modules", ".bin", "next");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/`);
      if (response.ok) {
        return;
      }
    } catch (error) {
      await delay(500);
    }
  }

  throw new Error("Timed out waiting for next start to become available.");
}

function extractMatch(html, regex, label, route) {
  const match = html.match(regex);

  if (!match) {
    throw new Error(`Missing ${label} on ${route}`);
  }

  return match[1];
}

function countMatches(html, regex) {
  return (html.match(regex) || []).length;
}

async function verifyRoute(route) {
  const response = await fetch(`${baseUrl}${route}`);

  if (!response.ok) {
    throw new Error(`Expected 200 on ${route} but received ${response.status}`);
  }

  const html = await response.text();
  const title = extractMatch(html, /<title>([^<]+)<\/title>/i, "title", route);
  const description = extractMatch(
    html,
    /<meta[^>]+name="description"[^>]+content="([^"]+)"/i,
    "meta description",
    route
  );
  const canonical = extractMatch(
    html,
    /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i,
    "canonical",
    route
  );
  const h1Count = countMatches(html, /<h1\b/gi);
  const crawlableLinks = countMatches(
    html,
    /<a[^>]+href="\/(?:locations|tools|guides)[^"]*"/gi
  );

  if (!title.trim()) {
    throw new Error(`Empty title on ${route}`);
  }

  if (!description.trim()) {
    throw new Error(`Empty meta description on ${route}`);
  }

  if (!canonical.startsWith("https://whereisthesun.org")) {
    throw new Error(`Invalid canonical on ${route}: ${canonical}`);
  }

  if (h1Count !== 1) {
    throw new Error(`Expected exactly one h1 on ${route}, received ${h1Count}`);
  }

  if (crawlableLinks < 1) {
    throw new Error(`Expected crawlable internal links on ${route}`);
  }
}

async function verifySitemap() {
  const response = await fetch(`${baseUrl}/sitemap.xml`);
  const body = await response.text();

  if (!response.ok) {
    throw new Error(`Expected 200 on /sitemap.xml but received ${response.status}`);
  }

  if (!body.includes("<urlset")) {
    throw new Error("sitemap.xml did not return XML content.");
  }
}

async function verifyNotFound() {
  const response = await fetch(`${baseUrl}/this-route-should-not-exist`);

  if (response.status !== 404) {
    throw new Error(`Expected 404 for missing route but received ${response.status}`);
  }
}

async function main() {
  await ensureNextBuild();

  const server = spawn(nextBinary, ["start", "-p", String(port)], {
    cwd: process.cwd(),
    stdio: "inherit",
  });

  try {
    await waitForServer();

    const routes = [
      "/",
      "/locations",
      ...locations.map((location) => `/locations/${location.slug}`),
      ...tools.map((tool) => `/tools/${tool.slug}`),
      ...guides.map((guide) => `/guides/${guide.slug}`),
    ];

    for (const route of routes) {
      await verifyRoute(route);
      console.log(`Verified ${route}`);
    }

    await verifySitemap();
    await verifyNotFound();
    console.log("SEO verification passed.");
  } finally {
    server.kill("SIGTERM");
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
