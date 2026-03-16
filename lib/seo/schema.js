const siteConfig = require("./site");
const metadataUtils = require("./metadata");

const { siteName, siteUrl, defaultDescription, publisher } = siteConfig;
const { buildCanonical } = metadataUtils;

function toAbsoluteUrl(pathname = "/") {
  return buildCanonical(pathname);
}

function serializeJsonLd(schema) {
  return JSON.stringify(schema);
}

function buildBreadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const listItem = {
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
      };

      if (item.href) {
        listItem.item = toAbsoluteUrl(item.href);
      }

      return listItem;
    }),
  };
}

function buildWebsiteSchema({
  name = siteName,
  description = defaultDescription,
  pathname = "/",
} = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url: toAbsoluteUrl(pathname),
    description,
    publisher,
  };
}

function buildCollectionPageSchema({
  name,
  description,
  pathname,
  items,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: toAbsoluteUrl(pathname),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: toAbsoluteUrl(item.pathname),
      })),
    },
  };
}

function buildWebApplicationSchema({
  name,
  description,
  pathname,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url: toAbsoluteUrl(pathname),
    description,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher,
  };
}

function buildArticleSchema({
  headline,
  description,
  pathname,
  publishedDate,
  modifiedDate,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: toAbsoluteUrl(pathname),
    mainEntityOfPage: toAbsoluteUrl(pathname),
    datePublished: publishedDate,
    dateModified: modifiedDate,
    publisher,
  };
}

module.exports = {
  buildBreadcrumbSchema,
  buildWebsiteSchema,
  buildCollectionPageSchema,
  buildWebApplicationSchema,
  buildArticleSchema,
  serializeJsonLd,
};
