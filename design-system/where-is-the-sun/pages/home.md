# Home Page Override

Applies to `/`.

This page inherits `design-system/where-is-the-sun/MASTER.md`. Only the following route-specific deviations are allowed.

## Source Sections

- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `4.1`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `5.1`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `5.4`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `6.2`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `8.2`

## Page-Specific Deviations

- Hero content is the dominant above-the-fold block and must use the exact information hierarchy from section `4.1`:
  - `h1`: `Where is the sun right now?`
  - supporting copy answers the product question in plain language
  - quick city selector appears immediately below the lead copy
  - popular-city shortcuts appear as lightweight chips or inline links below the selector
- A `Today's snapshot` data-card block must appear before the interactive simulator.
- The snapshot card grid is route-specific:
  - mobile uses a `2 x 2` layout
  - desktop expands to a single `4`-card row per section `8.2`
- The interactive simulator follows the snapshot block, not the hero copy.
- The `Explore by city` section uses a browse-first city card grid rather than a plain text link list.
- The homepage must expose separate `Sun calculators` and `Learn about sunlight` sections, stacked on mobile and displayed as two columns on desktop per section `8.2`.

## Non-Deviations

- Use master color, type, spacing, radius, shadow, button, card, and input tokens without alteration.
- Do not introduce page-only colors, fonts, or decorative effects for the homepage.
