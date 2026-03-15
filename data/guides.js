const guides = [
  {
    slug: "what-is-solar-noon",
    h1: "What Is Solar Noon?",
    title: "What Is Solar Noon and Why It Matters",
    description:
      "Learn what solar noon means, how it differs from clock noon, and how to explore it with the site’s preserved solar simulator.",
    intro:
      "Solar noon is a location-specific event, not a fixed clock time. It shifts with longitude, season, and daylight saving rules.",
    sections: [
      {
        heading: "Solar noon is the sun’s highest daily point",
        body:
          "At solar noon, the sun reaches its highest altitude for that date and place. That makes it a useful reference for shadows, daylight planning, and understanding daily sun movement.",
      },
      {
        heading: "It is not always 12:00",
        body:
          "Clock noon follows time zones and policy. Solar noon follows the sky. The difference becomes obvious when you compare cities across the same region or across daylight saving changes.",
      },
    ],
    relatedTool: "solar-noon-calculator",
  },
  {
    slug: "what-is-sun-azimuth",
    h1: "What Is Sun Azimuth?",
    title: "What Is Sun Azimuth? A Practical Guide",
    description:
      "Understand sun azimuth, how it describes horizontal direction, and how the existing simulator shows it for any supported city.",
    intro:
      "Sun azimuth describes the horizontal direction of the sun. It helps you reason about where sunlight enters a building, where shadows fall, and how the sun travels across the horizon.",
    sections: [
      {
        heading: "Azimuth answers the direction question",
        body:
          "If altitude tells you how high the sun is, azimuth tells you which way to look. Together they provide a compact description of current solar position.",
      },
      {
        heading: "Use it together with altitude",
        body:
          "The site’s preserved simulator and status components work best when azimuth and altitude are read together. That pairing explains both the direction and height of the sun.",
      },
    ],
    relatedTool: "sun-position-calculator",
  },
  {
    slug: "why-daylight-hours-change",
    h1: "Why Do Daylight Hours Change?",
    title: "Why Daylight Hours Change Through the Year",
    description:
      "See why daylight duration changes with season and latitude, then compare those shifts with the site’s preserved chart and city routes.",
    intro:
      "Daylight hours change because Earth’s axis is tilted. The result is a shifting path of sunrise, sunset, and solar noon that feels very different by latitude.",
    sections: [
      {
        heading: "Latitude changes the scale of the effect",
        body:
          "Cities near the equator have steadier daylight, while northern and southern cities can swing dramatically between short winter days and long summer ones.",
      },
      {
        heading: "Charts make the pattern easier to see",
        body:
          "The preserved yearly chart is especially useful here because it shows how sunrise and sunset pull apart or move together as the seasons change.",
      },
    ],
    relatedTool: "daylight-hours-calculator",
  },
];

function getGuideBySlug(slug) {
  return guides.find((guide) => guide.slug === slug);
}

module.exports = {
  guides,
  getGuideBySlug,
};
