# Kairos Design System

Single source: [`src/app/kairos-design-system.css`](src/app/kairos-design-system.css). It is globally loaded through `src/app/globals.css`.

## Direction

Kairos uses an editorial, product-led system: warm paper backgrounds, dark ink, restrained rules, Bodoni/Didot display type, Manrope interface type, magenta actions, royal-blue product surfaces, and gold only for verified status.

## Core tokens

- Brand: `--kds-brand` (`#DE028E`)
- Brand hover: `--kds-brand-hover` (`#C00079`)
- Royal blue: `--kds-blue` (`#2C3177`)
- Deep blue: `--kds-blue-deep` (`#121532`)
- Paper: `--kds-paper` (`#F7F5F1`)
- Ink: `--kds-ink` (`#171717`)
- Gold verification: `--kds-gold` (`#D4AF37`)
- Display font: `--kds-serif`
- Interface font: `--kds-sans`

Never introduce another pink, blue, paper, or verification color when one of these tokens fits.

## Reusable primitives

- Page: `kds-page`, then `kds-container` or `kds-narrow`
- Editorial heading: `kds-eyebrow`, `kds-display`, `kds-lead`
- Surfaces: `kds-panel`
- Actions: `kds-button kds-button-primary`
- Search/filter UI: `kds-search-panel`, `kds-search-row`, `kds-filter-grid`, `kds-chip`
- Talent cards: `kds-talent-grid`, `kds-talent-card`, `kds-avatar`
- Profile layout: `kds-profile-hero`, `kds-profile-header`, `kds-profile-layout`, `kds-profile-section`
- Verification: `talent-gold-icon`, `talent-gold-badge`

## Rules

1. Serif type is for page and section statements, not controls or body copy.
2. Magenta signals primary action and active selection.
3. Gold signals verified status only.
4. Use borders before shadows; reserve larger shadow for hover or key panels.
5. Use pill shapes for actions, filters, skills, and status—not content panels.
6. Always preserve keyboard focus, responsive stacking, and reduced-motion behavior supplied by `kds-page`.
7. Render user-facing enum data through `formatProfileLabel()`.
8. Filter blank API strings before rendering chips or labels.

## Example

```tsx
<main className="kds-page">
  <div className="kds-container">
    <span className="kds-eyebrow">Section label</span>
    <h1 className="kds-display">Editorial <em>statement.</em></h1>
    <p className="kds-lead">Clear supporting copy.</p>
    <section className="kds-panel">...</section>
  </div>
</main>
```
