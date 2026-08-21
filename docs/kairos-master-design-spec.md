# Kairos Nexus Global Master Design System

**Design dials:** variance 7/10, motion 5/10, density 4/10

## Purpose

This specification defines the visual and interaction system for the Kairos Nexus Global public landing experience. It translates the supplied editorial reference into an original Kairos system built around global talent, trusted introductions, early access, and human-led matching.

The system must support both company and talent intent without creating two unrelated websites. Copy, actions, audience state, modals, external app links, authentication, consent, analytics, and accessibility behavior remain functional while presentation follows this document.

## Direction

Kairos uses a human editorial collage system: warm neutral canvases, expressive typography, cutout vector scenes, hand-drawn directional marks, bold color fields, generous whitespace, and asymmetric story sections.

The experience should feel:

- Human before technical
- Credible before promotional
- Global without using generic world maps
- Energetic without becoming childish
- Editorial rather than dashboard-like
- Distinctive while remaining easy to scan

The visual story moves from a clear promise to process, proof, audience context, and action. Decorative elements must reinforce connection, verification, movement, or opportunity.

## Experience principles

### 1. Message first

Every section has one dominant idea. Illustration, annotation, and color support that idea rather than compete with it.

### 2. One system, two intents

Company and talent variants share layout, tokens, components, and motion. Only relevant copy, illustration details, links, and actions change.

### 3. Human-led truth

Present current concierge matching and early-access status accurately. Do not imply automated matching, guaranteed work, immediate placement, or unavailable platform functionality.

### 4. Editorial rhythm

Alternate quiet whitespace with focused visual moments. Avoid making every section a card grid or every surface a container.

### 5. Evidence over decoration

Use real partnerships, founders, process assurances, testimonials, and verified claims. Never invent customer totals, placement rates, savings, rankings, or outcomes.

## Color

| Role | Light | Dark |
| --- | --- | --- |
| Brand and primary action | `#C2185B` | `#D52A6D` |
| Brand hover | `#A3154D` | `#E13B7B` |
| Page canvas | `#F7F5F0` | `#141414` |
| Quiet canvas | `#EFEDE7` | `#191919` |
| Raised panel | `#FFFFFF` | `#1D1D1D` |
| Primary text | `#171717` | `#F5F5F2` |
| Secondary text | `#5F5F5B` | `#B7B7B2` |
| Muted text | `#777773` | `#999995` |
| Hairline border | `rgba(0,0,0,.10)` | `rgba(255,255,255,.12)` |
| Positive accent | `#76D85B` | `#88E56E` |
| Warm story accent | `#FF7A3D` | `#FF8B55` |
| Highlight accent | `#FFC928` | `#FFD451` |

### Color rules

- Raspberry remains the only persistent brand accent.
- Green, orange, and yellow appear only inside editorial story panels, illustration details, tags, or proof moments.
- Never place all accent colors in one viewport unless they belong to one composed illustration.
- Gradients are allowed only for subtle dimensional shading inside artwork.
- Page backgrounds, buttons, navigation, and cards use solid colors.
- Dark mode must define explicit foreground and background colors for every filled button.
- Never rely on hover to make text readable.

## Typography

### Families

- UI and body: `Manrope Variable`
- Editorial display: `Fraunces Variable` or another licensed high-contrast variable serif
- Handwritten annotations: one licensed handwritten family, used sparingly and never for required instructions
- Fallback display: `Georgia`, `Times New Roman`, serif

### Scale

| Role | Mobile | Desktop | Weight | Leading |
| --- | --- | --- | --- | --- |
| Hero display | `48px` to `64px` | `80px` to `112px` | 500 | `.92` to `1.0` |
| Section display | `38px` to `52px` | `56px` to `76px` | 500 | `1.0` to `1.08` |
| Card heading | `22px` to `30px` | `24px` to `34px` | 550 to 650 | `1.15` |
| Large body | `17px` to `19px` | `18px` to `20px` | 400 to 500 | `1.6` |
| Standard body | `15px` to `17px` | `16px` to `18px` | 400 to 500 | `1.6` |
| Label | `11px` to `12px` | `11px` to `13px` | 650 | `1.4` |

### Typography rules

