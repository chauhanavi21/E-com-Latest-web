/* ============================================================
   MONO/FORM — dummy backend (Node + Express)
   In-memory + JSON-file persistence. Demo only:
   swap the db helpers for a real database when going live.
   ============================================================ */
import express from "express";
import cors from "cors";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA = p => path.join(__dirname, "data", p);
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

/* ---------------- tiny JSON-file "db" ---------------- */
function read(file, fallback) {
  try { return JSON.parse(fs.readFileSync(DATA(file), "utf8")); }
  catch { return fallback; }
}
function write(file, value) {
  fs.writeFileSync(DATA(file), JSON.stringify(value, null, 2));
}

const products = read("products.json", []);
const hash = s => crypto.createHash("sha256").update(s).digest("hex");

/* ---------------- health ---------------- */
app.get("/api/health", (_req, res) => res.json({ ok: true, service: "monoform", time: new Date().toISOString() }));

/* ---------------- products ---------------- */
app.get("/api/products", (req, res) => {
  const { category, sort } = req.query;
  let list = [...products];
  if (category && category !== "All") list = list.filter(p => p.category === category);
  if (sort === "low") list.sort((a, b) => a.price - b.price);
  if (sort === "high") list.sort((a, b) => b.price - a.price);
  res.json(list);
});
app.get("/api/products/:id", (req, res) => {
  const p = products.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: "Piece not found" });
  res.json(p);
});

/* ---------------- orders ---------------- */
app.post("/api/orders", (req, res) => {
  const { items, name, email, address } = req.body || {};
  if (!Array.isArray(items) || !items.length) return res.status(400).json({ error: "No items in order" });
  if (!name || !email || !address) return res.status(400).json({ error: "Missing shipping details" });

  // server computes the total — never trust the client's math
  const SHIPPING = 12;
  let subtotal = 0;
  const lines = [];
  for (const item of items) {
    const p = products.find(x => x.id === item.id);
    if (!p) return res.status(400).json({ error: `Unknown piece: ${item.id}` });
    subtotal += p.price;
    lines.push({ id: p.id, name: p.name, size: item.size || "M", price: p.price });
  }

  const order = {
    number: "MF-" + crypto.randomBytes(3).toString("hex").toUpperCase(),
    createdAt: new Date().toISOString(),
    status: "confirmed",
    items: lines,
    subtotal,
    shipping: SHIPPING,
    total: subtotal + SHIPPING,
    name, email, address
  };
  const orders = read("orders.json", []);
  orders.push(order);
  write("orders.json", orders);
  res.status(201).json(order);
});
app.get("/api/orders/:number", (req, res) => {
  const order = read("orders.json", []).find(o => o.number === req.params.number);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

/* ---------------- auth (demo) ---------------- */
app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email?.includes("@") || (password || "").length < 4)
    return res.status(400).json({ error: "Invalid details" });
  const users = read("users.json", []);
  if (users.some(u => u.email === email)) return res.status(409).json({ error: "Email already registered" });
  users.push({ name, email, password: hash(password), createdAt: new Date().toISOString() });
  write("users.json", users);
  res.status(201).json({ name, email });
});
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  const user = read("users.json", []).find(u => u.email === email && u.password === hash(password || ""));
  if (!user) return res.status(401).json({ error: "Wrong email or password" });
  res.json({ name: user.name, email: user.email });
});

/* ---------------- newsletter + contact ---------------- */
app.post("/api/newsletter", (req, res) => {
  const { email } = req.body || {};
  if (!email?.includes("@")) return res.status(400).json({ error: "Invalid email" });
  const list = read("newsletter.json", []);
  if (!list.includes(email)) { list.push(email); write("newsletter.json", list); }
  res.json({ ok: true });
});
app.post("/api/contact", (req, res) => {
  const { name, email, topic, message } = req.body || {};
  if (!name || !email?.includes("@") || !message) return res.status(400).json({ error: "Missing fields" });
  const inbox = read("messages.json", []);
  inbox.push({ name, email, topic, message, receivedAt: new Date().toISOString() });
  write("messages.json", inbox);
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`MONO/FORM API running on http://localhost:${PORT}`));
