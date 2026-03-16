function buildSunFacts({
  longestDayDate,
  longestDaylight,
  shortestDayDate,
  shortestDaylight,
  annualDaylightRange,
  solarNoonRange,
}) {
  return [
    {
      label: "Longest day",
      value: `${longestDayDate} - ${longestDaylight} of daylight`,
    },
    {
      label: "Shortest day",
      value: `${shortestDayDate} - ${shortestDaylight} of daylight`,
    },
    {
      label: "Annual daylight range",
      value: annualDaylightRange,
    },
    {
      label: "Solar noon range",
      value: solarNoonRange,
    },
  ];
}

const baseLocations = [
  {
    slug: "stockholm",
    name: "Stockholm",
    country: "Sweden",
    latitude: 59.3293,
    longitude: 18.0686,
    timeZone: "Europe/Stockholm",
    region: "Northern Europe",
    summary: "A strong reference city for dramatic seasonal daylight shifts.",
    daylightContent: {
      heading: "Daylight in Stockholm through the year",
      paragraphs: [
        `Stockholm sits at 59.3 degrees north, which gives the city one of the clearest daylight stories in Europe. Spring arrives with fast gains in morning light, summer stretches the evening far into the night, and winter compresses usable daylight into a short, pale window around midday. That rhythm shapes commuting, outdoor life, and even how visitors understand the city when they arrive in different months.`,
        `Around the summer solstice, Stockholm reaches about 18h 37m of daylight, while the shortest stretch in late December falls to about 6h 05m. The change is not subtle. Light lingers over the archipelago late into June, and even when the sun sits low, the sky can stay bright well beyond dinner. In December, sunrise comes late, sunset arrives early, and the low solar angle makes shadows long for most of the day.`,
        `That contrast is part of daily life in Sweden. Midsommar is celebrated during the bright season because long evenings feel almost endless, while winter routines often revolve around making the most of the short central band of light. Stockholm is therefore an excellent city for understanding how latitude affects sunrise, sunset, solar noon, and the practical feeling of daylight across a full year.`,
      ],
    },
    sunFacts: buildSunFacts({
      longestDayDate: "June 21",
      longestDaylight: "18h 37m",
      shortestDayDate: "December 22",
      shortestDaylight: "6h 05m",
      annualDaylightRange: "12h 33m",
      solarNoonRange: "11:32 to 12:55",
    }),
  },
  {
    slug: "paris",
    name: "Paris",
    country: "France",
    latitude: 48.8567,
    longitude: 2.3508,
    timeZone: "Europe/Paris",
    region: "Western Europe",
    summary: "A balanced daylight pattern that makes seasonal change easy to compare.",
    daylightContent: {
      heading: "Daylight in Paris through the year",
      paragraphs: [
        `Paris sits at 48.9 degrees north, so it offers a balanced version of seasonal daylight change. The city never reaches the extreme summer evenings of Scandinavia or the compressed winter days of the far north, yet the yearly shift is still obvious enough to shape routines, sightseeing plans, and the look of the city from one season to the next. It is a useful reference point for anyone learning how mid-latitude daylight behaves.`,
        `Near the June solstice, Paris reaches about 16h 11m of daylight. By late December that falls to about 8h 15m, giving the city a yearly spread of nearly eight hours. Summer evenings support late walks along the Seine, open-air cafes, and a clear sense that sunset arrives slowly. Winter light feels shorter and more concentrated, with a lower sun angle that changes how monuments, boulevards, and river views read through the day.`,
        `That moderation is what makes Paris so helpful in comparisons. It shows clear seasonality without becoming an extreme case. Visitors can see how daylight supports long summer social hours, while residents still notice meaningful winter compression in the working day. Paris is therefore a strong benchmark city for comparing sunrise, sunset, solar noon, and daylight length against both higher-latitude cities like Stockholm and lower-latitude cities such as Dubai or Singapore.`,
      ],
    },
    sunFacts: buildSunFacts({
      longestDayDate: "June 21",
      longestDaylight: "16h 11m",
      shortestDayDate: "December 22",
      shortestDaylight: "8h 15m",
      annualDaylightRange: "7h 56m",
      solarNoonRange: "12:35 to 13:58",
    }),
  },
  {
    slug: "london",
    name: "London",
    country: "United Kingdom",
    latitude: 51.5074,
    longitude: -0.1278,
    timeZone: "Europe/London",
    region: "Western Europe",
    summary: "Useful for comparing sunrise and sunset patterns across temperate latitudes.",
    daylightContent: {
      heading: "Daylight in London through the year",
      paragraphs: [
        `London sits at 51.5 degrees north, putting it in a latitude band where daylight changes are strong enough to shape everyday life but still familiar to many travelers. The city moves from long, lingering summer evenings to compact winter afternoons, and that shift is one reason London is so useful when comparing sunrise, sunset, and solar noon across temperate cities.`,
        `The longest day reaches about 16h 38m of daylight near June 21, while the shortest day drops to about 7h 49m near December 22. In practical terms, that means summer evenings can stay bright well into the late commute and early social hours, while winter daylight is heavily concentrated around the middle of the day. The low winter sun often creates flat, cool light, whereas summer raises the sun long enough to make outdoor plans much more forgiving.`,
        `London also carries a cultural awareness of changing light. Parks, riverside walks, and pub gardens feel different when sunset stretches late, while winter routines often adapt to darker starts and earlier dusk. Because the city is globally familiar and easy to place on a mental map, it works especially well as a comparison point for understanding how daylight shifts with latitude, season, and local clock time without reaching the more dramatic extremes seen farther north.`,
      ],
    },
    sunFacts: buildSunFacts({
      longestDayDate: "June 21",
      longestDaylight: "16h 38m",
      shortestDayDate: "December 22",
      shortestDaylight: "7h 49m",
      annualDaylightRange: "8h 49m",
      solarNoonRange: "11:45 to 13:08",
    }),
  },
  {
    slug: "new-york",
    name: "New York",
    country: "United States",
    latitude: 40.7128,
    longitude: -74.006,
    timeZone: "America/New_York",
    region: "North America",
    summary: "A high-interest city for daily planning around sunrise, sunset, and solar noon.",
    daylightContent: {
      heading: "Daylight in New York through the year",
      paragraphs: [
        `New York sits at 40.7 degrees north, which gives it a very readable seasonal daylight pattern. The city gains enough summer light to feel generous, loses enough winter light to change daily planning, and remains familiar to a large audience searching for practical sunrise, sunset, and daylight information. That combination makes it one of the most useful benchmark cities on the site.`,
        `Near June 21, New York reaches about 15h 06m of daylight. By late December it falls to about 9h 15m, a meaningful shift that affects commuting, exercise, tourism, photography, and evening activity. Summer mornings start early, sunset arrives much later, and the city feels active deep into the evening. Winter light is shorter and more directional, with daylight concentrated around workday hours and a noticeably earlier dusk across the skyline.`,
        `Because New York combines dense urban life with strong seasonal contrast, its solar pattern is easy to connect to real decisions. Rooftop plans, park visits, and shadow conditions between tall buildings all change with season and sun angle. The city is therefore a practical place to compare current sun position, solar noon, and total daylight, especially when you want a recognizable reference between the higher-latitude swings of Europe and the steadier daylight patterns found closer to the tropics.`,
      ],
    },
    sunFacts: buildSunFacts({
      longestDayDate: "June 21",
      longestDaylight: "15h 06m",
      shortestDayDate: "December 22",
      shortestDaylight: "9h 15m",
      annualDaylightRange: "5h 51m",
      solarNoonRange: "11:40 to 13:08",
    }),
  },
  {
    slug: "tokyo",
    name: "Tokyo",
    country: "Japan",
    latitude: 35.6895,
    longitude: 139.6917,
    timeZone: "Asia/Tokyo",
    region: "East Asia",
    summary: "A dense urban location where current sun position and daylight timing are practical questions.",
    daylightContent: {
      heading: "Daylight in Tokyo through the year",
      paragraphs: [
        `Tokyo sits at 35.7 degrees north, giving it a steady but still noticeable seasonal daylight cycle. The city does not experience extreme swings, yet sunrise, sunset, and solar noon move enough across the calendar to matter for commuting, travel, outdoor events, and photography. In a dense urban setting where building shadows and timing matter, that makes daylight data especially practical rather than abstract.`,
        `The longest day reaches about 14h 35m of daylight in late June, while the shortest day brings about 9h 44m in late December. Summer days feel broad and usable, with early sunrise and later evening light supporting activity across a long urban schedule. Winter is shorter but not severe, so daylight still covers much of the core day even as sunset arrives earlier and the lower sun angle becomes more obvious between towers and along narrow streets.`,
        `Tokyo is also a helpful comparison city because it blends a large population, strong seasonal identity, and a latitude that sits between the subtropics and the cooler mid-latitudes. Cherry blossom season, humid summer evenings, and crisp winter afternoons all look different under changing solar conditions. For readers comparing sun position or day length across world cities, Tokyo shows how a major metropolitan area can feel seasonally distinct without the dramatic extremes seen in places such as Reykjavik or Stockholm.`,
      ],
    },
    sunFacts: buildSunFacts({
      longestDayDate: "June 22",
      longestDaylight: "14h 35m",
      shortestDayDate: "December 22",
      shortestDaylight: "9h 44m",
      annualDaylightRange: "4h 50m",
      solarNoonRange: "11:26 to 11:56",
    }),
  },
  {
    slug: "sydney",
    name: "Sydney",
    country: "Australia",
    latitude: -33.8688,
    longitude: 151.2093,
    timeZone: "Australia/Sydney",
    region: "Oceania",
    summary: "A southern-hemisphere comparison city that flips seasonal daylight expectations.",
    daylightContent: {
      heading: "Daylight in Sydney through the year",
      paragraphs: [
        `Sydney sits at 33.9 degrees south, so it is one of the clearest cities on the site for showing how daylight seasons reverse in the southern hemisphere. When northern cities are heading into short December days, Sydney is moving toward its brightest part of the year. That inversion makes it especially useful for comparisons and for readers who want to understand how latitude and hemisphere work together.`,
        `The city reaches about 14h 25m of daylight near December 22, while the shortest stretch in late June falls to about 9h 54m. Summer days feel long and open, with sunrise arriving early enough to support beach culture, morning sport, and late outdoor evenings. Winter remains mild by global standards, but the shorter day is still visible in earlier sunset, lower midday sun, and a tighter window for strong natural light.`,
        `Sydney is also practical because its daylight pattern connects directly to outdoor routines. Harbor views, coastal walks, and photography all depend on the season's changing light. For users comparing cities across hemispheres, Sydney provides a clean counterpoint to London, New York, and Paris. It shows that the same solar rules apply worldwide, but the calendar experience flips, making it a valuable city for understanding sunrise, sunset, daylight length, and solar noon from a global perspective.`,
      ],
    },
    sunFacts: buildSunFacts({
      longestDayDate: "December 22",
      longestDaylight: "14h 25m",
      shortestDayDate: "June 22",
      shortestDaylight: "9h 54m",
      annualDaylightRange: "4h 31m",
      solarNoonRange: "11:45 to 13:10",
    }),
  },
  {
    slug: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    latitude: -33.9249,
    longitude: 18.4241,
    timeZone: "Africa/Johannesburg",
    region: "Southern Africa",
    summary: "Helpful for comparing solar patterns outside the northern-hemisphere default.",
    daylightContent: {
      heading: "Daylight in Cape Town through the year",
      paragraphs: [
        `Cape Town sits at 33.9 degrees south, almost mirroring Sydney in latitude while delivering a very different landscape and daily context. That makes it a strong southern-hemisphere comparison city. The daylight pattern reverses the northern calendar, but the visual experience is shaped by mountains, ocean exposure, and a city where outdoor planning often depends on how quickly morning and evening light opens or fades.`,
        `Near December 22, Cape Town reaches about 14h 25m of daylight, while the shortest day around June 21 drops to about 9h 53m. Summer brings long evenings and broad afternoon light, while winter compresses the day into a shorter, cooler window. The shift is large enough to change when beaches, hikes, and scenic drives feel best, yet not so extreme that daylight disappears into an ultra-short winter pattern.`,
        `Cape Town is especially valuable because it broadens the site's geographic range beyond the usual Europe and North America examples. It helps explain how southern mid-latitude cities experience meaningful seasonal change without the dramatic twilight behavior of polar or near-polar locations. When users compare Cape Town with Stockholm, London, or Singapore, they can see how hemisphere, latitude, and local geography all influence the practical feel of sunrise, sunset, solar noon, and total daylight across a year.`,
      ],
    },
    sunFacts: buildSunFacts({
      longestDayDate: "December 22",
      longestDaylight: "14h 25m",
      shortestDayDate: "June 21",
      shortestDaylight: "9h 53m",
      annualDaylightRange: "4h 31m",
      solarNoonRange: "12:31 to 13:01",
    }),
  },
  {
    slug: "los-angeles",
    name: "Los Angeles",
    country: "United States",
    latitude: 34.0522,
    longitude: -118.2437,
    timeZone: "America/Los_Angeles",
    region: "North America",
    summary:
      "A practical city for daily sun-position checks, golden-hour planning, and daylight comparison.",
    daylightContent: {
      heading: "Daylight in Los Angeles through the year",
      paragraphs: [
        `Los Angeles sits at 34.1 degrees north, where the yearly daylight swing is noticeable without becoming extreme. That makes it ideal for practical questions about current sun angle, golden hour, and how much usable light remains in the day. Because so much of life in Southern California happens outdoors, sunrise, sunset, and solar noon often feel immediately relevant rather than purely informational.`,
        `The longest day reaches about 14h 26m of daylight near June 21, while the shortest day around December 21 falls to about 9h 53m. Summer gives the city a long runway of evening light that supports beach time, hiking, filming, and later outdoor plans. Winter is still bright by many standards, but the earlier sunset and lower midday sun make shadow length and orientation more noticeable across neighborhoods, hillsides, and downtown streets.`,
        `Los Angeles is also a useful teaching city because many people associate it with constant sunshine, yet the actual daylight window still changes by more than four and a half hours over the year. The city shows that a place can feel sunny in every season while still having meaningful seasonal movement in day length and sun position. That combination makes Los Angeles a strong comparison point between tropical steadiness, mid-latitude seasonality, and the larger daylight swings found farther north.`,
      ],
    },
    sunFacts: buildSunFacts({
      longestDayDate: "June 21",
      longestDaylight: "14h 26m",
      shortestDayDate: "December 21",
      shortestDaylight: "9h 53m",
      annualDaylightRange: "4h 33m",
      solarNoonRange: "11:37 to 13:05",
    }),
  },
  {
    slug: "singapore",
    name: "Singapore",
    country: "Singapore",
    latitude: 1.3521,
    longitude: 103.8198,
    timeZone: "Asia/Singapore",
    region: "Southeast Asia",
    summary: "Near-equatorial daylight makes this a useful contrast against higher-latitude cities.",
    daylightContent: {
      heading: "Daylight in Singapore through the year",
      paragraphs: [
        `Singapore sits at 1.4 degrees north, very close to the equator, which gives it one of the steadiest daylight patterns on the site. While higher-latitude cities gain and lose large blocks of daylight through the seasons, Singapore stays close to a nearly even split between day and night. That makes it an essential comparison city for understanding what minimal seasonal daylight change looks like in practice.`,
        `The longest day reaches about 12h 12m of daylight in late June, while the shortest day around late December is still about 12h 03m. The annual spread is only nine minutes. Sunrise and sunset times drift slightly, but the city never experiences the long summer evenings of Europe or the compressed winter afternoons of the far north. Instead, the sun's path changes more subtly, and midday light remains a stronger organizing feature than big seasonal changes in day length.`,
        `That consistency is useful for both learning and planning. Singapore shows how near-equatorial cities can have stable daylight even when weather, cloud cover, and seasonal rainfall patterns still vary. It is a strong reference point for users comparing daylight by latitude, because it anchors the low-variation end of the spectrum. Put beside Stockholm, Reykjavik, or London, Singapore makes the relationship between latitude and annual daylight range immediately clear.`,
      ],
    },
    sunFacts: buildSunFacts({
      longestDayDate: "June 22",
      longestDaylight: "12h 12m",
      shortestDayDate: "December 22",
      shortestDaylight: "12h 03m",
      annualDaylightRange: "0h 09m",
      solarNoonRange: "12:49 to 13:20",
    }),
  },
  {
    slug: "reykjavik",
    name: "Reykjavik",
    country: "Iceland",
    latitude: 64.1466,
    longitude: -21.9426,
    timeZone: "Atlantic/Reykjavik",
    region: "Nordic region",
    summary: "An extreme-latitude example for understanding large daylight swings.",
    daylightContent: {
      heading: "Daylight in Reykjavik through the year",
      paragraphs: [
        `Reykjavik sits at 64.1 degrees north, which places it among the most dramatic daylight examples on the site. The city is famous for its huge seasonal swing: summer edges toward the midnight sun, while winter compresses daylight into a short band around midday. If you want to understand how far latitude can push sunrise, sunset, and total day length without crossing into full polar day or polar night, Reykjavik is a key reference city.`,
        `Near June 21, Reykjavik reaches about 21h 09m of daylight. Around December 22, it drops to about 4h 07m. That 17-hour spread changes how the city feels in almost every season. Summer evenings remain bright late into the night, and darkness never settles in the same way it does farther south. Winter, by contrast, concentrates useful daylight into a brief central window, with long twilight and a very low midday sun.`,
        `This extreme pattern shapes daily life and the way travelers experience Iceland. Long summer light supports extended road trips, late hikes, and evening sightseeing, while winter schedules often revolve around catching the brightest part of the day. Reykjavik is therefore one of the clearest places to compare solar noon, daylight range, and the practical meaning of latitude. It shows, more than almost any other city in the dataset, how the sun can redefine the rhythm of a place through the year.`,
      ],
    },
    sunFacts: buildSunFacts({
      longestDayDate: "June 21",
      longestDaylight: "21h 09m",
      shortestDayDate: "December 22",
      shortestDaylight: "4h 07m",
      annualDaylightRange: "17h 02m",
      solarNoonRange: "13:12 to 13:43",
    }),
  },
  {
    slug: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    latitude: 25.2048,
    longitude: 55.2708,
    timeZone: "Asia/Dubai",
    region: "Middle East",
    summary: "A year-round high-interest city for monitoring daytime sun angle and sunset timing.",
    daylightContent: {
      heading: "Daylight in Dubai through the year",
      paragraphs: [
        `Dubai sits at 25.2 degrees north, giving it a relatively stable daylight pattern compared with Europe or North America while still preserving meaningful seasonal change. The city does not swing between very long and very short days, but the sun angle, heat load, and timing of sunset remain highly practical questions throughout the year. That makes Dubai valuable for users who care about solar position as much as total day length.`,
        `The longest day reaches about 13h 42m of daylight near June 21, while the shortest day around December 22 brings about 10h 34m. The overall range is modest, yet the strong summer sun and high midday altitude make solar timing especially important. Morning and late afternoon light can feel more usable in hot months, while winter brings a more comfortable full-day pattern without the deep daylight compression seen in higher-latitude cities.`,
        `Dubai is also useful because it shows how a city can feel intensely sun-oriented without having extreme daylight variation. Architecture, shade planning, outdoor comfort, and photography all depend on where the sun sits rather than just how many hours of daylight are available. In comparisons, Dubai provides a middle point between near-equatorial steadiness and stronger mid-latitude seasonality, helping users understand how sun position and day length interact in a hot desert city across the calendar.`,
      ],
    },
    sunFacts: buildSunFacts({
      longestDayDate: "June 21",
      longestDaylight: "13h 42m",
      shortestDayDate: "December 22",
      shortestDaylight: "10h 34m",
      annualDaylightRange: "3h 08m",
      solarNoonRange: "12:03 to 12:34",
    }),
  },
  {
    slug: "mexico-city",
    name: "Mexico City",
    country: "Mexico",
    latitude: 19.4326,
    longitude: -99.1332,
    timeZone: "America/Mexico_City",
    region: "North America",
    summary: "Useful for comparing daylight change in subtropical latitudes.",
    daylightContent: {
      heading: "Daylight in Mexico City through the year",
      paragraphs: [
        `Mexico City sits at 19.4 degrees north, so its daylight pattern is much steadier than cities in Europe or the northern United States. Seasonal change is still visible, but it plays out gently. That makes the city a useful subtropical reference point for anyone comparing sunrise, sunset, and daylight length across a broad range of latitudes without moving all the way to the equator.`,
        `The longest day reaches about 13h 18m of daylight near June 21, while the shortest day in late December is about 10h 57m. The annual change is only a little over two hours, so the city avoids the dramatic compression and expansion seen farther north. Even so, sunrise and sunset move enough to matter for commuting, outdoor activity, and how the city feels between seasons. The lower variation makes Mexico City a helpful reminder that daylight can change meaningfully without becoming extreme.`,
        `Its high elevation adds another practical dimension. Clearer air, strong midday sun, and pronounced seasonal weather patterns often matter as much as raw day length. That makes Mexico City a good comparison city for understanding how latitude, altitude, and urban life interact. When placed beside New York, Los Angeles, or Singapore, it helps show where subtropical daylight sits on the global spectrum: not fixed, not dramatic, but consistently relevant for daily solar planning.`,
      ],
    },
    sunFacts: buildSunFacts({
      longestDayDate: "June 21",
      longestDaylight: "13h 18m",
      shortestDayDate: "December 22",
      shortestDaylight: "10h 57m",
      annualDaylightRange: "2h 21m",
      solarNoonRange: "12:21 to 12:52",
    }),
  },
];

