# RISCAPE design handoff

Reference for restyling the existing RISCAPE app to the new IEI/UNITEN-inspired
theme. Pair this with `riscape-tokens.css` and the interactive mockup
(`riscape-uniten-theme.html`) when briefing Claude Code.

## How to use this with Claude Code

> Here's our current RISCAPE codebase, plus a design token file
> (`riscape-tokens.css`) and reference doc for a redesign direction. Add the
> tokens as CSS custom properties in our app, then restyle the existing
> components to match — sidebar nav grouping, KPI cards, floating map
> panels — without changing the map/data logic underneath. Start with the
> Overview Map page only, then we'll review before moving to the next page.

Don't ask it to copy the mockup's HTML structure directly — that file used
placeholder SVG and sample data. Point it at the real components (Google
Maps instance, live KPI bindings, existing chart library) and have it apply
the *tokens and patterns*, not the literal markup.

---

## 1. Color tokens

All colors live in `riscape-tokens.css` as CSS custom properties, split into
a default (`:root`) light set and a `[data-theme="dark"]` override. Every
component should reference the variable, never a hardcoded hex, so the
whole app repaints correctly when the theme toggles.

| Token | Role |
|---|---|
| `--bg`, `--bg-soft` | page background, sidebar background |
| `--surface`, `--surface-2`, `--surface-3` | card background, hover, active |
| `--border`, `--border-soft` | hairlines and dividers |
| `--text`, `--text-dim`, `--text-faint` | primary / secondary / metadata text |
| `--accent`, `--accent-strong`, `--accent-dim` | primary interactive color — nav active state, links, primary data series |
| `--gold`, `--gold-strong`, `--gold-dim` | highlight color — CTAs, hazard markers, secondary data series |
| `--panel-bg`, `--topbar-bg` | translucent glass panels over the map, sticky top bar |
| `--risk-very-low` … `--risk-very-high` | fixed 5-step hazard/risk severity scale — **do not vary these by theme**, severity color must mean the same thing in light or dark |

**Theme switch:** toggle by setting `data-theme="dark"` on `<html>` (or your
app root). No JS beyond that one attribute is required — everything cascades
from the variables.

## 2. Typography

| Role | Font | Where |
|---|---|---|
| Display | Space Grotesk (500/600/700) | Logo, page headings, KPI numbers |
| Body | Inter (400/500/600) | Nav labels, body copy, buttons, table cells |
| Data / mono | IBM Plex Mono (400/500) | Coordinates, counts, currency, percentages — anything tabular |

Load via Google Fonts or self-host if your org restricts external font
requests:
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Type scale used in the mockup (adjust to your existing scale if you have one):

| Use | Size | Weight |
|---|---|---|
| Page title / nav item | 13.5–16px | 500–600 |
| KPI value | 26px | 600, `font-family: var(--font-display)` |
| Body / labels | 12–13.5px | 400–500 |
| Metadata / captions | 10–11.5px | 400 |

## 3. Layout patterns

- **Sidebar navigation**, grouped into sections (`Geospatial maps`,
  `Insurance`, `Reports`) rather than one long top tab bar. Collapsible to
  an icon rail. Active item gets `--accent-dim` background + `--accent`
  text + a 3px left accent bar.
- **KPI strip** — 4 cards in a row above the main content, each with a
  label, big number (`--font-display`), a trend delta (colored by
  direction), and a small inline sparkline.
- **Floating glass panels on the map** — layer switcher, legend, geocode
  search, zoom controls all sit as translucent (`--panel-bg`, `backdrop-filter: blur(8px)`)
  rounded panels over the map canvas, not fixed browser-chrome-style boxes.
- **Right rail** next to the map for a live feed / ranked list, so the map
  isn't the only information source on the page.
- Card corner radius: `--radius` (10px) for controls/panels, `--radius-card`
  (12px) if you want a slightly softer card feel.

## 4. Map layer switcher

The mockup's Map / Satellite / Terrain toggle is wired as a UI pattern, not
real tile data. When implementing against your actual Google Maps instance:

- Keep the same visual treatment (pill toggle in the panel header **and**
  synced with the floating toolbar over the map).
- Wire clicks to `map.setMapTypeId(google.maps.MapTypeId.ROADMAP | SATELLITE | TERRAIN)`.
- Restyle the map's UI controls (zoom, layer picker) to match the token
  panel style, or hide the native controls and keep only your custom
  floating panels calling the Maps API underneath.

## 5. What NOT to carry over literally

- The SVG "map" of Peninsular Malaysia — placeholder only.
- Sample KPI numbers, feed items, chart values — all illustrative.
- The exact HTML/CSS structure — your app's component boundaries (React
  components, Vue SFCs, etc.) should stay as they are; only the styling and
  layout grouping should change.
