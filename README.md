# MONO/FORM — fashion e-commerce (React frontend + Express backend)

Black & white clothing house. Real fashion photography, dark mode, 16 pages,
GSAP scroll animations, and a dummy Node/Express API.

## Run it

**Terminal 1 — backend** (Node 18+):
```
cd server
npm install
npm run dev        # API on http://localhost:4000
```

**Terminal 2 — frontend:**
```
npm install
npm run dev        # site on http://localhost:5173 (proxies /api to :4000)
```

The site also works **without** the backend — every API call has a local
fallback, so `npm run dev` alone still gives a fully working demo.

## What changed in this version

- **New preloader** — real progress (preloads hero photos + fonts + page load,
  capped at 2.5s), then fully unmounts from the DOM so it costs nothing after.
- **Performance** — removed the nav `mix-blend-mode` (a scroll killer), removed
  per-frame drop-shadow filters, added `content-visibility` on below-fold
  sections, lazy + async image decoding, and killed React StrictMode's dev
  double-render.
- **Dark mode** — toggle in the nav (●/○), respects system preference,
  persists. Full variable-driven theming.
- **Heading fixes** — line-heights and descender padding so Bodoni italics and
  large clamps never clip.
- **Responsive** — breakpoints at 1200 / 960 / 640 / 420. Mobile menu,
  2-column product grid, horizontally scrollable filters, full-width cart
  drawer, iOS zoom-on-focus prevention.
- **Real assets** — free-license fashion photography (Unsplash CDN), served
  grayscale via URL param to stay on-brand. Every image has a local SVG
  fallback if offline (`fb` field in `src/data/catalog.js`).
- **Backend** — Express API with JSON-file persistence in `server/data/`:

| Endpoint | What it does |
|---|---|
| `GET /api/health` | Liveness check |
| `GET /api/products` `?category=&sort=` | Catalogue with filter/sort |
| `GET /api/products/:id` | Single piece |
| `POST /api/orders` | Places an order — server recomputes totals |
| `GET /api/orders/:number` | Order lookup |
| `POST /api/auth/register` / `login` | Demo auth (sha256-hashed, JSON store) |
| `POST /api/newsletter` | Adds an email |
| `POST /api/contact` | Stores a message |

Checkout, sign-in, contact and newsletter all hit the API when it's running.
Orders land in `server/data/orders.json` — show a client an order going in live.

## Editing

- `src/data/catalog.js` — products, looks, journal, FAQs. Photo URL in `img`,
  local fallback in `fb`. Swap in client photography here.
- `src/styles.css` — tokens at top, dark theme under `[data-theme="dark"]`.
- `server/index.js` — the whole API in one commented file; swap the JSON
  helpers for a real DB when going live.

Photos are Unsplash-licensed (free for commercial use, no attribution
required). Replace with owned photography before a real launch.
