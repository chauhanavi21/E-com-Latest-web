import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCTS, CATEGORIES, LOOKBOOK } from "../data/catalog";
import { ProductGrid, PageHead, Pic } from "../components/Chrome";
import { useStore } from "../context/StoreContext";

gsap.registerPlugin(ScrollTrigger);
const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- Shop ---------------- */
export function Shop() {
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("featured");

  const items = useMemo(() => {
    let list = cat === "All" ? [...PRODUCTS] : PRODUCTS.filter(p => p.category === cat);
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    return list;
  }, [cat, sort]);

  return (
    <>
      <PageHead eyebrow="All pieces — FW26" title="The Shop" />
      <div className="filters">
        <div className="filters__cats">
          {CATEGORIES.map(c => (
            <button key={c} className={c === cat ? "is-active" : ""} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <select className="filters__sort" value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort">
          <option value="featured">Sort: Featured</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
      </div>
      <section className="grid-section">
        <ProductGrid key={cat + sort} items={items} />
      </section>
    </>
  );
}

/* ---------------- Product detail ---------------- */
export function Product() {
  const { id } = useParams();
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [size, setSize] = useState("M");
  const imgRef = useRef(null);
  const saved = wishlist.includes(p.id);

  useEffect(() => { document.title = `${p.name} — MONO/FORM`; }, [p]);

  const onMove = e => {
    if (reduce() || !imgRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    imgRef.current.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.04)`;
  };
  const onLeave = () => { if (imgRef.current) imgRef.current.style.transform = "none"; };

  const related = PRODUCTS.filter(x => x.id !== p.id).slice(0, 4);

  return (
    <>
      <main className="pdp">
        <div className="pdp__media" onMouseMove={onMove} onMouseLeave={onLeave}>
          <Pic src={p.img + "&h=1400"} fb={p.fb} alt={p.name} eager ref={imgRef} />
        </div>
        <div className="pdp__info">
          <p className="eyebrow">{p.category} — FW26</p>
          <h1>{p.name}</h1>
          <p className="pdp__price">${p.price}</p>
          <p className="pdp__desc">{p.desc}</p>

          <p className="pdp__label">Size</p>
          <div className="sizes">
            {["XS", "S", "M", "L", "XL"].map(s => (
              <button key={s} className={s === size ? "is-active" : ""} onClick={() => setSize(s)}>{s}</button>
            ))}
          </div>

          <button className="pdp__add" onClick={() => addToCart(p.id, size)}>Add to bag — ${p.price}</button>
          <button className="pdp__wish" onClick={() => toggleWishlist(p.id)}>
            {saved ? "♥ Saved to wishlist" : "♡ Save to wishlist"}
          </button>

          <div className="pdp__notes">
            <details>
              <summary>Fabric &amp; care</summary>
              <p>Natural fibers only. Dry clean or cold hand wash. Hang from the shoulder seam, never fold.</p>
            </details>
            <details>
              <summary>Fit</summary>
              <p>True to size with an intentionally relaxed line. Between sizes, take the smaller one. <Link to="/faq#sizing">Size guide →</Link></p>
            </details>
            <details>
              <summary>Shipping &amp; returns</summary>
              <p>Ships within 2 business days. 30-day returns on unworn pieces with tags attached.</p>
            </details>
          </div>
        </div>
      </main>

      <section className="grid-section">
        <div className="grid-section__head"><h2>Wears well with</h2></div>
        <ProductGrid key={p.id} items={related} />
      </section>
    </>
  );
}

/* ---------------- Lookbook ---------------- */
export function Lookbook() {
  const root = useRef(null);
  useEffect(() => {
    if (reduce()) return;
    const ctx = gsap.context(() => {
      document.querySelectorAll(".lookbook__item").forEach(item => {
        gsap.fromTo(item, { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 85%" } });
        const img = item.querySelector("img");
        gsap.fromTo(img, { yPercent: -6, scale: 1.12 },
          { yPercent: 6, scale: 1.12, ease: "none",
            scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <PageHead eyebrow="FW26 — Editorial" title="Lookbook" />
      <div className="lookbook">
        {LOOKBOOK.map((l, i) => (
          <figure key={i} className={"lookbook__item" + (l.wide ? " wide" : "")}>
            <Pic src={l.img} fb={l.fb} alt={l.caption} />
            <figcaption><span className="eyebrow">{String(i + 1).padStart(2, "0")} — {l.caption}</span></figcaption>
          </figure>
        ))}
      </div>
      <section className="manifesto">
        <p className="eyebrow">Wear the line</p>
        <p style={{ opacity: 1 }}>Every look in this book is built from pieces in the shop.</p>
        <Link className="hero__cta" to="/shop" style={{ marginTop: 30 }}>Shop the collection</Link>
      </section>
    </div>
  );
}

/* ---------------- Wishlist ---------------- */
export function Wishlist() {
  const { wishlist } = useStore();
  const items = PRODUCTS.filter(p => wishlist.includes(p.id));
  return (
    <>
      <PageHead eyebrow={`${items.length} saved`} title="Wishlist" />
      <section className="grid-section">
        {items.length
          ? <ProductGrid key={wishlist.join(",")} items={items} />
          : (
            <div className="empty-state">
              <p>Nothing saved yet. Tap the ♡ on any piece to keep it here.</p>
              <Link className="hero__cta" to="/shop">Browse the shop</Link>
            </div>
          )}
      </section>
    </>
  );
}
