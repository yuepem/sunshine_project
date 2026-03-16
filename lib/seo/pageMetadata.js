const metadataUtils = require("./metadata");
const siteConfig = require("./site");
const sunUtils = require("../sun/calculateSunSnapshot");

const { buildMetadata } = metadataUtils;
const { defaultDescription } = siteConfig;
const { calculateSunSnapshot } = sunUtils;

function buildMissingPageMetadata(label) {
  const normalizedLabel = label || "Page";

  return buildMetadata({
    title: `${normalizedLabel} Not Found`,
    description: `The requested ${normalizedLabel.toLowerCase()} page does not exist.`,
    pathname: null,
    index: false,
    includeCanonical: false,
  });
}

function buildHomePageMetadata() {
  return buildMetadata({
    title: "Sun Position Calculator & Sunrise Sunset Times | Where Is The Sun",
    description: defaultDescription,
    pathname: "/",
  });
}

function buildLocationsPageMetadata() {
  return buildMetadata({
    title: "Sunrise & Sunset Times by City | Where Is The Sun",
    description:
      "Browse sunrise, sunset, and daylight data for 12 cities across 6 continents - from Reykjavik to Singapore.",
    pathname: "/locations",
  });
}

function buildLocationPageMetadata(location) {
  if (!location) {
    return buildMissingPageMetadata("Location");
  }

  const snapshot = calculateSunSnapshot(location);

  return buildMetadata({
    title: `Sunrise & Sunset Times in ${location.name} Today | Where Is The Sun`,
    description: `See today's sunrise at ${snapshot.sunrise}, sunset at ${snapshot.sunset}, and ${snapshot.daylightDuration} of daylight in ${location.name}, ${location.country}. Explore sun position, solar noon, and seasonal changes.`,
    pathname: `/locations/${location.slug}`,
  });
}

function buildToolsPageMetadata() {
  return buildMetadata({
    title: "Free Sun Calculators - Position, Daylight & Solar Noon | Where Is The Sun",
    description:
      "Three focused calculators for sun position, daylight hours, and solar noon. Interactive, visual, free.",
    pathname: "/tools",
  });
}

function buildToolPageMetadata(tool) {
  if (!tool) {
    return buildMissingPageMetadata("Tool");
  }

  return buildMetadata({
    title: `${tool.name} - Free Online Tool | Where Is The Sun`,
    description: `${tool.description} Works for any location with real-time data and interactive visualization.`,
    pathname: `/tools/${tool.slug}`,
  });
}

function buildGuidesPageMetadata() {
  return buildMetadata({
    title: "Sun & Daylight Guides | Where Is The Sun",
    description:
      "Understand solar noon, sun azimuth, and seasonal daylight changes with clear explanations and linked interactive tools.",
    pathname: "/guides",
  });
}

function buildGuidePageMetadata(guide) {
  if (!guide) {
    return buildMissingPageMetadata("Guide");
  }

  return buildMetadata({
    title: `${guide.h1} - Explained Simply | Where Is The Sun`,
    description: `${guide.description} Learn how it works and explore it with our interactive tools.`,
    pathname: `/guides/${guide.slug}`,
    type: "article",
  });
}

function buildNotFoundPageMetadata() {
  return buildMetadata({
    title: "Page Not Found | Where Is The Sun",
    description: "The page you requested does not exist. Browse locations, tools, or guides instead.",
    pathname: null,
    index: false,
    includeCanonical: false,
  });
}

module.exports = {
  buildMissingPageMetadata,
  buildHomePageMetadata,
  buildLocationsPageMetadata,
  buildLocationPageMetadata,
  buildToolsPageMetadata,
  buildToolPageMetadata,
  buildGuidesPageMetadata,
  buildGuidePageMetadata,
  buildNotFoundPageMetadata,
};
