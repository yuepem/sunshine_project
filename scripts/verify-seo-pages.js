const { spawn } = require("child_process");
const path = require("path");
const { ensureNextBuild } = require("./ensure-next-build");
const locationsData = require("../data/locations");
const toolsData = require("../data/tools");
const guidesData = require("../data/guides");
const routeExpectationsUtils = require("../lib/seo/routeExpectations");

const { locations } = locationsData;
const { tools } = toolsData;
const { guides } = guidesData;
const { buildCanonicalForRoute, buildIndexableRouteExpectations } =
  routeExpectationsUtils;

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

function collectMatches(html, regex) {
  return Array.from(html.matchAll(regex));
}

function collectInternalLinks(html) {
  return collectMatches(
    html,
    /<a[^>]+href="(\/(?!(?:_next|api)\b)[^"]*)"/gi,
  ).map((match) => match[1]);
}

function extractJsonLd(html, route) {
  const matches = collectMatches(
    html,
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  );

  return matches.map((match, index) => {
    try {
      return JSON.parse(match[1]);
    } catch (error) {
      throw new Error(
        `Invalid JSON-LD block ${index + 1} on ${route}: ${error.message}`,
      );
    }
  });
}

function collectSchemaTypes(value, schemaTypes = new Set()) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectSchemaTypes(item, schemaTypes));
    return schemaTypes;
  }

  if (!value || typeof value !== "object") {
    return schemaTypes;
  }

  if (typeof value["@type"] === "string") {
    schemaTypes.add(value["@type"]);
  }

  Object.values(value).forEach((child) => collectSchemaTypes(child, schemaTypes));
  return schemaTypes;
}

function normalizeAbsoluteUrl(url) {
  if (!url) {
    return url;
  }

  const canonicalHost = buildCanonicalForRoute("/");

  if (url === `${canonicalHost}/`) {
    return canonicalHost;
  }

  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function countVisibleH1s(html) {
  const headings = collectMatches(html, /<h1([^>]*)>([\s\S]*?)<\/h1>/gi);

  return headings.filter((match) => {
    const attributes = match[1] || "";

    return !/(?:\bhidden\b|aria-hidden=["']true["']|\bsr-only\b|\binvisible\b)/i.test(
      attributes,
    );
  }).length;
}

async function verifyRoute(
  { route, canonical: expectedRouteCanonical, schemaTypes: expectedSchemaTypes },
  sitemapUrls,
) {
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
  const h1Count = countVisibleH1s(html);
  const internalLinks = collectInternalLinks(html);
  const structuredData = extractJsonLd(html, route);
  const schemaTypes = collectSchemaTypes(structuredData);
  const expectedCanonical = normalizeAbsoluteUrl(expectedRouteCanonical);
  const actualCanonical = normalizeAbsoluteUrl(canonical);

  if (!title.trim()) {
    throw new Error(`Empty title on ${route}`);
  }

  if (!description.trim()) {
    throw new Error(`Empty meta description on ${route}`);
  }

  if (actualCanonical !== expectedCanonical) {
    throw new Error(
      `Expected canonical ${expectedCanonical} on ${route}, received ${canonical}`,
    );
  }

  if (h1Count !== 1) {
    throw new Error(`Expected exactly one visible h1 on ${route}, received ${h1Count}`);
  }

  if (internalLinks.length < 1) {
    throw new Error(`Expected crawlable internal links on ${route}`);
  }

  if (!sitemapUrls.has(expectedCanonical)) {
    throw new Error(`Expected sitemap.xml to include ${expectedCanonical}`);
  }

  if (structuredData.length < 1) {
    throw new Error(`Expected structured data on ${route}`);
  }

  for (const expectedSchemaType of expectedSchemaTypes) {
    if (!schemaTypes.has(expectedSchemaType)) {
      throw new Error(
        `Expected schema type ${expectedSchemaType} on ${route}, received ${Array.from(schemaTypes).join(", ") || "none"}`,
      );
    }
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

  const sitemapUrls = new Set(
    collectMatches(body, /<loc>([^<]+)<\/loc>/gi).map((match) =>
      normalizeAbsoluteUrl(match[1]),
    ),
  );

  if (sitemapUrls.size < 1) {
    throw new Error("sitemap.xml did not contain any URL entries.");
  }

  return sitemapUrls;
}

async function verifyNotFound(sitemapUrls) {
  const response = await fetch(`${baseUrl}/this-route-should-not-exist`);

  if (response.status !== 404) {
    throw new Error(`Expected 404 for missing route but received ${response.status}`);
  }

  if (sitemapUrls.has(buildCanonicalForRoute("/this-route-should-not-exist"))) {
    throw new Error("Unexpected missing route entry in sitemap.xml");
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

    const sitemapUrls = await verifySitemap();
    const routes = buildIndexableRouteExpectations({
      locations,
      tools,
      guides,
    });

    for (const routeConfig of routes) {
      await verifyRoute(routeConfig, sitemapUrls);
      console.log(`Verified ${routeConfig.route}`);
    }

    await verifyNotFound(sitemapUrls);
    console.log("SEO verification passed.");
  } finally {
    server.kill("SIGTERM");
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
