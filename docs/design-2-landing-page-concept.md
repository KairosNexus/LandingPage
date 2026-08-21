# Kairos Landing Page — Design 2 Concept

## Direction

Design 2 adapts the supplied editorial, monochrome reference into a premium Kairos landing page. The page should feel calm, human, and deliberate: generous white space, bold serif headlines, concise copy, and hand-drawn illustrations showing people moving through work and hiring moments.

The reference is inspiration for composition and mood, not a literal copy. Kairos branding, product claims, audience paths, accessibility, and existing conversion actions remain intact.

## Core idea

**Human work, matched with clarity.**

Use a mostly black-and-ivory editorial system with Kairos magenta as a restrained action color. Storytelling should focus on people rather than software dashboards. Each section pairs a short message with a simple line illustration that explains the next step in the Kairos journey.

## Visual language

- **Canvas:** warm ivory (`#F7F5F0`) page on a soft grey outer background (`#E9E8E5`).
- **Ink:** near-black (`#191919`) for type, rules, and illustrations.
- **Brand accent:** Kairos magenta (`#C2185B`) for primary CTA, active states, small highlights, and focus indicators.
- **Typography:** high-contrast editorial serif for major headings; clean sans-serif for navigation, body copy, buttons, and labels.
- **Illustration:** custom monochrome line art with solid black fills and minimal magenta details. Characters should represent diverse global talent and business teams.
- **Texture:** optional subtle paper grain at very low opacity. Never reduce text contrast or make background look dirty.
- **Shape:** mostly square editorial panels, thin rules, and soft button pills. Avoid glassmorphism, heavy gradients, and dense floating product cards.

## Desktop composition

Page sits inside a centered editorial canvas, maximum width about `1440px`, with grey gutters visible on large screens.

### 1. Header

- Kairos wordmark on left.
- Compact navigation on desktop: `For Companies`, `For Talent`, `How It Works`, `About`.
- Right side: audience switch or sign-in link plus compact menu icon.
- Header stays visually light and does not compete with hero.
- Mobile collapses navigation into accessible menu button.

### 2. Hero

- Center-aligned editorial headline:
  - Company path: **Global talent, matched with clarity.**
  - Talent path: **Global opportunities, built around you.**
- One short supporting paragraph, maximum two lines on desktop.
- Primary CTA:
  - Company: `Send your scope`
  - Talent: `Join early access`
- Secondary text link beneath or beside primary CTA:
  - Company: `Explore talent`
  - Talent: `See how Kairos works`
- Wide monochrome illustration anchors bottom of hero. Suggested scene: founders, recruiters, independent talent, and remote collaborators connected through Kairos while working in different ways.
- Illustration may use tiny looping motion—notification pulse, cursor line, or gentle character movement—but remains still when reduced motion is enabled.

### 3. Problem / promise panel

Large inset white panel, visually similar to reference lower card.

- Heading: **Hiring should feel human again.**
- Copy explains that Kairos combines vetted global talent, clear matching, and human support.
- Horizontal illustration shows a company brief moving toward a matched professional.
- Three concise proof points: `Vetted talent`, `Clear introductions`, `Human-led support`.

### 4. How Kairos works

Three editorial story rows, alternating copy and illustration:

1. **Tell us what you need** — company shares scope, role, and priorities.
2. **Meet relevant talent** — Kairos reviews and introduces suitable people.
3. **Move forward with confidence** — interviews, communication, and next steps stay clear.

Talent intent swaps copy to profile, verification, and opportunity discovery while preserving same layout.

### 5. Dual audience split

Two large monochrome panels:

- **For companies:** brief value statement and `Find talent` CTA.
- **For talent:** profile/opportunity statement and `Join Kairos` CTA.

Hover or focus adds magenta underline or border; content must not depend on hover.

### 6. Trust and proof

