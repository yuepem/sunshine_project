# SEO Audit and Execution Plan

## Baseline State

This document captures the pre-migration SEO baseline before the Next.js cutover. At that point, the live site was a client-rendered React SPA. Search engines received a shell page with metadata and an empty `#root`, while the visible page content rendered only after JavaScript ran. This created two immediate SEO blockers:

1. Important content is not present in the initial HTML response.
2. Unknown URLs appear to return `200` with the same shell HTML, which can create soft 404 indexing issues.

## Evidence At Audit Time

- The previous CRA HTML shell contained the global `<title>`, meta tags, and `WebApplication` schema, but no crawlable body content.
- The previous client bootstrap mounted the app client-side only.
- There is no router, no SSR/SSG layer, no canonical tag, and no sitemap generator in the repo.
- `https://whereisthesun.org/sitemap.xml` currently returns `200` but serves HTML instead of an XML sitemap.
- `https://whereisthesun.org/this-should-not-exist` also returns `200`.
- Search results currently show indexed junk URLs such as `/etc/` and `/stats/`.

## Priority Order

### P0: Fix indexability

- Move the site from plain CRA SPA delivery to SSR, SSG, or prerendered HTML.
- Ensure every SEO page has a unique URL and server-rendered HTML.
- Return proper `404` for unknown routes.
- Add a real `sitemap.xml`.
- Add canonical tags per page.

### P1: Create indexable page types

- `/`
  - Target: `sun position calculator`, `where is the sun now`
- `/locations/`
  - Country and city discovery
- `/locations/[city]/`
  - Target: `sunrise sunset [city]`, `daylight hours [city]`
- `/tools/sun-position-calculator/`
- `/tools/daylight-hours-calculator/`
- `/tools/solar-noon-calculator/`
- `/guides/what-is-solar-noon/`
- `/guides/what-is-sun-azimuth/`
- `/guides/why-daylight-hours-change/`

### P2: Improve internal linking and on-page clarity

- Replace city selection buttons with crawlable links where appropriate.
- Add descriptive H1, intro copy, FAQs, and related links on each page.
- Add breadcrumb navigation.

## Recommended Technical Direction

The cleanest path is migrating from CRA to Next.js so the site can serve static or server-rendered HTML for homepage, city pages, tool pages, and guides. If a full migration is too heavy, use a prerender pipeline for a first release, but that is a temporary fix.

Minimum requirements for each SEO page:

- Unique `title`
- Unique `meta description`
- Canonical URL
- One descriptive H1
- 150 to 400 words of visible explanatory copy
- Crawlable internal links
- Structured data only when supported by visible content

## Page Templates

### Homepage

- H1: `Sun Position Calculator and Sunrise Sunset Times`
- Intro: explain current sun position, sunrise, sunset, daylight hours, and solar noon.
- Add sections for tools, popular cities, FAQs, and guide links.

### City Page

Example: `/locations/stockholm/`

- Title: `Sunrise & Sunset Times in Stockholm Today | WhereIsTheSun`
- H1: `Sunrise and Sunset Times in Stockholm`
- Modules:
  - sunrise
  - sunset
  - daylight duration
  - solar noon
  - current sun position
  - short explanation of seasonal daylight change
  - FAQ
  - links to nearby cities and related guides

### Guide Page

- Define one concept clearly.
- Include examples using real cities.
- Link back to relevant tools and city pages.

## Execution Roadmap

### Weeks 1-2

- Choose rendering strategy and routing architecture.
- Implement real routes and 404 handling.
- Add sitemap, canonical, robots validation, and metadata templates.
- Redesign homepage information architecture.

### Weeks 3-4

- Launch 25 to 50 city pages from a structured city dataset.
- Add unique copy blocks and FAQs.
- Interlink cities, guides, and tools.

### Weeks 5-6

- Launch tool pages.
- Launch 3 to 5 guide pages.
- Add breadcrumb and `BreadcrumbList` schema.

### Weeks 7-8

- Review Search Console:
  - discovered but not indexed
  - soft 404
  - low CTR pages
  - query/page mismatches
- Improve titles, descriptions, and internal links based on data.

## KPIs

- Valid indexed pages
- Non-brand impressions
- City-page clicks
- Homepage CTR
- Number of soft 404 or duplicate-canonical issues

## Recommended Skills

If you want to extend the workflow later, the most useful skill mix would be:

- `seo-audit` for repeated technical/content audits
- `programmatic-seo` for scalable city page generation
- `analytics` or `ga4` workflow support for measurement

In the current session, the available local skills most relevant to this work are `content-marketer` and `content-strategy`.
