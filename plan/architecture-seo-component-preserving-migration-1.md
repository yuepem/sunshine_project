---
goal: Migrate the site to a Next.js SEO-first architecture while preserving the existing src component UI, styling, and interaction patterns
version: 1
date_created: 2026-03-15
last_updated: 2026-03-15
owner: Codex
status: In Progress
tags: [architecture, seo, nextjs, migration, component-preservation]
---

# Introduction

![Status: In Progress](https://img.shields.io/badge/status-In%20Progress-yellow)

This plan replaces the current CRA-style delivery model with a Next.js SEO architecture without redesigning the existing UI components in `src/`. The migration must treat the current components as the source of truth for visual presentation and core user interaction, and must add SEO routing, metadata, crawlable content, and static route generation around those components rather than replacing them.

## Execution Status

- Updated: 2026-03-15
- Completed in this implementation pass: `TASK-001` through `TASK-036`
- Pending follow-up: `TASK-037` and `TASK-038` still need browser-level visual/manual parity review, and `TASK-039` is partially complete because obsolete CRA entry files were removed while reusable `src` logic was preserved.

## 1. Requirements & Constraints

- **REQ-001**: The repository must run on Next.js App Router and provide server-rendered HTML for SEO-critical routes.
- **REQ-002**: The homepage, locations index, city pages, tool pages, and guide pages must each have unique URL, `title`, `meta description`, canonical URL, descriptive `h1`, and crawlable internal links.
- **REQ-003**: Unknown routes must return HTTP `404`.
- **REQ-004**: The project must expose a valid `sitemap.xml` and `robots` response.
- **REQ-005**: Existing solar data, map interactions, city selection, simulator output, and charts must continue to come from the current `src/` component system.
- **REQ-006**: New SEO content blocks may be added around current components, but they must not replace the core information already expressed by those components.
- **REQ-007**: Pages must be organized around user usefulness first and SEO second. SEO content must support comprehension and discovery without degrading the current product experience.
- **REQ-008**: The migration must interpret the current `src/components/**` modules by responsibility and reuse them as page-building materials, not as an all-or-nothing fixed page template.
- **REQ-009**: City pages must use a mixed information layout that combines summary, visualization, interaction, and supporting explanatory content in the order that best serves users.
- **REQ-010**: The city page summary must answer only the immediate question "where is the sun now" for that city. It must stay concise and must not duplicate the detailed information already handled by deeper components.
- **REQ-011**: The homepage must balance brand entry, navigation, discovery, and selected interaction rather than simply mirroring the city-page layout.
- **CON-001**: Do not change the styling of existing `src/components/**` unless a change is strictly required for Next.js compatibility and does not alter the final visual presentation.
- **CON-002**: Do not change the user-facing interaction semantics of existing `src/components/**` unless a change is strictly required for Next.js compatibility and does not alter the final interaction behavior.
- **CON-003**: Do not redesign or replace current `src/components/**` with new UI that duplicates their purpose.
- **CON-004**: Existing component props contracts and internal responsibility boundaries in `src/components/**` must remain intact.
- **CON-005**: Existing `src/components` are reusable building blocks. The new SEO pages may reorder, split, or selectively reuse them, but the components themselves are not to be reauthored as a new design system.
- **CON-006**: The original homepage interaction stack remains the default reference experience: `CityHeader`, `MainCom`, `TimeSlider-B`, `InputComponent`, `src/components/sunData/Chart`, and `Footer`.
- **CON-007**: Any compatibility fix in `src/` must be limited to boundary changes such as `"use client"`, `next/dynamic`, browser-only guards, import fixes, and wrapper-based state initialization.
- **SEC-001**: Do not commit secrets. All browser-exposed configuration must use `NEXT_PUBLIC_*`.
- **SEC-002**: Do not rely on client-only metadata injection for SEO-critical tags.
- **GUD-001**: Prefer adding new code in `app/`, `components/`, `data/`, `lib/`, `tests/`, and `scripts/` before touching `src/`.
- **GUD-002**: When SEO pages need interactive content, render static descriptive content first and hydrate the existing client components afterward.
- **GUD-003**: Do not overload the first screen of city pages with location-confirmation details because the route itself already establishes the city context.
- **GUD-004**: Use short, high-signal summaries before deeper interaction modules. Detailed modules such as `TimeProgress`, `TimeControl`, `Maps`, and `MonthlyChart` should remain in the detailed sections of the page.
- **GUD-005**: `ModelComponent` is the primary visual expression of current solar position and should remain central in city-page information architecture.
- **PAT-001**: Treat `src/components/**` as presentation modules and Next route files as orchestration and SEO modules.
- **PAT-002**: Separate route metadata generation, static content data, and client component mounting into distinct files.
- **PAT-003**: Derive page layout from component responsibilities. For example, `ModelComponent` provides visual solar state, `LocationInfo` and `SimulatorDateTime` provide current context, `TimeSlider-B` provides temporal interaction, `InputComponent` provides deeper control and map context, and `src/components/sunData/Chart.jsx` provides historical and monthly depth.

## 2. Implementation Steps

### Implementation Phase 1

- **GOAL-001**: Define the migration boundaries so the SEO cutover preserves the current UI instead of replacing it.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-001 | Mark [plan/architecture-seo-platform-migration-1.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/plan/architecture-seo-platform-migration-1.md) as superseded for implementation purposes and use this plan as the active execution spec. | | |
| TASK-002 | Create a component preservation audit document or section that maps the current `src` experience into reusable modules: `CityHeader`, `MainCom`, `TimeSlider-B`, `InputComponent`, `src/components/sunData/Chart`, `Footer`, `CityList`, and simulator subcomponents, with each component described by page function rather than only by file name. | | |
| TASK-003 | Define a strict allowlist of `src/` modifications permitted during migration: `"use client"`, dynamic import boundaries, browser-global guards, import/path fixes, and wrapper-based state seeding only. | | |
| TASK-004 | Verify the current branch baseline before new implementation work by ensuring the worktree is clean and [docs/SEO_AUDIT_PLAN.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/SEO_AUDIT_PLAN.md) is used as the audit reference. | | |
| TASK-005 | Document target page roles before implementation: homepage as brand/discovery plus selected interaction, city pages as mixed summary-plus-interaction pages, tool pages as task-focused reuse pages, and guide pages as explanatory support pages. | | |

### Implementation Phase 2

- **GOAL-002**: Establish the Next.js application shell and route architecture without rewriting the existing UI components.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-006 | Update `package.json`, `package-lock.json`, `next.config.js`, and `jsconfig.json` for a stable Next.js App Router setup compatible with the current React, map, and 3D dependencies. | | |
| TASK-007 | Create `app/layout.js` and `app/globals.css` as the global shell, and keep global styling migration limited to application-level CSS imports such as Leaflet styles and Tailwind directives. | | |
| TASK-008 | Keep legacy CRA entry files out of runtime use, but do not remove any `src` modules still needed by the Next app until verification passes. | | |
| TASK-009 | Implement top-level route files for `/`, `/locations`, `/locations/[slug]`, `/tools/[slug]`, `/guides/[slug]`, `/sitemap.xml`, `/robots.txt`, and `not-found` with server-rendered content blocks. | | |

### Implementation Phase 3

- **GOAL-003**: Build reusable SEO orchestration layers that mount current `src` components instead of replacing them.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-010 | Create `components/client/SunExperience.js` as a client-only loader for preserved interactive content. It must not introduce a replacement calculator UI. | | |
| TASK-011 | Create `components/client/InteractiveSunExperience.js` as an orchestration wrapper that composes existing `src` modules by page need. It may reuse the original homepage stack or route-specific subsets, but every reused module must retain its existing visual and interaction contract. | | |
| TASK-012 | If route-specific default city state is needed, create wrapper-based store initialization around `src/stores/inputStore.js` without changing existing component props contracts. | | |
| TASK-013 | Ensure map-heavy and simulator-heavy modules remain client-only through route-level or wrapper-level boundaries rather than by rewriting their UI. | | |
| TASK-014 | Restrict any `src/components/**` edits to compatibility shims. Do not change class names, layout hierarchy, or the user-visible content structure of those components. | | |

### Implementation Phase 4

- **GOAL-004**: Add SEO-first page templates that use the current components as content anchors.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-015 | Create `components/pages/HomePage.js` to balance brand entry, discovery, crawlable navigation, and selected interaction. The homepage must not simply duplicate the city-page layout. | | |
| TASK-016 | Create `components/pages/CityPage.js` to use the following default structure unless a stronger user-experience reason emerges: concise "where is the sun now" summary, `ModelComponent`-centered visual section, current context modules such as `SimulatorDateTime` and `LocationInfo`, temporal interaction through `TimeSlider-B`, deeper interaction through `InputComponent`, and longer-range depth through `src/components/sunData/Chart.jsx`. | | |
| TASK-017 | Ensure the city-page summary stays minimal and focuses on current solar state rather than repeating detailed data from deeper sections such as map controls, monthly charting, or extended inputs. | | |
| TASK-018 | Create `components/pages/ToolPage.js` to present task-focused explanatory content while reusing the existing calculator components as the interactive source of truth. | | |
| TASK-019 | Create `components/pages/GuidePage.js` to present crawlable educational content that links back to the preserved interactive tool experience. | | |
| TASK-020 | Create `components/navigation/PopularCityLinks.js` with crawlable `Link` elements for SEO discovery, while leaving the existing `src/components/NavBar/CityList.jsx` behavior intact for the interactive experience. | | |
| TASK-021 | Ensure SEO copy complements the existing components rather than restating them with a new visual system. | | |

### Implementation Phase 5

- **GOAL-005**: Add structured SEO data, route metadata, and static datasets needed for crawlable pages.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-022 | Create `data/locations.js` with launch city metadata that maps cleanly to the current interactive experience and city pages. | | |
| TASK-023 | Create `data/tools.js` and `data/guides.js` for tool and guide route content metadata. | | |
| TASK-024 | Create `lib/sun/calculateSunSnapshot.js` to provide route-level summary values derived from the same SunCalc-based logic used by the current app. The summary output must support the concise "where is the sun now" block without replacing deeper interactive components. | | |
| TASK-025 | Create `lib/seo/site.js` and `lib/seo/metadata.js` for deterministic metadata generation. | | |
| TASK-026 | Implement `generateMetadata()` for homepage, city, tool, and guide routes, with canonical URLs and Open Graph metadata. | | |
| TASK-027 | Create `components/seo/Breadcrumbs.js` and use it on pages where breadcrumbs are visible in content. | | |
| TASK-028 | Implement `app/sitemap.js` and `app/robots.js` using the final route list and production domain constants. | | |

### Implementation Phase 6

- **GOAL-006**: Apply only the compatibility changes required to run the preserved components in Next.js.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-029 | Add `"use client"` only to `src` modules that require client execution under App Router. | | |
| TASK-030 | Wrap browser-only modules such as Leaflet, Google Maps autocomplete, or 3D renderer entrypoints with `next/dynamic` or client boundaries without changing their visible output. | | |
| TASK-031 | Guard browser-specific initialization in files such as `src/components/input/locationInput/Maps.jsx` so server rendering does not crash. | | |
| TASK-032 | Update environment variable usage in browser-facing helpers such as `src/helperFunctions/timeZone.js` and `src/components/input/locationInput/AddressSearch.jsx` to use `NEXT_PUBLIC_*` names only if needed for Next runtime compatibility. | | |
| TASK-033 | Avoid replacing `@react-three/drei`-based presentation unless a specific dependency incompatibility is proven. If replacement is required, it must preserve visible behavior and styling as closely as possible and be documented explicitly. | | |

### Implementation Phase 7

- **GOAL-007**: Verify that the SEO migration works and the preserved component experience remains intact.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-034 | Create or update `scripts/verify-seo-pages.js` to validate page `title`, description, canonical, one `h1`, and crawlable links on each SEO route. | | |
| TASK-035 | Add or update tests in `tests/seo/metadata.test.js` and `tests/seo/routes.test.js` for metadata and static params. | | |
| TASK-036 | Run `npm run lint`, `npm test -- --runInBand`, `npm run build`, and `npm run verify:seo` on the final implementation. | | |
| TASK-037 | Manually verify that city pages follow the intended order of user value: concise current-state summary, visual solar expression, interaction controls, and then deeper detail modules. | | |
| TASK-038 | Manually verify that the preserved interactive experience still renders with the expected component appearance on homepage and at least one city/tool route. | | |
| TASK-039 | Only after successful parity verification, remove obsolete CRA runtime entry files that are no longer used by the Next app. Do not remove reusable `src` logic. | | |

## 3. Alternatives

- **ALT-001**: Continue with the current `refactor/SEO` implementation direction that introduced replacement interactive UI. Rejected because it violates the preserved-component requirement.
- **ALT-002**: Keep the existing CRA SPA and add `react-helmet` only. Rejected because it does not fix missing initial HTML, sitemap issues, or soft-404 behavior.
- **ALT-003**: Build separate SEO pages disconnected from the current interactive UI. Rejected because it duplicates content and breaks the requirement that existing components remain the source of truth.
- **ALT-004**: Rewrite the current `src/components/**` into a new Next-native component library. Rejected because the user explicitly wants the current component styling and usage preserved.

## 4. Dependencies

- **DEP-001**: `next` and `eslint-config-next` must be installed and matched to a React version compatible with the current map and 3D stack.
- **DEP-002**: `@react-three/fiber`, `@react-three/drei`, `three`, and `react-leaflet` must remain usable under the final Next.js runtime.
- **DEP-003**: `suncalc` remains the canonical solar calculation library.
- **DEP-004**: `docs/SEO_AUDIT_PLAN.md` is the audit reference for defining route coverage and SEO priorities.
- **DEP-005**: Production deployment must support Next.js route handling and real 404 responses.

## 5. Files

- **FILE-001**: `plan/architecture-seo-component-preserving-migration-1.md` - active implementation plan for the preserved-component migration.
- **FILE-002**: `docs/SEO_AUDIT_PLAN.md` - SEO audit baseline and route priorities.
- **FILE-003**: `package.json` - Next.js scripts and dependency definitions.
- **FILE-004**: `package-lock.json` - locked dependency graph for the chosen Next-compatible stack.
- **FILE-005**: `next.config.js` - Next runtime configuration.
- **FILE-006**: `jsconfig.json` - path alias configuration.
- **FILE-007**: `app/layout.js` - application shell and global imports.
- **FILE-008**: `app/globals.css` - global Tailwind and site shell CSS.
- **FILE-009**: `app/page.js` - SEO homepage route.
- **FILE-010**: `app/locations/page.js` - locations index route.
- **FILE-011**: `app/locations/[slug]/page.js` - city page route.
- **FILE-012**: `app/tools/sun-position-calculator/page.js` - tool route.
- **FILE-013**: `app/tools/daylight-hours-calculator/page.js` - tool route.
- **FILE-014**: `app/tools/solar-noon-calculator/page.js` - tool route.
- **FILE-015**: `app/guides/what-is-solar-noon/page.js` - guide route.
- **FILE-016**: `app/guides/what-is-sun-azimuth/page.js` - guide route.
- **FILE-017**: `app/guides/why-daylight-hours-change/page.js` - guide route.
- **FILE-018**: `app/not-found.js` - real 404 route.
- **FILE-019**: `app/sitemap.js` - sitemap generator.
- **FILE-020**: `app/robots.js` - robots configuration.
- **FILE-021**: `components/client/SunExperience.js` - client boundary loader for preserved interactive components.
- **FILE-022**: `components/client/InteractiveSunExperience.js` - wrapper that composes existing `src` components by page need.
- **FILE-023**: `components/pages/HomePage.js` - homepage SEO layout with entry/discovery emphasis.
- **FILE-024**: `components/pages/CityPage.js` - city SEO layout with concise current-state summary followed by visual and interactive modules.
- **FILE-025**: `components/pages/ToolPage.js` - tool SEO layout.
- **FILE-026**: `components/pages/GuidePage.js` - guide SEO layout.
- **FILE-027**: `components/navigation/PopularCityLinks.js` - crawlable city links.
- **FILE-028**: `components/seo/Breadcrumbs.js` - visible breadcrumb UI.
- **FILE-029**: `data/locations.js` - city metadata dataset.
- **FILE-030**: `data/tools.js` - tool metadata dataset.
- **FILE-031**: `data/guides.js` - guide metadata dataset.
- **FILE-032**: `lib/sun/calculateSunSnapshot.js` - route summary calculations.
- **FILE-033**: `lib/seo/site.js` - site constants.
- **FILE-034**: `lib/seo/metadata.js` - route metadata builders.
- **FILE-035**: `scripts/verify-seo-pages.js` - automated SEO verification.
- **FILE-036**: `tests/seo/metadata.test.js` - metadata tests.
- **FILE-037**: `tests/seo/routes.test.js` - route generation tests.
- **FILE-038**: `src/components/CityHeader.jsx` - preserved interactive header component.
- **FILE-039**: `src/components/MainCom.jsx` - preserved simulator section.
- **FILE-040**: `src/components/TimeSlider-B.jsx` - preserved time slider.
- **FILE-041**: `src/components/InputComponent.jsx` - preserved input and map section.
- **FILE-042**: `src/components/sunData/Chart.jsx` - preserved chart section.
- **FILE-043**: `src/components/Footer.jsx` - preserved footer section.
- **FILE-044**: `src/components/Simulator/ModelComponent.jsx` - primary visual solar-state component for city pages.
- **FILE-045**: `src/components/Simulator/LocationInfo.jsx` - current location/context information block.
- **FILE-046**: `src/components/Simulator/SimulatorDateTime.jsx` - current date/time context block.

## 6. Testing

- **TEST-001**: `npm run lint` passes on the final Next.js implementation.
- **TEST-002**: `npm test -- --runInBand` passes for metadata and route tests.
- **TEST-003**: `npm run build` succeeds and generates the SEO routes.
- **TEST-004**: `npm run verify:seo` confirms metadata and crawlable links on all target routes.
- **TEST-005**: Manual verification confirms the homepage preserves its entry/discovery role while reusing existing components without visible redesign.
- **TEST-006**: Manual verification confirms at least one city page uses a concise current-state summary before `ModelComponent` and deeper interaction modules.
- **TEST-007**: Manual verification confirms at least one city page and one tool page reuse the existing interactive components without visible redesign.
- **TEST-008**: Manual verification confirms a non-existent route returns `404`.
- **TEST-009**: Manual verification confirms `/sitemap.xml` returns XML content rather than HTML.

## 7. Risks & Assumptions

- **RISK-001**: Some 3D or map modules may still depend on browser-only globals and require careful client boundaries.
- **RISK-002**: Preserving the existing component visuals may constrain how aggressively page layouts can be optimized for SEO.
- **RISK-003**: Some existing components may encode assumptions about the old single-page app environment, requiring wrapper-based initialization.
- **RISK-004**: If a third-party rendering dependency is incompatible with the selected React/Next version, a compatibility shim may be required and must be kept visually neutral.
- **ASSUMPTION-001**: The current `src/components/**` visuals and interaction model are the intended product surface and should be preserved.
- **ASSUMPTION-002**: The current solar calculations are functionally correct enough to continue as the data source during migration.
- **ASSUMPTION-003**: The production domain remains `https://whereisthesun.org`.
- **ASSUMPTION-004**: SEO gains should come from routing, crawlable HTML, metadata, and internal links, not from redesigning the current interactive product.
- **ASSUMPTION-005**: Different route types may legitimately use different subsets and orders of the current components as long as user value improves and the components themselves are not visually reauthored.

## 8. Related Specifications / Further Reading

[SEO audit baseline](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/SEO_AUDIT_PLAN.md)
[Previous migration plan to supersede in execution](/Users/iemdev/Documents/Development/work/projects/sunshine_project/plan/architecture-seo-platform-migration-1.md)
[Legacy homepage composition reference](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/App.js)
[City header component](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/CityHeader.jsx)
[Main simulator component](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/MainCom.jsx)
[Input and map component](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/InputComponent.jsx)
[Chart component](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/sunData/Chart.jsx)
[Google Search Central: Make links crawlable](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
[Google Search Central: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
