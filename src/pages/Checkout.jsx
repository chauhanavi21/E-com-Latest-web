import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/catalog";
import { PageHead } from "../components/Chrome";
import { useStore } from "../context/StoreContext";

const SHIPPING = 12;

export function Checkout() {
  const { cart, removeFromCart, total, clearCart, user, showToast } = useStore();
  const nav = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: user?.email || "", name: user?.name || "",
    address: "", city: "", zip: "", country: "United States",
    card: "", expiry: "", cvc: ""
  });
  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const lines = useMemo(() => cart.map(i => ({ ...i, p: PRODUCTS.find(x => x.id === i.id) })).filter(l => l.p), [cart]);
  const grand = total + (cart.length ? SHIPPING : 0);

  const validStep1 = form.email.includes("@") && form.name && form.address && form.city && form.zip;
  const validStep2 = form.card.replace(/\s/g, "").length >= 12 && form.expiry && form.cvc.length >= 3;

  const placeOrder = () => {
    const order = {
      number: "MF-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      items: lines.map(l => ({ name: l.p.name, size: l.size, price: l.p.price })),
      total: grand, name: form.name, email: form.email,
      address: `${form.address}, ${form.city} ${form.zip}, ${form.country}`
    };
    clearCart();
    nav("/confirmation", { state: order });
  };

  if (!cart.length) {
    return (
      <>
        <PageHead eyebrow="Checkout" title="Your bag is empty" />
        <div className="empty-state">
          <p>Add a piece or two, then come back.</p>
          <Link className="hero__cta" to="/shop">Go to the shop</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHead eyebrow="Secure checkout — demo" title="Checkout" />
      <div className="checkout">
        <div className="checkout__form">
          <div className="checkout__steps">
            {["Shipping", "Payment", "Review"].map((s, i) => (
              <button key={s} className={step === i + 1 ? "is-active" : step > i + 1 ? "done" : ""}
                onClick={() => step > i + 1 && setStep(i + 1)}>
                {String(i + 1).padStart(2, "0")} — {s}
              </button>
            ))}
          </div>

          {step === 1 && (
            <div className="fieldset">
              <label>Email<input name="email" type="email" value={form.email} onChange={set} placeholder="you@example.com" /></label>
              <label>Full name<input name="name" value={form.name} onChange={set} placeholder="First Last" /></label>
              <label>Address<input name="address" value={form.address} onChange={set} placeholder="Street and number" /></label>
              <div className="row">
                <label>City<input name="city" value={form.city} onChange={set} /></label>
                <label>ZIP<input name="zip" value={form.zip} onChange={set} /></label>
              </div>
              <label>Country
                <select name="country" value={form.country} onChange={set}>
                  {["United States", "Canada", "United Kingdom", "European Union", "India", "Japan", "Australia", "Other"].map(c => <option key={c}>{c}</option>)}
                </select>
              </label>
              <button className="pdp__add" disabled={!validStep1}
                onClick={() => validStep1 ? setStep(2) : showToast("Fill in every field")}>
                Continue to payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="fieldset">
              <p className="eyebrow" style={{ marginBottom: 6 }}>Demo checkout — no card is charged or stored. Use any numbers.</p>
              <label>Card number<input name="card" inputMode="numeric" value={form.card} onChange={set} placeholder="4242 4242 4242 4242" /></label>
              <div className="row">
                <label>Expiry<input name="expiry" value={form.expiry} onChange={set} placeholder="MM/YY" /></label>
                <label>CVC<input name="cvc" inputMode="numeric" value={form.cvc} onChange={set} placeholder="123" /></label>
              </div>
              <button className="pdp__add" disabled={!validStep2} onClick={() => setStep(3)}>Review order</button>
            </div>
          )}

          {step === 3 && (
            <div className="fieldset">
              <div className="review-block">
                <h4>Ship to</h4>
                <p>{form.name}<br />{form.address}, {form.city} {form.zip}<br />{form.country}</p>
              </div>
              <div className="review-block">
                <h4>Payment</h4>
                <p>Card ending {form.card.replace(/\s/g, "").slice(-4)}</p>
              </div>
              <button className="pdp__add" onClick={placeOrder}>Place order — ${grand}</button>
            </div>
          )}
        </div>

        <aside className="checkout__summary">
          <h3>Order summary</h3>
          {lines.map(l => (
            <div className="summary-line" key={l.ts}>
              <img src={l.p.img} alt={l.p.name} />
              <div>
                <h4>{l.p.name}</h4>
                <span className="eyebrow">Size {l.size}</span>
              </div>
              <div className="summary-line__right">
                <span>${l.p.price}</span>
                <button onClick={() => removeFromCart(l.ts)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="summary-totals">
            <div><span>Subtotal</span><span>${total}</span></div>
            <div><span>Shipping</span><span>${SHIPPING}</span></div>
            <div className="grand"><span>Total</span><span>${grand}</span></div>
          </div>
        </aside>
      </div>
    </>
  );
}

export function Confirmation() {
  const { state } = useLocation();
  if (!state) {
    return (
      <>
        <PageHead eyebrow="Order" title="No order found" />
        <div className="empty-state"><Link className="hero__cta" to="/shop">Back to the shop</Link></div>
      </>
    );
  }
  return (
    <>
      <PageHead eyebrow={`Order ${state.number}`} title="Thank you." />
      <div className="confirmation">
        <p>A confirmation is on its way to <strong>{state.email}</strong>. Your pieces ship within 2 business days to:</p>
        <p className="confirmation__addr">{state.name}<br />{state.address}</p>
        <div className="confirmation__items">
          {state.items.map((i, idx) => (
            <div key={idx}><span>{i.name} — {i.size}</span><span>${i.price}</span></div>
          ))}
          <div className="grand"><span>Total paid</span><span>${state.total}</span></div>
        </div>
        <Link className="hero__cta" to="/shop">Continue shopping</Link>
      </div>
    </>
  );
}