- Hero headline uses no more than three short visual lines.
- Main display copy uses editorial serif for emphasis and Manrope for supporting copy.
- Handwritten type is limited to annotations, section kickers, quoted emphasis, and directional notes.
- Body copy stays between 50 and 65 characters per line.
- Uppercase is limited to short eyebrows and metadata.
- Use sentence case for controls and navigation.
- Do not use em dashes or en dashes in visible marketing copy.
- Do not imitate handwriting with transformed standard fonts.

## Shape and spacing

### Radius

- Outer landing canvas: `32px` to `48px` on large screens
- Hero and major editorial panels: `28px` to `36px`
- Small information cards: `18px` to `24px`
- Buttons and compact controls: fully pill-shaped
- Tags and annotation labels: `8px` to `12px`
- Mobile outer canvas: `0px` to `24px`, depending on available gutter

### Spacing

- Base spacing unit: `4px`
- Common component gaps: `8px`, `12px`, `16px`, `24px`, `32px`
- Section padding: `80px` to `96px` mobile and tablet
- Section padding: `112px` to `144px` desktop
- Outer content width: `1440px`
- Reading width: `560px` to `720px`
- Full-bleed artwork may exceed the content column but must remain clipped by its intended section

## Layout grammar

### Quiet sections

Use large whitespace, restrained type, and one illustration or proof element. These sections establish clarity and pacing.

### Story sections

Use asymmetric two-column compositions with one dominant visual field. Copy occupies 35 to 45 percent; artwork occupies 55 to 65 percent.

### Proof bands

Use horizontal partner, assurance, or outcome bands between major sections. Proof bands have lower visual weight than the hero and story panels.

### Color fields

Use one strong accent surface for a complete idea, such as platform context, audience selection, or a closing CTA. Do not wrap unrelated content in the same color field.

### Collage sections

Combine a primary cutout subject with a maximum of five supporting marks such as arrows, stars, labels, speech bubbles, verification shapes, or cropped screenshots.

## Components

### Header

- Fixed or sticky within the page canvas.
- Light mode uses a warm translucent surface with subtle blur and a hairline border.
- Dark mode uses a near-black translucent surface with readable controls.
- Keep Kairos logo and name on the left.
- Preserve company and talent audience switch.
- Preserve primary navigation, theme control, sign-in state, account state, and one audience-aware primary action.
- Company action opens the existing scope modal.
- Talent header does not show a duplicate join action when the hero already provides the relevant platform path.
- Mobile uses a labelled menu with focus trapping, Escape handling, and clear intent controls.
- Header must never cover the hero eyebrow or headline.

### Hero

The hero uses a centered editorial composition with an original Kairos vector illustration.

- Eyebrow communicates current availability or early-access state.
- Headline carries one main promise.
- Supporting copy stays concise and accurate.
- Company intent shows `Send your scope` as the primary action.
- Talent intent shows the platform-preview action without a duplicate join button.
- Company primary button uses dark ink in light mode and a high-contrast light fill with dark text in dark mode.
- Primary hover may become raspberry with white text.
- Trust highlights sit below the illustration or at the bottom edge of the hero.
- Current hero artwork source: `/vector.svg`.
- Hero artwork remains decorative with empty alt text unless it contains information unavailable in nearby copy.
- Artwork may crop beyond the canvas on mobile but cannot cause horizontal scrolling.
- No raster photograph is used as the hero background.

### Hero illustration art direction

The vector scene should communicate Kairos through people and actions rather than abstract software symbols alone.

Approved subjects:

- A business sharing a clear request
- Kairos reviewing or connecting information
- Global professionals preparing profiles or working
- A trusted introduction between people
- Verification, communication, and opportunity moments

Approved visual treatment:

- Black or near-black primary shapes
- Warm ivory negative space
- Raspberry connection lines and active moments
- Optional green, orange, or yellow micro-accents
- Cutout figures, flat vector fields, and clean line work
- Hand-drawn arrows or labels that explain flow

Avoid generic world maps, floating dashboards, stock icon clouds, cryptocurrency imagery, and meaningless network nodes.

### Buttons

