---
name: TimeLux
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#c6c6c9'
  on-secondary: '#2f3133'
  secondary-container: '#454749'
  on-secondary-container: '#b4b5b7'
  tertiary: '#cdced2'
  on-tertiary: '#2e3134'
  tertiary-container: '#b1b3b7'
  on-tertiary-container: '#424548'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e2e2e5'
  secondary-fixed-dim: '#c6c6c9'
  on-secondary-fixed: '#1a1c1e'
  on-secondary-fixed-variant: '#454749'
  tertiary-fixed: '#e1e2e6'
  tertiary-fixed-dim: '#c5c6ca'
  on-tertiary-fixed: '#191c1f'
  on-tertiary-fixed-variant: '#44474a'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.15em
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style
The design system is engineered to evoke the precision and heritage of haute horlogerie. It targets a discerning audience that values craftsmanship, exclusivity, and understated elegance. The visual narrative is built on a "Modern Editorial" style—combining the structural discipline of luxury publishing with the fluid interactivity of high-end digital interfaces.

The aesthetic prioritizes **minimalism** and **high-contrast** layouts. By utilizing expansive whitespace (macro-spacing), the design system allows product photography to act as the primary visual driver, mirroring the experience of walking into a high-end boutique where each piece is given room to breathe. The emotional response is one of calm, confidence, and timelessness.

## Colors
The palette is rooted in a "Noir & Gold" philosophy. The primary background is a deep **Charcoal (#1A1C1E)** rather than pure black, providing a softer, more sophisticated depth. 

- **Primary (Champagne Gold):** Used sparingly for high-intent actions, accents, and premium signifiers. It should feel like a metallic leaf—bright but not gaudy.
- **Secondary (Slate Gray):** Provides structural layering and surface differentiation.
- **Neutral (Off-White):** Used for primary typography and high-contrast labels to ensure legibility against the dark backgrounds.
- **Accents:** Use low-saturation silvers and muted brass tones for secondary interactive states to maintain a monochromatic prestige.

## Typography
The typographic pairing reflects the tension between tradition and modernity. **Libre Caslon Text** is used for headlines to establish an authoritative, editorial voice. Its high-contrast strokes reflect the etched detailing of watch faces.

**Hanken Grotesk** serves as the functional counterpart. It is a sharp, contemporary sans-serif that remains legible at small scales, ideal for technical specifications and pricing.

**Key Rule:** Use "Label-Caps" for all navigation elements and secondary metadata. The increased letter spacing is essential for maintaining the "luxury brand" feel. Headlines should use tight tracking to feel cohesive and intentional.

## Layout & Spacing
This design system employs a **Fixed Grid** model for desktop to ensure a curated, gallery-like composition. The layout is centered within a 1440px container using a 12-column grid.

- **Generous Margins:** Desktop views utilize an 80px side margin to create a "frame" around the content.
- **Vertical Rhythm:** Large vertical gaps (120px+) between sections are mandatory to prevent the UI from feeling cluttered.
- **Mobile Reflow:** On mobile, the grid collapses to 2 columns for product feeds and 1 column for editorial content, with margins reducing to 20px. 

Elements should lean toward asymmetrical placements in editorial sections to break the monotony of standard e-commerce templates.

## Elevation & Depth
Elevation in this design system is achieved through **Tonal Layering** and **Ambient Shadows** rather than traditional heavy dropshadows.

- **Base Layer:** The deepest Charcoal (#1A1C1E).
- **Surface Layer:** Slightly lighter Slate (#25282B). Used for cards and modals.
- **Shadows:** Use extremely diffused, large-radius shadows with low opacity (e.g., `0 20px 40px rgba(0,0,0,0.4)`). The goal is to make cards feel like they are floating slightly above a velvet surface.
- **Reflections:** Subtle 1px inner borders (top and left) in a muted gold or low-opacity white can be used on primary cards to simulate a "beveled glass" edge, nodding to watch crystals.

## Shapes
The shape language is **Sharp (0)**. Square edges communicate precision, architecture, and structural integrity. 

- **Exceptions:** Very small UI elements like checkboxes or radio buttons may use a 1px radius to prevent "optical harshness," but all primary containers, buttons, and images must remain strictly rectangular.
- **Image Treatment:** Product photography should always be housed in sharp-edged containers.

## Components
- **Buttons:** Primary buttons are ghost-style (transparent background) with a 1px Gold border and "Label-Caps" text. Upon hover, they should transition to a solid Gold fill with Charcoal text. The transition must be slow (300ms+) to feel "heavy" and premium.
- **Cards:** Product cards use a "No-Border" approach on the base, relying on a slight background color shift on hover and a subtle ambient shadow.
- **Input Fields:** Bottom-border only. No full box enclosures. This maintains the minimal, sophisticated aesthetic. Focus states should animate the bottom border from Slate to Gold.
- **Chips/Badges:** Small, sharp-edged rectangles with a Gold border and 10px Hanken Grotesk caps. Used for "Limited Edition" or "New Arrival" markers.
- **Lists:** Technical specs for watches should be presented in a two-column definition list with a thin horizontal separator between rows.
- **Special Component (The Loupe):** A custom hover interaction for product images that creates a high-definition zoom circle, mimicking a watchmaker's loupe.