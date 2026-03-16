const assert = require("assert");
const locationsData = require("../../data/locations");
const toolsData = require("../../data/tools");
const guidesData = require("../../data/guides");
const metadataUtils = require("../../lib/seo/metadata");
const schemaUtils = require("../../lib/seo/schema");
const siteConfig = require("../../lib/seo/site");

async function run() {
  const { locations } = locationsData;
  const { tools } = toolsData;
  const { guides } = guidesData;
  const { buildMetadata } = metadataUtils;
  const {
    buildBreadcrumbSchema,
    buildCollectionPageSchema,
    buildWebApplicationSchema,
    buildArticleSchema,
  } = schemaUtils;
  const { defaultOgImage } = siteConfig;

  const homepage = buildMetadata({
    title: "Sun Position Calculator & Sunrise Sunset Times | Where Is The Sun",
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
  assert.strictEqual(homepage.openGraph.images[0].url, defaultOgImage.url);
  assert.strictEqual(homepage.twitter.images[0], defaultOgImage.url);
  assert.strictEqual(homepage.robots.index, true);

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
    assert.strictEqual(metadata.openGraph.images[0].url, defaultOgImage.url);
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
    assert.ok(metadata.description.length > 20);
    assert.ok(!metadata.description.includes("preserved"));
  }

  for (const guide of guides) {
    const metadata = buildMetadata({
      title: guide.metadata?.title || guide.title,
      description: guide.metadata?.description || guide.description,
      pathname: `/guides/${guide.slug}`,
      type: "article",
    });

    assert.strictEqual(metadata.openGraph.type, "article");
    assert.strictEqual(
      metadata.alternates.canonical,
      `https://whereisthesun.org/guides/${guide.slug}`
    );
    assert.ok(metadata.description.length > 20);
  }

  const noindexMetadata = buildMetadata({
    title: "Missing",
    description: "Missing page",
    pathname: null,
    index: false,
    includeCanonical: false,
  });

  assert.strictEqual(noindexMetadata.alternates, undefined);
  assert.strictEqual(noindexMetadata.robots.index, false);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { href: "/", label: "Home" },
    { href: "/guides", label: "Guides" },
    { href: "/guides/what-is-solar-noon", label: "What Is Solar Noon?" },
  ]);
  assert.strictEqual(breadcrumbSchema["@type"], "BreadcrumbList");
  assert.strictEqual(breadcrumbSchema.itemListElement.length, 3);
  assert.strictEqual(
    breadcrumbSchema.itemListElement[1].item,
    "https://whereisthesun.org/guides"
  );

  const collectionSchema = buildCollectionPageSchema({
    name: "Sun & Daylight Guides",
    description: "Browse guides",
    pathname: "/guides",
    items: guides.slice(0, 2).map((guide) => ({
      name: guide.h1,
      pathname: `/guides/${guide.slug}`,
    })),
  });
  assert.strictEqual(collectionSchema["@type"], "CollectionPage");
  assert.strictEqual(collectionSchema.mainEntity["@type"], "ItemList");

  const toolSchema = buildWebApplicationSchema({
    name: tools[0].name,
    description: tools[0].description,
    pathname: `/tools/${tools[0].slug}`,
  });
  assert.strictEqual(toolSchema["@type"], "WebApplication");
  assert.strictEqual(toolSchema.offers.price, "0");

  const articleSchema = buildArticleSchema({
    headline: guides[0].h1,
    description: guides[0].description,
    pathname: `/guides/${guides[0].slug}`,
    publishedDate: guides[0].publishedDate,
    modifiedDate: guides[0].modifiedDate,
  });
  assert.strictEqual(articleSchema["@type"], "Article");
  assert.strictEqual(articleSchema.dateModified, guides[0].modifiedDate);
}

module.exports = { run };
