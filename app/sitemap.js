import locationsData from "@/data/locations";
import toolsData from "@/data/tools";
import guidesData from "@/data/guides";
import siteConfig from "@/lib/seo/site";

const { locations } = locationsData;
const { tools } = toolsData;
const { guides } = guidesData;
const { siteUrl } = siteConfig;

export default function sitemap() {
  const routes = [
    "",
    "/locations",
    ...locations.map((location) => `/locations/${location.slug}`),
    ...tools.map((tool) => `/tools/${tool.slug}`),
    ...guides.map((guide) => `/guides/${guide.slug}`),
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route || "/"}`,
    lastModified: new Date(),
  }));
}
