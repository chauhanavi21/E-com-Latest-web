import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import { Nav, Footer, CartDrawer, Toast, ScrollToTop } from "./components/Chrome";
import Home from "./pages/Home";
import { Shop, Product, Lookbook, Wishlist } from "./pages/ShopPages";
import { Checkout, Confirmation } from "./pages/Checkout";
import { Journal, JournalPost, About, Contact, Faq, Account, Legal, NotFound } from "./pages/ContentPages";

function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={"loader" + (done ? " done" : "")}>
      <div className="loader__word"><span>MONO/FORM</span></div>
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
