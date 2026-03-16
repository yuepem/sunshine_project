# Where Is The Sun Design System Master

This file is the repository-level visual source of truth after alignment with `docs/PHASE2_REDESIGN_SPECIFICATION.md`.

## Source Authority

- Primary visual authority: sections `3.2` through `3.6` of `docs/PHASE2_REDESIGN_SPECIFICATION.md`
- Page-specific deviations live in `design-system/where-is-the-sun/pages/*.md`
- When implementing a page, read this file first and then the matching page override if one exists

## Brand Direction

- Visual mode: `Minimal & Direct + Warm Tool`
- Product keywords: `warm`, `clear`, `data-driven`, `spacious`, `fast-loading`
- Copy guardrail: do not surface internal implementation terms in user-facing UI

## Color Tokens

Use the deep-amber plus sky-blue system from section `3.2`.

| Role | Token | Value | Hex intent | Usage |
|---|---|---|---|---|
| Primary | `--color-primary` | `30 70% 42%` | `#B55A1B` | Primary buttons, active states, brand emphasis |
| Primary hover | `--color-primary-hover` | `30 70% 36%` | darker amber | Hover and pressed states for primary actions |
| Primary light | `--color-primary-light` | `35 80% 94%` | `#FEF3E2` | Warm highlight surfaces and active badges |
| Accent | `--color-accent` | `210 80% 52%` | `#2577D4` | Links, secondary emphasis, informative accents |
| Success | `--color-success` | `150 60% 40%` | green | Positive data or successful state messaging |
| Warning | `--color-warning` | `45 95% 50%` | `#F5A800` | Highlight badges and cautionary emphasis |
| Destructive | `--color-destructive` | `0 72% 51%` | red | Errors and destructive actions |
| Background | `--color-background` | `42 30% 97%` | `#FAF8F5` | Global page background |
| Surface | `--color-surface` | `0 0% 100%` | `#FFFFFF` | Cards, drawers, modal panels |
| Surface muted | `--color-surface-muted` | `40 15% 95%` | `#F5F2EF` | Secondary panels, hover fills, muted cards |
| Foreground | `--color-foreground` | `25 15% 12%` | `#221D17` | Headings and primary text |
| Muted foreground | `--color-muted-foreground` | `25 8% 45%` | `#6B6560` | Helper text, descriptions, labels |
| Border | `--color-border` | `30 12% 88%` | `#E3DFD9` | Default border and divider color |
| Border strong | `--color-border-strong` | `30 10% 78%` | warmer gray | Dense data cards and stronger separators |
| Ring | `--color-ring` | `30 70% 42%` | matches primary | Keyboard focus ring |

Accessibility baseline from the redesign spec must be preserved:

- Primary text on background stays AAA-level.
- Muted text on background stays AA-level or better.
- Primary and accent actions on white stay AA-level or better.

## Typography System

Use the existing Geist family from section `3.3`.

Do not reintroduce `Atkinson Hyperlegible` into this repository-level design system.

```css
--font-sans: "Geist Sans", system-ui, -apple-system, sans-serif;
--font-mono: "Geist Mono", "SF Mono", monospace;
```

| Token | Value | Usage |
|---|---|---|
| `--text-xs` | `0.75rem` | badges, labels, secondary metadata |
| `--text-sm` | `0.875rem` | helper text, breadcrumbs, supporting copy |
| `--text-base` | `1rem` | body copy |
| `--text-lg` | `1.125rem` | lead copy and larger body text |
| `--text-xl` | `1.25rem` | compact section headings |
| `--text-2xl` | `1.5rem` | standard section headings |
| `--text-3xl` | `1.875rem` | page subheads |
| `--text-4xl` | `2.25rem` | page titles |
| `--text-5xl` | `3rem` | desktop hero titles |

Weight and line-height rules:

- Hero titles: `700` with line-height `1.1`
- `h1`: `700` with line-height `1.2`
- `h2`: `600` with line-height `1.3`
- `h3`: `600` with line-height `1.4`
- Body copy: `400` with line-height `1.6`
- Labels and badges: `500` with line-height `1.4`
- Numeric data: `600`, tabular figures, line-height `1.2`

