# Phase 2 Execution Skill Matrix

This document makes skill routing explicit for the Phase 2 redesign implementation in `plan/design-phase2-skill-governed-redesign-1.md`.

## Execution Protocol

Every execution pass for this redesign must do the following before file edits begin:

1. Announce the required skill or skills being used for that pass.
2. List the exact local references read before making changes.
3. State whether `DEP-009` from `plan/refactor-react-next-performance-1.md` is already complete when the task touches shared files.
4. Stop shared-file redesign work if `DEP-009` is incomplete, unless the changes are being delivered in one coordinated branch that preserves both plans.

## Execution Passes

### Pass 1

- Date: `2026-03-16`
- Phase scope: `Implementation Phase 1`
- Skills used: `executing-plans`, `ui-ux-pro-max`, `create-implementation-plan`
- References read before edits:
  - `plan/design-phase2-skill-governed-redesign-1.md`
  - `docs/PHASE2_REDESIGN_SPECIFICATION.md`
  - `design-system/where-is-the-sun/MASTER.md`
  - `plan/refactor-react-next-performance-1.md`
  - `/Users/iemdev/.codex/skills/executing-plans/SKILL.md`
  - `/Users/iemdev/.codex/skills/create-implementation-plan/SKILL.md`
  - `.agents/skills/ui-ux-pro-max/SKILL.md`
- `DEP-009` status: `Not complete`
- Shared-file impact in this pass: `None. Phase 1 changes are limited to repository docs and design-system assets.`

### Pass 2

- Date: `2026-03-16`
- Phase scope: `Implementation Phase 2 (non-blocked tasks only)`
- Skills used: `ui-ux-pro-max`, `building-components`, `copywriting`, `seo-audit`
- References read before edits:
  - `plan/design-phase2-skill-governed-redesign-1.md`
  - `docs/PHASE2_REDESIGN_SPECIFICATION.md`
  - `docs/PHASE2_EXECUTION_SKILL_MATRIX.md`
  - `design-system/where-is-the-sun/MASTER.md`
  - `design-system/where-is-the-sun/pages/locations.md`
  - `design-system/where-is-the-sun/pages/tools.md`
  - `design-system/where-is-the-sun/pages/guides.md`
  - `plan/refactor-react-next-performance-1.md`
  - `app/globals.css`
  - `app/locations/page.js`
  - `app/tools/page.js`
  - `app/guides/page.js`
  - `components/pages/HomePage.js`
  - `components/pages/ToolsPage.js`
  - `components/pages/GuidesPage.js`
  - `components/seo/Breadcrumbs.js`
  - `components/navigation/PopularCityLinks.js`
  - `data/locations.js`
  - `data/tools.js`
  - `data/guides.js`
  - `data/navigation.js`
  - `lib/seo/metadata.js`
  - `tailwind.config.js`
  - `package.json`
  - `.agents/skills/ui-ux-pro-max/SKILL.md`
  - `.agents/skills/building-components/SKILL.md`
  - `/Users/iemdev/.agents/skills/copywriting/SKILL.md`
  - `.agents/skills/seo-audit/SKILL.md`
