# Tool Detail Override

Applies to `/tools/[slug]`.

This page inherits `design-system/where-is-the-sun/MASTER.md`. Only the following route-specific deviations are allowed.

## Source Sections

- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `4.3`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `5.2`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `5.3`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `6.2`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `6.3`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `8.4`

## Page-Specific Deviations

- Breadcrumbs are required before the hero per section `5.2`.
- The hero uses the route-specific answer-first structure from section `4.3`:
  - `h1` is the tool name
  - the lead paragraph explains the tool in plain language
  - a compact information-card row highlights usage context rather than implementation details
- An `On this page` anchor-navigation block appears before the main interactive section per section `5.3`.
- The interactive tool block sits directly after the hero and anchor navigation.
- A `How to use this tool` section follows the interactive block and uses a short three-step sequence per section `4.3`.
- A direct related-guide CTA follows the how-to section and should use question-led copy, not generic continuation text.
- Representative city links appear after the CTA to connect the tool to real locations.
- Any loading treatment added for the simulator or chart on this route must match the skeleton guidance in section `8.4`.

## Non-Deviations

- Do not create route-specific colors, radii, or shadows for tool pages.
- Buttons, cards, inputs, and focus states inherit the master design system.
