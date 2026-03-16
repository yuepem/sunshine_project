const legacyRedirects = [
  { source: "/tools/sun-position", destination: "/tools/sun-position-calculator" },
  {
    source: "/tools/daylight-hours",
    destination: "/tools/daylight-hours-calculator",
  },
  { source: "/tools/solar-noon", destination: "/tools/solar-noon-calculator" },
  { source: "/guides/solar-noon", destination: "/guides/what-is-solar-noon" },
  { source: "/guides/sun-azimuth", destination: "/guides/what-is-sun-azimuth" },
  {
    source: "/guides/daylight-hours-change",
    destination: "/guides/why-daylight-hours-change",
  },
  {
    source: "/guides/how-sunrise-sunset-work",
    destination: "/guides/how-sunrise-sunset-calculated",
  },
  {
    source: "/guides/golden-hour-photography",
    destination: "/guides/sun-angle-photography-golden-hour",
  },
  {
    source: "/guides/daylight-by-latitude",
    destination: "/guides/daylight-hours-by-latitude",
  },
  {
    source: "/guides/clock-noon-vs-solar-noon",
    destination: "/guides/solar-noon-vs-clock-noon",
  },
  {
    source: "/guides/best-time-outdoor-activities",
    destination: "/guides/best-times-outdoor-activities",
  },
];

function getRedirectRules() {
  return legacyRedirects.map((redirect) => ({
    ...redirect,
    permanent: true,
  }));
}

module.exports = {
  legacyRedirects,
  getRedirectRules,
};