- Primary: raspberry fill with white text, or high-contrast editorial ink treatment where specified.
- Secondary: transparent or raised neutral surface with a hairline border.
- Minimum interactive size: `44px` by `44px`.
- Button text uses Manrope at 600 to 700 weight.
- Phosphor arrow may clarify destination or progression.
- Hover changes color, border, or elevation without changing control size.
- Focus uses a visible raspberry ring with sufficient offset.
- Disabled state must remain readable and cannot rely on opacity alone.

### Icons

- Use Phosphor Icons exclusively across the landing experience.
- Use one consistent visual weight within each component group.
- Icons clarify actions, categories, or process states.
- Decorative marks should be drawn as part of the illustration system, not imported from another icon library.
- Do not use emoji as product or marketing icons.

### Process steps

- Present current company process in order: request, review, source and match, engagement.
- Present talent process in order: profile, verification readiness, consideration as demand grows.
- Desktop may use an editorial timeline or paired copy and visual progression.
- Mobile stacks steps in semantic order.
- Numbers remain secondary to step titles.
- Avoid four identical feature cards when a connected narrative communicates the process better.

### Category presentation

- Use an asymmetric editorial grid.
- Give one or two priority categories larger visual weight.
- Keep category descriptions concise.
- Use illustrations or Phosphor icons only when they clarify category meaning.
- `Ask for another specialty` remains available on the company path.

### Trust and partner proof

- Show only approved partner logos, awards, testimonials, or process assurances.
- Partner logos remain legible and have consistent visual height.
- Avoid continuous marquees when they reduce readability or create motion noise.
- Use a static proof band by default.
- When no verified metric exists, show an assurance instead of a placeholder number.

### Testimonials

- Use one dominant quote per section.
- Include real name, role, organization, and approved portrait only when permission exists.
- Quote text must not be edited into a stronger claim without approval.
- Handwritten annotation may highlight one short phrase but cannot replace the accessible quote text.

### Platform context

- Clearly distinguish current human-led service from platform functionality still in progress.
- Use a bold accent panel with a real product screenshot only when screenshot reflects current behavior.
- Current limitations remain visible near preview actions.
- Do not represent concept UI as live product UI.

### Cofounders

- Use real portraits and approved biographies.
- Prefer asymmetric portrait crops with editorial captions.
- Keep biographies concise on landing page and link to deeper company context.
- Do not apply novelty filters that reduce credibility.

### Footer

- Use a near-black closing field in both themes, with accessible light text.
- Include Kairos positioning line, platform links, company links, legal links, social destinations, and contact information.
- Preserve newsletter action only when current destination works.
- Use one angled or clipped upper edge as the main decorative gesture.
- Keep policy and emergency-style information clearly separated from marketing copy.
- Footer links must remain keyboard accessible and visibly focused.

## Page architecture

### Shared opening

1. Header
2. Audience-aware hero
3. Trust or partner proof band

### Company path

1. How Kairos works today
2. Who we serve
3. Talent categories
4. Platform progress and limitations
5. Why Kairos
6. Trust and proof
7. Cofounders
8. Closing scope CTA
9. Footer

### Talent path

1. Early-access journey
2. Readiness checklist
3. Platform context and limitations
4. Why Kairos
5. Trust and proof
6. Cofounders
7. Closing profile or preview CTA
8. Footer

## Imagery and asset production

### Photography

- Use real or licensed portraits with natural expressions and credible work contexts.
- Prefer warm daylight, honest environments, and direct eye contact.
- Avoid staged handshake imagery, headset stereotypes, and generic office teams.
- Use cutout portraits only when edge quality is production-ready.

### Vector illustration

- Use SVG for hero scenes, arrows, stars, labels, speech bubbles, and simple diagrams.
- Keep a consistent stroke width and palette across all scenes.
- Optimize paths and remove editor metadata where legally and technically appropriate.
- SVGs must define a `viewBox` and scale without fixed-layout assumptions.
- Decorative SVGs use empty alt text when embedded as images.

### Product screenshots

- Use current product data or clearly anonymized realistic data.
- Do not expose personal, confidential, or production information.
- Screenshots must remain legible at intended rendered size.
- Label conceptual screens as previews.

## Motion