- `DEP-009` status: `Not complete`
- Shared-file impact in this pass: `TASK-005`, `TASK-006`, `TASK-008`, and `TASK-009` only. `TASK-007` and `TASK-010` remained deferred because they touch files gated by CON-007.`

### Pass 3

- Date: `2026-03-16`
- Phase scope: `Implementation Phase 3 (TASK-013 only)`
- Skills used: `executing-plans`, `content-creator`, `copywriting`
- References read before edits:
  - `plan/design-phase2-skill-governed-redesign-1.md`
  - `docs/PHASE2_REDESIGN_SPECIFICATION.md`
  - `docs/PHASE2_EXECUTION_SKILL_MATRIX.md`
  - `plan/refactor-react-next-performance-1.md`
  - `data/locations.js`
  - `components/pages/CityPage.js`
  - `app/locations/[slug]/page.js`
  - `/Users/iemdev/.codex/skills/executing-plans/SKILL.md`
  - `/Users/iemdev/.agents/skills/content-creator/SKILL.md`
  - `/Users/iemdev/.agents/skills/copywriting/SKILL.md`
- `DEP-009` status: `Not complete`
- Shared-file impact in this pass: `None. Only TASK-013 was executed because TASK-012, TASK-014, and TASK-015 remain gated by DEP-009.`

### Pass 4

- Date: `2026-03-16`
- Phase scope: `Implementation Phase 4 (TASK-016 through TASK-018)`
- Skills used: `executing-plans`, `content-creator`, `copywriting`, `seo-audit`, `ui-ux-pro-max`
- References read before edits:
  - `plan/design-phase2-skill-governed-redesign-1.md`
  - `docs/PHASE2_EXECUTION_SKILL_MATRIX.md`
  - `docs/PHASE2_REDESIGN_SPECIFICATION.md`
  - `design-system/where-is-the-sun/pages/guide-detail.md`
  - `data/guides.js`
  - `data/tools.js`
  - `data/locations.js`
  - `data/navigation.js`
  - `components/pages/GuidePage.js`
  - `components/pages/GuidesPage.js`
  - `app/guides/[slug]/page.js`
  - `app/guides/page.js`
  - `lib/seo/metadata.js`
  - `components/navigation/SiteHeader.js`
  - `components/navigation/PopularCityLinks.js`
  - `components/search/QuickCitySelector.js`
  - `/Users/iemdev/.codex/skills/executing-plans/SKILL.md`
  - `/Users/iemdev/.agents/skills/content-creator/SKILL.md`
  - `/Users/iemdev/.agents/skills/copywriting/SKILL.md`
  - `.agents/skills/seo-audit/SKILL.md`
  - `.agents/skills/ui-ux-pro-max/SKILL.md`
  - `tests/seo/metadata.test.js`
  - `tests/seo/routes.test.js`
- `DEP-009` status: `Not complete`
- Shared-file impact in this pass: `None. The pass is limited to guide content, guide-route rendering, non-blocked data models, navigation data, and matching tests.`

### Pass 5

- Date: `2026-03-16`
- Phase scope: `Implementation Phase 5 (TASK-019 through TASK-021)`
- Skills used: `executing-plans`, `seo-audit`, `building-components`
- References read before edits:
  - `plan/design-phase2-skill-governed-redesign-1.md`
  - `docs/PHASE2_EXECUTION_SKILL_MATRIX.md`
  - `docs/PHASE2_REDESIGN_SPECIFICATION.md`
  - `.agents/skills/seo-audit/SKILL.md`
  - `.agents/skills/building-components/SKILL.md`
  - `lib/seo/site.js`
  - `lib/seo/metadata.js`
  - `components/seo/Breadcrumbs.js`
  - `app/page.js`
  - `app/locations/page.js`
  - `app/locations/[slug]/page.js`
  - `app/tools/page.js`
  - `app/tools/[slug]/page.js`
  - `app/guides/page.js`
  - `app/guides/[slug]/page.js`
  - `app/sitemap.js`
  - `app/robots.js`
  - `app/not-found.js`
  - `next.config.js`
  - `lib/sun/calculateSunSnapshot.js`
  - `tests/seo/metadata.test.js`
  - `tests/seo/routes.test.js`
- `DEP-009` status: `Not complete`
- Shared-file impact in this pass: `None. The pass stayed within metadata, SEO helpers, route files, non-blocked schema UI, redirect config, and test coverage.`
- Notes:
  - `SearchAction` was intentionally omitted from the `WebSite` schema because the project does not expose a truthful tolerant search-results route for arbitrary terms.
  - The unified share asset was implemented at `public/og/share-default-1200x630.svg` as the project-approved 1200x630 Open Graph image path.
  - `pages/_document.js` was added as a minimal compatibility file because `next build` was failing on a missing legacy document module during page-data collection.

### Pass 6

- Date: `2026-03-16`
- Phase scope: `Implementation Phase 6 (TASK-022 through TASK-026)`
- Skills used: `executing-plans`, `seo-audit`, `web-design-guidelines`, `ui-ux-pro-max`
- References read before edits:
  - `plan/design-phase2-skill-governed-redesign-1.md`
  - `docs/PHASE2_EXECUTION_SKILL_MATRIX.md`
  - `docs/PHASE2_REDESIGN_SPECIFICATION.md`
  - `design-system/where-is-the-sun/MASTER.md`
  - `design-system/where-is-the-sun/pages/home.md`
  - `design-system/where-is-the-sun/pages/location-detail.md`
  - `design-system/where-is-the-sun/pages/tool-detail.md`
  - `plan/refactor-react-next-performance-1.md`
  - `.agents/skills/seo-audit/SKILL.md`
  - `.agents/skills/web-design-guidelines/SKILL.md`
  - `/Users/iemdev/.codex/skills/executing-plans/SKILL.md`
  - `scripts/verify-seo-pages.js`
  - `tests/seo/metadata.test.js`
  - `tests/seo/routes.test.js`
  - `app/sitemap.js`
  - `app/layout.js`
  - `components/pages/HomePage.js`
  - `components/pages/CityPage.js`
  - `components/pages/ToolPage.js`
- `DEP-009` status: `Not complete`
- Shared-file impact in this pass: `None. The pass stayed within verification, tests, reporting, and a non-blocked sitemap correction in app/sitemap.js.`
- Notes:
  - Fresh review guidance for `web-design-guidelines` was fetched from `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`.
  - `scripts/verify-seo-pages.js` now verifies title, meta description, canonical, single `h1`, crawlable internal links, sitemap inclusion, and route-appropriate structured-data types, including `CollectionPage` and nested `ItemList` coverage on hub pages.
  - `tests/seo/metadata.test.js` and `tests/seo/routes.test.js` now cover metadata templates, canonical generation, schema helper expectations, legacy redirects, and invalid-slug lookups.
  - The stronger verifier exposed a real sitemap omission. `app/sitemap.js` was corrected to include `/tools` and `/guides`, after which `npm run verify:seo` passed.

## Execution Summary

- Completed tasks in this pass: `TASK-022`, `TASK-023`, `TASK-024`, `TASK-025`, `TASK-026`
- Skills invoked in this pass: `executing-plans`, `seo-audit`, `web-design-guidelines`, `ui-ux-pro-max`
- Command results:
  - `npm run lint` passed
  - `npm test` passed
  - `npm run build` passed
  - `npm run verify:seo` passed after correcting `app/sitemap.js`
- Build snapshot from this pass:
  - `/`: `635 kB` first-load JS
  - `/locations/[slug]`: `635 kB` first-load JS
  - `/tools/[slug]`: `635 kB` first-load JS
- UI review findings recorded in `TASK-024`:
  - `app/layout.js` is still missing the required skip link and does not guarantee a `#main-content` target wrapper.
  - `components/pages/HomePage.js` still uses forbidden technical copy and does not match the required homepage hero hierarchy, quick-city-selector placement, or pre-interactive "Today's snapshot" block.
  - `components/pages/CityPage.js` is still missing the required "On this page" navigation, user-facing lead-in structure before the interactive section, and the post-interactive long-form daylight content block.
  - `components/pages/ToolPage.js` is still missing the required "On this page" navigation, "How to use this tool" section, and the expected representative-city and guide-CTA structure.
  - `components/pages/CityPage.js` and `components/pages/ToolPage.js` still contain forbidden technical framing, and neither page shows the required loading-skeleton wiring described in section `8.4`.
