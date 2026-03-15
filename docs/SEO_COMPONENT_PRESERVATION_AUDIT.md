# SEO Component Preservation Audit

## Active Execution Spec

- Active implementation plan: [plan/architecture-seo-component-preserving-migration-1.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/plan/architecture-seo-component-preserving-migration-1.md)
- Superseded for implementation: [plan/architecture-seo-platform-migration-1.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/plan/architecture-seo-platform-migration-1.md)
- Audit baseline reference: [docs/SEO_AUDIT_PLAN.md](/Users/iemdev/Documents/Development/work/projects/sunshine_project/docs/SEO_AUDIT_PLAN.md)

## Branch Baseline

- Working tree baseline at execution start is not fully clean because `docs/` and `plan/` are untracked planning artifacts.
- No application source changes were present at baseline inspection time.
- The migration proceeds with those planning artifacts preserved and without reverting unrelated files.

## `src/` Preservation Rules

Only the following `src/` changes are permitted during the Next.js migration:

- Add `"use client"` only where App Router requires a direct client entry.
- Add `next/dynamic` or wrapper boundaries for browser-only modules.
- Add browser-global guards when a module would otherwise crash during server evaluation.
- Fix import paths or asset loading only when required for Next.js compatibility.
- Seed route-specific state through wrappers around the existing Zustand stores.
- Update browser-exposed environment variable names to `NEXT_PUBLIC_*` when required for Next.js compatibility.

The following are explicitly out of scope:

- Rewriting existing `src/components/**` into a new visual system.
- Changing current class names, layout hierarchy, or user-visible interaction semantics.
- Replacing the current simulator, chart, map, or header with newly designed equivalents.

## Target Page Roles

- Homepage: brand entry, discovery, crawlable navigation, and selected interaction using the existing calculator stack.
- City pages: concise current-state summary followed by preserved visual/context modules, then interaction and deeper analysis.
- Tool pages: task-focused explanatory pages that reuse selected preserved calculator components as the interactive source of truth.
- Guide pages: crawlable educational content that explains concepts and links users back to the preserved tool experience.

## Preserved Component Map

### Homepage reference stack

- `CityHeader`: sticky interactive city-switching header.
- `MainCom`: primary current-sun experience composed of 3D solar model plus location/date context.
- `TimeSlider-B`: time scrubbing and autoplay control.
- `InputComponent`: deeper controls, sun events, and map interaction.
- `src/components/sunData/Chart`: monthly and daily depth view.
- `Footer`: site footer and supporting links.

### Reusable component responsibilities

- `CityHeader` and `CityList`: interactive discovery controls for switching cities inside the client experience. SEO routes still need separate crawlable links outside this component.
- `MainCom`: best reusable anchor for the city-page visual section because it keeps `ModelComponent`, `LocationInfo`, and `SimulatorDateTime` together.
- `ModelComponent`: primary visual expression of current solar position. This remains central on city routes.
- `LocationInfo`: compact location, coordinate, azimuth, and altitude status.
- `SimulatorDateTime`: current city/date/time context with date and geolocation controls.
- `TimeSlider-B`: temporal interaction layer that should appear after the current-state summary and visual/context block.
- `InputComponent`: deeper control section containing year progress, sun event cards, and map interaction.
- `src/components/sunData/Chart`: long-range monthly and daily comparison module that belongs after primary interaction.
- `Footer`: preserved closing section safe to reuse across route types.

### Route-type reuse guidance

- Homepage: preserve the full reference stack, surrounded by crawlable discovery content and route links.
- City pages: keep a concise SEO summary above a preserved `MainCom`-anchored experience, then reuse `TimeSlider-B`, `InputComponent`, and `Chart`.
- Tool pages: reuse only the modules that match user intent for each calculator while leaving those modules visually unchanged.
- Guide pages: remain mostly static, with links back to tool and city routes plus an optional preserved calculator embed.
