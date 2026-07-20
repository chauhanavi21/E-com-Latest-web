import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { POSTS, FAQS, SIZE_ROWS, EDITORIAL } from "../data/catalog";
import { PageHead, Pic } from "../components/Chrome";
import { useStore } from "../context/StoreContext";
import { api, withFallback } from "../api";

gsap.registerPlugin(ScrollTrigger);
const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- Journal list ---------------- */
export function Journal() {
  return (
    <>
      <PageHead eyebrow="Notes from the house" title="Journal" />
      <div className="journal">
        {POSTS.map((post, i) => (
          <Link className="journal__row" to={`/journal/${post.slug}`} key={post.slug}>
            <span className="journal__num">{String(i + 1).padStart(2, "0")}</span>
            <figure><Pic src={post.img} fb={post.fb} alt="" /></figure>
            <div>
              <span className="eyebrow">{post.tag} — {post.date}</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </div>
            <span className="journal__arrow">→</span>
          </Link>
        ))}
      </div>
    </>
  );
}

/* ---------------- Journal post ---------------- */
export function JournalPost() {
  const { slug } = useParams();
  const post = POSTS.find(p => p.slug === slug);
  if (!post) return <NotFound />;
  const others = POSTS.filter(p => p.slug !== slug);
  return (
    <article className="post">
      <header className="post__head">
        <span className="eyebrow">{post.tag} — {post.date}</span>
        <h1>{post.title}</h1>
      </header>
      <figure className="post__media"><Pic src={post.img} fb={post.fb} alt="" /></figure>
      <div className="post__body">
        {post.body.map((para, i) => <p key={i}>{para}</p>)}
      </div>
      <div className="post__more">
        <h3>More from the journal</h3>
        {others.map(p => (
          <Link key={p.slug} to={`/journal/${p.slug}`} className="link-line">{p.title}</Link>
        ))}
      </div>
    </article>
  );
}

