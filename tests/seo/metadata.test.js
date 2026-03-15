const assert = require("assert");
const locationsData = require("../../data/locations");
const toolsData = require("../../data/tools");
const guidesData = require("../../data/guides");
const metadataUtils = require("../../lib/seo/metadata");

async function run() {
  const { locations } = locationsData;
  const { tools } = toolsData;
  const { guides } = guidesData;
  const { buildMetadata } = metadataUtils;

  const homepage = buildMetadata({
    title: "Sun Position Calculator and Sunrise Sunset Times",
    description: "Homepage metadata",
    pathname: "/",
  });

  assert.strictEqual(
    homepage.alternates.canonical,
    "https://whereisthesun.org"
  );
  assert.strictEqual(
    homepage.openGraph.url,
    "https://whereisthesun.org"
  );

  for (const location of locations) {
    const metadata = buildMetadata({
      title: `Sunrise & Sunset Times in ${location.name} Today`,
      description: `Check sunrise and sunset in ${location.name}.`,
      pathname: `/locations/${location.slug}`,
    });

    assert.ok(metadata.title.includes(location.name));
    assert.strictEqual(
      metadata.alternates.canonical,
      `https://whereisthesun.org/locations/${location.slug}`
    );
    assert.ok(metadata.description.length > 20);
  }

  for (const tool of tools) {
    const metadata = buildMetadata({
      title: tool.title,
      description: tool.description,
      pathname: `/tools/${tool.slug}`,
    });

    assert.strictEqual(
      metadata.alternates.canonical,
      `https://whereisthesun.org/tools/${tool.slug}`
    );
    assert.ok(metadata.description.includes("preserved"));
  }

  for (const guide of guides) {
    const metadata = buildMetadata({
      title: guide.title,
      description: guide.description,
      pathname: `/guides/${guide.slug}`,
      type: "article",
    });

    assert.strictEqual(metadata.openGraph.type, "article");
    assert.strictEqual(
      metadata.alternates.canonical,
      `https://whereisthesun.org/guides/${guide.slug}`
    );
  }
}

module.exports = { run };
