# Guides Hub Override

Applies to `/guides`.

This override is intentionally narrow because the redesign spec defines this route as a collection hub through content strategy, metadata, schema, and navigation guidance rather than a bespoke page wireframe.

## Source Sections

- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `2.1`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `2.2`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `2.4`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `5.1`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `6.3`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `7.1`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `8.2`

## Page-Specific Deviations

- Treat the route as the canonical guide collection hub from section `2.2`, not as a generic blog roll.
- Guide entries should remain visible as crawlable cards or list items that can truthfully power `CollectionPage` or `ItemList` schema per section `6.3`.
- Card copy should follow the tone guidance in section `7.1`: clear, friendly, direct, and practical.
- The route should foreground guide titles and plain-language summaries aligned to the guide-list metadata intent from section `2.4`.
- Responsive behavior follows section `8.2`:
  - single-column stack on smaller screens
  - multi-column browse layout on larger screens where space allows

## Non-Deviations

- Do not introduce a guide-hub-specific token set or decorative treatment outside the master file.
- Use the master typography, spacing, and card rules throughout the route.