- Unresolved gaps after this pass:
  - `TASK-007`, `TASK-010`, `TASK-011`, `TASK-012`, `TASK-014`, and `TASK-015` remain open in the redesign plan.
  - `DEP-009` is still not complete, so blocked shared-file redesign work remains deferred unless it is delivered in one coordinated branch with the performance plan.
- Redirect mappings added in this pass: `None`
- Follow-up page-level override files still needed: `None. The expected override files already exist under design-system/where-is-the-sun/pages.`

## Skill Matrix

| Task category | Required skill(s) | Mandatory references | Target files | Output expectations | DEP-009 coordination |
|---|---|---|---|---|---|
| Execution protocol and plan governance | `create-implementation-plan` | `plan/design-phase2-skill-governed-redesign-1.md`, `plan/refactor-react-next-performance-1.md` | `docs/PHASE2_EXECUTION_SKILL_MATRIX.md`, `plan/design-phase2-skill-governed-redesign-1.md` | Persist the execution protocol, execution-pass logging rules, and task completion tracking in repository files. | Record whether shared-file work is blocked before any implementation pass begins. |
| Design-system alignment | `ui-ux-pro-max` | `docs/PHASE2_REDESIGN_SPECIFICATION.md`, `design-system/where-is-the-sun/MASTER.md` | `design-system/where-is-the-sun/MASTER.md`, `design-system/where-is-the-sun/pages/*.md` | Align master tokens and reusable interaction rules to sections `3.2` through `3.6`, then document route-specific deviations only. | Not blocked for Phase 1 docs. Any later code changes that consume the system must honor shared-file constraints. |
| Homepage and hub UI | `ui-ux-pro-max`, `copywriting` | `docs/PHASE2_REDESIGN_SPECIFICATION.md`, `design-system/where-is-the-sun/MASTER.md`, `design-system/where-is-the-sun/pages/home.md`, `design-system/where-is-the-sun/pages/locations.md`, `design-system/where-is-the-sun/pages/tools.md`, `design-system/where-is-the-sun/pages/guides.md`, `plan/refactor-react-next-performance-1.md` | `components/pages/HomePage.js`, `components/pages/LocationsPage.js`, `components/pages/ToolsPage.js`, `components/pages/GuidesPage.js`, `app/page.js`, `app/locations/page.js`, `app/tools/page.js`, `app/guides/page.js` | Deliver top-level information architecture, route-entry copy, hierarchy, and page sections that match the redesign spec and preserve one visible `h1`. | Homepage work touching `components/pages/HomePage.js` must wait for `DEP-009` or ship in a coordinated branch. Hub pages that avoid shared interactive files may proceed independently. |
| Reusable components | `building-components`, `ui-ux-pro-max` | `docs/PHASE2_REDESIGN_SPECIFICATION.md`, `design-system/where-is-the-sun/MASTER.md`, relevant page override file, `plan/refactor-react-next-performance-1.md` | `components/search/QuickCitySelector.js`, `components/content/OnThisPageNav.js`, `components/content/InteractiveLoadingSkeleton.js`, navigation and shared UI helpers | Build accessible, reusable UI primitives with keyboard support, visible labels, responsive behavior, and loading/focus states that match the design system. | Any shared component wired into `components/client/**`, `app/layout.js`, or `src/stores/**` must check `DEP-009` first. |
| City content | `content-creator`, `copywriting` | `docs/PHASE2_REDESIGN_SPECIFICATION.md`, `design-system/where-is-the-sun/pages/location-detail.md`, `data/locations.js` | `data/locations.js`, `components/pages/CityPage.js` | Add unique `200-300` word city narratives plus key sun facts and supporting contextual copy for each city page. | `data/locations.js` can proceed independently. `components/pages/CityPage.js` is blocked by `DEP-009`. |
| Guide content | `content-creator`, `copywriting` | `docs/PHASE2_REDESIGN_SPECIFICATION.md`, `design-system/where-is-the-sun/pages/guide-detail.md`, `data/guides.js` | `data/guides.js`, `components/pages/GuidePage.js`, `components/pages/GuidesPage.js` | Expand guide sections, reading-time cues, CTA language, and related-guide copy to match the guide-page redesign. | No `DEP-009` block unless the pass also edits shared interactive files. |
| Metadata and indexing | `seo-audit` | `docs/PHASE2_REDESIGN_SPECIFICATION.md`, `plan/refactor-react-next-performance-1.md`, `lib/seo/site.js`, `lib/seo/metadata.js`, `lib/seo/schema.js` | `app/**/*.js`, `lib/seo/*.js`, `app/sitemap.js`, `app/robots.js`, `tests/seo/*.test.js`, `scripts/verify-seo-pages.js`, `public/og/share-default-1200x630.png` | Keep canonical metadata, Open Graph, Twitter, schema, sitemap, and robots output aligned with visible page purpose and canonical routes. | Shared-file status must still be logged for passes that combine SEO work with blocked UI files. |
| Redirect governance | `seo-audit` | `docs/PHASE2_REDESIGN_SPECIFICATION.md`, `next.config.js`, `tests/seo/routes.test.js` | `next.config.js`, route tests, route helpers | Add deterministic `301` redirects for renamed or historical slugs and preserve real `404` behavior for invalid slugs. | Not blocked by `DEP-009` unless combined with shared route-entry redesign work. |
| Final UI review | `web-design-guidelines` | `docs/PHASE2_REDESIGN_SPECIFICATION.md`, `design-system/where-is-the-sun/MASTER.md`, all relevant page overrides, `plan/refactor-react-next-performance-1.md` | Review target routes and shared UI files already changed in Phase 2 through Phase 6 | Confirm accessibility, focus states, skip-link behavior, responsive layouts, contrast, and override compliance before Phase 3 detail-page work continues. | Review must explicitly confirm whether all blocked shared-file work started after `DEP-009` completion or in a coordinated branch. |
