import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCTS, LOOKS } from "../data/catalog";
import { ProductGrid } from "../components/Chrome";

gsap.registerPlugin(ScrollTrigger);
const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- Hero changing room ---------------- */
function ChangingRoom() {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const busy = useRef(false);
  const currentRef = useRef(0);
  const timer = useRef(null);
  currentRef.current = current;

  const setLook = i => {
    if (busy.current || i === currentRef.current) return;
    busy.current = true;
    if (reduce()) { setCurrent(i); busy.current = false; return; }
    setFlipping(true);                    // rotate to 90° (edge-on)
    setTimeout(() => {
      setCurrent(i);                      // swap outfit while hidden
      setFlipping(false);                 // rotate back — "changed clothes"
      setTimeout(() => (busy.current = false), 900);
    }, 460);
  };

  useEffect(() => {
    timer.current = setInterval(() => setLook((currentRef.current + 1) % LOOKS.length), 4200);
    return () => clearInterval(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pick = i => { clearInterval(timer.current); setLook(i); };

  return (
    <>
      <div className={"stage" + (flipping ? " flipping" : "")} aria-label="Model changing looks">
        <div className="stage__card">
          {LOOKS.map((l, i) => (
            <Link key={l.name} to={l.link} className={"stage__look" + (i === current ? " is-active" : "")} aria-label={l.name}>
              <img src={l.img} alt={l.name} />
            </Link>
          ))}
        </div>
      </div>
      <div className="hero__right">
        <div className="looks">
          {LOOKS.map((l, i) => (
            <button key={l.name} className={i === current ? "is-active" : ""} onClick={() => pick(i)}>
              <span className="tick" />Look {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
        <p className="looks__name">{LOOKS[current].name}</p>
      </div>
    </>
  );
}

/* ---------------- Home ---------------- */
export default function Home() {
  const root = useRef(null);

  useEffect(() => {
    if (reduce()) {
      document.querySelectorAll(".reveal-clip").forEach(el => (el.style.clipPath = "none"));
      return;
    }
    const ctx = gsap.context(() => {
      /* hero entrance */
      gsap.from(".hero__left > *", { y: 40, opacity: 0, stagger: 0.12, duration: 1, ease: "power3.out", delay: 0.3 });
      gsap.from(".stage", { y: 60, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.4 });

      /* 1 — pinned horizontal rail */
      const track = document.querySelector(".rail__track");
      if (track) {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 80),
          ease: "none",
          scrollTrigger: {
            trigger: ".rail",
            start: "top top",
            end: () => "+=" + (track.scrollWidth - window.innerWidth + 400),
            pin: ".rail__pin",
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
      }

      /* 2 — editorial clip reveal + parallax */
      document.querySelectorAll(".editorial__media").forEach(media => {
        const img = media.querySelector("img");
        gsap.fromTo(media, { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: media, start: "top 80%" } });
        gsap.fromTo(img, { yPercent: -8, scale: 1.15 },
          { yPercent: 8, scale: 1.15, ease: "none",
            scrollTrigger: { trigger: media, start: "top bottom", end: "bottom top", scrub: true } });
      });

      /* 3 — manifesto word ink-in */
      gsap.to(".manifesto .word", {
        opacity: 1, stagger: 0.06, ease: "none",
        scrollTrigger: { trigger: ".manifesto", start: "top 75%", end: "bottom 60%", scrub: true }
      });

      /* marquee */
      gsap.to(".marquee__track", { xPercent: -50, ease: "none", duration: 26, repeat: -1 });
    }, root);
    return () => ctx.revert();
  }, []);

  const manifesto = "Color is a decision someone else made. We removed it, so the cut, the fall, and the person wearing it are all that remain.";

  return (
    <div ref={root}>
      <header className="hero">
        <span className="hero__bg-word" aria-hidden="true">FORM</span>
        <div className="hero__left">
          <p className="eyebrow">Fall / Winter 2026</p>
          <h1>Two colors.<br /><em>One line.</em></h1>
          <p>Every piece in this house is cut in black or bone white. Watch the model change — each look is one garment doing all the work.</p>
          <Link className="hero__cta" to="/shop">Enter the shop</Link>
        </div>
        <ChangingRoom />
        <span className="hero__scroll-hint">Scroll</span>
      </header>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          <span>BLACK <i>FW26</i> WHITE <i>FW26</i> NOTHING ELSE <i>FW26</i> BLACK <i>FW26</i> WHITE <i>FW26</i> NOTHING ELSE <i>FW26</i></span>
          <span>BLACK <i>FW26</i> WHITE <i>FW26</i> NOTHING ELSE <i>FW26</i> BLACK <i>FW26</i> WHITE <i>FW26</i> NOTHING ELSE <i>FW26</i></span>
        </div>
      </div>

      <section className="rail" id="collection">
        <div className="rail__pin">
          <div className="rail__head">
            <h2>The Collection</h2>
            <span className="eyebrow">Scroll to move sideways</span>
          </div>
          <div className="rail__track">
            {PRODUCTS.slice(0, 6).map((p, i) => (
              <Link className="rail__item" to={`/product/${p.id}`} key={p.id}>
                <figure>
                  <img src={p.img} alt={p.name} />
                  <span className="rail__index">{String(i + 1).padStart(2, "0")}</span>
                </figure>
                <div className="rail__meta"><span>{p.name}</span><span className="price">${p.price}</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial">
        <div className="editorial__media"><img src="/assets/editorial-1.svg" alt="Atelier study, figure in white on black" /></div>
        <div className="editorial__copy">
          <p className="eyebrow">The Atelier</p>
          <h2>Cut once.<br />Sew in silence.</h2>
          <p>Each garment is drafted flat, cut once, and finished by a single pair of hands. No trims, no hardware, no logo on the outside.</p>
          <p>The seam is the only decoration this house permits.</p>
          <Link className="link-line" to="/about">Read about the house</Link>
        </div>
      </section>

      <section className="editorial editorial--flip">
        <div className="editorial__media"><img src="/assets/editorial-2.svg" alt="Column dress framed in bone white" /></div>
        <div className="editorial__copy">
          <p className="eyebrow">Piece of the season</p>
          <h2>The Column Dress</h2>
          <p>A single line from collarbone to hem. Heavy crepe keeps the silhouette still while the body inside it moves.</p>
          <Link className="link-line" to="/product/dress-column">View the piece</Link>
        </div>
      </section>

      <section className="grid-section">
        <div className="grid-section__head">
          <h2>New this week</h2>
          <Link className="link-line" to="/shop">View all pieces</Link>
        </div>
        <ProductGrid items={PRODUCTS.slice(0, 4)} />
      </section>

      <section className="manifesto" id="manifesto">
        <p className="eyebrow">Manifesto</p>
        <p>{manifesto.split(" ").map((w, i) => <span className="word" key={i}>{w} </span>)}</p>
      </section>
    </div>
  );
}
