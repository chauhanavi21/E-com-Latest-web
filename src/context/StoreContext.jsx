import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { PRODUCTS } from "../data/catalog";

const StoreContext = createContext(null);

function usePersisted(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial; }
    catch { return initial; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
  return [value, setValue];
}

export function StoreProvider({ children }) {
  const [cart, setCart] = usePersisted("mf_cart", []);
  const [wishlist, setWishlist] = usePersisted("mf_wishlist", []);
  const [user, setUser] = usePersisted("mf_user", null);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = useCallback(msg => {
    setToast(msg);
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => setToast(""), 2200);
  }, []);

  const addToCart = useCallback((id, size = "M") => {
    setCart(c => [...c, { id, size, ts: Date.now() + Math.random() }]);
    showToast("Added to bag");
    setCartOpen(true);
  }, [setCart, showToast]);

  const removeFromCart = useCallback(ts => setCart(c => c.filter(i => i.ts !== ts)), [setCart]);
  const clearCart = useCallback(() => setCart([]), [setCart]);

  const toggleWishlist = useCallback(id => {
    setWishlist(w => {
      const has = w.includes(id);
      showToast(has ? "Removed from wishlist" : "Saved to wishlist");
      return has ? w.filter(x => x !== id) : [...w, id];
    });
  }, [setWishlist, showToast]);

  const total = useMemo(
    () => cart.reduce((sum, i) => sum + (PRODUCTS.find(p => p.id === i.id)?.price || 0), 0),
    [cart]
  );

  const value = {
    cart, addToCart, removeFromCart, clearCart, total,
    wishlist, toggleWishlist,
    user, setUser,
    cartOpen, setCartOpen,
    toast, showToast
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
