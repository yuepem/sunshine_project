# Locations Hub Override

Applies to `/locations`.

This override is intentionally narrow because the redesign spec defines this route through information architecture, metadata, schema, and responsive guidance rather than a bespoke full-page layout.

## Source Sections

- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `2.2`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `2.4`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `5.1`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `6.3`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `8.2`

## Page-Specific Deviations

- Treat the route as the canonical city collection hub described in section `2.2`.
- Wherever the page offers location discovery or selection, it must expose a one-click geolocation control per the note in section `2.2`.
- The visible city listing should use browse-oriented cards or list items that can truthfully power `CollectionPage` or `ItemList` schema per section `6.3`.
- If preview data is shown on city entries, keep it lightweight and card-based so the grid can follow section `8.2` responsive behavior:
  - mobile: `2` columns
  - desktop: `3` to `4` columns
- Route copy should align to the city-list metadata intent from section `2.4`: browsing sunrise, sunset, and daylight data across the supported city set.

## Non-Deviations

- Do not invent a route-specific palette, hero treatment, or component style outside the master system.
- Navigation, footer, card styling, and typography inherit the master file.
