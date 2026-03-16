import locationsData from "@/data/locations";
import toolsData from "@/data/tools";
import guidesData from "@/data/guides";
import routeExpectationsUtils from "@/lib/seo/routeExpectations";
import siteConfig from "@/lib/seo/site";

const { locations } = locationsData;
const { tools } = toolsData;
const { guides } = guidesData;
const { buildIndexableRouteExpectations } = routeExpectationsUtils;
const { siteUrl } = siteConfig;
const lastModified = new Date("2026-03-16T00:00:00.000Z");

export default function sitemap() {
  const routes = buildIndexableRouteExpectations({
    locations,
    tools,
    guides,
  }).map((entry) => entry.route);

  return routes.map((route) => ({
    url: `${siteUrl}${route || "/"}`,
    lastModified,
  }));
}
