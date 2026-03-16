const siteConfig = require("./site");

const {
  siteName,
  siteUrl,
  defaultDescription,
  defaultOgImage,
} = siteConfig;

function buildCanonical(pathname = "/") {
  if (!pathname || pathname === "/") {
    return siteUrl;
  }

  return `${siteUrl}${pathname}`;
}

function buildMetadata({
  title,
  description = defaultDescription,
  pathname = "/",
  type = "website",
  index = true,
  follow = true,
  images = [defaultOgImage],
  includeCanonical = index,
}) {
  const canonical = pathname ? buildCanonical(pathname) : undefined;
  const imageUrls = images.map((image) =>
    typeof image === "string" ? image : image.url,
  );

  return {
    title,
    description,
    alternates: includeCanonical && canonical ? { canonical } : undefined,
    robots: {
      index,
      follow,
    },
    openGraph: {
      type,
      siteName,
      title,
      description,
      url: canonical,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrls,
    },
  };
}

module.exports = {
  buildCanonical,
  buildMetadata,
};