- Initial hero reveal: opacity plus `16px` to `24px` vertical translation over `450ms` to `650ms`.
- Stagger hero siblings by `60ms` to `100ms`.
- Section reveal: subtle opacity and translation only.
- Hand-drawn arrows may trace once when entering viewport.
- Illustration accents may drift by no more than `4px` to `8px`.
- Hover transitions run between `160ms` and `280ms`.
- Use `cubic-bezier(0.22, 1, 0.36, 1)` for primary reveal motion.
- Avoid conspicuous bounce, looping rotation, scroll-jacking, and large parallax.
- `prefers-reduced-motion: reduce` removes nonessential movement and reveal delays.
- Content remains visible when animation does not execute.

## Responsive behavior

### Required review widths

- `375px`
- `768px`
- `1024px`
- `1440px`

### Mobile

- Preserve order: eyebrow, headline, body, action, illustration, trust.
- Stack actions at full or near-full width.
- Keep important copy above decorative illustration detail.
- Crop artwork intentionally without hiding its primary subject.
- Convert editorial grids to one column while preserving semantic order.
- Remove outer page rounding when it wastes critical horizontal space.
- Keep every tap target at least `44px` by `44px`.
- No horizontal scrolling at `320px` or `375px`.

### Tablet

- Use two-column story layouts where copy remains at least `320px` wide.
- Simplify collage annotations before shrinking readable content.
- Allow proof bands to wrap into balanced rows.

### Desktop

- Preserve generous gutters around a maximum `1440px` canvas.
- Use asymmetric compositions rather than centering every section.
- Keep text measures narrow even when artwork is full width.

## Dark mode

- Dark mode is designed, not automatically inverted.
- Preserve raspberry brand identity without neon glow.
- Photography retains natural color unless a deliberate monochrome treatment is approved.
- Vector artwork may use alternate fills when its light palette loses contrast.
- Raised surfaces need a visible boundary against page canvas.
- Filled light buttons use dark text.
- Filled raspberry buttons use white text.
- Secondary text meets WCAG 2.2 AA contrast against its actual surface.

## Accessibility

- Use one `h1` per page.
- Preserve semantic heading order.
- Use landmarks for header, navigation, main content, and footer.
- Decorative imagery uses empty alt text.
- Informative imagery receives concise purpose-based alt text.
- Do not place required information only inside an image.
- Focus remains visible in both themes.
- Modal focus trapping, Escape handling, return focus, and accessible labels remain functional.
- Audience switch uses `aria-pressed` or equivalent state semantics.
- Color is never the only indicator of state.
- Body text supports browser zoom to 200 percent without clipping.

## Content rules

- Use `attendee`, `professional`, `talent`, `company`, or `business` according to actual context.
- Avoid hype words such as revolutionary, guaranteed, instant, effortless, and perfect.
- Do not promise placement or immediate work.
- Keep current platform limitations near related actions.
- CTA labels describe the next action clearly.
- Avoid em dashes and en dashes in visible copy.
- Avoid unexplained acronyms.
- Keep headings direct and sentence case.

## Functional invariants

- Company `Send your scope` opens the existing business inquiry modal.
- Schedule call actions open the existing scheduling flow.
- Talent platform links use the existing app URL helper.
- Sign-in destination remains unchanged.
- Audience intent persists through the existing provider.
- Switching intent from another route returns to the correct landing experience.
- Theme preference remains functional.
- Cookie consent and analytics behavior remain connected.
- Existing legal, policy, contact, social, and newsletter links remain intact.
- Visual redesign must not replace API-backed behavior with mocks.

## CSS tokens

```css
:root {
  --kairos-brand: #c2185b;
  --kairos-brand-hover: #a3154d;
  --kairos-canvas: #f7f5f0;
  --kairos-canvas-quiet: #efede7;
  --kairos-panel: #ffffff;
  --kairos-ink: #171717;
  --kairos-muted: #5f5f5b;
  --kairos-hairline: rgba(0, 0, 0, 0.10);
  --kairos-positive: #76d85b;
  --kairos-warm: #ff7a3d;
  --kairos-highlight: #ffc928;
  --kairos-radius-panel: 28px;
  --kairos-radius-card: 22px;
  --kairos-radius-control: 999px;
  --kairos-content-width: 1440px;
  --kairos-reading-width: 65ch;
  --kairos-focus: 0 0 0 3px rgba(194, 24, 91, 0.30);
}

.dark {
  --kairos-canvas: #141414;
  --kairos-canvas-quiet: #191919;
  --kairos-panel: #1d1d1d;
  --kairos-ink: #f5f5f2;
  --kairos-muted: #b7b7b2;
  --kairos-hairline: rgba(255, 255, 255, 0.12);
}
```