## Spacing System

Use the 4px/8px progression from section `3.4`.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `4px` | icon and text gaps |
| `--space-2` | `8px` | inline spacing and compact stacks |
| `--space-3` | `12px` | grouped controls and badges |
| `--space-4` | `16px` | paragraph rhythm and compact card padding |
| `--space-5` | `24px` | standard card padding and section internals |
| `--space-6` | `32px` | section-to-section spacing |
| `--space-7` | `48px` | major vertical group spacing |
| `--space-8` | `64px` | page-level separators and generous hero spacing |

## Radius and Shadow Tokens

Use the exact scale from section `3.5`.

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `6px` | buttons, badges, inputs |
| `--radius-md` | `10px` | default cards |
| `--radius-lg` | `16px` | large containers and hero shells |
| `--radius-xl` | `24px` | special emphasis panels |
| `--shadow-sm` | `0 1px 2px rgba(34, 29, 23, 0.05)` | light card elevation |
| `--shadow-md` | `0 4px 12px rgba(34, 29, 23, 0.08)` | hover and elevated cards |
| `--shadow-lg` | `0 8px 24px rgba(34, 29, 23, 0.10)` | modal and high-emphasis containers |

## Component Rules

These patterns are the reusable defaults from section `3.6`.

### Buttons

- Primary button:
  - background `hsl(var(--color-primary))`
  - text `hsl(var(--color-surface))`
  - minimum height `44px`
  - horizontal padding `24px`
  - radius `var(--radius-sm)`
  - font weight `500`
- Secondary button:
  - transparent background
  - `1px` border using `hsl(var(--color-border))`
  - text `hsl(var(--color-foreground))`
  - same height, padding, and radius as primary
- Ghost button:
  - transparent background
  - text `hsl(var(--color-muted-foreground))`
  - hover fill `hsl(var(--color-surface-muted))`
- Primary hover and pressed states use `hsl(var(--color-primary-hover))`.

### Cards

- Default card:
  - background `hsl(var(--color-surface))`
  - border `1px solid hsl(var(--color-border))`
  - radius `var(--radius-md)`
  - padding `24px`
  - shadow `var(--shadow-sm)`
- Info card:
  - background `hsl(var(--color-primary-light))`
  - border tinted from primary
  - same radius and padding as default
- Data card:
  - background `hsl(var(--color-surface))`
  - stronger border using `hsl(var(--color-border-strong))`
  - padding `16px`
- Link card:
  - starts as default card
  - hover border shifts toward primary
  - hover shadow upgrades to `var(--shadow-md)`
  - interactive affordance must not cause layout shift

### Inputs

- Minimum height `44px`
- Padding should map to `12px 16px`
- Background `hsl(var(--color-surface))`
- Border `1px solid hsl(var(--color-border))`
- Radius `var(--radius-sm)`
- Font size `var(--text-base)`
- Focus state uses the ring token and remains visible without removing affordance

### Badges

- Default badge:
  - background `hsl(var(--color-surface-muted))`
  - text `hsl(var(--color-muted-foreground))`
  - horizontal padding `12px`
  - height `28px`
  - radius `var(--radius-sm)`
  - font size `var(--text-sm)`
  - font weight `500`
- Active badge:
  - background `hsl(var(--color-primary-light))`
  - text `hsl(var(--color-primary))`
  - border tinted from primary

## Interaction and Accessibility Guardrails

- Use a single consistent SVG icon set. Do not use emoji as UI icons.
- Keep all pointer targets at `44px` minimum.
- Use transitions in the `150ms` to `300ms` range.
- Do not use hover effects that shift layout or rely on hover alone.
- Preserve visible keyboard focus states and skip-link support.
- Respect `prefers-reduced-motion`.
- Design for `375px`, `768px`, `1024px`, and `1440px` without horizontal scroll.
- Document intentional route-specific visual deviations in `design-system/where-is-the-sun/pages/*.md` before implementing them in page code.
- Do not reintroduce the stale blue-plus-orange palette or other generated-theme defaults from the superseded master file.
