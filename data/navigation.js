const toolsData = require("./tools");
const guidesData = require("./guides");
const locationsData = require("./locations");

const { tools } = toolsData;
const { guides } = guidesData;
const { locations } = locationsData;

const homepageQuickCitySlugs = [
  "stockholm",
  "new-york",
  "tokyo",
  "sydney",
  "reykjavik",
  "dubai",
];

const footerLocationSlugs = [
  "stockholm",
  "paris",
  "london",
  "new-york",
  "tokyo",
];

const pageAnchorLabels = {
  city: [
    "Today's data",
    "3D simulator",
    "Yearly chart",
    "About this city",
  ],
  tools: Object.fromEntries(
    tools.map((tool) => [tool.slug, tool.anchorSections]),
  ),
};

const navigationSections = [
  {
    type: "link",
    label: "Locations",
    href: "/locations",
  },
  {
    type: "menu",
    label: "Tools",
    href: "/tools",
    description: "Open the right calculator for sun position, daylight, or solar noon.",
    align: "end",
    items: tools.map((tool) => ({
      label: tool.name,
      href: `/tools/${tool.slug}`,
      description: tool.description,
    })),
  },
  {
    type: "menu",
    label: "Guides",
    href: "/guides",
    description: "Learn the concept first, then open the matching tool with live city data.",
    align: "end",
    items: guides.map((guide) => ({
      label: guide.h1,
      href: `/guides/${guide.slug}`,
      description: guide.description,
    })),
  },
];

const featuredHomepageLocations = homepageQuickCitySlugs
  .map((slug) => locations.find((location) => location.slug === slug))
  .filter(Boolean);

const footerLocations = footerLocationSlugs
  .map((slug) => locations.find((location) => location.slug === slug))
  .filter(Boolean);

module.exports = {
  navigationSections,
  homepageQuickCitySlugs,
  footerLocationSlugs,
  featuredHomepageLocations,
  footerLocations,
  pageAnchorLabels,
};
