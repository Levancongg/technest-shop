import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function Product() {
  const { id } = useParams()
  const { add } = useCart()
  const [product, setProduct] = useState(null)
  const [recs, setRecs] = useState([])
  const [qty, setQty] = useState(1)

  useEffect(() => {
    fetch(`${API}/api/products/${id}`).then(r=>r.json()).then(p => {
      setProduct(p)
      fetch(`${API}/api/products?cat=${p.cat}`).then(r=>r.json()).then(list => setRecs(list.filter(x=>x.id!==p.id).slice(0,8)))
    })
  }, [id])

  if (!product) return <main className="section"><div className="container">Đang tải...</div></main>

  return (
    <main className="section">
      <div className="container product-detail-extended">
        <div className="pd-gallery">
          <img className="pd-main" src={product.image} alt={product.name} />
          <div className="pd-thumbs">
            {[...Array(5)].map((_,i)=>(<img key={i} src={product.image} alt="thumb" onClick={e=>{document.querySelector('.pd-main').src=e.target.src}}/>))}
          </div>
        </div>
        <div className="pd-info">
          <div className="pd-title">{product.name}</div>
          <div className="pd-price">{product.price.toLocaleString('vi-VN')}₫</div>
          <div className="pd-meta">{product.specs}</div>
          <p>Hàng chính hãng. Bảo hành 12 tháng.</p>
          <div className="pd-qty">Số lượng <input type="number" min={1} value={qty} onChange={e=>setQty(Number(e.target.value)||1)} /></div>
          <div className="pd-actions">
            <button className="btn-ghost" onClick={()=>history.back()}>Quay lại</button>
            <button className="btn-primary" onClick={()=>add(product.id, qty)}>Thêm vào giỏ</button>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <h2>Có thể bạn cũng thích</h2>
          <div className="grid">
            {recs.map(p => (
              <article className="product-card" key={p.id}>
                <Link className="card-link" to={`/product/${p.id}`}>
                  <div className="product-media"><img src={p.image} alt={p.name} /></div>
                  <h3>{p.name}</h3>
                  <p>{p.specs}</p>
                  <div className="price">{(p.price).toLocaleString('vi-VN')}₫</div>
                </Link>
                <button className="btn-primary" onClick={()=>add(p.id,1)}>Thêm vào giỏ</button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
