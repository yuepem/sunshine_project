# Guide Detail Override

Applies to `/guides/[slug]`.

This page inherits `design-system/where-is-the-sun/MASTER.md`. Only the following route-specific deviations are allowed.

## Source Sections

- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `4.4`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `5.2`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `6.1`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `6.2`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `6.3`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `7.1`
- `docs/PHASE2_REDESIGN_SPECIFICATION.md` section `7.2`

## Page-Specific Deviations

- Breadcrumbs are required before the article header per section `5.2`.
- The page body must use article semantics per section `6.1`.
- The article header follows the guide-specific pattern from section `4.4`:
  - eyebrow with guide label and reading time
  - `h1` as the guide title
  - a concise lead paragraph explaining the concept plainly
- Content depth expands to `3` to `5` sections with visible `h2` headings, matching section `4.4` and the heading rules in section `6.2`.
- A `See it in action` CTA block is required after the explanatory content and should link to the related tool with direct language from sections `4.4` and `7.2`.
- A `Related guides` block follows the CTA and remains visibly distinct from the article body.
- Popular city links may appear after related guides to connect concepts to real locations.
- Structured data and visible content must remain aligned with the `Article` expectations in section `6.3`.

## Non-Deviations

- Do not create guide-specific colors, typography overrides, or ornamental effects outside the master system.
- Buttons, cards, spacing, and focus styling inherit the master file.
