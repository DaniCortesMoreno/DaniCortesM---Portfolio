---
name: Obsidian Precision
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#4cd7f6'
  on-tertiary: '#003640'
  tertiary-container: '#009eb9'
  on-tertiary-container: '#002f38'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 3.5rem
    fontWeight: '600'
    lineHeight: 3.75rem
    letterSpacing: -0.035em
  display-sm:
    fontFamily: Geist
    fontSize: 2.5rem
    fontWeight: '600'
    lineHeight: 2.75rem
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Geist
    fontSize: 2rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: 1.5rem
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Geist
    fontSize: 1.0625rem
    fontWeight: '500'
    lineHeight: 1.375rem
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: 0em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: -0.01em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '400'
    lineHeight: 0.875rem
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 1.5rem
  margin-lg: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style
The design system channels the uncompromising rigor of high-velocity engineering tools, keyboard-first workflows, and software artisan culture. The aesthetic embodies "Dev-Tools Minimalist" and "Linear-inspired" paradigms: dark, dense, fast, and engineered to stay out of the builder's way while offering exceptional tactile fidelity.

### Target Audience & Emotional Intent
- **Audience:** Senior software engineers, system architects, technical founders, and technical product operators who demand density, efficiency, and zero visual clutter.
- **Emotional Response:** Surgical precision, calm focus, speed, and premium craftsmanship. Every interaction feels instant, deterministic, and tactile.

### Design Movement: Dark Technical Minimal & Specular Glass
A synthesis of dark technical minimalism and restrained dark glassmorphism. Surfaces are pitch-black to deep obsidian, structured not through bright borders or loud fills, but through hairline perimeter borders (1px hairline at 8–10% white opacity), micro-glow highlights (spotlights), and subtle tonal stepping. Gradients are never decorative fills; they manifest strictly as specular reflections, focused active glows, and state indicators.

## Colors

### Surface Hierarchy & Contrast Tokens
The system relies on an ultra-dark scale to preserve contrast and prevent eye fatigue during prolonged use:
- **Canvas Base (`#0A0A0A`):** The master canvas, unlit and infinite.
- **Surface Layer 1 (`#121212`):** Primary panel containers, sidebars, and structural rails.
- **Surface Layer 2 (`#18181B`):** Elevated cards, bento cells, nested containers, input backgrounds.
- **Surface Layer 3 (`#27272A`):** Dropdowns, popovers, hovering elements, command palette surfaces.

### Technical Accent & Glow System
Accents function with precision:
- **Electric Indigo (`#6366F1`) & Violet (`#8B5CF6`):** The primary focus continuum. Used for active focus rings, critical state toggles, and directional linear gradients across interactive surfaces.
- **Electric Cyan (`#06B6D4`):** Telemetry, live indicators, runtime states, and synthetic highlights.
- **Hairline Strokes (`rgba(255, 255, 255, 0.08)` / `#222222`):** Exact 1px perimeter definition on all containers, eliminating ambiguous boundaries.

### Foreground & Typography Palette
- **High-Contrast Text (`#EDEDED`):** Direct headings, active tabs, and primary metrics.
- **Muted Body (`#A1A1AA`):** Standard reading level, optimized for contrast ratios above 7:1 against `#121212`.
- **Dimmed Metadata (`#71717A`):** Secondary timestamps, shortcut keys, disabled attributes, and inline syntax labels.

## Typography

### Structural Role Assignment
- **Geist (Headlines & Structural Display):** Engineered for ultra-tight tracking, modern vertical metrics, and geometric precision. Tight negative tracking (`-0.02em` to `-0.035em`) produces the signature compact, high-density look of high-performance dev dashboards.
- **Inter (Body & Content Flow):** Selected for screen neutrality, legible tall x-height, and neutral neutral rendering over pitch-dark backgrounds.
- **JetBrains Mono (Telemetry, Metadata & Shortcuts):** Monospaced utility for commit hashes, shortcuts (`⌘K`), line numbers, status flags, and table metrics.

### Typographic Hierarchy Rules
- Never use uppercase transforms on Inter body text. Uppercase is reserved strictly for `label-sm` monospaced tags with widened letter-spacing (`0.02em` to `0.04em`).
- Headings never exceed `font-weight: 600`. Visual hierarchy is established through size and tracking rather than excessive weight.

## Layout & Spacing

### Grid Philosophy: Bento-Box Matrix & Modular Panels
The layout model follows a structured Bento-Box layout framework utilizing a 12-column variable fluid grid. Visual tension and interest are created through asymmetric modular spans (e.g., 8-col primary workbench paired with a 4-col telemetry inspector, or 4-4-4 tri-card splits).

### Responsive Reflow & Breakpoints
- **Desktop (≥ 1280px):** 12-column grid, `gutter-lg` (1.5rem), `margin-lg` (2rem). Persistent collapsible rail navigations, multi-pane bento grids with spotlight tracking.
- **Tablet / Small Desktop (768px – 1279px):** 6-column grid, `gutter` (1rem), `margin-md` (1.5rem). Secondary inspector panels collapse into sliding drawers or overlay sheets. Bento layouts fold into stacked 2-column modules.
- **Mobile (< 768px):** 1-column linear flow, `margin` (1rem). Bento boxes de-span into full-width vertical cards. Toolbars and command trigger rows anchor to bottom sticky controls for thumb reach.

