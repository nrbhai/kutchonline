# Implementation Plan — BhujDeals Visual Upgrade

> Files touched: `src/styles/global.css`, `src/pages/index.astro`,
> `src/components/Header.astro`, `src/components/Footer.astro`,
> `src/components/ProductCard.astro`, `src/components/HotelCard.astro`
>
> Build command: `npm run build`  
> Dev command:  `npm run dev`
> No test suite is present; verification = successful `npm run build` with no errors.

---

## Current-State Audit (before any edits)

### `src/styles/global.css`
- `.section-title` — `font-size: 1.75rem` (target: clamp(1.9rem, 3vw, 2.4rem))
- `.btn-affiliate` — `box-shadow: 0 4px 12px rgba(249,115,22,0.25)`, **no animation** (target: ring-pulse 2.5s infinite)
- `@keyframes ring-pulse` — **does not exist**
- `.glass-card-dark` — present and correct; will be referenced by Change 4

### `src/pages/index.astro` — `<style>` block
- `.hero-section` — `background: #ffffff`, no min-height (target: dark gradient, 85vh)
- `.hero-headline`, `.hero-subtitle`, `.proof-num`, `.proof-label`, `.quick-label` — inherit dark text (target: white/light on dark background)
- `.hero-split-grid` — `grid-template-columns: 1.15fr 0.85fr`; breakpoint collapses to `1fr` at `<1024px` (already stacks, but `.hero-visual-showcase` must be hidden — the `display:none` at `<1024px` **is already present** ✓)
- `.hero-visual-showcase` — `height: 480px`, no `position: relative` explicit (implied by `.floating-card` using `position: absolute`; need to add `min-height: 520px`)
- `.hero-grid-pattern` — `rgba(148, 163, 184, 0.18)` dots (target: `rgba(255,255,255,0.06)`)
- `.glow-1` — `rgba(2,132,199,0.15)` (target: increase opacity)
- `.glow-2` — `rgba(236,72,153,0.12)` (target: increase opacity)
- `.glow-3` — `rgba(249,115,22,0.08)` (target: increase opacity)
- `.proof-divider` — `background: var(--border-default)` (#e2e8f0) (target: rgba white)
- `.live-radar-badge` — `color: var(--text-main)` dark text (target: white on dark hero)
- `.hero-stat-pill` — green light-bg (must be made visible on dark background)
- `.hero-tag` — `background: #f1f5f9` light (target: semi-transparent white on dark)
- `.hero-search-box` — white background (must remain usable but sits on dark hero; keep white glass style)
- `deal-countdown` + `flash-countdown` — **does not exist** (Change 3)
- `.deal-alert-strip` — **does not exist** (Change 11)
- `.agoda-heritage-section` — `background` comes from `.agoda-spotlight-card` (white) inside a `.section` (Change 4)
- `.photo-cat-card` — `height: 280px`, `transform: scale(1.08)` on img hover, no `::after` shine (target: height ≥ 320px, scale 1.12, shine sweep + colored overlay)
- `.section-title-modern` — `font-size: clamp(1.6rem, 3vw, 2.2rem)` (target: clamp(1.9rem, 3vw, 2.6rem))

### `src/components/Header.astro`
- `.logo-mark` — contains the **letter "B"** as text (target: inline SVG star/spark icon)

### `src/components/Footer.astro`
- `.trust-icon` — four **emoji** (🔍 🏷️ 🛡️ ⚡) with `font-size: 1.5rem` (target: inline SVGs in 40×40 colored circle containers)

### `src/components/ProductCard.astro`
- After `.price-box` there is **no `.deal-heat-bar`** (target: add heat bar when discount > 0)
- `discount` is already computed in frontmatter: `const discount = Math.round(...)` ✓

### `src/components/HotelCard.astro`
- No viewing-count badge or limited-availability badge (Change 6)

---

## Implementation Plan

- [ ] 1. **CHANGE 1 — Dark hero gradient + layout fixes** (`src/pages/index.astro`)

  **What:** Replace the white `.hero-section` background with a three-stop dark gradient. Fix text colors to white/light. Adjust glow opacities, grid-pattern dot color, proof-divider color, and visual showcase min-height.

  **Exact edits in `<style>` block:**

  1. `.hero-section` — replace `background: #ffffff` with:
     ```css
     background: linear-gradient(135deg, #0f172a 0%, #0c2a4a 55%, #1a0533 100%);
     min-height: 85vh;
     border-bottom: 1px solid rgba(255,255,255,0.08);
     ```
  2. `.hero-headline` — add `color: #ffffff;`
  3. `.hero-subtitle` — change `color: var(--text-muted)` → `color: rgba(255,255,255,0.75);`
  4. `.proof-num` — add `color: #ffffff;`
  5. `.proof-label` — add `color: rgba(255,255,255,0.65);`
  6. `.quick-label` — add `color: rgba(255,255,255,0.55);`
  7. `.hero-tag` — replace `background: #f1f5f9; border: 1px solid var(--border-default); color: var(--text-body)` with `background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.9);`
  8. `.hero-tag:hover` — change `background: var(--color-primary-light); color: var(--color-primary-dark); border-color: var(--color-primary)` → `background: rgba(255,255,255,0.2); color: #ffffff; border-color: rgba(255,255,255,0.4);`
  9. `.live-radar-badge` — add `color: rgba(255,255,255,0.9); background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2);`
  10. `.hero-stat-pill` — replace `color: #166534; background: #dcfce7; border: 1px solid #bbf7d0` with `color: #4ade80; background: rgba(74,222,128,0.15); border: 1px solid rgba(74,222,128,0.3);`
  11. `.hero-visual-showcase` — change `height: 480px` → `min-height: 520px; position: relative;`
  12. `.hero-grid-pattern` — change `rgba(148, 163, 184, 0.18)` → `rgba(255,255,255,0.06)`
  13. `.glow-1` — change inner stop `rgba(2,132,199,0.15)` → `rgba(2,132,199,0.35)`
  14. `.glow-2` — change inner stop `rgba(236,72,153,0.12)` → `rgba(236,72,153,0.28)`
  15. `.glow-3` — change inner stop `rgba(249,115,22,0.08)` → `rgba(249,115,22,0.22)`
  16. `.proof-divider` — change `background: var(--border-default)` → `background: rgba(255,255,255,0.2);`
  17. `.hero-search-box` — keep white background but add explicit `background: #ffffff; color: var(--text-main);` (already white; no visual change needed; input text is already dark)
  18. In `@media (max-width: 1024px)` the `.hero-visual-showcase { display: none; }` block is **already present** — no change needed.

  **Files:** `src/pages/index.astro`

  **Verify:** `npm run build` — zero errors. Open `dist/index.html` and confirm `.hero-section` has the dark gradient class in markup (or visually check with `npm run dev`).

---

- [ ] 2. **CHANGE 2 — Pulsing ring animation on `.btn-affiliate`** (`src/styles/global.css`)

  **What:** Add a new `@keyframes ring-pulse` block and apply it to `.btn-affiliate`. Pause the animation on hover.

  **Exact edits:**

  1. Append at the end of the `/* Animations */` section (after the `.shimmer-badge` rule):
     ```css
     @keyframes ring-pulse {
       0%   { box-shadow: 0 4px 12px rgba(249,115,22,0.3), 0 0 0 0   rgba(249,115,22,0.4); }
       70%  { box-shadow: 0 4px 12px rgba(249,115,22,0.3), 0 0 0 12px rgba(249,115,22,0); }
       100% { box-shadow: 0 4px 12px rgba(249,115,22,0.3), 0 0 0 0   rgba(249,115,22,0); }
     }
     ```
  2. In `.btn-affiliate` — replace the existing `box-shadow: 0 4px 12px rgba(249, 115, 22, 0.25)` line with:
     ```css
     box-shadow: 0 4px 12px rgba(249,115,22,0.3), 0 0 0 0 rgba(249,115,22,0.4);
     animation: ring-pulse 2.5s ease-out infinite;
     ```
  3. In `.btn-affiliate:hover` — add:
     ```css
     animation-play-state: paused;
     ```
     (Keep existing `box-shadow`, `background`, `transform` properties unchanged.)

  **Files:** `src/styles/global.css`

  **Verify:** `npm run build` — zero errors. In dev, any "Check Deal →" or "Book via …→" button should show a visible orange ring-expand animation.

---

- [ ] 3. **CHANGE 3 — Countdown timer on flash deals section** (`src/pages/index.astro`)

  **What:** Insert a countdown `<div>` between the `.section-header-modern` and the `.grid-4` of flash deals. Add IST-midnight countdown script. Add CSS.

  **Exact edits:**

  1. In the HTML, locate the flash deals section (section comment `4. TODAY'S HOTTEST FLASH DEALS`). Between the closing `</div>` of `.section-header-modern` and the `<div class="grid-4">` line, insert:
     ```html
     <div class="deal-countdown" id="flash-countdown" aria-label="Deal ends in">
       <span class="countdown-unit"><span id="cd-h">00</span><span class="cd-lbl">H</span></span>
       <span class="countdown-sep">:</span>
       <span class="countdown-unit"><span id="cd-m">00</span><span class="cd-lbl">M</span></span>
       <span class="countdown-sep">:</span>
       <span class="countdown-unit"><span id="cd-s">00</span><span class="cd-lbl">S</span></span>
       <span class="cd-suffix">until midnight IST reset</span>
     </div>
     ```
  2. Append this `<script>` block before the closing `</BaseLayout>` tag (or inside the existing bottom of the file, after the existing `<style>` block):
     ```html
     <script>
       (function startCountdown() {
         function tick() {
           const nowUTC = Date.now();
           const IST_OFFSET = 5.5 * 60 * 60 * 1000;
           const nowIST = new Date(nowUTC + IST_OFFSET);
           const midnightIST = new Date(nowIST);
           midnightIST.setUTCHours(18, 30, 0, 0); // 18:30 UTC = 00:00 IST next day
           if (midnightIST <= nowIST) midnightIST.setUTCDate(midnightIST.getUTCDate() + 1);
           const diff = midnightIST.getTime() - (nowUTC + IST_OFFSET);
           const h = Math.floor(diff / 3600000);
           const m = Math.floor((diff % 3600000) / 60000);
           const s = Math.floor((diff % 60000) / 1000);
           const ph = document.getElementById('cd-h');
           const pm = document.getElementById('cd-m');
           const ps = document.getElementById('cd-s');
           if (ph) ph.textContent = String(h).padStart(2, '0');
           if (pm) pm.textContent = String(m).padStart(2, '0');
           if (ps) ps.textContent = String(s).padStart(2, '0');
         }
         tick();
         setInterval(tick, 1000);
       })();
     </script>
     ```
  3. Add CSS in the `<style>` block (place it in the `/* Flash Deal Badge */` area):
     ```css
     .deal-countdown {
       display: inline-flex;
       align-items: center;
       gap: 6px;
       background: rgba(15,23,42,0.9);
       border: 1px solid rgba(249,115,22,0.4);
       border-radius: var(--radius-full);
       padding: 8px 18px;
       margin-bottom: 24px;
       font-family: var(--font-display);
     }
     .countdown-unit {
       display: inline-flex;
       align-items: baseline;
       gap: 2px;
       font-size: 1.5rem;
       font-weight: 800;
       color: #f97316;
       min-width: 2ch;
     }
     .cd-lbl {
       font-size: 0.65rem;
       font-weight: 700;
       color: rgba(249,115,22,0.7);
       text-transform: uppercase;
     }
     .countdown-sep {
       font-size: 1.4rem;
       font-weight: 800;
       color: #f97316;
       opacity: 0.5;
     }
     .cd-suffix {
       font-size: 0.75rem;
       color: rgba(255,255,255,0.5);
       margin-left: 8px;
     }
     ```

  **Files:** `src/pages/index.astro`

  **Verify:** `npm run build` — zero errors. In dev, countdown digits should decrement live. Verify `id="flash-countdown"` exists in the DOM.

---

- [ ] 4. **CHANGE 4 — Cinematic full-bleed hotel section** (`src/pages/index.astro`)

  **What:** Give `.agoda-heritage-section` a full-bleed luxury-pool background image from Unsplash, a dark overlay via `::before`, force all text white, switch HotelCards to `.glass-card-dark`, and ensure `.container` inside has `position:relative; z-index:1`.

  **Exact edits in `<style>` block:**

  1. Add/replace `.agoda-heritage-section` rule:
     ```css
     .agoda-heritage-section {
       position: relative;
       background-image: url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80');
       background-size: cover;
       background-position: center;
       background-attachment: fixed;
     }
     .agoda-heritage-section::before {
       content: '';
       position: absolute;
       inset: 0;
       background: linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(12,42,74,0.82) 55%, rgba(26,5,51,0.88) 100%);
       z-index: 0;
     }
     .agoda-heritage-section > .container {
       position: relative;
       z-index: 1;
     }
     ```
  2. Replace `.agoda-spotlight-card` rule — change from white-glass style to transparent/dark:
     ```css
     .agoda-spotlight-card {
       background: transparent;
       border-radius: 24px;
       padding: clamp(24px, 4vw, 40px);
       border: none;
       box-shadow: none;
     }
     ```
  3. Add a rule to make all text inside the section white:
     ```css
     .agoda-heritage-section .agoda-spotlight-title,
     .agoda-heritage-section .agoda-spotlight-subtitle,
     .agoda-heritage-section .cta-text {
       color: #ffffff;
     }
     .agoda-heritage-section .agoda-spotlight-subtitle {
       color: rgba(255,255,255,0.8);
     }
     .agoda-heritage-section .agoda-footer-cta {
       background: rgba(255,255,255,0.08);
       border-color: rgba(255,255,255,0.15);
     }
     .agoda-heritage-section .cta-text strong {
       color: #ffffff;
     }
     ```
  4. In the HTML, on each `<HotelCard hotel={hotel} />` call, the card uses the `.card` class internally. To apply `.glass-card-dark`, wrap the hotels list with a data attribute and override in CSS, OR add a prop. The simplest CSS-only approach: add a scoped override in index.astro's `<style>`:
     ```css
     .agoda-heritage-section .hotel-card {
       background: rgba(15,23,42,0.85);
       backdrop-filter: blur(16px);
       -webkit-backdrop-filter: blur(16px);
       border-color: rgba(255,255,255,0.12);
       color: #ffffff;
     }
     .agoda-heritage-section .hotel-card .hotel-name a,
     .agoda-heritage-section .hotel-card .hotel-name,
     .agoda-heritage-section .hotel-card .hotel-tagline,
     .agoda-heritage-section .hotel-card .hotel-location,
     .agoda-heritage-section .hotel-card .star-label,
     .agoda-heritage-section .hotel-card .score-label,
     .agoda-heritage-section .hotel-card .score-reviews,
     .agoda-heritage-section .hotel-card .from-text,
     .agoda-heritage-section .hotel-card .per-night,
     .agoda-heritage-section .hotel-card .rates-label {
       color: rgba(255,255,255,0.85);
     }
     .agoda-heritage-section .hotel-card .lead-num {
       color: #4ade80;
     }
     .agoda-heritage-section .hotel-card .amenity-tag {
       background: rgba(255,255,255,0.1);
       color: rgba(255,255,255,0.8);
     }
     .agoda-heritage-section .hotel-card .rates-comparison-box {
       background: rgba(255,255,255,0.05);
       border-color: rgba(255,255,255,0.12);
     }
     .agoda-heritage-section .hotel-card .provider-rate-item {
       background: rgba(255,255,255,0.06);
       border-color: rgba(255,255,255,0.12);
     }
     .agoda-heritage-section .hotel-card .provider-name,
     .agoda-heritage-section .hotel-card .price-val {
       color: #ffffff;
     }
     .agoda-heritage-section .hotel-card .hotel-action-footer {
       border-top-color: rgba(255,255,255,0.12);
     }
     ```

  **Files:** `src/pages/index.astro`

  **Verify:** `npm run build` — zero errors. Hotel section background image loads; text is white over dark overlay.

---

- [ ] 5. **CHANGE 5 — Deal heat bar on ProductCard** (`src/components/ProductCard.astro`)

  **What:** After the `.price-box` div (which already closes before `.store-compare-snippet`), conditionally render a `.deal-heat-bar` element when `discount > 0`. Add its CSS in the component `<style>` block.

  **Exact edits:**

  1. In the HTML, after the closing `</div>` of `.price-box` and before the `{showComparisonSnippet && ...}` block, add:
     ```astro
     {discount > 0 && (
       <div class="deal-heat-bar" aria-label={`Deal strength: ${discount}% off`}>
         <div 
           class={`heat-fill ${discount >= 50 ? 'heat-hot' : discount >= 30 ? 'heat-warm' : 'heat-mild'}`}
           style={`width: ${Math.min(discount, 100)}%`}
         ></div>
         <span class="heat-label">
           {discount >= 50 ? '🔥 Hot Deal' : discount >= 30 ? '⚡ Good Deal' : '💰 Savings'} — {discount}% off
         </span>
       </div>
     )}
     ```
  2. In the `<style>` block, add after `.store-badge`:
     ```css
     .deal-heat-bar {
       margin-bottom: 10px;
       position: relative;
     }
     .heat-fill {
       height: 4px;
       border-radius: var(--radius-full);
       transition: width 0.6s ease;
       margin-bottom: 4px;
     }
     .heat-mild  { background: linear-gradient(90deg, #84cc16, #a3e635); }
     .heat-warm  { background: linear-gradient(90deg, #f97316, #fb923c); }
     .heat-hot   { background: linear-gradient(90deg, #ef4444, #f97316); }
     .heat-label {
       font-size: 0.72rem;
       font-weight: 700;
       color: var(--text-muted);
     }
     ```

  **Files:** `src/components/ProductCard.astro`

  **Verify:** `npm run build` — zero errors. Any product with a discount shows the colored progress bar below the price box.

---

- [ ] 6. **CHANGE 6 — Urgency signals on HotelCard** (`src/components/HotelCard.astro`)

  **What:** Add a "👥 X people viewing" badge (deterministic from hotel name hash) and a "⚡ Limited availability" badge when `hotel.guestRating >= 9.0`. Both badges sit below the `.amenities-row` and above `.rates-comparison-box`.

  **Exact edits:**

  1. In the frontmatter (`---` block), add after the `lowestRate` line:
     ```ts
     // Deterministic viewer count from hotel name hash (18–62 range)
     const nameHash = hotel.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
     const viewerCount = 18 + (nameHash % 45);
     const isLimited = hotel.guestRating >= 9.0;
     ```
  2. In the HTML, after the closing `</div>` of `.amenities-row` and before `<div class="rates-comparison-box">`, add:
     ```astro
     <div class="urgency-signals">
       <span class="viewing-badge">👥 {viewerCount} people viewing right now</span>
       {isLimited && (
         <span class="limited-badge">⚡ Limited availability</span>
       )}
     </div>
     ```
  3. In the `<style>` block, add after `.amenity-tag`:
     ```css
     .urgency-signals {
       display: flex;
       gap: 8px;
       flex-wrap: wrap;
       margin-bottom: 12px;
     }
     .viewing-badge {
       font-size: 0.75rem;
       font-weight: 600;
       color: #0369a1;
       background: #e0f2fe;
       padding: 3px 8px;
       border-radius: var(--radius-full);
     }
     .limited-badge {
       font-size: 0.75rem;
       font-weight: 700;
       color: #dc2626;
       background: #fee2e2;
       padding: 3px 8px;
       border-radius: var(--radius-full);
     }
     ```

  **Files:** `src/components/HotelCard.astro`

  **Verify:** `npm run build` — zero errors. Hotel cards show viewing counts; cards for hotels with `guestRating >= 9.0` show the limited badge.

---

- [ ] 7. **CHANGE 7 — Bigger section headlines** (`src/styles/global.css` + `src/pages/index.astro`)

  **What:** Increase `.section-title` in global.css and `.section-title-modern` in index.astro page styles.

  **Exact edits:**

  1. In `src/styles/global.css`, in the `.section-title` rule, change:
     ```css
     font-size: 1.75rem;
     ```
     to:
     ```css
     font-size: clamp(1.9rem, 3vw, 2.4rem);
     ```
  2. In `src/pages/index.astro` `<style>` block, in the `.section-title-modern` rule, change:
     ```css
     font-size: clamp(1.6rem, 3vw, 2.2rem);
     ```
     to:
     ```css
     font-size: clamp(1.9rem, 3vw, 2.6rem);
     letter-spacing: -0.035em;
     ```

  **Files:** `src/styles/global.css`, `src/pages/index.astro`

  **Verify:** `npm run build` — zero errors.

---

- [ ] 8. **CHANGE 8 — Header logo SVG icon** (`src/components/Header.astro`)

  **What:** Replace the letter `B` inside `.logo-mark` with a 22×22px inline SVG star/spark icon (white filled, 5-point star path). The `.logo-mark` gradient background and dimensions stay unchanged.

  **Exact edits:**

  Current HTML:
  ```html
  <span class="logo-mark">B</span>
  ```
  Replace with:
  ```html
  <span class="logo-mark" aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true" focusable="false">
      <path d="M12 2l2.939 6.326 6.961 0.674-5.07 4.657 1.531 6.843L12 17.027l-6.361 3.473 1.531-6.843L2.1 9.0l6.961-0.674z"/>
    </svg>
  </span>
  ```
  Also update the footer logo (same `<span class="logo-mark">B</span>` in `Footer.astro`) to use the same SVG for visual consistency — see Change 9 notes.

  Note: The `.logo-mark` style in Header.astro `<style>` block already has `display: grid; place-items: center` which will center the SVG correctly. No CSS changes needed.

  **Files:** `src/components/Header.astro` (and optionally `src/components/Footer.astro` logo-mark for consistency)

  **Verify:** `npm run build` — zero errors. Logo shows star icon instead of "B".

---

- [ ] 9. **CHANGE 9 — Footer trust bar SVG icons** (`src/components/Footer.astro`)

  **What:** Replace each of the four emoji in `.trust-icon` spans with an inline SVG inside a 40×40 colored circle container. Icons: magnifier (🔍→search), tag (🏷️→tag), shield (🛡️→shield), bolt (⚡→lightning).

  **Exact edits:**

  1. Replace `.trust-icon` CSS from `font-size: 1.5rem` to:
     ```css
     .trust-icon {
       width: 40px;
       height: 40px;
       border-radius: 50%;
       display: flex;
       align-items: center;
       justify-content: center;
       flex-shrink: 0;
     }
     ```
  2. Replace each `<span class="trust-icon">EMOJI</span>` in the HTML with the SVG versions:

     **Item 1 — Magnifier (blue circle):**
     ```html
     <span class="trust-icon" style="background: rgba(2,132,199,0.15);">
       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
         <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
       </svg>
     </span>
     ```

     **Item 2 — Tag (orange circle):**
     ```html
     <span class="trust-icon" style="background: rgba(249,115,22,0.15);">
       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
         <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
       </svg>
     </span>
     ```

     **Item 3 — Shield (green circle):**
     ```html
     <span class="trust-icon" style="background: rgba(22,163,74,0.15);">
       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
         <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
       </svg>
     </span>
     ```

     **Item 4 — Bolt (amber circle):**
     ```html
     <span class="trust-icon" style="background: rgba(234,179,8,0.15);">
       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
         <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
       </svg>
     </span>
     ```

  **Files:** `src/components/Footer.astro`

  **Verify:** `npm run build` — zero errors. Trust bar shows four colored circles with stroke SVG icons instead of emoji.

---

- [ ] 10. **CHANGE 10 — Category grid stronger hover** (`src/pages/index.astro`)

  **What:** Increase `.photo-cat-card` height to 320px. Increase image scale on hover to 1.12. Add `::after` diagonal white shine sweep on hover. Change overlay to a colored gradient on hover.

  **Exact edits in `<style>` block:**

  1. In `.photo-cat-card` — change `height: 280px` → `height: 320px`
  2. In `.photo-cat-card:hover` — add `overflow: hidden;` (already present via parent), keep existing transform/shadow.
  3. In `.photo-cat-card:hover .photo-cat-img` — change `transform: scale(1.08)` → `transform: scale(1.12)`
  4. Add `::after` shine element rule:
     ```css
     .photo-cat-card::after {
       content: '';
       position: absolute;
       inset: 0;
       z-index: 2;
       background: linear-gradient(
         110deg,
         transparent 30%,
         rgba(255,255,255,0.18) 50%,
         transparent 70%
       );
       transform: translateX(-100%);
       transition: transform 0s;
       pointer-events: none;
     }
     .photo-cat-card:hover::after {
       transform: translateX(100%);
       transition: transform 0.55s ease;
     }
     ```
  5. Add hover colored overlay (change `.photo-cat-overlay` gradient on hover):
     ```css
     .photo-cat-card:hover .photo-cat-overlay {
       background: linear-gradient(to top,
         rgba(2,132,199,0.85) 0%,
         rgba(2,132,199,0.35) 55%,
         rgba(2,132,199,0.05) 100%
       );
     }
     ```

  **Files:** `src/pages/index.astro`

  **Verify:** `npm run build` — zero errors. Category cards are 320px tall; hovering triggers shine sweep and blue-tinted overlay.

---

- [ ] 11. **CHANGE 11 — Live Deal Alert strip** (`src/pages/index.astro`)

  **What:** Insert a `.deal-alert-strip` bar between the hero section (`</section>` of `.hero-section`) and the partner marquee section (`<section class="partner-marquee-section">`). The strip has a dark background, a green "📉 PRICE DROPS" label, and a horizontally scrolling ticker of 6 deal items (duplicated for seamless loop). Add CSS.

  **Exact edits:**

  1. In the HTML, between `</section>` (end of hero) and `<section class="partner-marquee-section">`, insert:
     ```html
     <!-- LIVE DEAL ALERT STRIP -->
     <div class="deal-alert-strip" role="marquee" aria-label="Live price drop alerts">
       <div class="alert-strip-inner">
         <span class="alert-label">📉 PRICE DROPS</span>
         <div class="alert-ticker-wrap">
           <div class="alert-ticker">
             <!-- Set 1 -->
             <span class="ticker-item"><span class="ticker-store">Amazon</span> Apple AirPods Pro 2 — <span class="ticker-price">₹19,990</span> <span class="ticker-drop">↓ ₹4,010 off</span></span>
             <span class="ticker-sep">•</span>
             <span class="ticker-item"><span class="ticker-store">Nykaa</span> Minimalist 10% Niacinamide — <span class="ticker-price">₹399</span> <span class="ticker-drop">↓ 30% off</span></span>
             <span class="ticker-sep">•</span>
             <span class="ticker-item"><span class="ticker-store">Agoda</span> Taj Lake Palace Udaipur — <span class="ticker-price">₹28,500/nt</span> <span class="ticker-drop">↓ ₹6,500 off</span></span>
             <span class="ticker-sep">•</span>
             <span class="ticker-item"><span class="ticker-store">Flipkart</span> Samsung Galaxy S25 — <span class="ticker-price">₹74,999</span> <span class="ticker-drop">↓ ₹12,000 off</span></span>
             <span class="ticker-sep">•</span>
             <span class="ticker-item"><span class="ticker-store">AJIO</span> Oversized Hoodie 450GSM — <span class="ticker-price">₹899</span> <span class="ticker-drop">↓ 64% off</span></span>
             <span class="ticker-sep">•</span>
             <span class="ticker-item"><span class="ticker-store">Croma</span> Sony WH-1000XM5 — <span class="ticker-price">₹24,990</span> <span class="ticker-drop">↓ ₹7,000 off</span></span>
             <span class="ticker-sep">•</span>
             <!-- Set 2 (duplicate for seamless loop) -->
             <span class="ticker-item" aria-hidden="true"><span class="ticker-store">Amazon</span> Apple AirPods Pro 2 — <span class="ticker-price">₹19,990</span> <span class="ticker-drop">↓ ₹4,010 off</span></span>
             <span class="ticker-sep" aria-hidden="true">•</span>
             <span class="ticker-item" aria-hidden="true"><span class="ticker-store">Nykaa</span> Minimalist 10% Niacinamide — <span class="ticker-price">₹399</span> <span class="ticker-drop">↓ 30% off</span></span>
             <span class="ticker-sep" aria-hidden="true">•</span>
             <span class="ticker-item" aria-hidden="true"><span class="ticker-store">Agoda</span> Taj Lake Palace Udaipur — <span class="ticker-price">₹28,500/nt</span> <span class="ticker-drop">↓ ₹6,500 off</span></span>
             <span class="ticker-sep" aria-hidden="true">•</span>
             <span class="ticker-item" aria-hidden="true"><span class="ticker-store">Flipkart</span> Samsung Galaxy S25 — <span class="ticker-price">₹74,999</span> <span class="ticker-drop">↓ ₹12,000 off</span></span>
             <span class="ticker-sep" aria-hidden="true">•</span>
             <span class="ticker-item" aria-hidden="true"><span class="ticker-store">AJIO</span> Oversized Hoodie 450GSM — <span class="ticker-price">₹899</span> <span class="ticker-drop">↓ 64% off</span></span>
             <span class="ticker-sep" aria-hidden="true">•</span>
             <span class="ticker-item" aria-hidden="true"><span class="ticker-store">Croma</span> Sony WH-1000XM5 — <span class="ticker-price">₹24,990</span> <span class="ticker-drop">↓ ₹7,000 off</span></span>
           </div>
         </div>
       </div>
     </div>
     ```
  2. Add CSS in `<style>` block (alongside the marquee section styles):
     ```css
     /* Deal Alert Strip */
     .deal-alert-strip {
       background: #0f172a;
       border-bottom: 1px solid #1e293b;
       padding: 10px 0;
       overflow: hidden;
     }
     .alert-strip-inner {
       display: flex;
       align-items: center;
       gap: 0;
       max-width: var(--container-max);
       margin: 0 auto;
       padding: 0 20px;
     }
     .alert-label {
       font-size: 0.75rem;
       font-weight: 800;
       color: #4ade80;
       background: rgba(74,222,128,0.12);
       border: 1px solid rgba(74,222,128,0.3);
       padding: 4px 10px;
       border-radius: var(--radius-full);
       white-space: nowrap;
       margin-right: 16px;
       flex-shrink: 0;
     }
     .alert-ticker-wrap {
       overflow: hidden;
       flex: 1;
     }
     .alert-ticker {
       display: inline-flex;
       gap: 16px;
       align-items: center;
       white-space: nowrap;
       animation: marquee 30s linear infinite;
     }
     .ticker-item {
       font-size: 0.8rem;
       color: rgba(255,255,255,0.85);
       white-space: nowrap;
     }
     .ticker-store {
       font-weight: 800;
       color: #38bdf8;
     }
     .ticker-price {
       font-weight: 700;
       color: #ffffff;
     }
     .ticker-drop {
       font-weight: 700;
       color: #4ade80;
     }
     .ticker-sep {
       color: rgba(255,255,255,0.2);
       font-size: 0.7rem;
     }
     ```
     Note: reuses the existing `@keyframes marquee` already defined in `global.css` (translates from 0% → -50%). The duplicated content set means the visible width is always half the total, so the loop is seamless.

  **Files:** `src/pages/index.astro`

  **Verify:** `npm run build` — zero errors. A dark ticker strip with "📉 PRICE DROPS" label and scrolling deal items appears between the hero and the partner marquee.

---

## Dependency Order Summary

Changes can be applied in any order since they touch different selectors/files, with these notes:
- **Change 1 must come before Change 3 and 11** since both 3 and 11 insert HTML into `index.astro` — the implementer must know the final structure of the hero section before inserting adjacent elements.
- **Change 7** touches two files independently; either can be done first.
- **Changes 5, 6, 8, 9** are fully independent (different component files).
- **Change 2** is fully self-contained in `global.css`.
- **Change 4** depends on knowing the `.agoda-heritage-section` location (established by the existing file) — independent of other index.astro changes.

Recommended sequencing for a single-pass implementer:
1 → 11 → 3 → 7 → 2 → 10 → 4 → 5 → 6 → 8 → 9

Final build check after all 11 changes: `npm run build` must complete with zero errors.
