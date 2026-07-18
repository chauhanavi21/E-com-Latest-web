# MONO/FORM — complete fashion e-commerce frontend (React + Vite)

Black & white clothing house. Full client-ready page set, scroll animations
(GSAP ScrollTrigger), 3D "changing room" hero, working cart/wishlist/checkout
flow. Frontend only — all state lives in the browser, ready for a backend later.

## Setup

Requires Node 18+.

```
cd monoform-react
npm install
npm run dev          # open http://localhost:5173
```

Production build:
```
npm run build        # outputs to /dist
npm run preview      # serve the production build locally
```

## Pages (16 routes)

| Route | Page |
|---|---|
| `/` | Home — hero changing room, marquee, pinned horizontal collection, editorial parallax, featured grid, manifesto |
| `/shop` | Shop — category filters + price sorting |
| `/product/:id` | Product detail — sizes, 3D tilt image, wishlist, accordions, related pieces |
| `/lookbook` | Lookbook — editorial grid with clip reveals + parallax |
| `/wishlist` | Saved pieces (persisted) |
| `/checkout` | 3-step checkout: shipping → payment (demo) → review |
| `/confirmation` | Order confirmation with generated order number |
| `/journal` | Journal index |
| `/journal/:slug` | Article page (3 written posts included) |
| `/about` | The house / brand story |
| `/contact` | Contact form + atelier info |
| `/faq` | Shipping, returns, sizing, care + size guide table |
| `/account` | Demo sign in / create account / dashboard |
| `/legal/privacy`, `/legal/terms` | Legal pages |
| `*` | Styled 404 |

Cart drawer, toasts, and mobile menu work globally. Cart, wishlist, and the
demo account persist in localStorage. Checkout is a mock — no payment happens.

## Where to edit things

- `src/data/catalog.js` — products, hero looks, lookbook, journal posts, FAQs, size chart. **Start here.**
- `src/styles.css` — all styling; design tokens (colors, fonts) at the top.
- `public/assets/` — all imagery (generated SVG placeholders). Swap in real
  photos with the same paths, or update paths in `catalog.js`.
  Hero model images: portrait ~480×760, transparent background works best.
- `generate_assets.py` — regenerates the placeholder art (`python3 generate_assets.py`, then copy into `public/assets`).

## Backend hookup later

State is centralized in `src/context/StoreContext.jsx` (cart, wishlist, user).
Replace the localStorage reads/writes there with API calls and the whole UI
follows. Checkout's `placeOrder()` in `src/pages/Checkout.jsx` is the single
point to POST an order.
