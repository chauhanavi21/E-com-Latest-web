import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/catalog";
import { useStore } from "../context/StoreContext";

/* ---------------- Nav ---------------- */
export function Nav() {
  const { cart, wishlist, user, setCartOpen } = useStore();
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc.pathname]);

  const links = [
    ["/shop", "Shop"],
    ["/lookbook", "Lookbook"],
    ["/journal", "Journal"],
    ["/about", "House"],
    ["/contact", "Contact"]
  ];

  return (
    <>
      <nav className="nav">
        <button className="nav__burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          {open ? "✕" : "☰"}
        </button>
        <Link className="nav__brand" to="/">MONO/FORM</Link>
        <div className="nav__links">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => isActive ? "is-active" : ""}>{label}</NavLink>
          ))}
        </div>
        <div className="nav__actions">
          <Link to="/wishlist" className="nav__cart">♡ <span>{wishlist.length}</span></Link>
          <Link to="/account" className="nav__cart">{user ? user.name.split(" ")[0] : "Account"}</Link>
          <button className="nav__cart" onClick={() => setCartOpen(true)}>Bag <span>{cart.length}</span></button>
        </div>
      </nav>
      <div className={"nav-mobile" + (open ? " open" : "")}>
        {links.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/account">Account</Link>
        <Link to="/faq">FAQ &amp; Care</Link>
      </div>
    </>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  const { showToast } = useStore();
  const [email, setEmail] = useState("");
  return (
    <footer className="footer">
      <div className="footer__top">
        <div>
          <p className="footer__brand">MONO/FORM</p>
          <p className="footer__blurb">New pieces arrive monthly. One email, no noise.</p>
          <div className="newsletter">
            <input type="email" placeholder="Email address" aria-label="Email address"
              value={email} onChange={e => setEmail(e.target.value)} />
            <button aria-label="Subscribe" onClick={() => {
              if (email.includes("@")) { showToast("You're on the list"); setEmail(""); }
              else showToast("Enter a valid email");
            }}>→</button>
          </div>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop">All pieces</Link></li>
            <li><Link to="/lookbook">Lookbook</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
          </ul>
        </div>
        <div>
          <h4>House</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/journal">Journal</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Care</h4>
          <ul>
            <li><Link to="/faq">Shipping &amp; returns</Link></li>
            <li><Link to="/faq#sizing">Size guide</Link></li>
            <li><Link to="/legal/privacy">Privacy</Link></li>
            <li><Link to="/legal/terms">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2026 MONO/FORM</span>
        <span>Black. White. Nothing else.</span>
      </div>
    </footer>
  );
}

/* ---------------- Cart drawer ---------------- */
export function CartDrawer() {
  const { cart, removeFromCart, total, cartOpen, setCartOpen } = useStore();
  const nav = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("cart-open", cartOpen);
    const onKey = e => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.classList.remove("cart-open"); };
  }, [cartOpen, setCartOpen]);

  return (
    <>
      <div className="cart-overlay" onClick={() => setCartOpen(false)} />
      <aside className="cart-drawer" aria-label="Shopping bag">
        <div className="cart-drawer__head">
          <h2>Bag</h2>
          <button onClick={() => setCartOpen(false)} aria-label="Close bag">✕</button>
        </div>
        <div className="cart-drawer__items">
          {cart.length === 0 && <p className="cart-empty">Your bag is empty.</p>}
          {cart.map(item => {
            const p = PRODUCTS.find(x => x.id === item.id);
            if (!p) return null;
            return (
              <div className="cart-item" key={item.ts}>
                <img src={p.img} alt={p.name} />
                <div>
                  <h4>{p.name}</h4>
                  <span className="eyebrow">Size {item.size} — ${p.price}</span>
                  <button className="cart-item__remove" onClick={() => removeFromCart(item.ts)}>Remove</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="cart-drawer__foot">
          <div className="cart-total"><span>Total</span><span>${total}</span></div>
          <button className="cart-checkout" disabled={!cart.length}
            onClick={() => { setCartOpen(false); nav("/checkout"); }}>
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}

/* ---------------- Toast ---------------- */
export function Toast() {
  const { toast } = useStore();
  return <div className={"toast" + (toast ? " show" : "")}>{toast}</div>;
}

/* ---------------- Product card ---------------- */
export function ProductCard({ p, delay = 0 }) {
  const { toggleWishlist, wishlist } = useStore();
  const ref = useRef(null);
  const saved = wishlist.includes(p.id);

  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add("in"), delay); io.disconnect(); }
    }, { rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div className="card" ref={ref}>
      <Link to={`/product/${p.id}`}>
        <figure>
          <img src={p.img} alt={p.name} loading="lazy" />
          <span className="card__quick">View piece</span>
        </figure>
      </Link>
      <div className="card__meta">
        <h3><Link to={`/product/${p.id}`}>{p.name}</Link></h3>
        <span className="price">${p.price}</span>
      </div>
      <div className="card__foot">
        <span className="eyebrow">{p.category}</span>
        <button className={"heart" + (saved ? " on" : "")} aria-label="Save to wishlist"
          onClick={() => toggleWishlist(p.id)}>{saved ? "♥" : "♡"}</button>
      </div>
    </div>
  );
}

export function ProductGrid({ items }) {
  return (
    <div className="product-grid">
      {items.map((p, i) => <ProductCard key={p.id} p={p} delay={(i % 4) * 90} />)}
    </div>
  );
}

/* ---------------- Page head + scroll restore ---------------- */
export function PageHead({ eyebrow, title }) {
  return (
    <header className="page-head">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
    </header>
  );
}

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