### Spacing Density
Information density is kept compact:
- Padding inside cards and modules adheres to `space-lg` (1rem) or `space-xl` (1.5rem).
- Inter-element gaps within component groups (toolbars, list items, tag collections) use tight intervals of `space-xs` (0.25rem) to `space-sm` (0.5rem).

## Elevation & Depth

### Depth Philosophy: Pure Surface Stratification & Specular Glows
Rather than traditional drop shadows, depth is achieved through ambient light simulation on obsidian materials:

1. **Hairline Outlines (1px Ghost Borders):**
   Every elevated card, modal, or floating panel features an inner or outer hairline border: `border: 1px solid rgba(255, 255, 255, 0.08)`. This creates distinct mechanical edges without contrast pollution.
2. **Radial Spotlight Tracking (Hover Ingress):**
   Containers employ interactive dynamic spotlights: an ephemeral radial gradient (`radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)`) that reveals the container's surface on hover.
3. **Layered Tonal Surfaces:**
   - **Level 0 (Canvas):** `#0A0A0A`
   - **Level 1 (Card / Frame):** `#121212` with 1px border `rgba(255,255,255,0.06)`
   - **Level 2 (Hovered Card / Active Area):** `#18181B` with top-edge specular highlight (`linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)`)
   - **Level 3 (Command Palettes / Context Overlays):** `#18181B` backed by `backdrop-filter: blur(16px)` and an ambient, colored shadow: `0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px 0 rgba(99, 102, 241, 0.1)`.

## Shapes

### Edge Architecture
The design system adopts a **Soft (Level 1)** geometric standard. Curvature is kept low to reinforce engineering precision and align cleanly with hairline strokes:
- Standard interactive elements (buttons, inputs, dropdown items, badges): `0.25rem` (4px).
- Containers, Bento cells, and cards: `0.5rem` (8px).
- Modals, large panels, and command surfaces: `0.75rem` (12px).
- Full pills are strictly reserved for status pips and binary state badges (`border-radius: 9999px`).

## Components

### Buttons
- **Primary:** Background of `#EDEDED`, text `#0A0A0A`, font `Geist` medium (13px), radius 4px. Subtle hover brightness (`#FFFFFF`) with a faint white specular glow (`box-shadow: 0 0 12px rgba(255, 255, 255, 0.25)`).
- **Secondary (Ghost Outline):** Background `#121212`, border 1px `rgba(255, 255, 255, 0.1)`, text `#EDEDED`. Hover switches border to `rgba(255, 255, 255, 0.2)` and background to `#18181B`.
- **Accent Interactive:** Linear gradient background (`135deg, #6366F1, #8B5CF6`), text `#FFFFFF`, with an active inset top highlight `rgba(255, 255, 255, 0.2)`.

### Cards & Bento Cells
- Flat background of `#121212` or translucent `#121212CC` with `backdrop-filter: blur(12px)`.
- Enclosed with a 1px border of `rgba(255, 255, 255, 0.08)`.
- Internal top border specular highlight: a 1px pseudo-element gradient fading from transparent to `rgba(255, 255, 255, 0.12)` to transparent.

### Inputs & Search Bars
- Background `#121212`, border 1px `rgba(255, 255, 255, 0.1)`, font `Inter` (13px), text `#EDEDED`, placeholder text `#71717A`.
- **Focus State:** 1px border `#6366F1`, paired with a diffuse accent glow: `box-shadow: 0 0 0 1px #6366F1, 0 0 12px rgba(99, 102, 241, 0.3)`.

### Command Palette (K-Bar)
- Modal floating container centered at 20% viewport top.
- Surface `#18181BE6` with 20px Gaussian blur. Border 1px `rgba(255, 255, 255, 0.12)`.
- Quick-filter search input with embedded `JetBrains Mono` keycap cues (`⌘K`, `ESC`).

### Chips, Tags & Badges
- Compact height (20px–24px). Background `#18181B`, border 1px `rgba(255, 255, 255, 0.08)`.
- Text styled in `JetBrains Mono` (11px).
- For state indicators, includes an illuminated dot (4px circle) with a drop-shadow glow matching status colors (e.g., `#06B6D4` with `box-shadow: 0 0 6px #06B6D4`).

### Checkboxes & Switches
- Checkboxes: 14x14px square, radius 3px, border 1px `rgba(255, 255, 255, 0.2)`. Checked state transitions to `#6366F1` with an inner white check glyph.
- Switches: Slim 28x16px capsule. Track `#27272A` transitioning to `#6366F1` when active; thumb 12px pure white `#EDEDED` with seamless sliding spring physics.

### Lists & Data Rows
- Zero-gap stacked rows with border-bottom 1px `rgba(255, 255, 255, 0.04)`.
- Hover triggers full-width background fill `#18181B` with smooth 100ms ease-out, exposing right-aligned shortcut actions.