- Minimal stats or verified claims only; no invented customer counts or placement rates.
- Existing testimonials, partner marks, or case studies can appear in a restrained single-row treatment.
- If verified proof is unavailable, use process assurances instead of placeholder metrics.

### 7. Closing CTA

- Large serif statement: **Ready for a clearer way to connect?**
- One audience-aware primary action and one secondary link.
- Monochrome illustration closes visual story without repeating hero scene.

### 8. Footer

- Compact sitemap, legal links, social links, and copyright.
- Ivory or black background with strong contrast.
- Keep existing policy, privacy, terms, and contact destinations.

## Responsive behavior

- **Desktop (`>= 1024px`):** centered canvas, wide illustration scenes, alternating story rows.
- **Tablet (`768–1023px`):** smaller gutters, simplified illustration crops, two-column sections where space permits.
- **Mobile (`< 768px`):** edge-to-edge canvas, single-column content, headline around `44–56px`, CTAs easy to tap, illustrations cropped by composition rather than scaled into unreadable detail.
- Preserve reading order when layouts stack: heading, copy, action, illustration.
- Avoid horizontal overflow at `320px` viewport width.

## Interaction and accessibility

- Use semantic landmarks and one clear `h1`.
- Visible keyboard focus using Kairos magenta with sufficient contrast.
- Buttons and menu targets minimum `44px` high.
- Decorative illustrations use empty alt text; informative scenes get concise alt text.
- Respect `prefers-reduced-motion` and disable non-essential animation.
- Maintain WCAG 2.2 AA contrast for text and controls.
- Audience intent remains functional and changes copy/CTA destinations without layout jump.
- Existing modals, consent controls, authentication links, and analytics behavior remain wired.

## Asset plan

Preferred deliverables:

- `hero-company.svg`
- `hero-talent.svg`
- `how-it-works-brief.svg`
- `how-it-works-match.svg`
- `how-it-works-connect.svg`
- `closing-cta.svg`
- Optional seamless paper texture, optimized WebP/AVIF under `100 KB`

SVG artwork should use a small shared palette, have descriptive filenames, and avoid embedded raster images. Temporary generic illustrations should not ship as final assets.

## Implementation map

- `src/app/page.tsx`: retain current audience-intent routing.
- `src/components/layout/prelaunch-landing.tsx`: company version of Design 2.
- `src/components/layout/talent-prelaunch-landing.tsx`: talent version of Design 2.
- `src/components/layout/header.tsx`: editorial header and responsive menu.
- `src/components/layout/footer.tsx`: simplified footer treatment.
- `src/app/globals.css`: tokens, typography, canvas, section layout, motion, and responsive rules.
- `public/illustrations/design-2/`: final optimized illustration assets.

Shared section components should accept audience-specific content rather than duplicating full layouts.

## Suggested design tokens

```css
--design-2-page: #e9e8e5;
--design-2-canvas: #f7f5f0;
--design-2-panel: #ffffff;
--design-2-ink: #191919;
--design-2-muted: #68645f;
--design-2-brand: #c2185b;
--design-2-rule: #d8d4cd;
--design-2-radius-pill: 999px;
--design-2-content-width: 1440px;
```

## Acceptance criteria

- Landing page clearly reflects reference's editorial monochrome mood while remaining recognizably Kairos.
- Company and talent intent paths both render correct copy and working actions.
- No fabricated metrics, testimonials, or platform capabilities.
- Layout works at `320px`, `768px`, `1024px`, and `1440px` widths.
- Keyboard navigation, focus states, contrast, semantic headings, and reduced-motion behavior pass review.
- Illustrations stay sharp, optimized, and non-blocking during page load.
- Core landing content remains useful if animations or JavaScript-enhanced effects are unavailable.
- Existing business inquiry, signup, sign-in, policy, consent, and navigation flows remain connected.

## Out of scope for concept phase

- Rebuilding authenticated dashboard screens.
- Changing backend matching logic or API contracts.
- Publishing unverified business claims.
- Copying reference artwork, brand name, or exact typography.

