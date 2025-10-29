import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Load products from JSON
const productsPath = path.join(__dirname, 'products.json');
let products = [];
try {
  products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
} catch (e) {
  products = [];
}

// In-memory orders (persist to file for demo)
const ordersPath = path.join(__dirname, 'orders.json');
let orders = [];
try { orders = JSON.parse(fs.readFileSync(ordersPath, 'utf-8')); } catch { orders = []; }
function saveOrders() { fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2)); }

// Users storage
const usersPath = path.join(__dirname, 'users.json');
let users = [];
try { users = JSON.parse(fs.readFileSync(usersPath, 'utf-8')); } catch { users = []; }
function saveUsers() { fs.writeFileSync(usersPath, JSON.stringify(users, null, 2)); }

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.get('/api/products', (req, res) => {
  const { cat } = req.query;
  let list = products;
  if (cat && cat !== 'all') list = list.filter(p => p.cat === cat);
  res.json(list);
});

app.get('/api/products/:id', (req, res) => {
  const p = products.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

app.post('/api/orders', (req, res) => {
  const { items, address, payment } = req.body || {};
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'Cart empty' });
  const enriched = items.map(({ id, qty }) => {
    const p = products.find(x => x.id === id);
    return { id, name: p?.name || id, price: p?.price || 0, qty: Number(qty || 1) };
  });
  const subtotal = enriched.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 30000;
  const total = subtotal + shipping;
  const order = {
    id: 'TN' + nanoid(8).toUpperCase(),
    createdAt: new Date().toISOString(),
    items: enriched,
    subtotal,
    shipping,
    total,
    address,
    payment: payment || 'cod'
  };
  orders.push(order);
  saveOrders();
  res.status(201).json(order);
});

app.get('/api/orders/:id', (req, res) => {
  const o = orders.find(x => x.id === req.params.id);
  if (!o) return res.status(404).json({ error: 'Not found' });
  res.json(o);
});

// Auth endpoints
app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password || !name) return res.status(400).json({ error: 'Thiếu thông tin' });
  if (password.length < 6) return res.status(400).json({ error: 'Mật khẩu tối thiểu 6 ký tự' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Email không hợp lệ' });
  if (users.find(u => u.email === email)) return res.status(400).json({ error: 'Email đã tồn tại' });
  const user = { id: nanoid(), email, password, name, createdAt: new Date().toISOString() };
  users.push(user);
  saveUsers();
  res.status(201).json({ id: user.id, email: user.email, name: user.name });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Thiếu email hoặc mật khẩu' });
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Email hoặc mật khẩu không đúng' });
  res.json({ id: user.id, email: user.email, name: user.name });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`TechNest API listening on http://localhost:${PORT}`));
