# Tools Hub Override

Applies to `/tools`.

This override is intentionally narrow because the redesign spec defines this route as a collection hub with metadata, navigation, and schema requirements rather than a bespoke full-page composition.

## Source Sections

- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `2.1`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `2.2`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `2.4`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `5.1`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `6.3`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `8.2`

## Page-Specific Deviations

- Treat the route as the canonical hub for the focused calculator set defined in sections `2.1` and `2.2`.
- Tool entries should read as purpose-led cards or list items with a name and one-sentence use case so the page can truthfully emit `CollectionPage` or `ItemList` schema per section `6.3`.
- Route copy should align to the tool-list metadata intent from section `2.4`: three focused calculators for sun position, daylight hours, and solar noon.
- If the page groups tools by purpose, keep the grouping semantic and visible; do not hide primary entry links behind tabs or non-indexable UI states.
- Responsive behavior follows section `8.2`:
  - stacked cards on small screens
  - multi-column card layout on larger screens where space allows

## Non-Deviations

- Do not invent a route-specific hero visual system that conflicts with the master file.
- Use the master typography, card, button, and spacing rules for all tool-hub elements.
