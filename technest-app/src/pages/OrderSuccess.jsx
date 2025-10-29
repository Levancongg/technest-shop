import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function OrderSuccess() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  useEffect(()=>{ fetch(`${API}/api/orders/${id}`).then(r=>r.json()).then(setOrder) }, [id])

  if (!order) return <main className="section"><div className="container">Đang tải...</div></main>

  return (
    <main className="section">
      <div className="container">
        <h1>Đặt hàng thành công</h1>
        <p className="muted">Mã đơn: {order.id}</p>
        <div className="summary-card" style={{marginTop:12}}>
          {order.items.map(i => (
            <div key={i.id} style={{display:'flex',justifyContent:'space-between'}}>
              <span>{i.qty} × {i.name}</span>
              <strong>{(i.price*i.qty).toLocaleString('vi-VN')}₫</strong>
            </div>
          ))}
          <div style={{display:'flex',justifyContent:'space-between'}}><span>Tạm tính</span><strong>{order.subtotal.toLocaleString('vi-VN')}₫</strong></div>
          <div style={{display:'flex',justifyContent:'space-between'}}><span>Phí vận chuyển</span><strong>{order.shipping.toLocaleString('vi-VN')}₫</strong></div>
          <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid #e5e7eb',marginTop:6,paddingTop:6}}><span>Tổng cộng</span><strong>{order.total.toLocaleString('vi-VN')}₫</strong></div>
        </div>
        <div style={{marginTop:12, display:'flex', gap:8}}>
          <Link className="btn-ghost" to="/">Tiếp tục mua sắm</Link>
          <Link className="btn-primary" to="/category/all">Xem sản phẩm</Link>
        </div>
      </div>
    </main>
  )
}