## Avoid

- Hero photography used as a full background
- Purple or multicolor gradient page surfaces
- Decorative glass cards across every section
- Generic equal-width feature rows
- Oversized copy that pushes the action out of the first viewport
- Doodles without narrative purpose
- Mixed icon libraries
- Emoji as interface icons
- Generic world maps and meaningless connection nodes
- Fake dashboards or concept screens presented as live product
- Fabricated metrics, testimonials, partner claims, or outcomes
- Scroll-jacking, large parallax, cursor trails, and constant looping motion
- Low-contrast dark-mode controls
- Hover-dependent readability
- Em dashes or en dashes in visible marketing copy

## Implementation map

- `src/app/page.tsx`: intent-based landing routing
- `src/components/layout/client-layout.tsx`: public shell and global landing providers
- `src/components/layout/header.tsx`: navigation, intent control, theme, authentication, primary action
- `src/components/layout/landing-hero.tsx`: shared audience-aware hero
- `src/components/layout/prelaunch-landing.tsx`: company story architecture
- `src/components/layout/talent-prelaunch-landing.tsx`: talent story architecture
- `src/components/layout/why-kairos-section.tsx`: differentiated value story
- `src/components/layout/trust-section.tsx`: approved proof and partnerships
- `src/components/layout/cofounders.tsx`: founder story and portraits
- `src/components/layout/footer.tsx`: navigation, contact, social, newsletter, legal
- `src/app/globals.css`: tokens, typography, layout, motion, responsive behavior
- `public/vector.svg`: current hero illustration
- `public/illustrations/`: future optimized story assets

Shared components accept audience-specific content. Do not duplicate complete company and talent layouts when structure and behavior are identical.

## Pre-delivery checks

### Visual

- [ ] Company and talent variants share the same visual grammar
- [ ] Hero has one clear focal point
- [ ] Editorial collage elements support the message
- [ ] Doodles have narrative purpose
- [ ] No section looks like a generic template feature grid
- [ ] Accent colors remain controlled
- [ ] Dark mode is deliberately styled

### Content and truth

- [ ] No fabricated metrics, testimonials, partnerships, or platform claims
- [ ] Current human-led process remains clear
- [ ] Talent registration does not imply guaranteed work
- [ ] Platform limitations remain visible
- [ ] Visible marketing copy contains no em dashes or en dashes

### Accessibility

- [ ] One `h1` and correct heading order
- [ ] Keyboard focus is visible
- [ ] Audience controls expose selected state
- [ ] Modals trap and restore focus correctly
- [ ] Images have appropriate alt treatment
- [ ] Reduced-motion mode is functional
- [ ] Light and dark themes maintain WCAG 2.2 AA contrast

### Responsive

- [ ] Reviewed at `375px`, `768px`, `1024px`, and `1440px`
- [ ] `320px` and `375px` layouts have no horizontal scroll
- [ ] CTAs stack cleanly on narrow screens
- [ ] Hero illustration crops intentionally
- [ ] Dense grids preserve information order when stacked
- [ ] Tap targets are at least `44px` by `44px`

### Functional

- [ ] Company scope action opens correct modal
- [ ] Talent preview action opens correct destination
- [ ] Audience switching works from landing and secondary routes
- [ ] Theme control works
- [ ] Sign-in and account states work
- [ ] Consent and analytics remain connected
- [ ] Footer, policy, contact, social, and newsletter links work

### Engineering

- [ ] SVG and raster assets are optimized
- [ ] No new layout shift from hero media
- [ ] Typecheck passes
- [ ] Targeted lint passes
- [ ] Production build passes
- [ ] Browser review passes in light and dark modes
- [ ] Live modal, navigation, and external-link flows are manually verified
