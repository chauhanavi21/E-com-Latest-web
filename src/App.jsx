import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import { Nav, Footer, CartDrawer, Toast, ScrollToTop } from "./components/Chrome";
import Home from "./pages/Home";
import { Shop, Product, Lookbook, Wishlist } from "./pages/ShopPages";
import { Checkout, Confirmation } from "./pages/Checkout";
import { Journal, JournalPost, About, Contact, Faq, Account, Legal, NotFound } from "./pages/ContentPages";

function Loader() {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading -> exit -> gone

  useEffect(() => {
    let raf, done = false;
    let current = 0;
    const start = performance.now();

    // preload the three hero looks so the stage never pops in
    const heroImgs = ["photo-1629374029669-aab2f060553b", "photo-1619086303291-0ef7699e4b31", "photo-1578632292335-df3abbb0d586"]
      .map(id => {
        const im = new Image();
        im.src = `https://images.unsplash.com/${id}?q=80&w=800&auto=format&fit=crop&sat=-100`;
        return new Promise(res => { im.onload = res; im.onerror = res; });
      });
    const ready = Promise.all([
      ...heroImgs,
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise(res => (document.readyState === "complete" ? res() : window.addEventListener("load", res, { once: true })))
    ]);
    // never hold the page hostage: cap the wait at 2.5s
    const capped = Promise.race([ready, new Promise(res => setTimeout(res, 2500))]);
    capped.then(() => (done = true));

    const tick = now => {
      // ease toward 90% while loading, snap to 100 when done
      const target = done ? 100 : Math.min(90, ((now - start) / 1600) * 90);
      current += (target - current) * 0.12;
      setPct(Math.round(current));
      if (current >= 99.5) {
        setPct(100);
        setPhase("exit");
        setTimeout(() => setPhase("gone"), 750);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (phase === "gone") return null; // fully removed from the DOM — zero cost after load
  return (
    <div className={"loader" + (phase === "exit" ? " done" : "")} aria-hidden="true">
      <div className="loader__inner">
        <div className="loader__word"><span style={{ transform: `translateY(${100 - pct}%)` }}>MONO/FORM</span></div>
        <div className="loader__bar"><i style={{ transform: `scaleX(${pct / 100})` }} /></div>
        <span className="loader__pct">{pct}</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Loader />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/lookbook" element={<Lookbook />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<JournalPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/account" element={<Account />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/legal/privacy" element={<Legal kind="privacy" />} />
            <Route path="/legal/terms" element={<Legal kind="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <CartDrawer />
        <Toast />
      </BrowserRouter>
    </StoreProvider>
  );
}
