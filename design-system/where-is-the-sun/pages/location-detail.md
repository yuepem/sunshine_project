# Location Detail Override

Applies to `/locations/[slug]`.

This page inherits `design-system/where-is-the-sun/MASTER.md`. Only the following route-specific deviations are allowed.

## Source Sections

- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `4.2`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `5.2`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `5.3`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `6.2`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `7.3`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `8.2`

## Page-Specific Deviations

- Breadcrumbs are required before the hero per section `5.2`.
- The hero uses a route-specific answer-first structure from section `4.2`:
  - optional regional eyebrow
  - `h1`: `Sun Times in {City} Today`
  - one concise sentence describing the current solar state
  - a four-card key-data grid for sunrise, sunset, daylight duration, and solar noon
- The key-data grid follows section `8.2`:
  - mobile uses `2 x 2`
  - desktop uses a single `4`-card row
- An `On this page` anchor-navigation block appears before the interactive section per section `5.3`.
- The interactive section needs its own user-facing lead-in heading, such as the section `4.2` pattern `Explore the sun's path across {City}'s sky`.
- A long-form daylight section is required after the interactive block:
  - `h2`: `Daylight in {City} through the year`
  - `200-300` words of city-specific daylight content
  - `Key sun facts for {City}` subheading and facts list per section `7.3`
- Cross-linking blocks must be contextual:
  - related tools with city-specific framing
  - comparison links to other cities
- Wherever city-location controls are offered, include a one-click geolocation action.

## Non-Deviations

- The page does not get custom tokens outside the master palette and spacing system.
- Card, button, input, and focus-state styling inherit the master file.
