---
goal: Implement the Phase 2 redesign specification with explicit skill routing, corrected design-system authority, and sequenced coordination with the shared performance refactor
version: 2
date_created: 2026-03-16
last_updated: 2026-03-16
owner: Codex
status: In progress
tags: [design, seo, content, ui, architecture, skill-governance]
---

# Introduction

![Status: In_progress](https://img.shields.io/badge/status-In_progress-yellow)

This plan operationalizes `docs/PHASE2_REDESIGN_SPECIFICATION.md` while treating skill usage as a first-class execution dependency. It also corrects two blocking plan defects in version 1: the redesign spec's visual system currently conflicts with `design-system/where-is-the-sun/MASTER.md`, and several redesign tasks overlap files owned by `plan/refactor-react-next-performance-1.md`. Execution must reconcile the master design system first, then sequence any shared-file work so correctness and performance fixes are not overwritten by redesign changes.

## 1. Requirements & Constraints

- **REQ-001**: The redesign implementation must use [docs/PHASE2_REDESIGN_SPECIFICATION.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_REDESIGN_SPECIFICATION.md) as the primary product, SEO, navigation, content, and visual specification.
- **REQ-002**: Until TASK-002 is completed, section 3.2 through section 3.6 of [docs/PHASE2_REDESIGN_SPECIFICATION.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_REDESIGN_SPECIFICATION.md) is the authoritative visual source for colors, typography, spacing, radius, shadows, and component tokens because the current [design-system/where-is-the-sun/MASTER.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/design-system/where-is-the-sun/MASTER.md) is stale.
- **REQ-003**: TASK-002 must update [design-system/where-is-the-sun/MASTER.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/design-system/where-is-the-sun/MASTER.md) to match the redesign spec before page-level override files or production UI code are created.
- **REQ-004**: After TASK-002 is completed, the aligned [design-system/where-is-the-sun/MASTER.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/design-system/where-is-the-sun/MASTER.md) becomes the repository-level UI source of truth, and page-level overrides supersede it only for documented route-specific deviations.
- **REQ-005**: Before editing any page, the executor must check whether a matching override exists in [design-system/where-is-the-sun/pages](/Users/iemdev/Documents/Development/work/projects/sunshine_project/design-system/where-is-the-sun/pages). If an override exists, it supersedes the master file for that page.
- **REQ-006**: Every execution task in this plan must state the required skill or skills in the implementation notes before file edits begin. Execution is incomplete if the skill reference is omitted.
- **REQ-007**: UI structure, layout, visual hierarchy, spacing, navigation, and interaction changes must use the `ui-ux-pro-max` skill.
- **REQ-008**: New or refactored reusable UI building blocks must use the `building-components` skill.
- **REQ-009**: Homepage, hub-page, CTA, and conversion-oriented copy changes must use the `copywriting` skill.
- **REQ-010**: Long-form guide content creation and city-content authoring must use the `content-creator` skill where the plan explicitly requires it.
- **REQ-011**: Metadata, canonical, internal linking, indexing, sitemap, robots, redirect, and structured-data work must use the `seo-audit` skill.
- **REQ-012**: Final accessibility and interface compliance review must use the `web-design-guidelines` skill.
- **REQ-013**: The execution artifacts must make the required skills discoverable from inside the repository, not only from chat history.
- **REQ-014**: All redesigned routes must preserve valid server-rendered metadata, one visible `h1`, crawlable internal links, and real `404` handling.
- **REQ-015**: [app/globals.css](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/globals.css) must implement the redesign spec's CSS custom properties for color, spacing, radius, and shadow tokens from sections 3.2 through 3.5.
- **REQ-016**: The homepage hero must include a quick city selector that links users to city pages and reflects section 4.1 of the redesign spec.
- **REQ-017**: Each city page must include 200-300 words of unique city-specific content plus key sun facts, matching section 7.3 of the redesign spec.
- **REQ-018**: Location entry points must expose a one-click geolocation button wherever location selection or discovery is offered, matching the note in section 2.2 of the redesign spec.
- **REQ-019**: `/locations`, `/tools`, and `/guides` must emit `CollectionPage` or `ItemList` JSON-LD that reflects their visible content, matching section 6.3 of the redesign spec.
- **REQ-020**: Historical or renamed slugs must redirect with `301` to the new canonical URL, matching rule 5 in section 2.6 of the redesign spec.
- **REQ-021**: Long city and tool pages must include an "On this page" anchor navigation block before the main interactive section, matching section 5.3 of the redesign spec.
- **REQ-022**: Loading states for the 3D simulator and yearly chart must follow the skeleton designs in section 8.4 of the redesign spec.
- **REQ-023**: [app/layout.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/layout.js) must include a skip link targeting `#main-content`, and the primary page wrapper must expose that `id`, matching section 6.4 of the redesign spec.
- **REQ-024**: Phase 2 page-entry work must pass an explicit design-system review gate before Phase 3 detail-page work begins.
- **REQ-025**: The metadata implementation must include a real unified Open Graph share image asset at 1200x630 for formal indexable pages, matching section 2.7 of the redesign spec.
- **CON-001**: Use the project-scoped design-system path `design-system/where-is-the-sun/**`, not the generic example path `design-system/MASTER.md` shown in the upstream skill docs.
- **CON-002**: Do not remove or silently bypass the existing preserved interactive experience in `src/components/**`; redesign work must wrap, reposition, or clarify it unless a task explicitly calls for deeper refactoring.
- **CON-003**: Do not create indexable parameter-based route variants for UI state such as `date`, `time`, `view`, `mode`, `compare`, `lat`, or `lng`.
- **CON-004**: Do not ship technical phrases such as "preserved source of truth", "crawlable HTML", or similar implementation-language into user-facing copy.
- **CON-005**: Do not create page-specific visual rules ad hoc inside JSX without first updating the relevant design-system file when the deviation is intentional and reusable.
- **CON-006**: Implementation Phase 2 through Phase 6 must not begin until all Phase 1 tasks are marked complete.
- **CON-007**: Any redesign task touching [components/pages/HomePage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/HomePage.js), [components/pages/CityPage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/CityPage.js), [components/pages/ToolPage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/ToolPage.js), [components/client/InteractiveSunExperience.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/client/InteractiveSunExperience.js), [components/client/SunExperience.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/client/SunExperience.js), [app/layout.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/layout.js), or `src/stores/**` must wait for DEP-009 to complete or must be executed in a single coordinated branch that preserves both plans' outcomes.
- **SEC-001**: Canonical, Open Graph, Twitter, and structured-data URLs must always use the production canonical domain and must match the visible page purpose.
- **GUD-001**: When a task spans multiple concerns, the executor must use the minimal skill set that covers the task, but the skill requirement cannot be dropped for convenience.
- **GUD-002**: Page-level work should be implemented from information architecture first, then copy, then reusable component structure, then metadata and schema, then verification.
- **GUD-003**: If a task requires a new page-specific design exception, create an override file in `design-system/where-is-the-sun/pages/` before coding the exception.
- **GUD-004**: Phase 2 should establish shared tokens, navigation semantics, and top-level page-entry patterns before city and tool detail pages are redesigned.
- **PAT-001**: Skill routing is part of the implementation contract. Treat each required skill as an execution dependency similar to a library or specification document.
- **PAT-002**: The repository must contain a persistent skill matrix document that maps task categories to required skills, source documents, and target files.
- **PAT-003**: Shared interactive loading states and anchor navigation should be abstracted into reusable components instead of duplicated across route files.

## 2. Implementation Steps

### Implementation Phase 1

- **GOAL-001**: Persist skill routing, reconcile the repository design system with the redesign spec, and establish non-negotiable execution rules before any page implementation starts.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-001 | Create [docs/PHASE2_EXECUTION_SKILL_MATRIX.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_EXECUTION_SKILL_MATRIX.md) with a deterministic matrix: task category, required skill(s), mandatory references, target files, and output expectations. Seed it with at least these rows: design-system alignment, homepage and hub UI, reusable components, city content, guide content, metadata/indexing, redirect governance, and final UI review. Required skills: `ui-ux-pro-max`, `building-components`, `copywriting`, `content-creator`, `seo-audit`, `web-design-guidelines`. Required references: [docs/PHASE2_REDESIGN_SPECIFICATION.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_REDESIGN_SPECIFICATION.md), [design-system/where-is-the-sun/MASTER.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/design-system/where-is-the-sun/MASTER.md), and [plan/refactor-react-next-performance-1.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/plan/refactor-react-next-performance-1.md). | ✅ | 2026-03-16 |
| TASK-002 | Update [design-system/where-is-the-sun/MASTER.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/design-system/where-is-the-sun/MASTER.md) so it matches section 3.2 through section 3.6 of [docs/PHASE2_REDESIGN_SPECIFICATION.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_REDESIGN_SPECIFICATION.md). Replace the stale blue-plus-orange palette with the deep-amber plus sky-blue system, replace Atkinson Hyperlegible with the existing Geist font system, and align spacing, radius, shadow, button, card, input, and interaction guidance with the redesign spec. Required skill: `ui-ux-pro-max`. This task must complete before TASK-003 and TASK-005 through TASK-015. | ✅ | 2026-03-16 |
| TASK-003 | Create page-level design-system overrides in [design-system/where-is-the-sun/pages](/Users/iemdev/Documents/Development/work/projects/sunshine_project/design-system/where-is-the-sun/pages) for `home.md`, `locations.md`, `location-detail.md`, `tools.md`, `tool-detail.md`, `guides.md`, and `guide-detail.md`. Each file must describe only the page-specific deviations from the aligned master file and must explicitly reference the relevant sections of [docs/PHASE2_REDESIGN_SPECIFICATION.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_REDESIGN_SPECIFICATION.md). Required skill: `ui-ux-pro-max`. | ✅ | 2026-03-16 |
| TASK-004 | Add a short "Execution Protocol" section near the top of this plan file or in [docs/PHASE2_EXECUTION_SKILL_MATRIX.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_EXECUTION_SKILL_MATRIX.md) stating that every execution pass must announce which required skill is being used, list the exact local references read before code changes, and state whether DEP-009 is already complete for any shared-file task. Required skill: `create-implementation-plan`. | ✅ | 2026-03-16 |

### Implementation Phase 2

- **GOAL-002**: After Phase 1 is complete, align global tokens, navigation semantics, homepage entry patterns, and hub pages with the redesign spec while respecting DEP-009 on shared files.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-005 | Update [app/globals.css](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/globals.css) so the global CSS variables match the aligned [design-system/where-is-the-sun/MASTER.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/design-system/where-is-the-sun/MASTER.md) and sections 3.2 through 3.5 of [docs/PHASE2_REDESIGN_SPECIFICATION.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_REDESIGN_SPECIFICATION.md). Implement the redesign token system for color, spacing, radius, shadow, and focus-ring styling rather than page-local overrides. Required skills: `ui-ux-pro-max`, `building-components`. | ✅ | 2026-03-16 |
| TASK-006 | Create [components/search/QuickCitySelector.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/search/QuickCitySelector.js) as a reusable homepage hero control for searching or selecting a city and linking to its canonical city page. The component must support keyboard navigation, visible labels, and popular-city affordances that match section 4.1 of the redesign spec. Required skills: `building-components`, `ui-ux-pro-max`. Integration into shared files must respect DEP-009. | ✅ | 2026-03-16 |
| TASK-007 | Redesign [components/pages/HomePage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/HomePage.js) and verify [app/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/page.js) metadata still matches the new homepage intent. Follow the homepage structure in section 4.1 of [docs/PHASE2_REDESIGN_SPECIFICATION.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_REDESIGN_SPECIFICATION.md), integrate [components/search/QuickCitySelector.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/search/QuickCitySelector.js), and use the aligned master file plus the `home.md` override. Required skills: `ui-ux-pro-max`, `copywriting`. This task is blocked by DEP-009 because it touches a shared file. |  |  |
| TASK-008 | Extract a reusable locations hub page component at [components/pages/LocationsPage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/LocationsPage.js) and update [app/locations/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/locations/page.js) to use it. The redesigned page must follow the locations hub intent in the redesign spec, reference the `locations.md` design override, and include a one-click geolocation button plus clear route-entry copy. Required skills: `ui-ux-pro-max`, `copywriting`, `building-components`. | ✅ | 2026-03-16 |
| TASK-009 | Update [components/pages/ToolsPage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/ToolsPage.js), [components/pages/GuidesPage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/GuidesPage.js), [app/tools/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/tools/page.js), and [app/guides/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/guides/page.js) so both hub pages reflect the redesign spec's hierarchy, CTA wording, internal-linking model, and visible list semantics needed for later `CollectionPage` or `ItemList` schema. Required skills: `ui-ux-pro-max`, `copywriting`, `seo-audit`. | ✅ | 2026-03-16 |
| TASK-010 | Refactor [components/navigation/SiteHeader.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/navigation/SiteHeader.js), [components/navigation/PopularCityLinks.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/navigation/PopularCityLinks.js), [src/components/Footer.jsx](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/Footer.jsx), and [app/layout.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/layout.js) to match the navigation and footer system in section 5 of the redesign spec. This task must also implement the skip link from section 6.4 and ensure the main wrapper exposes `id="main-content"`. Required skills: `ui-ux-pro-max`, `building-components`, `copywriting`. This task is blocked by DEP-009 because it touches a shared file. |  |  |
| TASK-011 | Perform an explicit Phase 2 review gate covering [components/pages/HomePage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/HomePage.js), [components/pages/LocationsPage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/LocationsPage.js), [components/pages/ToolsPage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/ToolsPage.js), [components/pages/GuidesPage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/GuidesPage.js), [app/globals.css](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/globals.css), and [app/layout.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/layout.js) against the aligned master file, page overrides, and sections 3 through 6 of the redesign spec. Phase 3 must not start until this review is marked complete. Required skills: `web-design-guidelines`, `ui-ux-pro-max`. |  |  |

### Implementation Phase 3

- **GOAL-003**: Redesign city and tool detail routes so they answer user intent first, integrate the preserved interactive modules naturally, and stay sequenced behind the shared performance refactor.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-012 | Update [components/pages/CityPage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/CityPage.js) and [app/locations/[slug]/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/locations/[slug]/page.js) to implement the city-page order defined in section 4.2 of the redesign spec: concise current-state summary, data-first hero, "On this page" anchor navigation, visual solar expression, interaction controls, yearly context, and contextual explanation. This task must also expose a one-click geolocation button where city-location controls are offered. Required skills: `ui-ux-pro-max`, `copywriting`, `seo-audit`, `building-components`. Required references: the aligned master file and `design-system/where-is-the-sun/pages/location-detail.md`. This task must not be marked complete until TASK-013 has produced the required city-content fields in [data/locations.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/data/locations.js), or both tasks are delivered in the same coordinated changeset. This task is blocked by DEP-009 because it touches a shared file. |  |  |
| TASK-013 | Write 200-300 words of unique descriptive content for all 12 city pages following the template in section 7.3 of [docs/PHASE2_REDESIGN_SPECIFICATION.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_REDESIGN_SPECIFICATION.md), and add the resulting content plus structured key-fact data to [data/locations.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/data/locations.js). Required skills: `content-creator`, `copywriting`. TASK-013 must complete before TASK-012 is marked complete unless both tasks are implemented in the same coordinated changeset. |  |  |
| TASK-014 | Update [components/pages/ToolPage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/ToolPage.js), [app/tools/[slug]/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/tools/[slug]/page.js), and shared support blocks needed for "How to use this tool", paired guide CTA, representative-city linking, and "On this page" anchor navigation. Required skills: `ui-ux-pro-max`, `copywriting`, `seo-audit`, `building-components`. Required references: `design-system/where-is-the-sun/pages/tool-detail.md` and the tool-page redesign section of the spec. This task is blocked by DEP-009 because it touches a shared file. |  |  |
| TASK-015 | Create [components/content/OnThisPageNav.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/content/OnThisPageNav.js) and [components/content/InteractiveLoadingSkeleton.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/content/InteractiveLoadingSkeleton.js), then wire them into [components/pages/CityPage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/CityPage.js), [components/pages/ToolPage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/ToolPage.js), [components/client/SunExperience.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/client/SunExperience.js), and [components/client/InteractiveSunExperience.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/client/InteractiveSunExperience.js) as needed. The anchor navigation must match section 5.3 and the simulator/chart loading states must match section 8.4 of the redesign spec. Required skills: `building-components`, `ui-ux-pro-max`. This task is blocked by DEP-009 because it touches shared files that the performance plan also modifies. |  |  |

### Implementation Phase 4

- **GOAL-004**: Expand guide content depth and supporting data models so the content strategy in the redesign spec becomes executable, crawlable, and internally linked.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-016 | Expand [data/guides.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/data/guides.js) to include the new guide entries defined in section 2 and phase 2d of [docs/PHASE2_REDESIGN_SPECIFICATION.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_REDESIGN_SPECIFICATION.md): `how-sunrise-sunset-calculated`, `sun-angle-photography-golden-hour`, `daylight-hours-by-latitude`, `solar-noon-vs-clock-noon`, and `best-times-outdoor-activities`. Each entry must include slug, title, H1, description, section outline, related tool, related cities, and metadata text. Required skills: `content-creator`, `copywriting`, `seo-audit`. |  |  |
| TASK-017 | Redesign [components/pages/GuidePage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/GuidePage.js) and [app/guides/[slug]/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/guides/[slug]/page.js) to support 3-5 section educational content, "See it in action" CTA, related guides, and city examples. Required skills: `content-creator`, `copywriting`, `ui-ux-pro-max`, `seo-audit`. Required references: `design-system/where-is-the-sun/pages/guide-detail.md` and the guide-page redesign section of the spec. |  |  |
| TASK-018 | Update [data/tools.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/data/tools.js), [data/locations.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/data/locations.js), and [data/navigation.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/data/navigation.js) so tool-city-guide relationships are explicit and can drive deterministic internal linking, homepage quick-city options, navigation menus, anchor labels, and CTA targets. Required skills: `seo-audit`, `copywriting`. |  |  |

### Implementation Phase 5

- **GOAL-005**: Enforce metadata, internal-linking, canonical, robots, redirect, sitemap, and structured-data rules from the redesign specification.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-019 | Update [lib/seo/metadata.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/lib/seo/metadata.js), [lib/seo/site.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/lib/seo/site.js), [app/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/page.js), [app/locations/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/locations/page.js), [app/locations/[slug]/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/locations/[slug]/page.js), [app/tools/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/tools/page.js), [app/tools/[slug]/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/tools/[slug]/page.js), [app/guides/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/guides/page.js), and [app/guides/[slug]/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/guides/[slug]/page.js) so title, description, canonical, OG, and Twitter metadata follow section 2 of the redesign spec. This task must also provide and reference a real unified 1200x630 Open Graph share image asset, such as [public/og/share-default-1200x630.png](/Users/iemdev/Documents/Development/work/projects/sunshine_project/public/og/share-default-1200x630.png), or document a project-approved equivalent path. Required skill: `seo-audit`. |  |  |
| TASK-020 | Implement JSON-LD generation for `BreadcrumbList`, `WebSite`, `WebApplication`, `Article`, and `CollectionPage` or `ItemList` as applicable by creating or updating [components/seo/Breadcrumbs.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/seo/Breadcrumbs.js) plus [lib/seo/schema.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/lib/seo/schema.js). Match the schema rules in section 6.3 of [docs/PHASE2_REDESIGN_SPECIFICATION.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_REDESIGN_SPECIFICATION.md). Required skills: `seo-audit`, `building-components`. |  |  |
| TASK-021 | Update [app/sitemap.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/sitemap.js), [app/robots.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/robots.js), [app/not-found.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/not-found.js), and [next.config.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/next.config.js) so sitemap inclusion, robots references, canonical governance, invalid-slug behavior, and `301` redirect handling for legacy or renamed slugs conform to section 2.6 and section 9.1 of the redesign spec. Required skill: `seo-audit`. |  |  |

### Implementation Phase 6

- **GOAL-006**: Verify that execution followed the required skill routing and that the redesign meets UI, SEO, content, accessibility, and routing acceptance criteria.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-022 | Extend [scripts/verify-seo-pages.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/scripts/verify-seo-pages.js) so it checks page title, description, canonical, one visible `h1`, crawlable internal links, sitemap eligibility, presence of page-appropriate structured data, and `CollectionPage` or `ItemList` schema on hub pages. Required skill: `seo-audit`. |  |  |
| TASK-023 | Update [tests/seo/metadata.test.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/tests/seo/metadata.test.js) and [tests/seo/routes.test.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/tests/seo/routes.test.js) to cover new guides, metadata templates, canonical rules, legacy-slug redirects, structured-data expectations, and invalid-slug handling. Required skill: `seo-audit`. |  |  |
| TASK-024 | Perform a final UI review against the aligned [design-system/where-is-the-sun/MASTER.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/design-system/where-is-the-sun/MASTER.md), all relevant page overrides, [docs/PHASE2_EXECUTION_SKILL_MATRIX.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_EXECUTION_SKILL_MATRIX.md), and the redesign spec. Verify contrast, focus states, skip link behavior, responsive breakpoints, anchor navigation presence, loading skeleton fidelity, consistent icon usage, and absence of forbidden technical copy. Required skills: `web-design-guidelines`, `ui-ux-pro-max`. |  |  |
| TASK-025 | Run `npm run lint`, `npm test`, `npm run build`, and `npm run verify:seo`. Record in the execution notes which skills were used for the implementation pass, which source files were consulted before the final changes, and whether DEP-009 had already completed when shared-file work began. Required skills: `seo-audit`, `web-design-guidelines`. |  |  |
| TASK-026 | Append an execution summary to [docs/PHASE2_EXECUTION_SKILL_MATRIX.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_EXECUTION_SKILL_MATRIX.md) listing completed tasks, skills invoked, references consulted, unresolved gaps, redirect mappings added, and any follow-up pages that still need page-level override files. Required skill: process compliance with this plan. |  |  |

## 3. Alternatives

- **ALT-001**: Keep skill usage implicit in chat instructions and rely on the executor to remember which skill applies. Rejected because execution sessions can drift and omit critical references.
- **ALT-002**: Put skill guidance only in `AGENTS.md`. Rejected because plan-driven execution can happen later with the plan file as the primary artifact.
- **ALT-003**: Use only one broad UI skill for all redesign work. Rejected because content, metadata, reusable component design, and final review have distinct quality gates.
- **ALT-004**: Implement the redesign without page-level design-system override files. Rejected because the project already adopted a master-plus-overrides pattern and some route types need explicit deviations.
- **ALT-005**: Leave [design-system/where-is-the-sun/MASTER.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/design-system/where-is-the-sun/MASTER.md) stale and rely on page-level overrides to carry the redesign. Rejected because it leaves REQ-004 inconsistent and causes later executors to use the wrong color and font system.
- **ALT-006**: Execute this redesign plan in parallel with [plan/refactor-react-next-performance-1.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/plan/refactor-react-next-performance-1.md) on overlapping files without explicit sequencing. Rejected because shared files and loading-boundary changes can easily overwrite correctness fixes or stale assumptions from the performance plan.

## 4. Dependencies

- **DEP-001**: [docs/PHASE2_REDESIGN_SPECIFICATION.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_REDESIGN_SPECIFICATION.md) - primary redesign, SEO, navigation, content, accessibility, and visual specification.
- **DEP-002**: [design-system/where-is-the-sun/MASTER.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/design-system/where-is-the-sun/MASTER.md) - repository-level design system that must be aligned with the redesign spec before downstream UI work starts.
- **DEP-003**: [ui-ux-pro-max skill](/Users/iemdev/Documents/Development/work/projects/sunshine_project/.agents/skills/ui-ux-pro-max/SKILL.md) - required for UI structure and visual decisions.
- **DEP-004**: [building-components skill](/Users/iemdev/Documents/Development/work/projects/sunshine_project/.agents/skills/building-components/SKILL.md) - required for reusable component design and token-consistent abstractions.
- **DEP-005**: [seo-audit skill](/Users/iemdev/Documents/Development/work/projects/sunshine_project/.agents/skills/seo-audit/SKILL.md) - required for metadata, internal links, sitemap, redirects, robots, and indexing governance.
- **DEP-006**: [copywriting skill](/Users/iemdev/.agents/skills/copywriting/SKILL.md) - required for homepage, hub, CTA, and route-entry copy.
- **DEP-007**: [content-creator skill](/Users/iemdev/.agents/skills/content-creator/SKILL.md) - required for long-form guide content and city-content expansion.
- **DEP-008**: [web-design-guidelines skill](/Users/iemdev/Documents/Development/work/projects/sunshine_project/.agents/skills/web-design-guidelines/SKILL.md) - required for design and accessibility compliance review.
- **DEP-009**: [plan/refactor-react-next-performance-1.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/plan/refactor-react-next-performance-1.md) - the performance and correctness refactor that must complete before redesign tasks modify shared interactive files, or the two plans must be executed in one explicitly coordinated branch.

## 5. Files

- **FILE-001**: [plan/design-phase2-skill-governed-redesign-1.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/plan/design-phase2-skill-governed-redesign-1.md) - active execution plan for the Phase 2 redesign with explicit skill routing and sequencing rules.
- **FILE-002**: [docs/PHASE2_REDESIGN_SPECIFICATION.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_REDESIGN_SPECIFICATION.md) - redesign source specification.
- **FILE-003**: [docs/PHASE2_EXECUTION_SKILL_MATRIX.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_EXECUTION_SKILL_MATRIX.md) - persistent repository-level skill routing and execution log.
- **FILE-004**: [design-system/where-is-the-sun/MASTER.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/design-system/where-is-the-sun/MASTER.md) - global design rules that must be aligned to the redesign spec before overrides and UI code.
- **FILE-005**: [design-system/where-is-the-sun/pages](/Users/iemdev/Documents/Development/work/projects/sunshine_project/design-system/where-is-the-sun/pages) - page-specific design overrides.
- **FILE-006**: [app/globals.css](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/globals.css) - global design token implementation target.
- **FILE-007**: [app/layout.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/layout.js) - global layout, skip-link, and main-content semantics target.
- **FILE-008**: [components/search/QuickCitySelector.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/search/QuickCitySelector.js) - planned homepage city-selector component.
- **FILE-009**: [components/pages/HomePage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/HomePage.js) - homepage implementation target.
- **FILE-010**: [components/pages/LocationsPage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/LocationsPage.js) - planned locations hub component.
- **FILE-011**: [components/pages/ToolsPage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/ToolsPage.js) - tools hub implementation target.
- **FILE-012**: [components/pages/GuidesPage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/GuidesPage.js) - guides hub implementation target.
- **FILE-013**: [components/pages/CityPage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/CityPage.js) - city detail template.
- **FILE-014**: [components/pages/ToolPage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/ToolPage.js) - tool detail template.
- **FILE-015**: [components/pages/GuidePage.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/GuidePage.js) - guide detail template.
- **FILE-016**: [components/content/OnThisPageNav.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/content/OnThisPageNav.js) - planned anchor-navigation component.
- **FILE-017**: [components/content/InteractiveLoadingSkeleton.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/content/InteractiveLoadingSkeleton.js) - planned simulator and chart loading-state component.
- **FILE-018**: [components/client/SunExperience.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/client/SunExperience.js) - preserved interactive boundary that may consume shared redesign loading UI.
- **FILE-019**: [components/client/InteractiveSunExperience.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/client/InteractiveSunExperience.js) - shared interactive composition boundary that overlaps with DEP-009.
- **FILE-020**: [components/navigation/SiteHeader.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/navigation/SiteHeader.js) - primary navigation target.
- **FILE-021**: [components/navigation/PopularCityLinks.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/navigation/PopularCityLinks.js) - internal-linking module.
- **FILE-022**: [src/components/Footer.jsx](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/Footer.jsx) - footer implementation target.
- **FILE-023**: [components/seo/Breadcrumbs.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/seo/Breadcrumbs.js) - breadcrumb UI and schema source.
- **FILE-024**: [app/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/page.js) - homepage metadata route.
- **FILE-025**: [app/locations/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/locations/page.js) - locations hub route.
- **FILE-026**: [app/locations/[slug]/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/locations/[slug]/page.js) - city route.
- **FILE-027**: [app/tools/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/tools/page.js) - tools hub route.
- **FILE-028**: [app/tools/[slug]/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/tools/[slug]/page.js) - tool route.
- **FILE-029**: [app/guides/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/guides/page.js) - guides hub route.
- **FILE-030**: [app/guides/[slug]/page.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/guides/[slug]/page.js) - guide route.
- **FILE-031**: [app/sitemap.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/sitemap.js) - sitemap target.
- **FILE-032**: [app/robots.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/robots.js) - robots target.
- **FILE-033**: [app/not-found.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/not-found.js) - invalid-route handling target.
- **FILE-034**: [next.config.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/next.config.js) - redirect configuration target.
- **FILE-035**: [data/guides.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/data/guides.js) - guide-content model.
- **FILE-036**: [data/tools.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/data/tools.js) - tool-content model.
- **FILE-037**: [data/locations.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/data/locations.js) - city-content and city-facts model.
- **FILE-038**: [data/navigation.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/data/navigation.js) - navigation-data model.
- **FILE-039**: [lib/seo/metadata.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/lib/seo/metadata.js) - metadata builder.
- **FILE-040**: [lib/seo/site.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/lib/seo/site.js) - canonical-domain and site constants.
- **FILE-041**: [lib/seo/schema.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/lib/seo/schema.js) - structured-data helper.
- **FILE-042**: [scripts/verify-seo-pages.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/scripts/verify-seo-pages.js) - verification script.
- **FILE-043**: [tests/seo/metadata.test.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/tests/seo/metadata.test.js) - metadata test coverage.
- **FILE-044**: [tests/seo/routes.test.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/tests/seo/routes.test.js) - route, redirect, and canonical test coverage.
- **FILE-045**: [public/og/share-default-1200x630.png](/Users/iemdev/Documents/Development/work/projects/sunshine_project/public/og/share-default-1200x630.png) - planned unified Open Graph share image asset for default metadata output.

## 6. Testing

- **TEST-001**: Repository contains [docs/PHASE2_EXECUTION_SKILL_MATRIX.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_EXECUTION_SKILL_MATRIX.md) with task-category-to-skill mappings, mandatory references, and DEP-009 coordination notes.
- **TEST-002**: [design-system/where-is-the-sun/MASTER.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/design-system/where-is-the-sun/MASTER.md) matches section 3.2 through section 3.6 of [docs/PHASE2_REDESIGN_SPECIFICATION.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_REDESIGN_SPECIFICATION.md) before any page-level override or UI task is marked complete.
- **TEST-003**: Repository contains page-specific design overrides for all major route families under [design-system/where-is-the-sun/pages](/Users/iemdev/Documents/Development/work/projects/sunshine_project/design-system/where-is-the-sun/pages).
- **TEST-004**: [app/globals.css](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/globals.css) implements the redesign token system for color, spacing, radius, shadow, and focus ring rather than relying on page-local ad hoc values.
- **TEST-005**: The homepage hero includes a usable quick city selector and the "Today's snapshot" section appears before the interactive simulator.
- **TEST-006**: The locations hub and city pages provide a one-click geolocation button wherever location discovery or selection is offered.
- **TEST-007**: [data/locations.js](/Users/iemdev/Documents/Development/work/projects/sunshine_project/data/locations.js) contains unique 200-300 word descriptive content and key sun facts for all 12 cities.
- **TEST-008**: City and tool pages include an "On this page" anchor navigation block and loading skeletons for the 3D simulator and chart that reflect section 8.4 of the redesign spec.
- **TEST-009**: `/locations`, `/tools`, and `/guides` output `CollectionPage` or `ItemList` JSON-LD consistent with visible hub-page content.
- **TEST-010**: Legacy or renamed slugs return `301` redirects to canonical URLs and invalid slugs still return real `404` responses.
- **TEST-011**: `npm run lint` passes after redesign implementation.
- **TEST-012**: `npm test` passes with coverage for metadata, canonical rules, structured data, redirects, route generation, and invalid-slug behavior.
- **TEST-013**: `npm run build` succeeds and preserves valid Next.js route generation.
- **TEST-014**: `npm run verify:seo` confirms one visible `h1`, canonical, metadata, crawlable links, sitemap eligibility, and page-appropriate structured data across target routes.
- **TEST-015**: Manual UI review confirms the homepage, one city page, one tool page, and one guide page all follow the aligned master design system plus the relevant page override file.
- **TEST-016**: Manual accessibility review confirms visible focus states, skip-link behavior, adequate contrast, `prefers-reduced-motion` support, responsive layout behavior at 375px, 768px, 1024px, and 1440px, and no horizontal scroll.
- **TEST-017**: Phase 2 review gate in TASK-011 is marked complete before any Phase 3 task is marked complete.
- **TEST-018**: Execution notes confirm which skill or skills were used for each major implementation pass and whether DEP-009 had already completed for every shared-file task.
- **TEST-019**: Formal indexable pages reference a real unified 1200x630 Open Graph image asset, and metadata tests or manual verification confirm the asset path resolves correctly in production metadata output.

## 7. Risks & Assumptions

- **RISK-001**: Later execution sessions may still default to the generic upstream `design-system/MASTER.md` convention unless the repository-level skill matrix and aligned master file are created first.
- **RISK-002**: If TASK-002 is skipped or only partially completed, later UI work can silently reintroduce the stale blue-plus-orange palette and Atkinson font rules.
- **RISK-003**: [plan/refactor-react-next-performance-1.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/plan/refactor-react-next-performance-1.md) modifies several of the same shared files, so redesign work can overwrite correctness fixes or lazy-load boundaries unless DEP-009 sequencing is honored.
- **RISK-004**: Guide-content and city-content expansion may exceed the current `data/guides.js` and `data/locations.js` structures and require modest model refactoring before the UI can render richer sections.
- **RISK-005**: Navigation, hub-page, and footer changes can accidentally weaken internal-linking semantics if copy and SEO are updated independently.
- **RISK-006**: If structured-data builders are added without matching visible content changes, schema can drift from the actual page.
- **RISK-007**: Reusing existing interactive modules inside a redesigned page hierarchy may expose spacing or composition issues that need component-level abstractions.
- **RISK-008**: The redesign spec's illustrative `SearchAction` target pattern points directly at `/locations/{search_term}`, but this project does not currently provide a tolerant search results route. If arbitrary search terms can produce `404` responses, the implementation should either constrain `SearchAction` to known slugs through a truthful pattern or omit `SearchAction` entirely rather than emit misleading schema.
- **ASSUMPTION-001**: [docs/PHASE2_REDESIGN_SPECIFICATION.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_REDESIGN_SPECIFICATION.md) is the accepted redesign direction and should govern execution.
- **ASSUMPTION-002**: The current [design-system/where-is-the-sun/MASTER.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/design-system/where-is-the-sun/MASTER.md) is not the correct baseline until TASK-002 aligns it to the redesign spec.
- **ASSUMPTION-003**: The user wants skill usage enforced through repository artifacts and execution plans, not treated as an optional chat-side reminder.
- **ASSUMPTION-004**: Existing `app/`, `components/pages/`, `components/client/`, `data/`, and `lib/seo/` files remain the primary implementation surface for this redesign pass.

## 8. Related Specifications / Further Reading

[Phase 2 redesign specification](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/PHASE2_REDESIGN_SPECIFICATION.md)
[Persisted master design system](/Users/iemdev/Documents/Development/work/projects/sunshine_project/design-system/where-is-the-sun/MASTER.md)
[Performance and correctness refactor plan](/Users/iemdev/Documents/Development/work/projects/sunshine_project/plan/refactor-react-next-performance-1.md)
[UI/UX Pro Max skill](/Users/iemdev/Documents/Development/work/projects/sunshine_project/.agents/skills/ui-ux-pro-max/SKILL.md)
[Building Components skill](/Users/iemdev/Documents/Development/work/projects/sunshine_project/.agents/skills/building-components/SKILL.md)
[SEO Audit skill](/Users/iemdev/Documents/Development/work/projects/sunshine_project/.agents/skills/seo-audit/SKILL.md)
[Copywriting skill](/Users/iemdev/.agents/skills/copywriting/SKILL.md)
[Content Creator skill](/Users/iemdev/.agents/skills/content-creator/SKILL.md)
[Web Design Guidelines skill](/Users/iemdev/Documents/Development/work/projects/sunshine_project/.agents/skills/web-design-guidelines/SKILL.md)
