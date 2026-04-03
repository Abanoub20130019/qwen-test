```markdown
# Design System Strategy: Vitality Digital Experience

## 1. Overview & Creative North Star: "The Organic Atelier"
This design system moves away from the rigid, clinical aesthetic of traditional fitness apps. Our Creative North Star is **The Organic Atelier**. We treat the user’s wellness journey as a curated, high-end editorial experience. Instead of aggressive "gym" aesthetics, we embrace a sense of rhythmic calm and natural movement.

To break the "template" look, we utilize **Intentional Asymmetry**. Hero sections should feature offset typography and overlapping imagery that breaks container boundaries. By utilizing the `surface` and `surface-container` tiers, we create a layout that feels like layered sheets of handmade paper—tactile, premium, and breathable.

---

## 2. Color & Atmosphere
The palette is rooted in the "Vitality" of the natural world: Deep forest greens (`primary`), restorative mints (`primary-fixed`), and grounding sands (`surface`).

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders for sectioning. Structural boundaries must be defined solely through background color shifts. 
*   *Implementation:* A `surface-container-low` section sitting on a `surface` background provides all the definition needed. If you feel the need for a line, increase the contrast between background tiers instead.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of layers. Use the hierarchy to guide the eye:
1.  **Base Layer:** `surface` (#f9faf2) – The canvas.
2.  **Sectioning:** `surface-container-low` (#f3f4ec) – Defines large content areas.
3.  **Interaction Cards:** `surface-container-lowest` (#ffffff) – Used for primary interactive elements to make them feel "raised" and pure.
4.  **Information Insets:** `surface-container-high` (#e8e9e1) – Used for secondary data or inactive states.

### The "Glass & Gradient" Rule
To inject visual "soul," use **Signature Textures**. Main CTAs and progress visualizations should utilize subtle linear gradients transitioning from `primary` (#012d1d) to `primary-container` (#1b4332) at a 135-degree angle. Floating headers or navigation bars must utilize **Glassmorphism**: use `surface` at 80% opacity with a `24px` backdrop-blur to allow the natural colors of the content to bleed through.

---

## 3. Typography
We employ a sophisticated pairing of **Manrope** (Display/Headline) and **Inter** (Body/Labels) to balance editorial flair with high-performance utility.

*   **Display & Headlines (Manrope):** These are our "editorial moments." Use `display-lg` (3.5rem) with tight tracking (-0.02em) for daily affirmations or milestone achievements. The geometric nature of Manrope evokes modern architecture and precision.
*   **Body & Titles (Inter):** Inter is our "utility" face. Use `body-lg` (1rem) for workout descriptions to ensure maximum legibility during movement. 
*   **Tonal Hierarchy:** Use `on-surface-variant` (#414844) for secondary body text. Never use pure black; the slight green-grey tint of our "on-surface" tokens maintains the organic warmth of the system.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "digital." We create depth through light and material.

*   **The Layering Principle:** Depth is achieved by "stacking" surface tiers. An activity card (`surface-container-lowest`) placed on a workout category section (`surface-container-low`) creates a soft, natural lift.
*   **Ambient Shadows:** For "floating" elements like FABs or active modals, use highly diffused shadows. 
    *   *Spec:* `Y: 8px, Blur: 24px, Color: rgba(26, 28, 24, 0.06)`. This mimics soft, ambient forest light.
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge (e.g., in high-glare outdoor settings), use a **Ghost Border**. Apply `outline-variant` (#c1c8c2) at **15% opacity**. 100% opaque borders are strictly forbidden.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` (#012d1d) with `on-primary` (#ffffff) text. Use `xl` (1.5rem) corner radius. For a premium touch, apply a 10% inner-glow on the top edge.
*   **Secondary:** `surface-container-highest` (#e2e3db) background with `on-surface` text. This feels "carved" out of the interface.

### Cards & Lists
*   **Zero-Divider Policy:** Forbid the use of divider lines. Use `spacing-6` (2rem) of vertical white space to separate list items, or alternate background tints (`surface-container-low` vs `surface-container-lowest`).
*   **Rounding:** All cards must use `xl` (1.5rem) rounding to evoke the softness of smoothed river stones.

### Inputs & Selection
*   **Input Fields:** Use `surface-container-low` with no border. On focus, transition the background to `surface-container-lowest` and add a "Ghost Border."
*   **Chips:** Selection chips should use `primary-fixed` (#c1ecd4) when active, creating a soft "mint" glow that signals health and readiness.

### Specialized "Vitality" Components
*   **The Progress Halo:** A high-end visualization tool using `tertiary` (#3f1d00) to `tertiary-fixed-dim` (#ffb780) gradients to track caloric or energetic burn, providing a warm, fiery contrast to the cool greens.
*   **Glass Metrics:** Semi-transparent containers (`surface` @ 40% opacity) overlaid on exercise videos, using heavy backdrop blur to maintain readability without obscuring the instructor.

---

## 6. Do’s and Don’ts

### Do
*   **DO** use whitespace as a structural element. If a screen feels cluttered, increase spacing using the `12` (4rem) or `16` (5.5rem) tokens.
*   **DO** overlap images with text. Placing a `display-sm` headline partially over a high-quality nature photo creates an editorial, high-end feel.
*   **DO** use `tertiary` tones (#3f1d00) for high-importance alerts or "warm" data points like heart rate.

### Don’t
*   **DON'T** use 1px dividers or high-contrast borders. It breaks the organic flow.
*   **DON'T** use standard 4px or 8px corners. Our minimum is `md` (0.75rem), but the signature look is `xl` (1.5rem).
*   **DON'T** use pure greys. All neutrals in this system must be "warm sand" or "forest slate" based on the provided tokens.