# Kairos Nexus Global Design System

**Design dials:** variance 6/10, motion 5/10, density 3/10

## Direction

Kairos uses a restrained editorial system: warm neutral canvases, generous whitespace, centered clarity in the hero, and asymmetric structure below it. The interface should feel human, credible, and contemporary. Avoid ornamental effects that compete with the message.

## Color

| Role | Light | Dark |
| --- | --- | --- |
| Brand and primary action | `#C2185B` | `#C2185B` |
| Page canvas | `#F7F7F5` | `#141414` |
| Raised panel | `#FFFFFF` | `#1D1D1D` |
| Primary text | `#171717` | `#F5F5F2` |
| Secondary text | `#5F5F5B` | `#B7B7B2` |
| Hairline border | `rgba(0,0,0,.10)` | `rgba(255,255,255,.10)` |

Use raspberry as the single accent. Gradients are reserved for the dimensional shading inside the hero sculptures and must not become page backgrounds or button decoration.

## Typography

- Family: Manrope Variable
- Display: 500 weight, tight tracking, compact leading
- Body: 400 to 500 weight, comfortable leading
- Labels: 600 weight, uppercase only for short eyebrows
- Hero headline: no more than two lines
- Body copy: generally 50 to 65 characters per line

## Shape and spacing

- Hero and major editorial panels: `28px` radius
- Buttons, inputs, and compact controls: fully pill-shaped
- Small information cards: `20px` to `24px` radius
- Section rhythm: `96px` mobile-to-tablet maximum, `144px` desktop
- Content width: `1440px` outer shell, narrower text measures within sections

## Components

### Header

Fixed translucent shell with subtle blur and border. Preserve the company/talent audience switch, primary navigation, theme control, and one raspberry action. On mobile, place navigation in a clearly labelled menu rather than compressing every link.

### Hero

Use a white or dark raised panel that fits the first viewport. Center the eyebrow, two-line value proposition, concise supporting copy, and two actions. Dimensional raspberry-and-neutral capsule sculptures enter from the left and right edges. There is no hero photograph. Place the trust row at the bottom of the hero panel.

### Buttons

- Primary: raspberry fill, white text, Phosphor arrow where helpful
- Secondary: transparent or raised neutral surface with a hairline border
- Minimum interactive height: `44px`
- Hover: color or elevation shift only; do not resize the control
- Focus: visible brand-colored ring

### Icons

Use Phosphor Icons exclusively for the landing experience. Keep a consistent stroke weight and use icons to clarify meaning, never as decoration.

### Cards and imagery

Use asymmetric editorial grids with hierarchy between cards. Lower-page photography may support categories or founder stories, but should not replace the hero’s typographic composition. Avoid generic four-card feature rows and excessive boxed content.

## Motion

- Initial hero reveal: opacity plus short vertical translation, `450ms` to `650ms`
- Section reveal: subtle opacity and `16px` to `24px` translation
- Stagger siblings by `60ms` to `100ms`
- Hero sculptures may drift very slowly with low amplitude
- Use physical easing without conspicuous bounce
- Respect `prefers-reduced-motion`; remove nonessential movement and shorten transitions

## Responsive behavior

- Verify at 375, 768, 1024, and 1440 pixels
- Keep the hero’s message and primary action visible without horizontal overflow
- Let sculptures crop beyond the panel edges on compact screens
- Stack CTAs on narrow phones
- Convert dense grids to one column while preserving information order
- Keep all tap targets at least 44 by 44 pixels

## Avoid

- Hero photography
- Purple or multicolor gradient surfaces
- Decorative glass cards everywhere
- Oversized copy that crowds out the primary action
- Emoji or mixed icon libraries
- Scroll-jacking, large parallax, or motion that ignores reduced-motion settings
- Em dashes or en dashes in visible marketing copy

## Pre-delivery checks

- [ ] Company and talent variants share the same visual grammar
- [ ] Phosphor is the only landing icon family
- [ ] Light and dark themes maintain contrast
- [ ] Keyboard focus is visible
- [ ] 375px layout has no horizontal scroll
- [ ] Hero contains no raster photograph
- [ ] Reduced-motion mode is functional
- [ ] Build, typecheck, and targeted lint pass
