import { useMemo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function Cart() {
  const { items, set, remove, clear } = useCart()
  const navigate = useNavigate()

  const entries = useMemo(() => Object.entries(items), [items])
  const [products, setProducts] = useState([])
  useEffect(()=>{ fetch(`${API}/api/products`).then(r=>r.json()).then(setProducts) },[])
  const find = id => products.find(p=>p.id===id) || { price:0, name:id, image:'' }
  const subtotal = entries.reduce((s,[id,qty])=> s + find(id).price * Number(qty), 0)
  const shipping = entries.length ? 30000 : 0
  const total = subtotal + shipping

  function placeOrder(e) {
    e.preventDefault()
    if (!entries.length) return alert('Giỏ hàng trống')
    const fd = new FormData(e.currentTarget)
    const address = [fd.get('name'), fd.get('phone'), fd.get('address'), fd.get('city'), fd.get('district')]
    const payment = fd.get('payment') || 'cod'
    const payload = { items: entries.map(([id, qty])=>({ id, qty })), address, payment }
    fetch(`${API}/api/orders`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
      .then(r=>r.json()).then(o => { clear(); navigate(`/order-success/${o.id}`) })
  }

  return (
    <main className="section">
      <div className="container cart-layout">
        <section className="cart-items">
          <h1>Giỏ hàng</h1>
          <div className="cart-list">
            {entries.length===0 && <p className="muted">Giỏ hàng trống.</p>}
            {entries.map(([id, qty])=>{
              const p = find(id)
              return (
                <div className="cart-row" key={id}>
                  <img src={p.image} alt={p.name} />
                  <div><div className="title">{p.name}</div><div className="muted">{p.specs}</div></div>
                  <div className="price">{p.price.toLocaleString('vi-VN')}₫</div>
                  <div className="qty-control">
                    <button onClick={()=>set(id, Math.max(1, Number(qty)-1))}>-</button>
                    <input type="number" value={qty} min={1} onChange={e=>set(id, Math.max(1, Number(e.target.value)||1))} />
                    <button onClick={()=>set(id, Number(qty)+1)}>+</button>
                  </div>
                  <button className="remove" onClick={()=>remove(id)}>✕</button>
                </div>
              )
            })}
          </div>
        </section>
        <aside className="cart-summary">
          <div className="summary-card">
            <h2>Tóm tắt đơn hàng</h2>
            <div className="summary-row"><span>Tạm tính</span><strong>{subtotal.toLocaleString('vi-VN')}₫</strong></div>
            <div className="summary-row"><span>Phí vận chuyển</span><strong>{shipping.toLocaleString('vi-VN')}₫</strong></div>
            <div className="summary-row total"><span>Tổng cộng</span><strong>{total.toLocaleString('vi-VN')}₫</strong></div>
          </div>
          <div className="checkout-card">
            <h3>Địa chỉ giao hàng</h3>
            <form onSubmit={placeOrder} className="address-form">
              <input name="name" type="text" placeholder="Họ và tên" required />
              <input name="phone" type="tel" placeholder="Số điện thoại" required />
              <input name="address" type="text" placeholder="Địa chỉ" required />
              <div className="form-row">
                <input name="city" type="text" placeholder="Tỉnh/Thành" required />
                <input name="district" type="text" placeholder="Quận/Huyện" required />
              </div>
              <h3>Phương thức thanh toán</h3>
              <label><input type="radio" name="payment" value="cod" defaultChecked /> Thanh toán khi nhận hàng (COD)</label>
              <label><input type="radio" name="payment" value="bank" /> Chuyển khoản ngân hàng</label>
              <label><input type="radio" name="payment" value="card" /> Thẻ tín dụng/ghi nợ</label>
              <button className="btn-primary full" type="submit">Đặt hàng</button>
            </form>
          </div>
        </aside>
      </div>
    </main>
  )
}
