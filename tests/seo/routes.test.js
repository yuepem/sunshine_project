const assert = require("assert");
const locationsData = require("../../data/locations");
const toolsData = require("../../data/tools");
const guidesData = require("../../data/guides");
const pageMetadataUtils = require("../../lib/seo/pageMetadata");
const redirectUtils = require("../../lib/seo/redirects");
const metadataUtils = require("../../lib/seo/metadata");
const routeExpectationsUtils = require("../../lib/seo/routeExpectations");
const nextConfig = require("../../next.config.js");

async function run() {
  const { locations, getLocationBySlug } = locationsData;
  const { tools, getToolBySlug } = toolsData;
  const { guides, getGuideBySlug } = guidesData;
  const { buildMissingPageMetadata } = pageMetadataUtils;
  const { legacyRedirects } = redirectUtils;
  const { buildCanonical } = metadataUtils;
  const { buildIndexableRouteExpectations } = routeExpectationsUtils;

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
    "/tools",
    "/guides",
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

  const routeExpectations = buildIndexableRouteExpectations({
    locations,
    tools,
    guides,
  });
  const indexableRoutes = routeExpectations.map((routeExpectation) => routeExpectation.route);
  const indexableRouteSet = new Set(indexableRoutes);

  assert.ok(indexableRouteSet.has("/"));
  assert.ok(indexableRouteSet.has("/locations"));
  assert.ok(indexableRouteSet.has("/tools"));
  assert.ok(indexableRouteSet.has("/guides"));
  assert.strictEqual(indexableRoutes.length, 1 + 1 + locationSlugs.length + 1 + toolSlugs.length + 1 + guideSlugs.length);

  assert.strictEqual(buildCanonical("/locations/stockholm"), "https://whereisthesun.org/locations/stockholm");
  assert.strictEqual(buildCanonical("/tools/sun-position-calculator"), "https://whereisthesun.org/tools/sun-position-calculator");
  assert.strictEqual(buildCanonical("/guides/what-is-solar-noon"), "https://whereisthesun.org/guides/what-is-solar-noon");

  assert.strictEqual(getLocationBySlug("missing-city"), undefined);
  assert.strictEqual(getToolBySlug("missing-tool"), undefined);
  assert.strictEqual(getGuideBySlug("missing-guide"), undefined);

  const missingLocationMetadata = buildMissingPageMetadata("Location");
  assert.strictEqual(missingLocationMetadata.robots.index, false);
  assert.strictEqual(missingLocationMetadata.alternates, undefined);

  for (const location of locations) {
    assert.ok(location.relatedToolSlugs.length >= 3);
    assert.ok(location.relatedGuideSlugs.length >= 2);
    assert.ok(location.daylightContent.heading.length > 0);
    assert.ok(location.sunFacts.length >= 4);
  }

  assert.ok(legacyRedirects.length > 0);
  for (const redirect of legacyRedirects) {
    assert.ok(redirect.source.startsWith("/"));
    assert.ok(redirect.destination.startsWith("/"));
    assert.notStrictEqual(redirect.source, redirect.destination);
    assert.ok(!routes.includes(redirect.source));
    assert.ok(indexableRouteSet.has(redirect.destination));
    assert.ok(!indexableRouteSet.has(redirect.source));
  }

  const redirectRules = await nextConfig.redirects();
  assert.strictEqual(redirectRules.length, legacyRedirects.length);
  assert.ok(redirectRules.every((redirect) => redirect.permanent === true));
  assert.strictEqual(
    new Set(redirectRules.map((redirect) => redirect.source)).size,
    redirectRules.length,
  );
  assert.ok(
    redirectRules.some(
      (redirect) =>
        redirect.source === "/guides/solar-noon" &&
        redirect.destination === "/guides/what-is-solar-noon"
    )
  );
  assert.ok(
    redirectRules.some(
      (redirect) =>
        redirect.source === "/tools/sun-position" &&
        redirect.destination === "/tools/sun-position-calculator"
    )
  );
}

module.exports = { run };
