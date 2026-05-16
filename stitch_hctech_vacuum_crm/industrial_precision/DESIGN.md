---
name: Industrial Precision
colors:
  surface: '#fff8f6'
  surface-dim: '#f8d1cb'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0ee'
  surface-container: '#ffe9e6'
  surface-container-high: '#ffe2dd'
  surface-container-highest: '#ffdad4'
  on-surface: '#2b1613'
  on-surface-variant: '#603e39'
  inverse-surface: '#422a27'
  inverse-on-surface: '#ffedea'
  outline: '#956d67'
  outline-variant: '#ebbbb4'
  surface-tint: '#c00001'
  primary: '#bc0001'
  on-primary: '#ffffff'
  primary-container: '#eb0002'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb4a8'
  secondary: '#b72216'
  on-secondary: '#ffffff'
  secondary-container: '#fe5642'
  on-secondary-container: '#5c0000'
  tertiary: '#005ab6'
  on-tertiary: '#ffffff'
  tertiary-container: '#0072e4'
  on-tertiary-container: '#fefcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#930001'
  secondary-fixed: '#ffdad4'
  secondary-fixed-dim: '#ffb4a8'
  on-secondary-fixed: '#410000'
  on-secondary-fixed-variant: '#930001'
  tertiary-fixed: '#d7e3ff'
  tertiary-fixed-dim: '#abc7ff'
  on-tertiary-fixed: '#001b3f'
  on-tertiary-fixed-variant: '#00458f'
  background: '#fff8f6'
  on-background: '#2b1613'
  surface-variant: '#ffdad4'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  code-data:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  baseline: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  container-max-width: 1440px
---

## Brand & Style

This design system is engineered for the high-stakes environment of industrial machinery management. The brand personality is rooted in **technical expertise, structural reliability, and operational clarity**. With the updated palette, it evokes a sense of "Active Intelligence"—where critical vacuum pump telemetry and CRM data are highlighted with urgency and precision.

The design style follows a **Corporate / Modern** aesthetic with a lean toward **Technical Minimalism**. It prioritizes high-density information display without sacrificing breathing room. The UI utilizes a structured grid, crisp borders, and a purposeful color application to ensure that field technicians and plant managers can navigate the system with zero friction.

## Colors

The palette is anchored by **Vivid Red (#FE0204)**, representing the power and urgency of industrial performance. The **Technical Blue (#007DF9)** provides a vibrant, high-contrast signal for tertiary actions and data visualization, ensuring they are immediately identifiable against complex backgrounds.

A systematic set of semantic colors is utilized for maintenance states:
- **Success/Scheduled:** Emerald 600 for confirmed maintenance.
- **Warning/Due:** Amber 500 for upcoming service windows.
- **Critical/Overdue:** Primary Red (#FE0204) for immediate attention/pump failure risks.
- **Info:** Technical Blue (#007DF9) for general technical specifications.

The background uses a subtle neutral tint to reduce eye strain, derived from the warm **Neutral Gray (#8F706B)** to ground the high-energy primary red.

## Typography

**Inter** is the sole typeface for this design system, chosen for its exceptional legibility in data-heavy contexts and its tall x-height, which remains readable at small sizes in technical tables.

- **Headlines:** Use Bold and Semi-Bold weights with slight negative letter-spacing to create a "machined" and compact feel.
- **Body Text:** Standardized at 14px for CRM records to balance information density with readability.
- **Data Labels:** Small, uppercase, and slightly tracked-out (0.05em) to differentiate metadata from user-generated content.
- **Numerical Data:** For pump pressure, flow rates, and serial numbers, use the `code-data` style to ensure character clarity.

## Layout & Spacing

The layout utilizes a **Fixed-Fluid Hybrid** model. The primary sidebar navigation is fixed at 280px, while the main content area utilizes a 12-column fluid grid that scales up to a maximum width of 1440px to ensure data tables don't become overly horizontally stretched on ultra-wide monitors.

**Grid Rules:**
- **Desktop:** 12 columns / 24px gutter / 32px margins.
- **Tablet:** 8 columns / 16px gutter / 24px margins.
- **Mobile:** 4 columns / 16px gutter / 16px margins.

Spacing follows a strict 4px/8px base-8 scale. For dashboard cards, use 24px internal padding (Space-6) to maintain a professional, airy feel amidst dense technical data.

## Elevation & Depth

This design system uses **Tonal Layering** supplemented by **Low-Contrast Outlines** to define hierarchy, avoiding heavy skeuomorphism in favor of a clean, digital-first industrial interface.

- **Level 0 (Background):** Surface color (Warm-Neutral tint).
- **Level 1 (Cards/Tables):** White surface with a 1px solid border (Neutral-200). No shadow.
- **Level 2 (Hover/Active states):** White surface with a 1px solid border (Primary Red) and a very soft, diffused ambient shadow (Y: 4px, Blur: 12px, Color: Neutral-900 at 5% opacity).
- **Level 3 (Modals/Popovers):** White surface with a crisp 1px border and a medium ambient shadow (Y: 10px, Blur: 25px, Color: Neutral-900 at 10% opacity) to provide clear separation from the workspace.

Backdrop blurs (12px) are reserved exclusively for global modal overlays to maintain focus on critical maintenance alerts.

## Shapes

The shape language is **Rounded (Level 2)**, utilizing an 8px (0.5rem) base radius. This softens the "cold" industrial nature of the data and the intensity of the red while maintaining a professional, structured appearance.

- **Standard Elements:** 8px radius (Buttons, Input fields, Cards).
- **Small Elements:** 4px radius (Checkboxes, Tooltips, Status Badges).
- **Interactive Indicators:** Vertical 4px "pill" bars are used on the left edge of active navigation items or high-priority maintenance rows in tables.

## Components

### Buttons
- **Primary:** Vivid Red background, White text. 8px radius. High-contrast hover state.
- **Secondary:** White background, 1px Neutral-300 border, Red text.
- **Critical Action:** Primary Red background for "Stop Service" or "Emergency Log" actions.

### Status Badges (Maintenance States)
Small, pill-shaped indicators with low-opacity backgrounds and high-contrast text:
- **Scheduled:** Light Green bg / Dark Green text.
- **Due:** Light Amber bg / Dark Brown text.
- **Overdue:** Light Red bg / Dark Red text.

### Data Tables
The core of the CRM. Use a "Zebra" striping pattern for rows. Headers must be "Sticky" with a 2px bottom border in Neutral-200. Text should be aligned top-left for readability. Action icons (Edit, View, Log) should appear in a fixed right-hand column.

### Dashboard Cards
Cards should feature a "Header" section with a 1px bottom divider. Key Performance Indicators (KPIs) like "Vacuum Level (Pa)" should use the `headline-lg` style in the Primary Red color.

### Input Fields
Strict 1px Neutral-300 borders. On focus, the border transitions to Technical Blue with a 2px soft outer glow. Labels are always positioned above the input in `label-md` style.