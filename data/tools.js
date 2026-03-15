const tools = [
  {
    slug: "sun-position-calculator",
    name: "Sun Position Calculator",
    h1: "Sun Position Calculator",
    title: "Sun Position Calculator for Any City",
    description:
      "Check where the sun is now, explore altitude and azimuth, and scrub through the day with the preserved simulator experience.",
    intro:
      "Use the live simulator to understand where the sun is now, how its angle changes through the day, and how location affects the result.",
    experienceMode: "sun-position-calculator",
  },
  {
    slug: "daylight-hours-calculator",
    name: "Daylight Hours Calculator",
    h1: "Daylight Hours Calculator",
    title: "Daylight Hours Calculator by Location",
    description:
      "Compare sunrise, sunset, and total daylight for different cities using the preserved sun-times and chart components.",
    intro:
      "This route focuses on daily and seasonal daylight patterns while keeping the existing sun-times cards, charts, and map-driven controls intact.",
    experienceMode: "daylight-hours-calculator",
  },
  {
    slug: "solar-noon-calculator",
    name: "Solar Noon Calculator",
    h1: "Solar Noon Calculator",
    title: "Solar Noon Calculator and Midday Sun Viewer",
    description:
      "Find solar noon, inspect the midday sun angle, and use the preserved simulator controls without redesigning the original UI.",
    intro:
      "Solar noon is the moment the sun reaches its highest point for a location. This page keeps the current simulator and time controls as the interactive source of truth.",
    experienceMode: "solar-noon-calculator",
  },
];

function getToolBySlug(slug) {
  return tools.find((tool) => tool.slug === slug);
}

module.exports = {
  tools,
  getToolBySlug,
};
