const tools = [
  {
    slug: "sun-position-calculator",
    name: "Sun Position Calculator",
    h1: "Sun Position Calculator",
    title: "Sun Position Calculator for Any City",
    description:
      "Check where the sun is now, explore altitude and azimuth, and follow the sun's path through the day for any supported city.",
    intro:
      "Use the live simulator to understand where the sun is now, how its angle changes through the day, and how location affects the result.",
    experienceMode: "sun-position-calculator",
    relatedGuideSlugs: [
      "what-is-sun-azimuth",
      "sun-angle-photography-golden-hour",
      "best-times-outdoor-activities",
    ],
    representativeCitySlugs: ["los-angeles", "tokyo", "dubai"],
    anchorSections: [
      "Live sun data",
      "3D simulator",
      "Map and controls",
      "Yearly context",
    ],
    guideCta: {
      eyebrow: "Understand the data",
      question: "Want to understand altitude, direction, and timing?",
      label: "Read the matching guides",
    },
  },
  {
    slug: "daylight-hours-calculator",
    name: "Daylight Hours Calculator",
    h1: "Daylight Hours Calculator",
    title: "Daylight Hours Calculator by Location",
    description:
      "Compare sunrise, sunset, and total daylight for different cities with live daily data and a full-year context chart.",
    intro:
      "This route focuses on daily and seasonal daylight patterns, making it easier to compare how the light window expands and contracts through the year.",
    experienceMode: "daylight-hours-calculator",
    relatedGuideSlugs: [
      "why-daylight-hours-change",
      "how-sunrise-sunset-calculated",
      "daylight-hours-by-latitude",
    ],
    representativeCitySlugs: ["stockholm", "new-york", "singapore"],
    anchorSections: [
      "Today's daylight",
      "Yearly chart",
      "Compare cities",
      "How to use this tool",
    ],
    guideCta: {
      eyebrow: "Learn the pattern",
      question: "Want to know why day length changes so much by season and place?",
      label: "Explore the daylight guides",
    },
  },
  {
    slug: "solar-noon-calculator",
    name: "Solar Noon Calculator",
    h1: "Solar Noon Calculator",
    title: "Solar Noon Calculator and Midday Sun Viewer",
    description:
      "Find solar noon, inspect the highest sun of the day, and compare how midday timing changes from one city to another.",
    intro:
      "Solar noon is the moment the sun reaches its highest point for a location. This page helps you compare that midpoint across cities and seasons.",
    experienceMode: "solar-noon-calculator",
    relatedGuideSlugs: [
      "what-is-solar-noon",
      "solar-noon-vs-clock-noon",
      "best-times-outdoor-activities",
    ],
    representativeCitySlugs: ["reykjavik", "paris", "mexico-city"],
    anchorSections: [
      "Today's solar noon",
      "3D simulator",
      "Time controls",
      "About solar noon",
    ],
    guideCta: {
      eyebrow: "Get the concept first",
      question: "Need the quick explanation before you compare cities?",
      label: "Read the solar noon guides",
    },
  },
];

function getToolBySlug(slug) {
  return tools.find((tool) => tool.slug === slug);
}

module.exports = {
  tools,
  getToolBySlug,
};