const locationRelationships = {
  stockholm: {
    relatedToolSlugs: [
      "sun-position-calculator",
      "daylight-hours-calculator",
      "solar-noon-calculator",
    ],
    relatedGuideSlugs: [
      "why-daylight-hours-change",
      "solar-noon-vs-clock-noon",
      "daylight-hours-by-latitude",
    ],
    homepageFeatured: true,
  },
  paris: {
    relatedToolSlugs: [
      "sun-position-calculator",
      "daylight-hours-calculator",
      "solar-noon-calculator",
    ],
    relatedGuideSlugs: [
      "what-is-solar-noon",
      "solar-noon-vs-clock-noon",
      "how-sunrise-sunset-calculated",
    ],
    homepageFeatured: false,
  },
  london: {
    relatedToolSlugs: [
      "sun-position-calculator",
      "daylight-hours-calculator",
      "solar-noon-calculator",
    ],
    relatedGuideSlugs: [
      "how-sunrise-sunset-calculated",
      "why-daylight-hours-change",
      "what-is-sun-azimuth",
    ],
    homepageFeatured: false,
  },
  "new-york": {
    relatedToolSlugs: [
      "sun-position-calculator",
      "daylight-hours-calculator",
      "solar-noon-calculator",
    ],
    relatedGuideSlugs: [
      "best-times-outdoor-activities",
      "what-is-sun-azimuth",
      "why-daylight-hours-change",
    ],
    homepageFeatured: true,
  },
  tokyo: {
    relatedToolSlugs: [
      "sun-position-calculator",
      "daylight-hours-calculator",
      "solar-noon-calculator",
    ],
    relatedGuideSlugs: [
      "what-is-sun-azimuth",
      "how-sunrise-sunset-calculated",
      "best-times-outdoor-activities",
    ],
    homepageFeatured: true,
  },
  sydney: {
    relatedToolSlugs: [
      "sun-position-calculator",
      "daylight-hours-calculator",
      "solar-noon-calculator",
    ],
    relatedGuideSlugs: [
      "daylight-hours-by-latitude",
      "best-times-outdoor-activities",
      "why-daylight-hours-change",
    ],
    homepageFeatured: true,
  },
  "cape-town": {
    relatedToolSlugs: [
      "sun-position-calculator",
      "daylight-hours-calculator",
      "solar-noon-calculator",
    ],
    relatedGuideSlugs: [
      "daylight-hours-by-latitude",
      "sun-angle-photography-golden-hour",
      "best-times-outdoor-activities",
    ],
    homepageFeatured: false,
  },
  "los-angeles": {
    relatedToolSlugs: [
      "sun-position-calculator",
      "daylight-hours-calculator",
      "solar-noon-calculator",
    ],
    relatedGuideSlugs: [
      "sun-angle-photography-golden-hour",
      "what-is-sun-azimuth",
      "best-times-outdoor-activities",
    ],
    homepageFeatured: true,
  },
  singapore: {
    relatedToolSlugs: [
      "sun-position-calculator",
      "daylight-hours-calculator",
      "solar-noon-calculator",
    ],
    relatedGuideSlugs: [
      "daylight-hours-by-latitude",
      "what-is-solar-noon",
      "why-daylight-hours-change",
    ],
    homepageFeatured: false,
  },
  reykjavik: {
    relatedToolSlugs: [
      "sun-position-calculator",
      "daylight-hours-calculator",
      "solar-noon-calculator",
    ],
    relatedGuideSlugs: [
      "what-is-solar-noon",
      "why-daylight-hours-change",
      "daylight-hours-by-latitude",
    ],
    homepageFeatured: true,
  },
  dubai: {
    relatedToolSlugs: [
      "sun-position-calculator",
      "daylight-hours-calculator",
      "solar-noon-calculator",
    ],
    relatedGuideSlugs: [
      "sun-angle-photography-golden-hour",
      "what-is-sun-azimuth",
      "best-times-outdoor-activities",
    ],
    homepageFeatured: true,
  },
  "mexico-city": {
    relatedToolSlugs: [
      "sun-position-calculator",
      "daylight-hours-calculator",
      "solar-noon-calculator",
    ],
    relatedGuideSlugs: [
      "solar-noon-vs-clock-noon",
      "how-sunrise-sunset-calculated",
      "daylight-hours-by-latitude",
    ],
    homepageFeatured: false,
  },
};

const locations = baseLocations.map((location) => ({
  ...location,
  ...locationRelationships[location.slug],
}));

function getLocationBySlug(slug) {
  return locations.find((location) => location.slug === slug);
}

module.exports = {
  locations,
  getLocationBySlug,
};
