const siteConfig = require("./site");

const { siteUrl } = siteConfig;

function buildCanonicalForRoute(route) {
  if (!route || route === "/") {
    return siteUrl;
  }

  return `${siteUrl}${route}`;
}

function buildIndexableRouteExpectations({ locations = [], tools = [], guides = [] }) {
  return [
    {
      route: "/",
      canonical: buildCanonicalForRoute("/"),
      schemaTypes: ["WebSite"],
    },
    {
      route: "/locations",
      canonical: buildCanonicalForRoute("/locations"),
      schemaTypes: ["CollectionPage", "ItemList"],
    },
    ...locations.map((location) => ({
      route: `/locations/${location.slug}`,
      canonical: buildCanonicalForRoute(`/locations/${location.slug}`),
      schemaTypes: ["BreadcrumbList"],
    })),
    {
      route: "/tools",
      canonical: buildCanonicalForRoute("/tools"),
      schemaTypes: ["CollectionPage", "ItemList"],
    },
    ...tools.map((tool) => ({
      route: `/tools/${tool.slug}`,
      canonical: buildCanonicalForRoute(`/tools/${tool.slug}`),
      schemaTypes: ["WebApplication", "BreadcrumbList"],
    })),
    {
      route: "/guides",
      canonical: buildCanonicalForRoute("/guides"),
      schemaTypes: ["CollectionPage", "ItemList"],
    },
    ...guides.map((guide) => ({
      route: `/guides/${guide.slug}`,
      canonical: buildCanonicalForRoute(`/guides/${guide.slug}`),
      schemaTypes: ["Article", "BreadcrumbList"],
    })),
  ];
}

module.exports = {
  buildCanonicalForRoute,
  buildIndexableRouteExpectations,
};
