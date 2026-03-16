---
goal: Reduce first-load JavaScript, eliminate client-side state initialization drift, and fix high-impact React/Next implementation issues in the preserved solar experience
version: 1
date_created: 2026-03-16
last_updated: 2026-03-16
owner: Codex
status: Planned
tags: [refactor, react, nextjs, performance, bundle, hydration, zustand, bugfix]
---

# Introduction

![Status: Planned](https://img.shields.io/badge/status-Planned-blue)

This plan defines the remediation work required after the `vercel-react-best-practices` review of the current Next.js App Router implementation. The goal is to keep the preserved `src/` interaction model intact while reducing first-load JavaScript, removing state initialization drift between route props and client stores, fixing verified logic defects, and narrowing unnecessary re-render and computation paths.

## 1. Requirements & Constraints

- **REQ-001**: Preserve the current user-facing calculator behavior, route structure, and SEO content while optimizing implementation details.
- **REQ-002**: Reduce first-load JavaScript for `/`, `/locations/[slug]`, and `/tools/[slug]` by splitting heavy client modules currently bundled into the preserved interactive experience.
- **REQ-003**: Ensure city and tool routes initialize client state deterministically from route data without first rendering default Stockholm state and then mutating to the target city in a mount effect.
- **REQ-004**: Fix verified runtime defects in geolocation handling and simulator state synchronization before performance-only refinements.
- **REQ-005**: Replace broad Zustand subscriptions in hot components with selector-based subscriptions to minimize avoidable re-renders.
- **REQ-006**: Reduce repeated chart and time-formatting computation in client components without changing displayed values.
- **REQ-007**: Maintain successful results for `npm test`, `npm run build`, and `npm run lint`.
- **REQ-008**: Keep all current SEO routes, metadata generation, and static page output intact.
- **CON-001**: Do not redesign the current simulator UI or replace preserved `src/components/**` modules with a new interface.
- **CON-002**: Do not introduce new third-party runtime dependencies unless strictly required to remove an existing dependency.
- **CON-003**: Do not move SEO-critical content behind client-only rendering boundaries.
- **CON-004**: Any lazy-loading boundary must provide a stable loading UI and must not break hydration or route navigation.
- **CON-005**: Any store initialization change must be scoped so that city pages, tool pages, and the homepage can coexist without leaking state across route transitions.
- **CON-006**: Do not remove the current 3D model, map, slider, or chart features; only change when and how they load and subscribe to state.
- **GUD-001**: Follow `vercel-react-best-practices`, prioritizing `bundle-dynamic-imports`, `bundle-conditional`, `rerender-dependencies`, and `rerender-derived-state-no-effect`.
- **GUD-002**: Prefer server-rendered route shells with client islands for heavy interaction modules.
- **GUD-003**: Prefer selector subscriptions such as `useInputStore((state) => state.date)` over destructuring entire store objects in render paths.
- **PAT-001**: Fix correctness issues first, then apply bundle and render optimizations, then verify build output changes.
- **PAT-002**: Where route props seed interactive state, initialize through explicit boundary props or a scoped provider instead of post-render synchronization effects.

## 2. Implementation Steps

### Implementation Phase 1

- **GOAL-001**: Establish a measurable optimization baseline and lock the remediation scope to the verified hotspots.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-001 | Run `npm run build` and record current `First Load JS` values for `/`, `/locations/[slug]`, and `/tools/[slug]` in the plan execution notes before any refactor starts. |  |  |
| TASK-002 | Confirm the current interactive composition path from [`components/client/SunExperience.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/client/SunExperience.js) through [`components/client/InteractiveSunExperience.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/client/InteractiveSunExperience.js), [`src/components/MainCom.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/MainCom.jsx), [`src/components/InputComponent.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/InputComponent.jsx), and [`src/components/sunData/Chart.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/sunData/Chart.jsx). |  |  |
| TASK-003 | Document the currently verified defects to be fixed in this refactor: geolocation callback misuse in [`src/components/input/locationInput/LocationButton.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/input/locationInput/LocationButton.jsx), route-to-store mount synchronization in [`components/client/InteractiveSunExperience.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/client/InteractiveSunExperience.js), and stale simulator camera updates in [`src/components/Simulator/ModelComponent.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/Simulator/ModelComponent.jsx). |  |  |

### Implementation Phase 2

- **GOAL-002**: Replace post-render route synchronization with deterministic interactive state initialization and fix correctness issues that currently affect runtime behavior.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-004 | Introduce an explicit interactive-state initialization boundary in [`components/client/SunExperience.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/client/SunExperience.js) and/or a new colocated client wrapper so route pages can pass a serializable initial state object instead of entire location objects. |  |  |
| TASK-005 | Update [`components/client/InteractiveSunExperience.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/client/InteractiveSunExperience.js) to remove the mount-only `useEffect` that copies `city` props into the global input store after first render. Replace it with deterministic initialization keyed by route-provided initial state. |  |  |
| TASK-006 | Update [`components/pages/CityPage.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/CityPage.js) and [`components/pages/ToolPage.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/ToolPage.js) to pass only the exact initialization fields required by the interactive client boundary: `latitude`, `longitude`, `city`, `address`, `timeZone`, and initialization mode. |  |  |
| TASK-007 | Normalize the input store API in [`src/stores/inputStore.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/stores/inputStore.js) by adding a single initialization action for route-seeded state and ensuring it updates `date` only when intended. |  |  |
| TASK-008 | Fix geolocation handling in [`src/components/input/locationInput/LocationButton.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/input/locationInput/LocationButton.jsx) so `navigator.geolocation.getCurrentPosition` receives a valid success callback, a valid error callback, and an optional options object in the correct argument positions. |  |  |
| TASK-009 | Correct simulator update logic in [`src/components/Simulator/ModelComponent.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/Simulator/ModelComponent.jsx) by removing the invalid `calculateSunData(date, sunPosition)` call shape, deriving render-store coordinates from the actual `sunPosition`, and recalculating camera position whenever the sun azimuth changes. |  |  |

### Implementation Phase 3

- **GOAL-003**: Split heavy client modules into independent on-demand boundaries so that the route shell does not eagerly load 3D, map, and chart code for every visit.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-010 | Refactor [`components/client/InteractiveSunExperience.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/client/InteractiveSunExperience.js) to lazy-load `MainCom`, `InputComponent`, and `Chart` with `next/dynamic`, using separate loading fallbacks per module rather than a single all-or-nothing client bundle. |  |  |
| TASK-011 | If `MainCom` remains a broad client bundle after task 10, split [`src/components/Simulator/ModelComponent.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/Simulator/ModelComponent.jsx) behind its own dynamic boundary so the 3D canvas is not bundled together with adjacent textual cards. |  |  |
| TASK-012 | Move Leaflet-specific loading closer to the map feature by ensuring [`src/components/input/locationInput/Maps.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/input/locationInput/Maps.jsx) is only imported through a lazy boundary when the map panel is rendered. |  |  |
| TASK-013 | Audit [`app/layout.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/layout.js) and related client boundaries to remove globally loaded feature-specific assets where possible, including evaluating whether `leaflet/dist/leaflet.css` can be loaded at the smallest supported boundary without violating Next.js global CSS rules. |  |  |
| TASK-014 | Re-run `npm run build` after bundle splitting and record the new `First Load JS` values for the same routes to verify the refactor produces a measurable reduction. |  |  |

### Implementation Phase 4

- **GOAL-004**: Narrow hot-path subscriptions and reduce redundant computation in the slider, chart, simulator, and time-formatting code.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-015 | Replace whole-store destructuring in [`src/components/TimeSlider-B.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/TimeSlider-B.jsx), [`src/components/Simulator/ModelComponent.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/Simulator/ModelComponent.jsx), [`src/components/Simulator/LocationInfo.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/Simulator/LocationInfo.jsx), [`src/components/Simulator/SimulatorDateTime.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/Simulator/SimulatorDateTime.jsx), and [`src/components/sunData/Chart.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/sunData/Chart.jsx) with selector subscriptions to only the fields each component renders. |  |  |
| TASK-016 | Remove effect dependency suppression where it hides unstable logic, and rewrite effects so they depend on primitive values or stable store actions instead of broad objects. Apply this first in [`src/components/MainCom.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/MainCom.jsx) and [`src/components/InputComponent.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/InputComponent.jsx). |  |  |
| TASK-017 | Refactor [`src/components/sunData/Chart.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/sunData/Chart.jsx) so monthly and daily datasets are computed through a shared pure helper or memoized calculation path rather than two separate effect-driven loops with duplicated timezone conversion logic. |  |  |
| TASK-018 | Evaluate replacing `moment-timezone` usage in [`src/components/sunData/Chart.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/sunData/Chart.jsx), [`src/components/TimeSlider-B.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/TimeSlider-B.jsx), [`src/stores/timeStore.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/stores/timeStore.js), and [`lib/sun/calculateSunSnapshot.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/lib/sun/calculateSunSnapshot.js) with a shared `Intl.DateTimeFormat`-based formatter if equivalent output can be preserved. If full replacement is too risky in this pass, isolate formatting utilities to a single shared module as a prerequisite. |  |  |
| TASK-019 | Update [`src/stores/inputStore.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/stores/inputStore.js) helper functions such as `toDMS`, `fetchAddress`, and `timeZoneCode` so they operate through stable actions and do not force unrelated subscribers to re-render on every state change. |  |  |

### Implementation Phase 5

- **GOAL-005**: Validate behavior, confirm performance improvements, and leave a clear execution record for follow-up work.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-020 | Run `npm test` and confirm the existing SEO route and metadata tests still pass after the refactor. |  |  |
| TASK-021 | Run `npm run lint` and resolve any issues introduced by effect rewrites, selector changes, or lazy-load boundaries. |  |  |
| TASK-022 | Run `npm run build` and confirm production compilation succeeds with the updated client boundaries and any formatter changes. |  |  |
| TASK-023 | Manually verify the homepage, one city route, and one tool route to confirm there is no default-city flicker, the map still updates location correctly, the slider still updates time correctly, and the chart still renders the same conceptual data. |  |  |
| TASK-024 | Append an execution note to this plan summarizing measured bundle improvements, unresolved tradeoffs, and any deferred follow-up items such as header hydration reduction or deeper server/client boundary cleanup. |  |  |

## 3. Alternatives

- **ALT-001**: Replace the preserved `src/` calculator stack with a new server-first UI. This was rejected because the current product requirement is to preserve the existing simulator and interaction model.
- **ALT-002**: Keep the current mount-effect synchronization and only add loading skeletons. This was rejected because it hides the route-state drift instead of eliminating it.
- **ALT-003**: Rewrite all global Zustand stores into route-scoped React context providers in one pass. This was rejected for this iteration because it increases migration risk and is not required to remove the highest-impact defects.
- **ALT-004**: Remove the chart or 3D model from the homepage to reduce bundle size. This was rejected because the task is to optimize loading strategy, not cut core features.
- **ALT-005**: Keep `moment-timezone` everywhere and only split bundles. This remains a fallback, but it leaves a large hot-path dependency in place and may cap achievable savings.

## 4. Dependencies

- **DEP-001**: Next.js App Router dynamic import support via `next/dynamic`.
- **DEP-002**: Existing preserved client modules in `src/components/**`, `src/stores/**`, and `src/helperFunctions/**`.
- **DEP-003**: Leaflet runtime and CSS asset requirements for the map experience.
- **DEP-004**: `suncalc` and existing sun-time calculations in [`src/stores/sunSalcStore.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/stores/sunSalcStore.js) and [`lib/sun/calculateSunSnapshot.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/lib/sun/calculateSunSnapshot.js).
- **DEP-005**: Existing route-level SEO tests in [`tests/seo/metadata.test.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/tests/seo/metadata.test.js) and [`tests/seo/routes.test.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/tests/seo/routes.test.js).

## 5. Files

- **FILE-001**: [`plan/refactor-react-next-performance-1.md`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/plan/refactor-react-next-performance-1.md) - execution plan and result log.
- **FILE-002**: [`components/client/SunExperience.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/client/SunExperience.js) - top-level preserved experience boundary.
- **FILE-003**: [`components/client/InteractiveSunExperience.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/client/InteractiveSunExperience.js) - mode-based interactive composition and current store synchronization hotspot.
- **FILE-004**: [`components/pages/HomePage.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/HomePage.js) - homepage interactive entry point.
- **FILE-005**: [`components/pages/CityPage.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/CityPage.js) - city route interactive entry point.
- **FILE-006**: [`components/pages/ToolPage.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/ToolPage.js) - tool route interactive entry point.
- **FILE-007**: [`app/layout.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/app/layout.js) - global layout asset loading boundary.
- **FILE-008**: [`src/stores/inputStore.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/stores/inputStore.js) - route initialization, address lookup, timezone lookup, and DMS helpers.
- **FILE-009**: [`src/stores/sunSalcStore.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/stores/sunSalcStore.js) - sun calculations consumed by simulator and chart.
- **FILE-010**: [`src/stores/renderStore.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/stores/renderStore.js) - derived 3D coordinates and camera position.
- **FILE-011**: [`src/stores/timeStore.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/stores/timeStore.js) - time formatting and ticking helpers.
- **FILE-012**: [`src/components/MainCom.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/MainCom.jsx) - simulator orchestration.
- **FILE-013**: [`src/components/InputComponent.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/InputComponent.jsx) - time controls and map section.
- **FILE-014**: [`src/components/TimeSlider-B.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/TimeSlider-B.jsx) - slider hot path.
- **FILE-015**: [`src/components/Simulator/ModelComponent.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/Simulator/ModelComponent.jsx) - 3D model bundle and simulator logic hotspot.
- **FILE-016**: [`src/components/Simulator/LocationInfo.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/Simulator/LocationInfo.jsx) - simulator information card subscriptions.
- **FILE-017**: [`src/components/Simulator/SimulatorDateTime.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/Simulator/SimulatorDateTime.jsx) - date picker and time display subscriptions.
- **FILE-018**: [`src/components/input/locationInput/Maps.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/input/locationInput/Maps.jsx) - Leaflet map feature boundary.
- **FILE-019**: [`src/components/input/locationInput/LocationButton.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/input/locationInput/LocationButton.jsx) - geolocation bug fix.
- **FILE-020**: [`src/components/sunData/Chart.jsx`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/sunData/Chart.jsx) - repeated computation and heavy dependency hotspot.
- **FILE-021**: [`lib/sun/calculateSunSnapshot.js`](/Users/iemdev/Documents/Development/work/projects/sunshine_project/lib/sun/calculateSunSnapshot.js) - shared server-side time formatting path if formatter consolidation is implemented.

## 6. Testing

- **TEST-001**: `npm test` passes after all changes.
- **TEST-002**: `npm run lint` passes without disabling new hook warnings as a substitute for fixing dependencies.
- **TEST-003**: `npm run build` passes and produces reduced `First Load JS` for `/`, `/locations/[slug]`, and `/tools/[slug]` compared with the baseline captured in `TASK-001`.
- **TEST-004**: Manual runtime verification confirms no default-city flash or double-initialization on `/locations/stockholm`, `/locations/paris`, and `/tools/sun-position-calculator`.
- **TEST-005**: Manual runtime verification confirms the geolocation button updates latitude and longitude only after successful browser geolocation resolution.
- **TEST-006**: Manual runtime verification confirms 3D simulator camera and sun coordinates continue updating as time changes.
- **TEST-007**: Manual runtime verification confirms the map still renders, accepts click updates, and reflects changed coordinates.
- **TEST-008**: Manual runtime verification confirms chart interactions still update month/day selection and visible values remain logically consistent.

## 7. Risks & Assumptions

- **RISK-001**: Lazy-loading boundaries may expose hidden ordering assumptions between the global stores and preserved client components.
- **RISK-002**: Replacing `moment-timezone` may change edge-case timezone formatting if not validated against current output.
- **RISK-003**: Leaflet CSS may remain globally loaded if Next.js global CSS constraints prevent a smaller safe boundary.
- **RISK-004**: Build-output reductions may be limited if large shared dependencies remain referenced by multiple first-render client modules.
- **RISK-005**: Because the preserved calculator uses global stores, route transitions may still require careful reset semantics to avoid state bleed.
- **ASSUMPTION-001**: The current preserved simulator components are functionally correct enough that this pass should focus on loading strategy, synchronization correctness, and render-path efficiency rather than redesign.
- **ASSUMPTION-002**: The user wants execution staged conservatively, with verified defects fixed before broader optimization.
- **ASSUMPTION-003**: Existing SEO pages and tests are the baseline and must remain unchanged in outward behavior.

## 8. Related Specifications / Further Reading

[Vercel React best practices skill](/Users/iemdev/.codex/skills/vercel-react-best-practices/SKILL.md)
[Current SEO-preserving migration plan](/Users/iemdev/Documents/Development/work/projects/sunshine_project/plan/architecture-seo-component-preserving-migration-1.md)
[Home page interactive composition](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/pages/HomePage.js)
[Interactive experience boundary](/Users/iemdev/Documents/Development/work/projects/sunshine_project/components/client/InteractiveSunExperience.js)
[Model component hotspot](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/Simulator/ModelComponent.jsx)
[Chart hotspot](/Users/iemdev/Documents/Development/work/projects/sunshine_project/src/components/sunData/Chart.jsx)