/* ---------------- About ---------------- */
export function About() {
  const root = useRef(null);
  useEffect(() => {
    if (reduce()) return;
    const ctx = gsap.context(() => {
      gsap.from(".about-hero > *", { y: 40, opacity: 0, stagger: 0.12, duration: 1, ease: "power3.out", delay: 0.2 });
      document.querySelectorAll(".about-strip img").forEach((img, i) => {
        gsap.fromTo(img, { yPercent: -6 }, {
          yPercent: 6, ease: "none",
          scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 0.5 + i * 0.3 }
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <header className="about-hero">
        <p className="eyebrow">Est. 2026 — The House</p>
        <h1>We work in<br />two colors.</h1>
        <p>MONO/FORM is a small clothing house built on a restriction: black, bone white, and nothing else. When color leaves the room, cut has to carry everything.</p>
      </header>
      <section className="about-strip">
        <figure><Pic src={EDITORIAL.atelier.img} fb={EDITORIAL.atelier.fb} alt="Portrait study" /></figure>
        <figure><Pic src={EDITORIAL.column.img} fb={EDITORIAL.column.fb} alt="The Column Dress" /></figure>
        <figure><Pic src={EDITORIAL.street.img} fb={EDITORIAL.street.fb} alt="Street look in white" /></figure>
      </section>
      <section className="about-values">
        {[
          ["Restraint", "No prints, no hardware, no exterior branding. The garment should be recognizable by its silhouette from across the street."],
          ["One line", "Every piece begins as a single drawn line. If the line needs decoration to work, the line is wrong and we start again."],
          ["Slow release", "Eight pieces per season. Each is cut to order in small runs, finished by hand, and never discounted."],
          ["Wear it long", "Natural fibers, reinforced seams, repairable construction. We repair any MONO/FORM piece free of charge, forever."]
        ].map(([h, p]) => (
          <article key={h}><h3>{h}</h3><p>{p}</p></article>
        ))}
      </section>
    </div>
  );
}

/* ---------------- Contact ---------------- */
export function Contact() {
  const { showToast } = useStore();
  const [form, setForm] = useState({ name: "", email: "", topic: "Order question", message: "" });
  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHead eyebrow="We answer within one business day" title="Contact" />
      <div className="contact">
        <div className="fieldset">
          {sent ? (
            <div className="empty-state" style={{ padding: "40px 0" }}>
              <p>Thank you, {form.name.split(" ")[0] || "friend"}. Your note is with the atelier — expect a reply within one business day.</p>
            </div>
          ) : (
            <>
              <label>Name<input name="name" value={form.name} onChange={set} /></label>
              <label>Email<input name="email" type="email" value={form.email} onChange={set} /></label>
              <label>Topic
                <select name="topic" value={form.topic} onChange={set}>
                  {["Order question", "Sizing help", "Repair request", "Press", "Wholesale", "Something else"].map(t => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label>Message<textarea name="message" rows="6" value={form.message} onChange={set} /></label>
              <button className="pdp__add" onClick={async () => {
                if (!(form.name && form.email.includes("@") && form.message)) {
                  showToast("Fill in name, email and message"); return;
                }
                try {
                  await withFallback(() => api.post("/contact", form), () => ({ ok: true }));
                  setSent(true);
                } catch (err) { showToast(err.message); }
              }}>Send message</button>
            </>
          )}
        </div>
        <aside className="contact__aside">
          <h4>The Atelier</h4>
          <p>14 Line Street<br />New York, NY 10013</p>
          <h4>Hours</h4>
          <p>Tue–Sat, 11:00–19:00<br />Fittings by appointment</p>
          <h4>Write</h4>
          <p>studio@monoform.example<br />press@monoform.example</p>
        </aside>
      </div>
    </>
  );
}

/* ---------------- FAQ + size guide ---------------- */
export function Faq() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash === "#sizing") document.getElementById("sizing")?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <>
      <PageHead eyebrow="Shipping, returns, sizing, care" title="Questions" />
      <div className="faq">
        {FAQS.map(group => (
          <section key={group.group}>
            <h3 className="eyebrow">{group.group}</h3>
            {group.items.map(([q, a]) => (
              <details key={q} className="faq__item">
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </section>
        ))}

        <section id="sizing">
          <h3 className="eyebrow">Size guide (cm)</h3>
          <table className="size-table">
            <thead><tr><th>Size</th><th>Chest</th><th>Waist</th><th>Hip</th></tr></thead>
            <tbody>
              {SIZE_ROWS.map(r => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}
            </tbody>
          </table>
          <p className="faq__note">Measurements are body measurements, not garment. Our line is intentionally relaxed — between sizes, take the smaller one.</p>
        </section>
      </div>
    </>
  );
}

/* ---------------- Account ---------------- */
export function Account() {
  const { user, setUser, showToast, wishlist, cart } = useStore();
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const nav = useNavigate();

  if (user) {
    return (
      <>
        <PageHead eyebrow="Account" title={`Hello, ${user.name.split(" ")[0]}.`} />
        <div className="account">
          <div className="account__grid">
            <article><h3>{cart.length}</h3><p className="eyebrow">Pieces in bag</p></article>
            <article><h3>{wishlist.length}</h3><p className="eyebrow">Saved to wishlist</p></article>
            <article><h3>0</h3><p className="eyebrow">Past orders (demo)</p></article>
          </div>
          <p className="account__note">This is a frontend demo — orders and profile data will live here once the backend is connected.</p>
          <div className="account__actions">
            <Link className="hero__cta" to="/shop">Go to the shop</Link>
            <button className="link-line" onClick={() => { setUser(null); showToast("Signed out"); }}>Sign out</button>
          </div>
        </div>
      </>
    );
  }

  const submit = async () => {
    if (!form.email.includes("@") || form.password.length < 4 || (mode === "create" && !form.name)) {
      showToast("Check your details"); return;
    }
    try {
      const u = await withFallback(
        () => api.post(mode === "create" ? "/auth/register" : "/auth/login",
          { name: form.name, email: form.email, password: form.password }),
        () => ({ name: form.name || form.email.split("@")[0], email: form.email })
      );
      setUser(u);
      showToast(mode === "create" ? "Account created" : "Welcome back");
      nav("/account");
    } catch (err) {
      showToast(err.message);
    }
  };

  return (
    <>
      <PageHead eyebrow="Demo sign in — nothing leaves your browser" title="Account" />
      <div className="auth">
        <div className="auth__tabs">
          <button className={mode === "signin" ? "is-active" : ""} onClick={() => setMode("signin")}>Sign in</button>
          <button className={mode === "create" ? "is-active" : ""} onClick={() => setMode("create")}>Create account</button>
        </div>
        <div className="fieldset">
          {mode === "create" && <label>Full name<input name="name" value={form.name} onChange={set} /></label>}
          <label>Email<input name="email" type="email" value={form.email} onChange={set} /></label>
          <label>Password<input name="password" type="password" value={form.password} onChange={set} /></label>
          <button className="pdp__add" onClick={submit}>{mode === "create" ? "Create account" : "Sign in"}</button>
        </div>
      </div>
    </>
  );
}

/* ---------------- Legal ---------------- */
export function Legal({ kind }) {
  const isPrivacy = kind === "privacy";
  return (
    <>
      <PageHead eyebrow="Legal" title={isPrivacy ? "Privacy" : "Terms"} />
      <div className="legal">
        {isPrivacy ? (
          <>
            <p>This is a demo storefront. No analytics run on this site and no personal data leaves your browser — the bag, wishlist and demo account are stored locally on your device and can be cleared at any time from your browser settings.</p>
            <p>When a backend is connected, this page will describe exactly what is collected (order details, shipping address, email) and why, in plain language, with no third-party ad tracking.</p>
          </>
        ) : (
          <>
            <p>These placeholder terms cover the demo storefront. Products, prices and availability shown here are illustrative. No orders are fulfilled and no payments are processed.</p>
            <p>Once live: all pieces are covered by a 30-day return window, a free lifetime repair service, and pricing shown at checkout is final — this house does not run discounts.</p>
          </>
        )}
      </div>
    </>
  );
}

/* ---------------- 404 ---------------- */
export function NotFound() {
  return (
    <>
      <PageHead eyebrow="404" title="This page is not in the collection." />
      <div className="empty-state">
        <p>The line you followed leads nowhere. Try the shop instead.</p>
        <Link className="hero__cta" to="/">Back to the house</Link>
      </div>
    </>
  );
}
