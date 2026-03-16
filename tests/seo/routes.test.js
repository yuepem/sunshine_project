const assert = require("assert");
const locationsData = require("../../data/locations");
const toolsData = require("../../data/tools");
const guidesData = require("../../data/guides");

async function run() {
  const { locations } = locationsData;
  const { tools } = toolsData;
  const { guides } = guidesData;

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
}

module.exports = { run };
