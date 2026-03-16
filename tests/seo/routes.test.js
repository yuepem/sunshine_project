const assert = require("assert");
const locationsData = require("../../data/locations");
const toolsData = require("../../data/tools");
const guidesData = require("../../data/guides");
const redirectUtils = require("../../lib/seo/redirects");
const nextConfig = require("../../next.config.js");

async function run() {
  const { locations } = locationsData;
  const { tools } = toolsData;
  const { guides } = guidesData;
  const { legacyRedirects } = redirectUtils;

  const locationSlugs = locations.map((location) => location.slug);
  const toolSlugs = tools.map((tool) => tool.slug);
  const guideSlugs = guides.map((guide) => guide.slug);

  assert.strictEqual(new Set(locationSlugs).size, locationSlugs.length);
  assert.strictEqual(new Set(toolSlugs).size, toolSlugs.length);
  assert.strictEqual(new Set(guideSlugs).size, guideSlugs.length);

  assert.ok(locationSlugs.includes("stockholm"));
  assert.ok(locationSlugs.includes("new-york"));
  assert.deepStrictEqual(toolSlugs.sort(), [
    "daylight-hours-calculator",
    "solar-noon-calculator",
    "sun-position-calculator",
  ]);
  assert.deepStrictEqual(guideSlugs.sort(), [
    "best-times-outdoor-activities",
    "daylight-hours-by-latitude",
    "how-sunrise-sunset-calculated",
    "solar-noon-vs-clock-noon",
    "sun-angle-photography-golden-hour",
    "what-is-solar-noon",
    "what-is-sun-azimuth",
    "why-daylight-hours-change",
  ]);

  for (const guide of guides) {
    assert.ok(toolSlugs.includes(guide.relatedTool));
    assert.ok(guide.relatedCities.length >= 2);
    assert.ok(guide.relatedGuides.length >= 1);
  }

  const routes = [
    "/",
    "/locations",
    ...locationSlugs.map((slug) => `/locations/${slug}`),
    ...toolSlugs.map((slug) => `/tools/${slug}`),
    ...guideSlugs.map((slug) => `/guides/${slug}`),
    "/sitemap.xml",
    "/robots.txt",
  ];

  assert.ok(routes.includes("/locations/stockholm"));
  assert.ok(routes.includes("/tools/sun-position-calculator"));
  assert.ok(routes.includes("/guides/what-is-solar-noon"));
  assert.ok(routes.includes("/sitemap.xml"));
  assert.ok(routes.includes("/robots.txt"));

  for (const location of locations) {
    assert.ok(location.relatedToolSlugs.length >= 3);
    assert.ok(location.relatedGuideSlugs.length >= 2);
  }

  assert.ok(legacyRedirects.length > 0);
  for (const redirect of legacyRedirects) {
    assert.ok(redirect.source.startsWith("/"));
    assert.ok(redirect.destination.startsWith("/"));
    assert.notStrictEqual(redirect.source, redirect.destination);
  }

  const redirectRules = await nextConfig.redirects();
  assert.strictEqual(redirectRules.length, legacyRedirects.length);
  assert.ok(redirectRules.every((redirect) => redirect.permanent === true));
  assert.ok(
    redirectRules.some(
      (redirect) =>
        redirect.source === "/guides/solar-noon" &&
        redirect.destination === "/guides/what-is-solar-noon"
    )
  );
}

module.exports = { run };
