const assert = require("assert");
const locationsData = require("../../data/locations");
const toolsData = require("../../data/tools");
const guidesData = require("../../data/guides");
const metadataUtils = require("../../lib/seo/metadata");
const pageMetadataUtils = require("../../lib/seo/pageMetadata");
const schemaUtils = require("../../lib/seo/schema");
const siteConfig = require("../../lib/seo/site");

async function run() {
  const { locations } = locationsData;
  const { tools } = toolsData;
  const { guides } = guidesData;
  const { buildMetadata } = metadataUtils;
  const {
    buildHomePageMetadata,
    buildLocationsPageMetadata,
    buildLocationPageMetadata,
    buildToolsPageMetadata,
    buildToolPageMetadata,
    buildGuidesPageMetadata,
    buildGuidePageMetadata,
    buildMissingPageMetadata,
    buildNotFoundPageMetadata,
  } = pageMetadataUtils;
  const {
    buildBreadcrumbSchema,
    buildWebsiteSchema,
    buildCollectionPageSchema,
    buildWebApplicationSchema,
    buildArticleSchema,
  } = schemaUtils;
  const { defaultOgImage, defaultOgImagePath, siteUrl } = siteConfig;

  const homepage = buildHomePageMetadata();

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
  assert.strictEqual(defaultOgImage.url, `${siteUrl}${defaultOgImagePath}`);
  assert.strictEqual(defaultOgImage.width, 1200);
  assert.strictEqual(defaultOgImage.height, 630);

  const locationsHubMetadata = buildLocationsPageMetadata();
  assert.strictEqual(
    locationsHubMetadata.alternates.canonical,
    "https://whereisthesun.org/locations"
  );

  const toolsHubMetadata = buildToolsPageMetadata();
  assert.strictEqual(
    toolsHubMetadata.alternates.canonical,
    "https://whereisthesun.org/tools"
  );

  const guidesHubMetadata = buildGuidesPageMetadata();
  assert.strictEqual(
    guidesHubMetadata.alternates.canonical,
    "https://whereisthesun.org/guides"
  );

  for (const location of locations) {
    const metadata = buildLocationPageMetadata(location);

    assert.ok(metadata.title.includes(location.name));
    assert.strictEqual(
      metadata.alternates.canonical,
      `https://whereisthesun.org/locations/${location.slug}`
    );
    assert.ok(metadata.description.length > 20);
    assert.strictEqual(metadata.openGraph.images[0].url, defaultOgImage.url);
  }

  for (const tool of tools) {
    const metadata = buildToolPageMetadata(tool);

    assert.strictEqual(
      metadata.alternates.canonical,
      `https://whereisthesun.org/tools/${tool.slug}`
    );
    assert.ok(metadata.description.length > 20);
    assert.ok(!metadata.description.includes("preserved"));
    assert.strictEqual(metadata.openGraph.type, "website");
  }

  for (const guide of guides) {
    const metadata = buildGuidePageMetadata(guide);

    assert.strictEqual(metadata.openGraph.type, "article");
    assert.strictEqual(
      metadata.alternates.canonical,
      `https://whereisthesun.org/guides/${guide.slug}`
    );
    assert.ok(metadata.description.length > 20);
    assert.ok(metadata.title.includes(guide.h1));
  }

  const websiteSchema = buildWebsiteSchema({
    description: homepage.description,
  });
  assert.strictEqual(websiteSchema["@type"], "WebSite");
  assert.strictEqual(websiteSchema.url, "https://whereisthesun.org");
  assert.strictEqual(websiteSchema.publisher.name, "Where Is The Sun");

  const noindexMetadata = buildMetadata({
    title: "Missing",
    description: "Missing page",
    pathname: null,
    index: false,
    includeCanonical: false,
  });

  assert.strictEqual(noindexMetadata.alternates, undefined);
  assert.strictEqual(noindexMetadata.robots.index, false);
  assert.strictEqual(noindexMetadata.openGraph.url, undefined);

  const missingLocationMetadata = buildMissingPageMetadata("Location");
  assert.strictEqual(missingLocationMetadata.title, "Location Not Found");
  assert.strictEqual(missingLocationMetadata.alternates, undefined);
  assert.strictEqual(missingLocationMetadata.robots.index, false);

  const missingToolMetadata = buildMissingPageMetadata("Tool");
  assert.strictEqual(missingToolMetadata.title, "Tool Not Found");
  assert.strictEqual(missingToolMetadata.alternates, undefined);
  assert.strictEqual(missingToolMetadata.robots.index, false);

  const missingGuideMetadata = buildMissingPageMetadata("Guide");
  assert.strictEqual(missingGuideMetadata.title, "Guide Not Found");
  assert.strictEqual(missingGuideMetadata.alternates, undefined);
  assert.strictEqual(missingGuideMetadata.robots.index, false);

  const notFoundMetadata = buildNotFoundPageMetadata();
  assert.strictEqual(notFoundMetadata.title, "Page Not Found | Where Is The Sun");
  assert.strictEqual(notFoundMetadata.alternates, undefined);
  assert.strictEqual(notFoundMetadata.robots.index, false);

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
  assert.strictEqual(
    collectionSchema.mainEntity.itemListElement.length,
    2,
  );

  const locationCollectionSchema = buildCollectionPageSchema({
    name: "Sunrise & Sunset Times by City",
    description: locationsHubMetadata.description,
    pathname: "/locations",
    items: locations.map((location) => ({
      name: `${location.name}, ${location.country}`,
      pathname: `/locations/${location.slug}`,
    })),
  });
  assert.strictEqual(
    locationCollectionSchema.mainEntity.itemListElement.length,
    locations.length,
  );

  const toolCollectionSchema = buildCollectionPageSchema({
    name: "Free Sun Calculators",
    description: toolsHubMetadata.description,
    pathname: "/tools",
    items: tools.map((tool) => ({
      name: tool.name,
      pathname: `/tools/${tool.slug}`,
    })),
  });
  assert.strictEqual(
    toolCollectionSchema.mainEntity.itemListElement.length,
    tools.length,
  );

  const toolSchema = buildWebApplicationSchema({
    name: tools[0].name,
    description: tools[0].description,
    pathname: `/tools/${tools[0].slug}`,
  });
  assert.strictEqual(toolSchema["@type"], "WebApplication");
  assert.strictEqual(toolSchema.offers.price, "0");
  assert.strictEqual(toolSchema.isAccessibleForFree, true);
  assert.strictEqual(toolSchema.url, `https://whereisthesun.org/tools/${tools[0].slug}`);

  const articleSchema = buildArticleSchema({
    headline: guides[0].h1,
    description: guides[0].description,
    pathname: `/guides/${guides[0].slug}`,
    publishedDate: guides[0].publishedDate,
    modifiedDate: guides[0].modifiedDate,
  });
  assert.strictEqual(articleSchema["@type"], "Article");
  assert.strictEqual(articleSchema.dateModified, guides[0].modifiedDate);
  assert.strictEqual(
    articleSchema.mainEntityOfPage,
    `https://whereisthesun.org/guides/${guides[0].slug}`,
  );
}

module.exports = { run };
